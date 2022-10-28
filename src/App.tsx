import { useState, useEffect } from 'react';
import { remult } from 'remult';

import { TasksController } from './shared/task.controller';
import { Task } from './shared/task.model';

const taskRepo = remult.repo(Task);

async function fetchTasks(completed?: boolean) {
  return taskRepo.find({
    limit: 20,
    orderBy: { completed: 'asc' },
    where: { completed: completed ? false : undefined },
  });
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks(hideCompleted).then(setTasks);
  }, [hideCompleted]);

  const handleSaveTask = async (task: Task) => {
    try {
      const savedTask = await taskRepo.save(task);
      setTasks(tasks.map(t => (t === task ? savedTask : t)));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.message);
    }
  };

  const handleChange = (values: Partial<Task>) => {
    setTasks(tasks.map(t => (t.id === values.id ? { ...t, ...values } : t)));
  };

  const handleAddTask = () => {
    setTasks([...tasks, new Task()]);
  };

  const handleDeleteTask = async (task: Task) => {
    await taskRepo.delete(task);
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const handleSetAll = async (completed: boolean) => {
    await TasksController.setAll(completed);

    setTasks(await fetchTasks(hideCompleted));
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={hideCompleted}
        onChange={e => {
          setHideCompleted(e.target.checked);
        }}
      />
      Hide Completed
      <main>
        <h2>Todo List</h2>
        {tasks.map(task => {
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={e =>
                  handleChange({ ...task, completed: e.target.checked })
                }
              />
              <input
                value={task.title}
                onChange={e => handleChange({ ...task, title: e.target.value })}
              />
              <button onClick={() => handleSaveTask(task)}>Save</button>
              <button onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          );
        })}
      </main>
      <div>
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={() => handleSetAll(true)}>Set all as completed</button>
        <button onClick={() => handleSetAll(false)}>
          Set all as uncompleted
        </button>
      </div>
    </div>
  );
}

export default App;
