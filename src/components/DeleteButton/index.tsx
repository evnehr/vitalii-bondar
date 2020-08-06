import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";

interface DeleteButtonProps {
  onClick: ()=>void;
  className: string
}

const DeleteButton = (props: DeleteButtonProps) => {

  return (
    <Box className={props.className} p={0.5} pl={0}>
      <IconButton size={'small'} {...props}>
        <DeleteForever />
      </IconButton>
    </Box>
  );
};

export default DeleteButton;