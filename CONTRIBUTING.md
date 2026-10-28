# 项目开发规范

本文适用于所有项目贡献者。AI 协作还需遵循 [AGENTS.md](./AGENTS.md)。

## 环境与常用命令

项目使用 pnpm、React、TypeScript、Umi Max、Ant Design 和 Ant Design Pro Components。使用项目的 `pnpm-lock.yaml` 安装依赖；项目目前未指定 Node.js 或 pnpm 版本，使用前请确认环境与已安装依赖兼容。

```bash
pnpm install       # 安装依赖；postinstall 会执行 max setup
pnpm dev           # 开发者自行启动开发服务
pnpm setup         # 生成 Umi 所需文件
pnpm lint          # ESLint 和 Stylelint 检查
pnpm lint:fix      # 自动修复可修复的代码和样式问题
pnpm typecheck     # TypeScript 类型检查
pnpm format:check  # Prettier 格式检查
pnpm format        # 格式化项目文件
pnpm build         # 生产构建
```

`pnpm format` 和 `pnpm lint:fix` 会修改文件，执行前注意工作区中的已有改动。项目使用 Husky 和 lint-staged，提交时对暂存文件执行相应检查和格式化；提交钩子不能代替完整验证。

依赖由用户自行安装。需要新增、更新或安装依赖时，AI 不得执行安装命令或通过其他命令自动安装依赖；应提供具体的 pnpm 命令，默认请求最新版本，并说明依赖用途及兼容性要求。版本选择需遵循用户明确指定的版本和项目兼容性约束；安装完成后再继续依赖该安装的工作。

## 目录结构与文件放置

当前项目的主要目录和入口如下：

```text
config/              # Umi 配置、路由、代理和主题
mock/                # 开发环境的模拟接口
src/
  pages/             # 页面及其专属组件、Hook 和样式
  services/          # 接口请求与相关类型
  models/            # 跨页面共享的 Umi Model
  constants/         # 跨功能复用的常量
  utils/             # 跨功能复用的工具函数
  access.ts          # 前端权限规则
  app.tsx            # Umi 运行时配置
```

- 页面以功能目录组织，遵循现有 `src/pages/功能名/index.tsx` 和 `index.less` 约定；页面独有的组件、Hook、类型与测试优先放在该页面目录内。
- 页面自定义 Hook 按职责拆分，文件名以 `use` 开头，例如页面目录下的 `hooks/usePageState.ts`；不要为单个页面的逻辑提前创建全局目录。
- 跨页面复用的公共组件按需放入 `src/components/组件名/`，组件入口使用 `.tsx`；跨功能复用的 Hook 按需放入 `src/hooks/`。这些目录在需要时创建，不必提前建立空目录。
- `services/` 按业务划分接口模块；`models/` 只放跨页面共享状态。只在单一页面使用的状态和逻辑保留在页面范围内。
- `constants/` 和 `utils/` 只放确有跨功能复用价值的内容；业务专属常量、类型和工具放在所属功能目录，避免把共享目录变成杂物目录。
- `mock/` 仅用于开发演示，不能作为生产认证或授权的实现；公共组件改动评估文档放在 `docs/`。
- 测试文件的具体位置和命名以项目实际测试配置为准。建立测试配置时，应同时明确单元、组件和 Playwright 测试的目录约定。

## 代码与目录约定

- 界面优先使用 `antd` 和 `@ant-design/pro-components`，保持主题、交互和无障碍体验一致。公共组件统一使用 TypeScript 和 `.tsx`，禁止使用 `.js` 或 `.jsx`。
- 页面 UI 与逻辑分离：UI 组件尽量只负责渲染和组合，通过 props 接收数据与回调；页面的数据获取、状态管理和交互处理放在独立自定义 Hook 中，优先与页面代码放在一起。
- 调整公共组件前，先将改动点、调用方、兼容性和潜在影响写入 `docs/` 下与任务对应的评估文档，再实施修改。
- Umi 的运行时 API 和能力统一从 `@umijs/max` 使用，不直接从 `umi` 或其他独立 Umi 包导入；使用项目配置的 `max` 命令。所需能力无法通过 `@umijs/max` 提供时，说明原因并按任务要求处理。
- 接口调用放在 `src/services/`，路由放在 `config/routes.ts`，权限规则集中在 `src/access.ts`。页面专属逻辑优先与页面放在一起；前端权限不能代替服务端授权。
- 字段和数据校验优先使用 `zod`，结合已有表单方案复用校验规则与错误信息。
- 防抖、节流等通用能力优先使用项目已有依赖，禁止自行实现已有的同类功能：React 场景优先使用 `ahooks` 对应 Hook，普通 TypeScript 工具函数优先使用 `es-toolkit`。使用前核对实际版本的 API、行为和清理方式；其他通用需求也先检查已有依赖，确无适用能力时说明原因再处理。
- 遵循项目 ESLint、Stylelint、Prettier 和 TypeScript 配置，不使用显式 `any` 或关闭检查来掩盖问题。复用现有技术栈，不无故引入同类依赖。

## 测试与验证

- 新增功能或修复缺陷时，先编写覆盖预期行为或复现缺陷的测试，运行并确认测试因目标行为尚未实现而失败，再编写实现并验证通过。
- 测试优先覆盖用户可观察的行为、边界和错误处理，根据风险选择单元、组件集成或端到端测试。涉及 UI 调整时，编写 Playwright 测试覆盖受影响的页面或交互，并根据改动验证必要的响应式布局和无障碍体验。
- 项目已安装 Jest、Testing Library 和 Playwright，但目前没有配置测试脚本或测试运行配置。首次需要自动化测试时，先基于已有依赖建立最小可运行配置。纯文档等不涉及可测试行为的改动可使用适当检查替代新增测试；无法先运行失败测试时，说明障碍和替代验证方式。
- 根据改动执行相关测试、`pnpm lint`、`pnpm typecheck` 和 `pnpm format:check`；涉及构建或配置时还应执行 `pnpm build`。首次类型检查如缺少生成文件，先执行 `pnpm setup`。
- 完成代码后逐项对照原始需求，复核功能、约束、边界情况和验证结果；发现遗漏时继续修正并验证。

## 提交前

- 检查变更范围，不覆盖他人的未提交改动，不提交无关变更、生成文件或敏感信息。
- 确认适用的测试和检查已通过；交付时说明实际运行的检查、失败或未执行的原因，以及剩余问题。
