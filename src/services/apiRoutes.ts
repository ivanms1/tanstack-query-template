export const API_ROUTES = {
  todos: {
    list: "/todos",
    detail: "/todos/:id",
    create: "/todos",
    update: "/todos/:id",
    delete: "/todos/:id",
  },
} as const;
