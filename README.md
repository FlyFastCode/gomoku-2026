# OSQuestTemplate - React 基础框架

基于 React + TypeScript + Vite 的现代前端基础框架，符合 CI/CD 流水线标准。

## 技术栈

- **React 18** - 渐进式 UI 库
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Vitest** - 原生支持 Vite 的单元测试框架
- **ESLint** - 代码质量检查（含 JSDoc 规范）

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动本地开发服务器，访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

输出目录：`dist/`

### 预览生产构建

```bash
npm run preview
```

## 可用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | ESLint 代码规范检查 |
| `npm run test` | 运行单元测试 |
| `npm run test:watch` | 监听模式运行测试 |

## 项目结构

```
OSQuestTemplate/
├── __tests__/           # 测试文件目录
│   └── App.test.tsx
├── src/                 # 源代码目录
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 应用入口
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
├── vitest.config.ts     # Vitest 测试配置
└── .eslintrc.cjs        # ESLint 配置
```

## CI/CD 集成

本项目已配置符合 GitHub Actions CI 流水线的标准：

- ✅ 文档验证（README.md + JSDoc 注释）
- ✅ 静态代码检查（ESLint + JSDoc 规范）
- ✅ 安全漏洞扫描（npm audit）
- ✅ 圈复杂度检查（max complexity: 10）
- ✅ 单元测试执行

## 代码规范

### JSDoc 注释要求

```typescript
/**
 * 组件/函数描述
 * @param paramName - 参数说明
 * @returns 返回值说明
 */
```

ESLint 配置包含以下 JSDoc 规则：
- `jsdoc/check-access` - 检查 @access 标签
- `jsdoc/check-alignment` - 检查注释对齐
- `jsdoc/require-jsdoc` - 要求函数/类声明有文档

## License

MIT
