import React, { useContext } from 'react';
import Title from "../components/UI/Title/Title";
import TasksTable from "../components/TasksTable/TasksTable";

import { TasksContext } from "../context";

function TasksPage() {
    const { allTasks } = useContext(TasksContext);

    return (
        <main>
            <Title>Мои задачи</Title>
            <TasksTable tasks={allTasks.tasks}/>
        </main>
    );
}

export default TasksPage;