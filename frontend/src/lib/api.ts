import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function request<T>(
  path: string,
  options?: RequestInit & { body?: unknown }
): Promise<T> {
  const { body, ...init } = options ?? {};
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export const todoApi = {
  getAll: () => request<Todo[]>('/todos'),
  getOne: (id: number) => request<Todo>(`/todos/${id}`),
  create: (data: CreateTodoInput) =>
    request<Todo>('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: UpdateTodoInput) =>
    request<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/todos/${id}`, { method: 'DELETE' }),
};
