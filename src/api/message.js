import { client } from "../utils/fetchClient";

export const getTodos = () => {
	return client.get('./message.json');
};

export const createTodo = (todo) => {
	return client.post("/todos", todo);
};
