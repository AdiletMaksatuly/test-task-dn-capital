import React, { useContext } from 'react';
import Input from "../UI/Input/Input";
import classes from './CreateTaskForm.module.css'
import Checkbox from "../UI/Checkbox/Checkbox";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TagsContext, TasksContext } from "../../context";
import { ITag, ITask } from "../../models";
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "../DatePicker/DatePicker";

const { form, tags, 'tags-label': tagsLabel, btns } = classes;

export enum CreateFormFieldsNames {
    TASK_TITLE = "task_title",
    IS_IMPORTANT = "is_important",
    TASK_DATE = "task_date",
    TASK_DESC = "task_desc",
    TASK_TAGS = "task_tags",
}

export interface CreateFormValues {
    task_title: string;
    is_important: boolean;
    task_date: Date;
    task_desc: string;
    task_tags: string[];
}

interface CreateTaskFormProps {
    onCreate: () => void;
}

const CreateFormDefaultValues = {
    [CreateFormFieldsNames.TASK_DESC]: "",
    [CreateFormFieldsNames.TASK_TITLE]: "",
    [CreateFormFieldsNames.TASK_TAGS]: [],
    [CreateFormFieldsNames.IS_IMPORTANT]: false,
    [CreateFormFieldsNames.TASK_DATE]: new Date(),
};

function CreateTaskForm({ onCreate }: CreateTaskFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitSuccessful },
        reset
    } = useForm<CreateFormValues>({
        defaultValues: CreateFormDefaultValues
    });
    const { allTasks } = useContext(TasksContext);
    const { tasks, setTasks } = allTasks;
    const { tags: tagsItems } = useContext(TagsContext);

    const createTask: SubmitHandler<CreateFormValues> = (data) => {
        const { task_title, task_tags, task_date, task_desc, is_important } = data;
        const normalizedTaskTags = task_tags.map(taskTag => {
            const tag = tagsItems.find((tagItem) => taskTag === tagItem.id);
            if (tag) {
                return {
                    title: tag.title,
                    id: taskTag,
                    color: tag.color,
                }
            }
        });

        const newTask: ITask = {
            id: uuidv4(),
            title: task_title,
            desc: task_desc,
            finishDate: task_date.toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
            isCompleted: false,
            isImportant: is_important,
            tags: normalizedTaskTags as ITag[],
        };

        setTasks([...tasks, newTask]);
        reset(CreateFormDefaultValues);

        onCreate();
    }

    return (
        <form className={form} onSubmit={handleSubmit(createTask)}>
            <Input register={register} rules={{ required: true }} label={"Название"}
                   name={CreateFormFieldsNames.TASK_TITLE} placeholder={"Название задачи"}/>
            <Checkbox isSubmitSuccesful={isSubmitSuccessful}
                      register={register} label={"Важная задача"}
                      name={CreateFormFieldsNames.IS_IMPORTANT}/>

            <Controller
                control={control}
                name={CreateFormFieldsNames.TASK_DATE}
                render={({ field: { onChange, onBlur, value } }) => (
                    <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                    />
                )}
            />

            <TextArea register={register} rules={{ required: true }} label={"Описание задачи"}
                      name={CreateFormFieldsNames.TASK_DESC}/>

            <div>
                <span className={tagsLabel}>Тэги</span>
                <div className={tags}>
                    {
                        tagsItems.map((tag) =>
                            <Checkbox isSubmitSuccesful={isSubmitSuccessful} register={register} key={tag.id}
                                      label={tag.title} value={tag.id} name={CreateFormFieldsNames.TASK_TAGS}/>)
                    }
                </div>
            </div>

            <div className={btns}>
                <Button type={'submit'} primary contained>Добавить</Button>
                <Button primary outlined>Удалить</Button>
            </div>
        </form>
    );
}

export default CreateTaskForm