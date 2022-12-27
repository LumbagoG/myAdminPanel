// Импорты
import React from "react";
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    ChakraProvider,
    ReadyPage,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import { RefineKbarProvider } from "@pankod/refine-kbar";

// Компоненты
import {
    CustomLogo,
    CustomSidebar,
    CustomHeader,
    KBar,
} from "../../components";

// Layouts
import { AppLayout } from "../../layout/AppLayout";

// Конфиги
import { appResources } from "../../config/resources";

// Провайдеры
import { authProvider, appDataProvider } from "../../providers";

// Тема
import { theme } from "../../assets/styles/theme";

/**
 * Компонент приложения
 * @constructor
 */
export const App = () => {
    return (
        // Провайдер Chackra ui - https://chakra-ui.com/
        <ChakraProvider theme={theme}>
            {/* Провайдер Kbar - https://kbar.vercel.app/  */}
            <RefineKbarProvider>
                {/* Компонент админки */}
                <Refine
                    // Дата провайдер с методами для обработки данных с api
                    dataProvider={appDataProvider()}
                    notificationProvider={notificationProvider()}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    Title={CustomLogo}
                    Sider={CustomSidebar}
                    Layout={AppLayout}
                    Header={CustomHeader}
                    routerProvider={{
                        ...routerProvider,
                        routes: [],
                    }}
                    authProvider={authProvider}
                    LoginPage={AuthPage}
                    resources={appResources}
                    OffLayoutArea={KBar}
                    options={{ mutationMode: "optimistic" }}
                />
            </RefineKbarProvider>
        </ChakraProvider>
    );
};
