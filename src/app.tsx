import { history } from '@umijs/max';
import { Button } from 'antd';

import { type CurrentUser, getCurrentUser, logout } from '@/services/auth';

import type { RunTimeLayoutConfig } from '@umijs/max';

export async function getInitialState(): Promise<{
  currentUser: CurrentUser | null;
}> {
  try {
    const result = await getCurrentUser();
    return { currentUser: result.user || null };
  } catch {
    return { currentUser: null };
  }
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => ({
  logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
  menu: { locale: false },
  onPageChange: () => {
    if (
      !initialState?.currentUser &&
      !['/login', '/register'].includes(history.location.pathname)
    ) {
      history.replace('/login');
    }
  },
  actionsRender: () =>
    initialState?.currentUser
      ? [
          <span key="user">{initialState.currentUser.name}</span>,
          <Button
            key="logout"
            type="link"
            onClick={async () => {
              try {
                await logout();
                await setInitialState({ currentUser: null });
                history.replace('/login');
              } catch {
                // Keep the current session visible if the server cannot end it.
              }
            }}
          >
            退出登录
          </Button>,
        ]
      : [],
});
