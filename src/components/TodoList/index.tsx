import React from 'react';
import {Box} from "@material-ui/core";
import {ITask} from "../../interfaces";

interface TodoListProps {
  tasks: ITask[]
}

const TaskList = ({tasks}: TodoListProps) => {

  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={300}>
      <pre>
      {JSON.stringify(tasks, undefined, 4)}
      </pre>
    </Box>
  );
};

export default TaskList;