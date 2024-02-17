import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { todosQueries, createTodo, deleteTodo, updateTodo } from "./request";

import type { Todo } from "@models/todos";
import type { DefaultQueryKeyWithoutData } from "@interfaces/query";

export const useCreateTodo = (
  options: MutateOptions<
    Todo,
    AxiosError<Error>,
    Todo,
    DefaultQueryKeyWithoutData | undefined
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todosQueries.list._def,
      });
      options.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateTodo = (
  onSuccess?: (
    data: Todo,
    variables: { todoId: string; data: Todo },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Todo,
    AxiosError<Error>,
    { todoId: string; data: Todo }
  >({
    mutationFn: ({ todoId, data }) => updateTodo(todoId, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todosQueries.list._def,
      });
      onSuccess?.(data, variables, context);
    },
    onError,
  });

  return mutation;
};

export const useDeleteTodo = (
  onSuccess?: (
    data: boolean,
    variables: { todoId: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<boolean, AxiosError<Error>, { todoId: string }>({
    mutationFn: ({ todoId }) => deleteTodo(todoId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todosQueries.list._def,
      });
      onSuccess?.(data, variables, context);
    },
    onError,
  });

  return mutation;
};
