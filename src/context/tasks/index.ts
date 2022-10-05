import { createContext, Dispatch, SetStateAction } from "react";
import { ITask } from "../../models";

interface TasksContextType {
    allTasks: {
        tasks: ITask[],
        setTasks: Dispatch<SetStateAction<ITask[]>>,
    };
    completedTasks: {
        tasks: ITask[],
        setTasks: Dispatch<SetStateAction<ITask[]>>,
    };
    deletedTasks: {
        tasks: ITask[],
        setTasks: Dispatch<SetStateAction<ITask[]>>
    };
    importantTasks: ITask[];
}

const initialValue: TasksContextType = {
    allTasks: {
        tasks: [],
        setTasks: () => void 0,
    },
    completedTasks: {
        tasks: [],
        setTasks: () => void 0,
    },
    deletedTasks: {
        tasks: [],
        setTasks: () => void 0,
    },
    importantTasks: [],
};

export const TasksContext = createContext<TasksContextType>(initialValue);
