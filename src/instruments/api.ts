import {ITask} from "../interfaces";

const baseUrl = 'https://react-test-api.herokuapp.com/api';

export const api = {
    create: async (task: ITask) => {
        try {
            const response = await fetch(`${baseUrl}/todos/`, {
                method: 'POST',
                body: JSON.stringify({...task}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            return response.json()
        } catch (e) {
            console.log(e);
        }
    },
    get: async () => {
        try {
            const response = await fetch(`${baseUrl}/todos/`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            return response.json()
        } catch (e) {
            console.log(e);
        }
    },
    update: async ({id, ...task}:ITask ) => {
        try {
            await fetch(`${baseUrl}/todos/${id}/`, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    delete: async (id:number) => {
        try {
            await fetch(`${baseUrl}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
};