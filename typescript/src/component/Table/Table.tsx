import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Input, Table, useToasts} from '@geist-ui/core';
import {TableDataItemBase} from "@geist-ui/core/esm/table";
import axios, {AxiosResponse} from "axios";
import TableHeadLoading from "./TableHeadLoading";
import TableEmpty from "./TableEmpty";
import {ToastHooksResult} from "@geist-ui/core/esm/use-toasts/use-toast";

interface Todo {
    id: number;
    description: string;
    date: string | Date;
}

interface Update {
    update: boolean;
}

const TasksTable: React.FC<Update> = (update) => {
    const [todos, setTodos]: [Todo[], (value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void] = useState<Todo[]>([]);
    const [editingTaskId, setEditingTaskId]: [number | null, (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void] = useState<number | null>(null);
    const [loading, setLoading]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = useState<boolean>(true);
    const { setToast }: ToastHooksResult = useToasts();

    useEffect((): void => {
        if(update) {
            axios.get(`${window.API_URL}/task`)
            .then((response: AxiosResponse<any>): void => {
                if (response.status === 200) {
                    setTodos(response.data);
                    setLoading(false);
                } else {
                    throw new Error();
                }
            }).catch((error) => setToast({text: `${error.message}`, type: 'error'}))
        }
    // eslint-disable-next-line
    }, [update]);

    const handleDelete = async (id: number): Promise<void> => {
        await axios.delete(`${window.API_URL}/task/delete/${id}`).then((response: AxiosResponse<any>): void => {
            if (response.status === 200) {
                setTodos(response.data);
                setEditingTaskId(null);
                setToast({ text: 'Task deleted successfully!', type: 'success' });
            } else {
                throw new Error();
            }
        }).catch((error) => setToast({ text: 'Error deleting task!', type: 'error' }));
    };

    const handleEdit = async (description: string, date: Date | string): Promise<void> => {
        await axios.put(`${window.API_URL}/task/edit/${editingTaskId}`, {
            description: description,
            date: date
        }).then((response: AxiosResponse<any>): void => {
            if (response.status === 200) {
                setTodos(response.data);
                setEditingTaskId(null);
                setToast({ text: 'Task edited successfully!', type: 'success' });
            } else {
                throw new Error();
            }
        }).catch((error) => setToast({ text: 'Error editing task!', type: 'error' }));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: number, property: string): void => {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.map((todo: Todo): Todo => {
                if (todo.id === id) {
                    return {...todo, [property]: event.target.value};
                }
                return todo;
            });
        });
    };

    return (
        <>
            {loading ? (
                <TableHeadLoading/>
            ) : (
                todos.length === 0 ? (
                    <TableEmpty/>
                ) : (
                    <>
                        <Table data={todos!}>
                            <Table.Column label="Task" width={300} prop={"description"} render={(_value, rowData: TableDataItemBase) => (
                                <>
                                    {editingTaskId === rowData.id ? (
                                        <Input initialValue={rowData.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, rowData.id, "description")} crossOrigin={undefined}/>
                                    ) : (
                                        rowData.description
                                    )}
                                </>
                            )} />
                            <Table.Column label="Date" width={300} prop={"date"} render={(_value, rowData: TableDataItemBase) => (
                                <>
                                    {editingTaskId === rowData.id ? (
                                        <Input initialValue={rowData.date} htmlType={"date"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, rowData.id, "date")} crossOrigin={undefined}/>
                                    ) : (
                                        rowData.date
                                    )}
                                </>
                            )} />
                            <Table.Column label="Actions" width={300} prop={"id"} render={(_value, rowData: TableDataItemBase) => (
                                <>
                                    {editingTaskId === rowData.id ? (
                                        <Button type="success" auto scale={1 / 3} font="12px" onClick={() => handleEdit(rowData.description, rowData.date)} placeholder={undefined}>Update</Button>
                                    ) : (
                                        <>
                                            <Button type="secondary" auto scale={1 / 3} font="12px" marginRight={"10px"} onClick={() => setEditingTaskId(rowData.id)} placeholder={undefined}>Edit</Button>
                                            <Button type="error" auto scale={1 / 3} font="12px" onClick={() => handleDelete(rowData.id)} placeholder={undefined}>Delete</Button>
                                        </>
                                    )}
                                </>
                            )} />
                        </Table>
                    </>
                )
            )}
        </>
    );
};

export default TasksTable;
