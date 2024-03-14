import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, FormText } from 'react-bootstrap';
import { useMutation } from 'react-query';
import './style.css';

interface TaskData {
    title: string;
    description: string;
    assignee: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
}

const initialValues: TaskData = {
    title: '',
    description: '',
    assignee: '',
    dueDate: new Date(),
    priority: 'low',
};

const TaskForm: React.FC = () => {
    const [task, setTask] = useState(initialValues);

    const { mutateAsync: submitTask, isLoading, error } = useMutation(
        async (taskData: TaskData) => {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit task');
                }

                return response.json();
            } catch (error) {
                console.error('Error submitting task:', error);
            }
        },
        {
            onSuccess: () => {
                console.log('Task submitted successfully!');
                setTask(initialValues);
            },
            onError: (error: any) => {
                console.error('Error submitting task:', error);
            },
        }
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'dueDate') {
            const newDueDate = new Date(event.target.value);
            setTask({ ...task, dueDate: newDueDate });
        } else {
            setTask({ ...task, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setTask(initialValues);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    return (
        <div className="task-form" >
            <h1>Task Form</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={task.title} onChange={handleChange} required />
                </FormGroup>
                <FormGroup controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" value={task.description} onChange={handleChange} required />
                </FormGroup>
                <FormGroup controlId="formAssignee">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Control type="text" name="assignee" value={task.assignee} onChange={handleChange} required />
                </FormGroup>
                <FormGroup controlId="formPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Check inline label="Low" type="radio" id="low" name="priority" value="low" checked={task.priority === 'low'} onChange={handleChange} />
                    <Form.Check inline label="Medium" type="radio" id="medium" name="priority" value="medium" checked={task.priority === 'medium'} onChange={handleChange} />
                    <Form.Check inline label="High" type="radio" id="high" name="priority" value="high" checked={task.priority === 'high'} onChange={handleChange} />
                </FormGroup>
                <FormGroup controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" name="dueDate" value={task.dueDate.toISOString().split('T')[0]} onChange={handleChange} required />
                </FormGroup>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
            <Alert variant="success" show={showSuccessMessage} onClose={() => setShowSuccessMessage(false)}>
                Task submitted successfully!
            </Alert>
        </div >
    );
};

export default TaskForm;
