import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskStore {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskStore> = (set, get) => ({
  draggingTaskId: undefined,

  tasks: {
    "abc-1": { id: "abc-1", title: "Task 1", status: "open" },
    "abc-2": { id: "abc-2", title: "Task 2", status: "in-progress" },
    "abc-3": { id: "abc-3", title: "Task 3", status: "open" },
    "abc-4": { id: "abc-4", title: "Task 4", status: "open" },
  },

  getTasksByStatus: (status: TaskStatus) => {
    const tasks = Object.values(get().tasks);
    return tasks.filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;

    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskStore>()(devtools(storeApi));
