import React, { useContext } from 'react';
import IconBin from "../UI/Icon/IconBin";
import IconDrag from "../UI/Icon/IconDrag";
import Badge from "../UI/Badge/Badge";
import classes from './TasksTable.module.css';
import { ITask } from '../../models'
import Checkbox from "../UI/Checkbox/Checkbox";
import classNames from "classnames"
import { useLocation } from "react-router-dom";
import { RouteNames } from "../../routes/routes";
import IconRestore from "../UI/Icon/IconRestore";
import { TasksContext } from "../../context";

const {
    table,
    'table-content': tableContent,
    'table-row': tableRow,
    tags,
    title,
    'title-important': titleImportant
} = classes;

interface TasksTableProps {
    tasks: ITask[];
}

function TasksTable({ tasks }: TasksTableProps) {
    const { pathname } = useLocation();
    const { allTasks, completedTasks, deletedTasks } = useContext(TasksContext);

    const isDeletedTasksPage = pathname === RouteNames.TASKS_DELETED;

    const onIsCompletedChange = (id: string) => {
        const currentTask = tasks.find(task => task.id === id);

        if (!currentTask) return;

        currentTask.isCompleted = !(currentTask.isCompleted);

        const newTasks = [...tasks].filter(task => task.id !== currentTask.id);

        if (pathname === RouteNames.TASKS || pathname === RouteNames.TASKS_IMPORTANT) {
            moveFromAllToCompleted(newTasks, currentTask)
        }

        if (pathname === RouteNames.TASKS_COMPLETED) {
            moveFromCompletedToAll(newTasks, currentTask);
        }

        if (pathname === RouteNames.TASKS_SEARCH) {
            currentTask.isCompleted
                ? moveFromAllToCompleted(newTasks, currentTask)
                : moveFromCompletedToAll(newTasks, currentTask)
        }
    };

    const moveFromAllToCompleted = (newTasks: ITask[], currentTask: ITask) => {
        allTasks.setTasks(newTasks);
        completedTasks.setTasks([...completedTasks.tasks, currentTask])
    }

    const moveFromCompletedToAll = (newTasks: ITask[], currentTask: ITask) => {
        completedTasks.setTasks(newTasks);
        allTasks.setTasks([...allTasks.tasks, currentTask])
    }

    const deleteTask = (id: string) => {
        const currentTask = tasks.find(task => task.id === id);

        if (!currentTask) return;

        const newTasks = [...tasks].filter(task => task.id !== currentTask.id);

        if (pathname === RouteNames.TASKS || pathname === RouteNames.TASKS_IMPORTANT) {
            allTasks.setTasks(newTasks);
        }

        if (pathname === RouteNames.TASKS_COMPLETED) {
            completedTasks.setTasks(newTasks);
        }

        deletedTasks.setTasks([...deletedTasks.tasks, currentTask]);
    };

    const restoreTask = (id: string) => {
        const currentTask = tasks.find(task => task.id === id);

        if (!currentTask) return;

        const newTasks = [...tasks].filter(task => task.id !== currentTask.id);
        deletedTasks.setTasks(newTasks);

        currentTask.isCompleted
            ? completedTasks.setTasks([...completedTasks.tasks, currentTask])
            : allTasks.setTasks([...allTasks.tasks, currentTask]);
    }

    if (!tasks.length) {
        return <div style={{ textAlign: "center" }}>No tasks yet! Create one</div>
    }

    return (
        <table className={table}>
            <tbody className={tableContent}>
            {
                tasks.map(task =>
                    <tr className={tableRow} key={task.id}>
                        {
                            !isDeletedTasksPage &&
                            <td>
                                <Checkbox checked={task.isCompleted} onChange={() => onIsCompletedChange(task.id)}/>
                            </td>
                        }
                        <td className={classNames(title, { [titleImportant]: task.isImportant && !isDeletedTasksPage })}>
                            <span>{task.title}</span>
                        </td>
                        <td className={tags}>
                            {
                                task.tags.map(tag =>
                                    <Badge key={tag.title} title={tag.title} color={tag.color}/>
                                )
                            }
                        </td>
                        <td>
                            {task.finishDate}
                        </td>
                        <td>
                            {isDeletedTasksPage ?
                                <button onClick={() => restoreTask(task.id)}>
                                    <IconRestore/>
                                </button>

                                :
                                <button onClick={() => deleteTask(task.id)}>
                                    <IconBin/>
                                </button>

                            }
                        </td>
                        {
                            !isDeletedTasksPage &&
                            <td>
                                <button>
                                    <IconDrag/>
                                </button>
                            </td>}
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}

export default TasksTable;