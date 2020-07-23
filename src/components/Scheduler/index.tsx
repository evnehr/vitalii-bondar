import React, {useContext, useEffect} from 'react';
import {Box, Paper, Typography} from "@material-ui/core";
import TaskInput from "../TaskInput";
import TaskList from "../TodoList";
import {ContextApp} from "../../state/reducer";
import {api} from "../../instruments/api";
import {actions} from "../../state/actions";
import Search from "../Search";
import CheckboxButton from "../CheckboxButton";
import Spinner from "../Spinner";

const Scheduler = () => {
  const {state, dispatch} = useContext(ContextApp);

  useEffect(()=>{
    dispatch(actions.startFetching());
    api.get().then((response)=>{
      dispatch(actions.fillTasks(response.results));
      dispatch(actions.stopFetching());
    })
  },[dispatch]);

  return (
    <Box p={4} mt={8}>
      <Paper>
        <Box p={2}>
          <Box
            pb={2}
            display={'flex'}
            justifyContent={'space-between'}>
            <Typography variant={"h4"}>
              {'Scheduler'}
            </Typography>
            <Box display={'flex'} alignItems={'center'}>
              {state.isFetching && <Spinner />}
              <Search />
            </Box>
          </Box>
          <TaskInput />
          <TaskList
            tasks={state.tasks}
            />
        </Box>
        <Box
          p={2}
          display={'flex'}
          alignItems={'center'}>
          <CheckboxButton />
          <Box ml={1}>
            <Typography>{'Complete all'}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Scheduler;