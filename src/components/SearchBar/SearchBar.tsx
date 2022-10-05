import React, { useEffect, useState } from 'react';
import IconSearch from "../UI/Icon/IconSearch";
import classes from './SearchBar.module.css';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RouteNames } from "../../routes/routes";

const { searchBar, 'searchBar-input': searchBarInput } = classes;

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (searchQuery.length && location.pathname !== RouteNames.TASKS_SEARCH) {
            setSearchQuery('');
        }
    }, [location.pathname])

    const search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return

        if (!searchQuery.length) return;

        if (location.pathname === RouteNames.TASKS_SEARCH) {
            const searchQueryParam = searchParams.get('search');
            if (searchQueryParam === searchQuery) return;
        }

        navigate({
            pathname: RouteNames.TASKS_SEARCH,
            search: createSearchParams({
                search: searchQuery
            }).toString()
        });
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

    return (
        <div className={searchBar}>
            <IconSearch/>
            <input onKeyDown={search} value={searchQuery} onChange={onChangeHandler} placeholder="Поиск"
                   className={searchBarInput} type="text"/>
        </div>
    );
}

export default SearchBar;