import { remult } from 'remult';
import { remultExpress } from 'remult/remult-express';

import { TasksController } from '../shared/task.controller';
import { Task } from '../shared/task.model';

export const api = remultExpress({
  entities: [Task],
  controllers: [TasksController],
  initApi: async () => {
    const taskRepo = remult.repo(Task);
    if ((await taskRepo.count()) === 0) {
      await taskRepo.insert([
        { title: 'Task a' },
        { title: 'Task b', completed: true },
        { title: 'Task c' },
        { title: 'Task d' },
        { title: 'Task e', completed: true },
      ]);
    }
  },
});
