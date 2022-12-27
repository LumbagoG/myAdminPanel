// Ресурсы страниц
import { PostCreate, PostEdit, PostList, PostShow } from "pages";

/**
 * Модуль ресурсов страниц
 */
export const appResources = [
    // Тестовый ресурс с данными по fake api
    {
        name: "posts",
        list: PostList,
        show: PostShow,
        create: PostCreate,
        edit: PostEdit,
    },
];
