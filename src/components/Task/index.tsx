import React, {useContext, useEffect, useState} from 'react';
import {Card, makeStyles, Typography, InputBase} from '@material-ui/core';
import CheckboxButton from '../CheckboxButton';
import StarButton from '../StarButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';
import {api} from '../../instruments/api';
import {actions} from "../../state/actions";
import {ContextApp} from "../../state/reducer";
import {ITask} from "../../interfaces";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        boxShadow: '0 0 4px black'
    },
    removeBtn: {
        marginLeft: 'auto'
    },
    input: {
        padding: '0 10px',
        width: '100%',
        background: 'lightgray'
    }
}))

const Task = ({id, text, completed, starred, created}: ITask) => {
    const classes = useStyles()

    const {dispatch} = useContext(ContextApp);

    const [isEdit, setIsEdit] = useState(false)
    const [newTaskBody, setNewTaskBody] = useState('')

    useEffect(() => {
        setNewTaskBody(text)
    }, [text])

    const removeTask = (id: number) => {
        api.delete(id).then(() => {
            api.get().then((response) => {
                dispatch(actions.fillTasks(response.results))
            })
        })
    }

    const onChangeInput = (e: any): void => {
        setNewTaskBody(e.currentTarget.value)
    }

    const onKeyPressInput = (e:any):void =>{
        if(e.key === 'Enter'){
            changeTaskBody();
        }
    }

    const onBlurInput = (): void => {
        if (newTaskBody === text) {
            setIsEdit(false)
        } else {
            changeTaskBody()
        }
    }

    const changeTaskBody = (): void => {

        if (isEdit && newTaskBody !== text) {
            const task = {
                id,
                text: newTaskBody,
                completed, starred, created
            }
            api.update(task).then(() => {
                api.get().then((response) => {
                    dispatch(actions.fillTasks(response.results))
                    setIsEdit(false)
                })
            })
        } else {
            setIsEdit(true)
        }

    }

    const getTasks = (task: ITask): void => {
        api.update(task).then(() => {
            api.get().then((response) => {
                dispatch(actions.fillTasks(response.results))
                setIsEdit(false)
            })
        })
    }

    const toggleTaskCheck = (): void => {
        const task = {
            completed: !completed,
            id, text, starred, created
        }
        getTasks(task)
    }

    const toggleTaskStar = (): void => {
        const task = {
            starred: !starred,
            id, text, completed, created
        }
        getTasks(task)
    }

    return (
        <Card className={classes.root}>
            <CheckboxButton
                checked={completed}
                onClick={toggleTaskCheck}
            />
            <StarButton
                checked={starred}
                onClick={toggleTaskStar}/>
            <EditButton onClick={changeTaskBody}/>
            {!isEdit && <Typography>{text}</Typography>}
            {isEdit && <InputBase
                value={newTaskBody}
                inputProps={{"aria-label": "naked"}}
                autoFocus
                onFocus={(e: any): void => {
                    e.target.select()
                }}
                onKeyPress={onKeyPressInput}
                className={classes.input}
                onBlur={onBlurInput}
                onChange={onChangeInput}
            />}
            <DeleteButton
                className={classes.removeBtn}
                onClick={() => {
                    removeTask(id)
                }}/>
        </Card>
    );
};

export default Task;