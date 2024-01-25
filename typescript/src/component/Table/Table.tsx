import React, {ChangeEvent, useState} from 'react';
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

interface State {
    todos: Todo[];
    loading: boolean;
    handleChange: (todo: Todo[]) => void;
}

const TasksTable: React.FC<State> = (props: State) => {
    const [editingTaskId, setEditingTaskId]: [number | null, (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void] = useState<number | null>(null);
    const { setToast }: ToastHooksResult = useToasts();

    const handleDelete = async (id: number): Promise<void> => {
        await axios.delete(`${window.API_URL}/task/delete/${id}`).then((response: AxiosResponse<any>): void => {
            if (response.status === 200) {
                props.handleChange(response.data);
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
                props.handleChange(props.todos);
                setEditingTaskId(null);
                setToast({ text: 'Task edited successfully!', type: 'success' });
            } else {
                throw new Error();
            }
        }).catch((error) => setToast({ text: 'Error editing task!', type: 'error' }));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: number, property: string): void => {
        props.handleChange(props.todos.map((todo: Todo): Todo => {
            if (todo.id === id) {
                return {...todo, [property]: event.target.value};
            }
            return todo;
        }));
    };

    return (
        <>
            {props.loading ? (
                <TableHeadLoading/>
            ) : (
                props.todos.length === 0 ? (
                    <TableEmpty/>
                ) : (
                    <>
                        <Table data={props.todos!}>
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
