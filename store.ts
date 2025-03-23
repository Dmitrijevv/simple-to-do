import { create } from "zustand";



export interface ITasks {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    title?: string;
    completed?: boolean;
    priority?: string;
    description?: string;
    isPinned?: boolean;
    isArchived?: boolean;
    author?: string;
    listName?: string;
    idList?: number;
}
export interface IListName {
  id?: number;
  name?: string;
  label?: string;
}

export type ITaskList = {
  listName: IListName[]
  addList: (list: IListName) => void;
  removeList: (id: number) => void;
  getbyid: (id: number) => void;
  updateList: (id: number, list: IListName) => void;
}

type ITasksState = {
  tasks: ITasks[];
  addTask: (task: ITasks) => void;
  getbyid: (id: number) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, task: ITasks) => void;
}

export const useListName = create<ITaskList>((set) => ({
  listName: [],
  addList: (list) =>
    set((state) => ({listName: [...state.listName, list]})),
  getbyid: (id) => {
    const foundList = useListName.getState().listName.find((list) => list.id === id);
    console.log(foundList); // Handle the found list as needed
  },
  removeList: (id) =>
    set((state) => ({listName: state.listName.filter((list) => list.id !== id)})),
  updateList: (id, list) =>
    set((state) => ({
      listName: state.listName.map((l) => (l.id === id? list : l)),
    })),
}))


export const useTasks = create<ITasksState>((set) => ({
    tasks: [],
    addTask: (task) => 
        set((state) => ({tasks: [...state.tasks, task]})),
    getbyid: (id) => {
      const foundTask = useTasks.getState().tasks.find((task) => task.id === id);
      console.log(foundTask); // Handle the found task as needed
    },
    removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

    updateTask: (id, task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id? task : t)),
        })),
}))

