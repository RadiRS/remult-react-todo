import { Entity, Fields, Validators } from 'remult';

@Entity('tasks', {
  allowApiCrud: true,
})
export class Task {
  @Fields.uuid()
  id!: string;

  @Fields.string({
    validate: Validators.required,
  })
  title = '';

  @Fields.string({
    validate: task => {
      if (!task.title.length) throw Validators.required.defaultMessage;
      if (task.title.length < 3) throw 'Too Short';
    },
  })
  description = '';

  @Fields.boolean()
  completed = false;
}
