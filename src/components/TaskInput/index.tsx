import React, {useContext, useEffect, useState} from 'react';
import {Box, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import IconButton from "@material-ui/core/IconButton";
import {api} from '../../instruments/api';
import {ContextApp} from "../../state/reducer";
import {actions} from "../../state/actions";

interface TaskInputProps {

}

const TaskInput = (props: TaskInputProps) => {
    const {dispatch} = useContext(ContextApp);
    const [newTaskBody, setNewTaskBody] = useState('')
    const [keyboardKey, setKeyboardKey] = useState(null)

    useEffect(() => {
        const onKeydown = (e: any): void => {
            setKeyboardKey(e.key)
        };
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, []);

    const onChangeInput = (e: any): void => {
        setNewTaskBody(e.currentTarget.value)
        if (keyboardKey === 'Enter') {
            addTask()

        }
    }

    const addTask = (): void => {
        let date = new Date()
        const newTask = {
            created: date.getDate(),
            starred: false,
            completed: false,
            id: 1,
            text: newTaskBody
        }
        if (newTaskBody) {
            dispatch(actions.startFetching());
            api.create(newTask).then((response) => {
                setNewTaskBody('')
                api.get().then((response) => {
                    dispatch(actions.fillTasks(response.results));
                }).then(() => {
                    dispatch(actions.stopFetching());
                })
            })
        }
    }

    return (
        <Box mb={2}>
            <TextField
                fullWidth
                label="Add todo"
                value={newTaskBody}
                multiline
                rowsMax={4}
                variant="outlined"
                onChange={onChangeInput}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={addTask}>
                                <AddToPhotosIcon color="action"/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}/>
        </Box>
    );
};

export default TaskInput;