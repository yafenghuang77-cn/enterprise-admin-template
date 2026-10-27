import { request } from '@umijs/max';

export interface CurrentUser {
  name: string;
  email: string;
}

interface AuthResult {
  success: boolean;
  errorMessage?: string;
  user?: CurrentUser | null;
}

interface Credentials {
  email: string;
  password: string;
}

export function login(data: Credentials) {
  return request<AuthResult>('/api/auth/login', {
    method: 'POST',
    data,
    skipErrorHandler: true,
  });
}
export function register(data: Credentials & { name: string }) {
  return request<AuthResult>('/api/auth/register', {
    method: 'POST',
    data,
    skipErrorHandler: true,
  });
}
export function getCurrentUser() {
  return request<AuthResult>('/api/auth/current', { skipErrorHandler: true });
}
export function logout() {
  return request<AuthResult>('/api/auth/logout', {
    method: 'POST',
    skipErrorHandler: true,
  });
}
