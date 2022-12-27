// Импорты
import { extendTheme } from "@pankod/refine-chakra-ui";

/**
 * Тема приложения
 */
export const theme = extendTheme({
    config: {
        initialColorMode: "system",
    },
    fonts: {
        heading:
            "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        body: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    },
    styles: {
        global: () => ({
            "html, body": {
                fontSize: "14px",
            },
        }),
    },
    colors: {
        sidebar: {
            background: "#1a202c",
            collapseButton: "#191819",
        },
    },
});
