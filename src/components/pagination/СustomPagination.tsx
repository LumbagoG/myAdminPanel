// Импорты
import React from "react";
import {
    IconButton,
    usePagination,
    HStack,
    Button,
    Box,
} from "@pankod/refine-chakra-ui";

// Медиа
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

// Типы компонента пагинации
type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

/**
 * Компонент пагинации
 * @param {number} current - Текущая страница
 * @param {number} pageCount - Количество страниц
 * @param {function} setCurrent - Функция установки текущей страницы
 * @constructor
 */
export const CustomPagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    // Пагинация
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        // Обертка
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {/* Секция с переходом к предыдущим страницам */}
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {/* Секция с генераций страниц */}
                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}

                {/* Секция с переходом к следующим страницам */}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
