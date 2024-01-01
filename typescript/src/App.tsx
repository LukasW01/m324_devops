import './index.tsx';
import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {Button, Code, Dot, Fieldset, Input, Page, Table, Text, useToasts} from '@geist-ui/core';
import {TableDataItemBase} from "@geist-ui/core/esm/table";
import {useFormik} from 'formik';
import * as Yup from 'yup';

interface Todo {
    id: number;
    description: string;
    date: string | Date;
}

const App: React.FC = () => {
    const [todos, setTodos]: [Todo[], (value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void] = useState<Todo[]>([]);
    const [editingTaskId, setEditingTaskId]: [number | null, (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void] = useState<number | null>(null);
    const { setToast } = useToasts();

    const validationSchema: Yup.Schema = Yup.object({
        description: Yup.string().required('Please enter a task description!'),
        date: Yup.date().required('Please enter a date!'),
    });

    useEffect((): void => {
        fetch(`${window.API_URL}`)
            .then((response: Response) => response.json())
            .then((data: Todo[]): void => {
                setTodos(data);
            })
            .catch(error => setToast({ text: 'Error loading tasks!', type: 'error' }));
    // eslint-disable-next-line
    }, []);

    const formik= useFormik({
        initialValues: {
            description: "",
            date: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values: {
            description: string;
            date: Date | string;
        }): void => {
            fetch(`${window.API_URL}/tasks`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    description: values.description,
                    date: values.date,
                }),
            })
            .then((response: Response) => response.json())
            .then((data: Todo[]): void => {
                setTodos(data);
                setToast({ text: 'Task added successfully!', type: 'success' });
            })
            .catch((error) => setToast({ text: 'Error adding task!', type: 'error' }));
            formik.resetForm();
        },
    });

    const handleDelete = (id: number): void => {
        fetch(`${window.API_URL}/delete`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id: id })
        })
        .then((response: Response) => response.json())
        .then((data: Todo[]): void => {
            setTodos(data);
            setEditingTaskId(null);
            setToast({ text: 'Task deleted successfully!', type: 'success' });
        })
        .catch(error => setToast({ text: 'Error deleting task!', type: 'error' }));
    };

    const handleEdit = (description: string, date: Date | string): void => {
        fetch(`${window.API_URL}/edit`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id: editingTaskId, description: description, date: date })
        })
        .then((response: Response) => response.json())
        .then((data: Todo[]): void => {
            setTodos(data);
            setEditingTaskId(null);
            setToast({ text: 'Task edited successfully!', type: 'success' });
        })
        .catch(error => setToast({ text: 'Error editing task!', type: 'error' }));
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

    const renderTasks = (todos: Todo[]): ReactElement => (
        <>
            <Table data={todos}>
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
    );

    return (
        <Page>
            <Text h1>Todo Liste</Text>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset marginBottom={"20px"} >
                    <Fieldset.Content style={{ paddingTop: '10pt', paddingBottom: '10pt' }}><Text h4>Task</Text></Fieldset.Content>
                    <Input placeholder="Task description (e.g., Shopping)" htmlType={"text"}{...formik.getFieldProps('description')} marginLeft={"13pt"} marginBottom={"10pt"} width={"50%"} clearable crossOrigin={undefined}>
                        Taskdescription
                        {formik.touched.description && formik.errors.description && (
                            <Dot type="warning" marginLeft={"10px"}><Text small><Code>{formik.errors.description}</Code></Text></Dot>
                        )}
                    </Input>
                    <Input placeholder="Date (e.g., 2021-01-01)" htmlType={"date"} {...formik.getFieldProps('date')} marginLeft={"13pt"} marginBottom={"10pt"} width={"50%"} crossOrigin={undefined}
                    >
                        Date
                        {formik.touched.date && formik.errors.date && (
                            <Dot type="warning" marginLeft={"10px"}><Text small><Code>{formik.errors.date}</Code></Text></Dot>
                        )}
                    </Input>
                    <Fieldset.Footer>
                        <Text small>A task description for the task to be done.</Text>
                        <Button auto scale={1 / 3} font="12px" htmlType={"submit"} placeholder={undefined}>Send</Button>
                    </Fieldset.Footer>
                </Fieldset>
            </form>
            {renderTasks(todos)}
        </Page>
    );
};

export default App;
