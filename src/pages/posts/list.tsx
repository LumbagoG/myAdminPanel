// Импорты
import React from "react";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    ShowButton,
    EditButton,
    DeleteButton,
    Select,
    DateField,
} from "@pankod/refine-chakra-ui";

// Компоненты
import {
    CustomColumnFilter,
    CustomColumnSorter,
    CustomPagination,
} from "components";

// Интерфейсы
import { FilterElementProps, ICategory, IPost } from "./interfaces";

export const PostList: React.FC = () => {
    /**
     * Конфиг колонок
     */
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: true,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select borderRadius="md" size="sm" {...props}>
                                <option value="published">published</option>
                                <option value="draft">draft</option>
                                <option value="rejected">rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: true,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    try {
                        const meta = table.options.meta as {
                            categoriesData: GetManyResponse<ICategory>;
                        };
                        const category = meta.categoriesData?.data.find(
                            (item) => item.id === getValue()
                        );
                        if (typeof category === "undefined")
                            return "Loading...";
                        return category?.title;
                    } catch (e) {}
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
                enableColumnFilter: false,
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: true,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        []
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
        refineCoreProps: {
            dataProviderName: "fake",
            initialSorter: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
    });

    // Id's категорий
    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];

    /**
     * Данные категорий
     */
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    /**
     * Записываем данные по категориям в таблицу
     */
    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            {/* Контейнер таблицы */}
            <TableContainer whiteSpace="pre-line">
                {/* Таблица */}
                <Table variant="simple">
                    {/* Шапка таблицы */}
                    <Thead>
                        {/* Рендер опций колонок */}
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <CustomColumnSorter
                                                        column={header.column}
                                                    />
                                                    <CustomColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>

                    {/* Тело таблицы */}
                    <Tbody>
                        {/* Рендер данных по колонкам */}
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Компонент кастомной пагинации */}
            <CustomPagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};
