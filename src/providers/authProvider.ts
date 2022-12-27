// Импорты
import { AuthProvider } from "@pankod/refine-core";

// Токен авторизации
export const TOKEN_KEY = "refine-auth";

/**
 * Провайдер авторизации
 */
export const authProvider: AuthProvider = {
    /**
     * Вход
     * @param {string} username - Имя пользователя
     * @param {string} email - Email
     * @param {string} password - Пароль
     */
    login: async ({ username, email, password }) => {
        if ((username || email) && password) {
            localStorage.setItem(TOKEN_KEY, email);
            return Promise.resolve();
        }

        return Promise.reject();
    },

    /**
     * Выход
     * @return {Promise} Promise
     */
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },

    /**
     * Проверка ошибок
     * @return {Promise} Promise
     */
    checkError: () => Promise.resolve(),

    /**
     * Проверка авторизации
     * @return {Promise} Promise
     */
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },

    /**
     * Получение прав
     * @return {Promise} Promise
     */
    getPermissions: () => Promise.resolve(),

    /**
     * Получение информации о пользователе
     * @return {Promise} Promise
     */
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
        });
    },
};
