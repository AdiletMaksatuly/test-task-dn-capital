import React, { memo } from 'react';
import classes from './Sidebar.module.css'
import IconStar from "../UI/Icon/IconStar";
import IconClose from "../UI/Icon/IconClose";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import classNames from "classnames";

const {
    sidebar,
    'sidebar-active': sidebarActive,
    'sidebar-overlay': sidebarOverlay,
    'sidebar-content': sidebarContent,
    'sidebar-header': sidebarHeader,
    'header-title': headerTitle,
    'header-btns': headerBtns,
    'star-btn-container': starBtnContainer,
    'star-btn': starBtn,
    'close-btn': closeBtn,
} = classes;

interface SidebarHeaderProps {
    onCloseClick: () => void;
}

function SidebarHeader({ onCloseClick }: SidebarHeaderProps) {
    return <header className={sidebarHeader}>
        <span className={headerTitle}>Задача</span>
        <div className={headerBtns}>
            <div className={starBtnContainer}>
                <input type="checkbox"/>
                <button className={starBtn}><IconStar size={16}/></button>
            </div>
            <button onClick={onCloseClick} className={closeBtn}><IconClose/></button>
        </div>
    </header>;
}

interface SidebarProps {
    isActive: boolean;
    onCloseClick: () => void
}

function Sidebar({ isActive, onCloseClick }: SidebarProps) {
    const sidebarClasses = classNames(sidebar, { [sidebarActive]: isActive })

    return (
        <div className={sidebarClasses}>
            <div className={sidebarOverlay} onClick={onCloseClick}/>
            <div className={sidebarContent}>
                <SidebarHeader onCloseClick={onCloseClick}/>
                <CreateTaskForm onCreate={onCloseClick}/>
            </div>
        </div>
    );
}

export default memo(Sidebar);