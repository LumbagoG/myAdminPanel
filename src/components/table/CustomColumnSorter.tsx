// Импорты
import React from "react";
import { IconButton } from "@pankod/refine-chakra-ui";

// Icons
import { IconChevronDown, IconSelector } from "@tabler/icons";

// Интерфейсы
import { ColumnButtonProps } from "../../pages/posts/interfaces";

/**
 * Компонент колонки таблицы с сортировкой
 * @constructor
 */
export const CustomColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </IconButton>
    );
};
