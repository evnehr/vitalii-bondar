import {types} from "./types";
import React from "react";
import {Action, RootState} from "../interfaces";

export const ContextApp = React.createContext<any>(null);

export const initialState: RootState = {
    tasks: [],
    isFetching: false,
    filter: ''
};

export const reducer = (state: RootState = initialState, action: Action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case types.STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case types.FILL_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case types.CHANGE_TASK_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
};

