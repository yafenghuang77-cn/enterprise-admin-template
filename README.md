# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## 前端代码规范

项目以阿里公开的 `eslint-config-ali` React 配置、`stylelint-config-ali` 和 `prettier-config-ali` 为基础，结合 Umi 项目规则和 React Hooks 检查，维护 JS、JSX、TS、TSX 与 CSS/Less 代码。ESLint 负责导入排序，Prettier 负责格式化；通过 `eslint-config-prettier` 关闭冲突的格式规则。项目另保留严格类型导入、禁止 `any`、Hooks 依赖检查和导入分组等约定。

导入分组依次为副作用导入、React 和 React DOM、第三方包、`@/` 别名、相对路径和样式导入；组内按名称排序。禁止显式使用 `any`，并统一类型导入和接口写法。

- `pnpm lint`：检查代码与样式。
- `pnpm lint:fix`：自动修复可修复的问题。
- `pnpm typecheck`：检查 TypeScript 类型（首次运行需先执行 `pnpm setup`）。
- `pnpm format:check`：检查格式；`pnpm format` 自动格式化。

提交时 lint-staged 会检查和格式化暂存文件。产物、生成代码和 lockfile 不参与格式检查。
