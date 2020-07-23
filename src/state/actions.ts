import {ITask} from "../interfaces";
import {types} from "./types";

export const actions = {
  fillTasks: (tasks: ITask[])=>{
    return {
      type: types.FILL_TASKS,
      payload: tasks
    }
  },
  startFetching: ()=>{
    return {
      type: types.START_FETCHING,
    }
  },
  stopFetching: ()=>{
    return {
      type: types.STOP_FETCHING,
    }
  }
};