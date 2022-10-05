import { CreateFormValues } from "../components/CreateTaskForm/CreateTaskForm";
import { Path, RegisterOptions } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";

export interface ITag {
    title: string;
    color: string;
    id: string;
}

export interface ITask {
    id: string;
    title: string;
    finishDate: string;
    isCompleted: boolean;
    isImportant: boolean;
    tags: ITag[];
    desc?: string;
}

// TODO delete dependency on CreateFormValues and make able to take any FormValues type
export interface CreateFormFieldsProps {
    name?: Path<CreateFormValues>;
    rules?: RegisterOptions;
    register?: UseFormRegister<CreateFormValues>;
}
