import { TaskListDTO } from "../../type/serverInterface/TaskListDTO"

export type TaskState = {
  taskList: TaskListDTO[],
  task: TaskListDTO | null
}