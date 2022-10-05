import React, { memo, useCallback, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import { routes } from "./routes/routes";
import SearchBar from "./components/SearchBar/SearchBar";
import { TagsContext, TasksContext } from './context';
import { ITag, ITask } from "./models";
import { colors } from "./styles/colors";
import { useLocalStorageState } from "./hooks/use-localstorage";
import Sidebar from "./components/Sidebar/Sidebar";

const tags: ITag[] = [
    {
        title: 'Продуктивность',
        color: colors.purple,
        id: 'productivity'
    },
    {
        title: 'Образование',
        color: colors.green,
        id: 'education',
    },
    {
        title: 'Здоровье',
        color: colors.orange,
        id: 'health',
    },
    {
        title: 'Срочно',
        color: colors.red,
        id: 'urgent',
    },
]

// TODO
// Realize search tasks
// Realize filtering by tags
// Realize editing task in modal
// Create "show more" button
// Create confirm dialog after to show clicking delete task button
// Realize functionality of delete button in sidebar
// Make layout responsive
// Create portal to sidebar and delete it from navbar

const AppNavbar = memo(() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

    const tagsContextValue = {
        tags
    };

    return <TagsContext.Provider value={tagsContextValue}>
        <Navbar onOpenClick={openSidebar}>
            <Sidebar onCloseClick={closeSidebar} isActive={isSidebarOpen}/>
        </Navbar>
    </TagsContext.Provider>
})

const AppContent = memo(() => {
    return (
        <div className="content">
            <header className="header">
                <SearchBar/>
            </header>
            <Routes>
                {
                    routes.map((route) => <Route key={route.path} {...route} />)
                }
            </Routes>
        </div>
    );
});

function App() {
    const [allTasks, setAllTasks] = useLocalStorageState<ITask[]>("allTasks", []);
    const [deletedTasks, setDeletedTasks] = useLocalStorageState<ITask[]>("deletedTasks", []);
    const [completedTasks, setCompletedTasks] = useLocalStorageState<ITask[]>("completedTasks", []);

    const importantTasks = useMemo(() => {
        return allTasks.filter(task => task.isImportant)
    }, [allTasks]);

    const tasksContextValue = {
        allTasks: {
            tasks: allTasks,
            setTasks: setAllTasks
        },
        deletedTasks: {
            tasks: deletedTasks,
            setTasks: setDeletedTasks,
        },
        completedTasks: {
            tasks: completedTasks,
            setTasks: setCompletedTasks,
        },
        importantTasks
    };

    return (
        <div className="app">
            <TasksContext.Provider value={tasksContextValue}>
                <AppNavbar/>
                <AppContent/>
            </TasksContext.Provider>
        </div>
    );
}

export default App;