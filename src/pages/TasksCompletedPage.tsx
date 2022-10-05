import React, { useContext } from 'react';
import { TasksContext } from "../context";
import Title from "../components/UI/Title/Title";
import TasksTable from "../components/TasksTable/TasksTable";

function TasksCompletedPage() {
    const { completedTasks } = useContext(TasksContext);

    return (
        <main>
            <Title>Выполненные задачи</Title>
            <TasksTable tasks={completedTasks.tasks}/>
        </main>
    );
}

export default TasksCompletedPage;