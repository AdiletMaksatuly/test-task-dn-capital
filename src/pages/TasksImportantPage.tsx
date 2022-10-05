import React, { useContext } from 'react';
import { TasksContext } from "../context";
import Title from "../components/UI/Title/Title";
import TasksTable from "../components/TasksTable/TasksTable";

function TasksImportantPage() {
    const { importantTasks } = useContext(TasksContext);

    return (
        <main>
            <Title>Важные задачи</Title>
            <TasksTable tasks={importantTasks}/>
        </main>
    );
}

export default TasksImportantPage;