import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getRoute } from "@utils/route";
import { serviceFetch } from "@utils/service";

import { API_ROUTES } from "@services/apiRoutes";
import { QUERY_KEYS } from "@services/queryKeys";

import { Todo } from "@models/todos";

export type TodosResponse = {
  todos: Todo[];
  total_pages: number;
  total_count: number;
};

export const getTodos = (): Promise<TodosResponse> => {
  return serviceFetch({
    url: getRoute(API_ROUTES.todos.list),
    method: "GET",
  });
};

export const getTodo = (todoId: string): Promise<Todo> => {
  return serviceFetch({
    url: getRoute(API_ROUTES.todos.detail, { id: todoId }),
    method: "GET",
  });
};

export const createTodo = (data: Todo): Promise<Todo> => {
  return serviceFetch({
    url: getRoute(API_ROUTES.todos.create),
    method: "POST",
    data,
  });
};

export const updateTodo = (todoId: string, data: Todo): Promise<Todo> => {
  return serviceFetch({
    url: getRoute(API_ROUTES.todos.update, { id: todoId }),
    method: "PATCH",
    data,
  });
};

export const deleteTodo = (todoId: string): Promise<boolean> => {
  return serviceFetch({
    url: getRoute(API_ROUTES.todos.delete, { id: todoId }),
    method: "DELETE",
  });
};

export const todosQueries = createQueryKeys(QUERY_KEYS.TODOS, {
  list: () => ({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  }),
  detail: (todoId: string) => ({
    queryKey: ["todos", todoId],
    queryFn: () => getTodo(todoId),
  }),
});
