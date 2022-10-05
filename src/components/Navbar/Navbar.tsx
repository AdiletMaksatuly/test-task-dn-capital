import React, { ReactNode, useContext } from 'react';
import classes from "./Navbar.module.css";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../routes/routes";
import { colors } from "../../styles/colors";
import IconMessage from "../UI/Icon/IconMessage";
import IconTick from "../UI/Icon/IconTick";
import IconStar from "../UI/Icon/IconStar";
import IconBin from "../UI/Icon/IconBin";
import TagsList from "../TagsList/TagsList";
import { TagsContext } from "../../context";

const {
    navbar,
    menu,
    'tags-title': tagsTitle
} = classes

const navLinkActiveStyle = { color: colors["purple-dark"] };
const setIsNavLinkActive = ({ isActive }: { isActive: boolean }) => isActive ? navLinkActiveStyle : undefined

const menuItems = [
    {
        path: RouteNames.TASKS,
        text: 'Мои задачи',
        icon: <IconMessage/>
    },
    {
        path: RouteNames.TASKS_IMPORTANT,
        text: 'Важные',
        icon: <IconStar/>
    },
    {
        path: RouteNames.TASKS_COMPLETED,
        text: 'Выполненные',
        icon: <IconTick/>
    },
    {
        path: RouteNames.TASKS_DELETED,
        text: 'Удаленные',
        icon: <IconBin/>
    },

]

interface NavbarProps {
    onOpenClick: () => void;
    children: ReactNode;
}

function Navbar({ onOpenClick, children }: NavbarProps) {
    const { tags } = useContext(TagsContext);

    return (
        <nav className={navbar}>
            <Button primary contained onClick={onOpenClick}>Новая задача</Button>
            <ul className={menu}>
                {
                    menuItems.map(({ path, text, icon }) =>
                        <li key={path}>
                            <NavLink style={setIsNavLinkActive} to={path}>
                                {icon}
                                {text}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
            <span className={tagsTitle}>Тэги</span>
            <TagsList tagsItems={tags}/>
            {
                children
            }
        </nav>
    );
}

export default Navbar;