# Bento CV 功能迭代计划

本项目是基于 Next.js + Sanity 的 Bento 风格个人主页，计划接入以下功能：

## Proposed Changes

### 1. 后台编辑功能 (Sanity CMS)
- 完善 Sanity Schema 定义，使得所有内容（关于我、技能、项目经历等）可配置。
- 修改前端的静态数据引用，全部替换为通过 `next-sanity` 的 GROQ 查询。

### 2. 头像替换为动画风格
- 在 `aboutMe` 的 Schema 中添加 `avatar` (type: `image`)。
- 前端使用 `next/image` 或 `@sanity/image-url` 来渲染。

### 3. 心情模块 -> 求职状态
- 将当前的心情组件逻辑改为读取 Sanity 中配置的求职状态描述（如："已离职-随时到岗"）。
- 附带一个状态指示灯（如常亮的绿色呼吸灯表示 Available）。

### 4. 简历 PDF 上传与下载格子
- 在 Sanity 中增加 `file` 类型的字段直接上传 PDF 原文件。
- 增加一个新的 Bento Grid Block 用于提供 PDF 简历的直接下载。
- **UI 适配要求：**该功能及所有的后续模块均要求完美适配现有的响应式 (移动端) 布局。

### 5. 中英双语 (i18n)
- 采用数据驱动的多语言方案：将 Sanity 中的文本字段改为 `{ zh: string, en: string }` 对象格式。
- 前端提供一个 Language Switcher，通过 Zustand/Context 状态切换，避免处理深层路由。

### 6. 三套主题切换 (Theming)
- 安装 `next-themes`。
- 修改 `globals.css` 中 Tailwind 的色彩变量：
  - `light` (默认黑白主题):
    - 统一背景 (`--background`, `--bento-bg`, `--panel-bg`): `#ffffff`纯白
    - 文字 (`--foreground`, `--heading-color`): `#000000`纯黑
    - 按钮与框线 (`--btn-bg`, `--bento-line`): `#000000`纯黑
    - 按钮文字 (`--btn-text`): `#ffffff`纯白
    - 状态灯 (`--status-light`): `#22c55e`绿色
  - `fluorescent` (荧光绿主题):
    - 统一背景 (`--background`, `--bento-bg`, `--panel-bg`): `#FAFBF7`淡绿色
    - 文字 (`--foreground`, `--heading-color`): `#000000`纯黑
    - 按钮与状态灯高亮 (`--btn-bg`, `--status-light`): `#DFFF5C`荧光绿
    - 按钮文字 (`--btn-text`): `#000000`纯黑
    - 边框线 (`--bento-line`): `#000000`纯黑
  - `dark` (深色主题):
    - 网页外围深背景 (`--background`): `#111827`深墨色
    - 内容网格与板块背景 (`--bento-bg`, `--panel-bg`): `#1f2937`深灰黑色
    - 文字 (`--foreground`, `--heading-color`): `#f3f4f6`灰白色
    - 按钮、边框线与状态灯 (`--btn-bg`, `--bento-line`, `--border`, `--status-light`): `#FACC15`亮黄色
    - 按钮文字 (`--btn-text`): `#000000`纯黑
- 增加一个能够在这三个主题之间切换的 Toggle。

### 7. AI 网站管家 (桌面宠物交互)
- 增加浮动组件：使用自定义图片代替图标，支持手机端显示及操作。
- 引导气泡：进入页面时，化身处自动弹出气泡，引导用户（HR）提问。
- 专属知识库：在 Sanity 中配置常见的私人问题解答（MBTI、离职原因、Gap 期原因等），作为 AI 的私密知识库（非主页公开内容）。
- 接入 `/api/chat` 并把公开数据与隐藏的知识库组装为 System prompt，结合大模型实现对答。

## Verification Plan
1. Sanity Studio 能够正常启动并显示所有新增 Schema，包含 `faqs` 知识库和 `resume` 源文件配置。
2. 网页能根据 Sanity 数据动态渲染（头像、求职状态、PDF 链接）。
3. 移动端和 PC端 的排版均不随新增模块而乱版，确保响应式体验良好。
4. 主题切换器能平滑切换默认/荧光绿/暗黑三套样式。
5. 语言切换器能实时生效。
6. AI 管家能够主动弹出气泡，并根据 Sanity 中配置的隐含知识库（如离职原因等）正确回答限制范围内的提问。

## Architectural Learnings & Bug Fixes 🛠️

在这个迭代过程中，我们遇到并攻克了多个特定技术栈的疑难杂症，特此记录以防未来的调整再次踩坑：

### 1. Tailwind v4 与 自定义 CSS Variables
- **问题**：在 `globals.css` 中增加新的颜色变量后，Tailwind 编译报错 `Cannot apply unknown utility class`（例如 `bg-bento-bg` 或 `border-border`）。
- **原因与解法**：`Tailwind v4` 改变了底层逻辑，不再自动将所有的 `:root` CSS 变量映射为工具类。必须在 `globals.css` 最顶部的 `@theme inline { ... }` 块中，手动指明映射关系（如 `--color-bento-bg: var(--bento-bg);`）。

### 2. next-themes 的自定义主题丢失
- **问题**：增加了 `fluorescent` 荧光主题后，只剩下两个主题，或者原有的 `light` 主题彻底丢失。
- **原因与解法**：当使用 `next-themes` 的 `<ThemeProvider>` 时，如果开启了自定义类名但没有显式声明所有可用的数组，它会自动裁剪掉不标准的名称。必须在 `app/layout.tsx` 中显式书写全量数组：`themes={['light', 'dark', 'fluorescent']}`，并关闭 `enableSystem` 干扰。

### 3. 主题样式的“白边/碎裂”与 Turbopack HMR 缓存陷阱
- **问题**：移动端拉伸时出现白边框，以及修改了 `.fluorescent` 的 CSS 变量拉齐背景颜色后，某些组件依然顽固地渲染白底。
- **原因与解法**：
  1. 移动端 (`MobileLayout`) 的最外层容器 `dvh` **必须**通过 `bg-background text-foreground` 焊死，强制接管安全区以外的留白。
  2. Next.js 提供热更新的 `Turbopack` 极度容易**死锁修改过的 CSS Variable 类名**。遇到 CSS 缓存刷新不掉时，可以通过在 React TypeScript 文件 (.tsx) 里直接替换类名（如将有 Bug 缓存的 `bg-bento-bg` 换成逻辑通用的 `bg-panel-bg`）来利用 React HMR 强制绕过，实现立竿见影的样式纠偏。

### 4. Resizable Panels 边框宽度与子节点脱拽失效
- **问题**：拉拽线变得非常细甚至不可拉动，并且拉拽时子 Grid 内容不跟着 Resize。
- **原因与解法**：鼠标拖拽区域太细无法精确判定。需要给 `.resizer` 的 Wrapper 增加隐形的 `padding` (例如 `px-2`) 来扩充 Hitbox（命中判定区）。而由于内部 `border-l` 或者 `border-t` 等 CSS 线条是由 `hooks/useResizablePanels.ts` 强控制的，因此内容必须通过绝对尺寸或者明确继承百分比进行 Flex 填充。
