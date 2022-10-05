import React, { useContext, useMemo } from 'react';
import Title from "../components/UI/Title/Title";
import TasksTable from "../components/TasksTable/TasksTable";
import { TasksContext } from "../context";
import { useSearchParams } from "react-router-dom";

function SearchTasksPage() {
    const { allTasks, completedTasks, deletedTasks } = useContext(TasksContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const allTypeTasks = useMemo(() => allTasks.tasks.concat(completedTasks.tasks, deletedTasks.tasks), [allTasks.tasks, completedTasks.tasks, deletedTasks.tasks])

    const filteredTasks = useMemo(() => allTypeTasks.filter(task => {
        return task.title.toLowerCase().includes(searchQuery || '');
    }), [allTypeTasks, searchQuery]);

    return (
        <main>
            <Title>Результаты поиска</Title>
            <TasksTable tasks={filteredTasks}/>
        </main>
    );
}

export default SearchTasksPage;