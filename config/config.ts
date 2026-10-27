import { defineConfig } from '@umijs/max';

import routes from './routes';

export default defineConfig({
  title: 'Ant Design Pro 管理系统模版',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [...routes],
  npmClient: 'pnpm',
  utoopack: {
    reactCompiler: {
      compilationMode: 'infer',
      target: '19',
    },
  },
  history: {
    type: 'browser',
  },
  hash: true,
  manifest: {},
});
