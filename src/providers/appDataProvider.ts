// Импорты
import dataProvider from "@pankod/refine-simple-rest";

// Конфиги
import { fakeApiUrl } from "../config/apiUrlsConfig";

// Providers
import { customDataProvider } from "./dataProvider/customDataProvider";

/**
 * Кастомный провайдер данных
 * @return {{}}
 */
export const appDataProvider = () => {
    return {
        default: dataProvider(fakeApiUrl),
        fake: customDataProvider(fakeApiUrl),
    };
};
