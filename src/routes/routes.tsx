import TasksPage from "../pages/TasksPage";
import { Navigate } from "react-router-dom";
import TasksImportantPage from "../pages/TasksImportantPage";
import TasksDeletedPage from "../pages/TasksDeletedPage";
import TasksCompletedPage from "../pages/TasksCompletedPage";
import SearchTasksPage from "../pages/SearchTasksPage";

export enum RouteNames {
    TASKS = "/all",
    TASKS_IMPORTANT = "/important",
    TASKS_COMPLETED = "/completed",
    TASKS_DELETED = "/deleted",
    TASKS_SEARCH = "/search"
}

export const routes = [
    {
        path: RouteNames.TASKS,
        element: <TasksPage/>,
    },
    {
        path: RouteNames.TASKS_IMPORTANT,
        element: <TasksImportantPage/>,
    },
    {
        path: RouteNames.TASKS_DELETED,
        element: <TasksDeletedPage/>,
    },
    {
        path: RouteNames.TASKS_COMPLETED,
        element: <TasksCompletedPage/>,
    },
    {
        path: RouteNames.TASKS_SEARCH,
        element: <SearchTasksPage/>
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.TASKS} replace/>
    }
]