import { useState, useEffect } from 'react'
import { remult } from 'remult'
import { Task } from './shared/task.model'

const taskRepo = remult.repo(Task);

async function fetchTasks() {
  return taskRepo.find()
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  return (
    <div>
      <main>
        <h2>Todo List</h2>
        {tasks.map(task => (
          <div key={task.id}>
            <input type="checkbox" checked={task.completed} />
            {task.title}
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
