import { ITag } from "../../models";
import { createContext } from "react";

interface TagsContextType {
    tags: ITag[];
}

const initialValue = {
    tags: [],
}

export const TagsContext = createContext<TagsContextType>(initialValue);
