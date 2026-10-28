# 项目开发规范

本文件适用于整个项目。开发任务同时遵循 [CONTRIBUTING.md](./CONTRIBUTING.md) 中的项目规范；根据任务阅读相关代码和配置，保留工作区中的已有改动。子目录中的具体规范同时适用。

## Skill 清单

执行相关任务前，从当前会话的 skill 清单中按名称查找并读取对应的 `SKILL.md`，根据项目实际版本和任务范围应用。路径以当前环境提供的清单为准；找不到时先搜索，再说明限制。

| Skill | 使用场景 |
| --- | --- |
| `antd` | Ant Design 组件、样式、主题、API 和问题排查 |
| `umi-max`（`umi-max-enterprise`） | Umi Max 的路由、请求、Model、权限、布局和 Pro Components |
| `react-patterns` | React 组件、Hooks、状态和测试设计 |
| `react-best-practices`（React 架构实践） | React 组件组合、状态归属、Hooks 和数据边界 |
| `vercel-react-best-practices` | React 性能、数据请求和渲染 |
| `vercel-composition-patterns` | 可复用组件 API 和组合模式 |
| `react-doctor` | React 改动后的诊断；运行 CLI 时使用 `--no-telemetry` |
| `ui-ux-pro-max` | 按需用于 UI 交互、布局、响应式和无障碍设计 |

React 工作结合任务使用相关 React skills，涉及 Umi Max 或 Ant Design 时同时使用对应 skill。字段校验需检查实际安装的 Zod 版本和已有用法，必要时核对官方文档。

## MCP 清单与使用

优先使用当前环境中与任务相关的 MCP。Ant Design 开发同时遵循 `antd` skill：先检查项目实际安装的版本，再查询适用版本的 API、示例及需要的样式和 Token，不凭记忆猜测 API。

| MCP 工具                       | 用途                    |
| ------------------------------ | ----------------------- |
| `antd_list`                    | 查找组件                |
| `antd_info`、`antd_doc`        | 查询组件 API 和文档     |
| `antd_demo`                    | 查询示例                |
| `antd_semantic`                | 查询语义化样式结构      |
| `antd_token`、`antd_design_md` | 查询 Token 和设计规范   |
| `antd_changelog`               | 查询版本变更和 API 差异 |

工具名称可能带有环境前缀。先核实 MCP 资料的目标版本；无法确认版本、版本不匹配或 MCP 不可用时，使用 Ant Design CLI 并传入 `--version <实际版本> --format json`，必要时查阅对应版本官方文档。Pro Components 专有 API 查阅其自身官方资料。修改 antd 代码后对改动文件运行 `antd lint`；工具不可用时说明原因及替代验证。

## AI 工作边界

- 禁止自行安装、新增或更新依赖，包括通过其他命令触发自动安装；按照 `CONTRIBUTING.md` 提供具体命令，由用户执行后再继续相关工作。
- AI 工具禁止自行启动项目或依赖服务，包括通过测试配置自动启动；需要访问运行中的服务时，使用用户自行启动的服务。若服务未启动或地址未知，向用户确认，不能自行启动。
