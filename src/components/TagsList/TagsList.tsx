import React, { useRef } from 'react';
import classes from './TagsList.module.css';
import { ITag } from "../../models";

const {
    tags,
    'tags-btn': tagsBtn,
    'tags-item': tagsItem,
    'tags-item-active': tagsItemActive
} = classes;

interface TagsItemProps {
    tag: ITag;
    setActiveTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function TagsItem({ tag, setActiveTag }: TagsItemProps) {
    const { title, color } = tag;

    return (
        <li className={tagsItem}>
            <button
                className={tagsBtn}
                onClick={setActiveTag}
            >
                <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} style={{ backgroundColor: color }}></span>
                {title}
            </button>
        </li>
    );
}

interface TagsListProps {
    tagsItems: ITag[];
}


function TagsList({ tagsItems }: TagsListProps) {
    const tagsRef = useRef<HTMLUListElement>(null);
    const setActiveTag = (event: React.MouseEvent<HTMLButtonElement>) => {
        const btn = event.target as HTMLButtonElement;
        const listItem = btn.closest('li');

        if (!tagsRef.current) return;
        Array.from(tagsRef.current.children).forEach(li => {
            li.classList.remove(tagsItemActive);
        });

        listItem?.classList.add(tagsItemActive);
    }

    return (
        <ul className={tags} ref={tagsRef}>
            {
                tagsItems.map((tag) =>
                    <TagsItem key={tag.title} tag={tag} setActiveTag={setActiveTag}/>
                )
            }
        </ul>
    );
}

export default TagsList;