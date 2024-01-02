import React, {useState} from 'react';
import {Button, Code, Dot, Fieldset, Input, Page, Text, useToasts} from '@geist-ui/core';
import axios, {AxiosResponse} from 'axios';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import TasksTable from "./component/Table/Table";

interface Todo {
    id: number;
    description: string;
    date: string | Date;
}

const App: React.FC = () => {
    const [, setTodos]: [Todo[], (value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void] = useState<Todo[]>([]);
    const { setToast } = useToasts();

    const validationSchema: Yup.Schema = Yup.object({
        description: Yup.string().required('Please enter a task description!').min(3, 'Task description must be at least 3 characters!').max(255, 'Task description must be at most 255 characters!'),
        date: Yup.date().required('Please enter a date!'),
    });

    const formik= useFormik({
        initialValues: {
            description: "",
            date: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: {
            description: string;
            date: Date | string;
        }): Promise<void> => {
            await axios.post(`${window.API_URL}/task/add`, {
                description: values.description,
                date: values.date
            }).then((response: AxiosResponse<any>): void => {
                if (response.status === 200) {
                    setTodos(response.data);
                    setToast({ text: 'Task added successfully!', type: 'success' });
                } else {
                    throw new Error();
                }
            }).catch((error) => setToast({ text: 'Error adding task!', type: 'error' }));
            formik.resetForm();
        },
    });

    return (
        <Page>
            <Text h1>Todolist</Text>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset marginBottom={"20px"} >
                    <Fieldset.Content style={{ paddingTop: '10pt', paddingBottom: '10pt' }}><Text h4>Task</Text></Fieldset.Content>
                    <Input placeholder="Task (e.g., Shopping)" htmlType={"text"}{...formik.getFieldProps('description')} marginLeft={"13pt"} marginBottom={"10pt"} width={"50%"} clearable crossOrigin={undefined}>
                        Description
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
            <TasksTable/>
        </Page>
    );
};

export default App;
