import React, {useContext} from 'react';
import {Box} from "@material-ui/core";
import {ITask} from "../../interfaces";
import Task from "../Task";
import {filterTasksByMessage} from "../../instruments/helpers";
import {ContextApp} from "../../state/reducer";

interface TodoListProps {
    tasks: ITask[],
}

const TaskList = ({tasks}: TodoListProps) => {
    const {state} = useContext(ContextApp)

    return (
        <Box display={'flex'} flexDirection={'column'} minHeight={300}>
            {tasks.length && filterTasksByMessage(tasks, state.filter)
                .map(task => <Task key={task.id} {...task}/>)}
        </Box>
    );
};

export default TaskList;