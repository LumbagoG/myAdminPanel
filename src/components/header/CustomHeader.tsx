// Импорты
import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
    Box,
    IconButton,
    HStack,
    Text,
    Avatar,
    Icon,
    useColorMode,
} from "@pankod/refine-chakra-ui";

// Медиа
import { IconMoon, IconSun } from "@tabler/icons";

/**
 * Компонент шапки
 * @constructor
 */
export const CustomHeader: React.FC = () => {
    // Данные пользователя
    const { data: user } = useGetIdentity();
    const showUserInfo = user && (user.name || user.avatar);

    // Тема
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        // Обертка шапки
        <Box
            py="2"
            px="4"
            display="flex"
            justifyContent="flex-end"
            gap={2}
            w="full"
            bg="chakra-body-bg"
        >
            {/* Если пользователь зашел в систему */}
            {showUserInfo && (
                <HStack>
                    <Text size="sm" fontWeight="bold">
                        {user?.name}
                    </Text>
                    <Avatar size="sm" name={user?.name} src={user?.avatar} />
                </HStack>
            )}

            {/* Кнопка смены темы */}
            <IconButton
                variant="ghost"
                aria-label="Toggle theme"
                onClick={toggleColorMode}
            >
                {/* Иконка темы */}
                <Icon
                    as={colorMode === "light" ? IconMoon : IconSun}
                    w="24px"
                    h="24px"
                />
            </IconButton>
        </Box>
    );
};
