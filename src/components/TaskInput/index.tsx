import React from 'react';
import {Box, TextField} from "@material-ui/core";

interface TaskInputProps {

}

const TaskInput = (props: TaskInputProps ) => {

  return (
    <Box mb={2}>
      <TextField
        fullWidth
        variant={"outlined"}
        label={"Add todo"}
        name={'text'}
      />
    </Box>
  );
};

export default TaskInput;