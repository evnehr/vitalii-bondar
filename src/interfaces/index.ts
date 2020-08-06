export interface ITask {
    id: number,
    text: string,
    completed: boolean,
    starred: boolean,
    created: number,
}

export interface RootState {
    tasks: ITask[]
    isFetching: boolean,
    filter: string
}

export interface Action {
    type: string
    payload: any
    meta?: unknown
    task?: ITask,
    filter?: string
}