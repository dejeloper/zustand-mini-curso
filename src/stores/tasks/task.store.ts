import { StateCreator, create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus } from "../../interfaces";
import {
  StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";

interface TaskStore {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTasksByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

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

  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = { id: uuidv4(), title, status };

    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
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

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(storeApi, {
      name: "task-store",
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
