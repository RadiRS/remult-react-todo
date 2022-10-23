import { useState, useEffect } from 'react'
import { remult } from 'remult'
import { Task } from './shared/task.model'

const taskRepo = remult.repo(Task);

async function fetchTasks(completed?: boolean) {
  return taskRepo.find({
    limit: 20,
    orderBy: { completed: 'asc' },
    where: { completed: completed ? false : undefined }
  })
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [hideCompleted, setHideCompleted] = useState<boolean>(false)

  useEffect(() => {
    fetchTasks(hideCompleted).then(setTasks)
  }, [hideCompleted])

  return (
    <div>
      <input
        type="checkbox"
        checked={hideCompleted}
        onChange={(e) => {
          setHideCompleted(e.target.checked)
        }}
      />
      Hide Completed
      <main>
        <h2>Todo List</h2>
        {tasks.map(task => (
          <div key={task.id}>
            <input type="checkbox"
              checked={task.completed}
              onChange={e => console.log(e.target.checked)}
            />
            {task.title}
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
