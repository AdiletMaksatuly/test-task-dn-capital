import React, { useContext } from 'react';
import { TasksContext } from "../context";
import Title from "../components/UI/Title/Title";
import TasksTable from "../components/TasksTable/TasksTable";

function TasksDeletedPage() {
    const { deletedTasks } = useContext(TasksContext);

    return (
        <main>
            <Title>Удаленные задачи</Title>
            <TasksTable tasks={deletedTasks.tasks}/>
        </main>
    );
}

export default TasksDeletedPage;