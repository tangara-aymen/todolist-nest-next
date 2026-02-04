'use client';

import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';
import { todoApi } from '@/lib/api';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTodos = async () => {
    try {
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || submitting) return;
    setSubmitting(true);
    try {
      const created = await todoApi.create({ title: t });
      setTodos((prev) => [created, ...prev]);
      setTitle('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add todo');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await todoApi.update(todo.id, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updated : t))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update todo');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete todo');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Todo List
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            todoapp-aymen · Next.js + NestJS + MySQL ✅✅✅ TEST
          </p>
        </header>

        <form onSubmit={handleAdd} className="mb-8 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            Add
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800">
            Loading…
          </div>
        ) : todos.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800">
            No todos yet. Add one above.
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(todo)}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition"
                  style={{
                    borderColor: todo.completed ? '#10b981' : '#cbd5e1',
                    backgroundColor: todo.completed ? '#10b981' : 'transparent',
                  }}
                  aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {todo.completed && (
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <span
                    className={
                      todo.completed
                        ? 'text-slate-400 line-through dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-100'
                    }
                  >
                    {todo.title}
                  </span>
                  {todo.description && (
                    <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                      {todo.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  aria-label="Delete"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
