# UI 设计规范 v1.0

> **目标**：建立统一的 UI 设计语言，确保任何 AI 或设计师在遵守此规范的情况下，生成的用户界面保持一致、克制、专业。

> **定位**：这是一个**通用设计规范模板**。项目可以根据实际需求自定义颜色、字体等设计令牌（Design Tokens），但应保持交互模式和组件规范的一致性。

---

## 0. 设计哲学（Meta / Design Philosophy）

```yaml
philosophy:
  - clarity_over_density          # 清晰优于密集
  - consistency_over_creativity   # 一致优于创意
  - explicit_destructive_actions  # 明确的破坏性操作
  - one_primary_action_per_view   # 每个视图一个主要操作
  - predictable_interactions      # 可预测的交互
```

**核心原则**：
- **清晰性**：信息层级分明，用户一眼就能理解界面结构
- **一致性**：相同的交互在不同场景下保持相同的行为
- **安全性**：破坏性操作（如删除）必须有明确的确认步骤
- **专注性**：避免过多的主要操作，引导用户关注核心任务
- **可预测性**：交互结果符合用户预期，减少认知负担

---

## 1. 设计令牌（Design Tokens）

> 💡 **说明**：以下是设计令牌的参考值。项目应根据品牌调性自定义这些值，但必须保持令牌的结构和使用规范。

### 1.1 颜色系统（Color）

```yaml
color:
  # 主色系 - 品牌主色（示例：蓝色系）
  primary: "#3B82F6"              # 主色
  primaryHover: "#2563EB"         # 主色悬停态

  # 语义色 - 传达特定含义
  danger: "#EF4444"               # 危险/删除/错误
  success: "#10B981"              # 成功/完成
  warning: "#F59E0B"              # 警告/提示

  # 背景色 - 层级区分
  bg: "#FFFFFF"                   # 基础背景（白色）
  bgElevated: "#F9FAFB"           # 提升层级背景（浅灰）
  bgDisabled: "#F3F4F6"           # 禁用状态背景

  # 文本色 - 信息层级
  text: "#111827"                 # 主文本（深色）
  textSecondary: "#6B7280"        # 次要文本（中灰）
  textDisabled: "#9CA3AF"         # 禁用文本（浅灰）

  # 边框和分割线
  border: "#E5E7EB"               # 边框色
  divider: "#E5E7EB"              # 分割线色
```

**自定义指南**：
- **主色（primary）**：根据品牌色调整，建议使用中等饱和度、中等亮度的颜色
- **语义色**：保持红色=危险、绿色=成功、黄色=警告的通用认知
- **背景色**：建议使用白色或浅色系，避免深色背景（除非是暗黑模式）
- **文本色**：保持足够的对比度（WCAG AA 级别，对比度 ≥ 4.5:1）

### 1.2 字体系统（Typography）

```yaml
typography:
  # 字体族 - 使用系统默认或品牌字体
  fontFamily: "Inter, system-ui, -apple-system, sans-serif"

  # 字号 - 8px 递增，保持视觉韵律
  size:
    sm: 12px      # 辅助信息、标签
    base: 14px    # 正文、按钮
    lg: 16px      # 小标题
    xl: 18px      # 标题
    xxl: 20px     # 页面标题

  # 字重 - 区分信息层级
  weight:
    regular: 400  # 正文
    medium: 500   # 强调
    semibold: 600 # 标题

  # 行高 - 影响阅读舒适度
  lineHeight:
    tight: 1.3    # 标题
    normal: 1.5   # 正文
    loose: 1.7    # 长文本
```

**自定义指南**：
- **字体族**：可替换为项目字体（如思源黑体、苹方），但保持无衬线字体
- **字号**：保持 8px 递增规律（12/14/16/18/20），避免奇数字号
- **字重**：根据字体特性调整，但保持"正文 < 强调 < 标题"的层级

### 1.3 间距系统（Spacing）

```yaml
spacing:
  xs: 4px       # 最小间距（图标与文字）
  sm: 8px       # 小间距（按钮内边距）
  md: 16px      # 标准间距（组件间距）
  lg: 24px      # 大间距（模块间距）
  xl: 32px      # 超大间距（页面分区）
```

**使用原则**：
- 使用 4px 倍数（4/8/16/24/32）保持视觉韵律
- 优先使用 md（16px）作为默认间距
- 避免使用非标准间距（如 10px、15px）

### 1.4 圆角（Radius）

```yaml
radius:
  sm: 4px       # 小圆角（输入框、标签）
  md: 8px       # 中圆角（按钮、卡片）
  lg: 12px      # 大圆角（弹窗、面板）
```

**使用原则**：
- 圆角越大，视觉越柔和，但信息密度越低
- 建议使用 md（8px）作为默认圆角
- 避免混用多种圆角（一个页面最多 2 种圆角）

### 1.5 阴影（Shadow）

```yaml
shadow:
  sm: "0 1px 2px rgba(0,0,0,0.05)"      # 轻微阴影（卡片）
  md: "0 4px 6px rgba(0,0,0,0.08)"      # 中等阴影（下拉菜单）
  lg: "0 10px 15px rgba(0,0,0,0.10)"    # 较深阴影（弹窗）
```

**使用原则**：
- 阴影用于表达层级关系，不是装饰
- 避免过度使用阴影（一个页面最多 3 层阴影）
- 阴影方向统一向下（Y 轴正方向）

### 1.6 动效（Motion）

```yaml
motion:
  fast: "120ms ease-out"              # 快速动效（悬停、点击反馈）
  normal: "200ms ease-in-out"         # 标准动效（展开/收起）
  slow: "300ms ease-in-out"           # 慢速动效（页面切换）
```

**使用原则**：
- 动效用于引导注意力，不是炫技
- 优先使用 fast（120ms）和 normal（200ms）
- 避免过长的动效（> 300ms）导致用户等待

---

## 2. 交互语义（Interaction Semantics）

### 2.1 弹窗（Modal）

```yaml
modal:
  # 何时使用弹窗
  useWhen:
    - confirmation        # 需要用户确认
    - blocking_decision   # 阻塞性决策（不完成无法继续）
    - complex_form        # 复杂表单（不适合抽屉）

  # 何时不使用弹窗
  avoidWhen:
    - simple_notification # 简单通知（用 Toast）
    - non_blocking        # 非阻塞操作（用 Drawer）
    - read_only           # 只读信息（用 Tooltip/Popover）

  # 行为规范
  behavior:
    closeOnEsc: true              # 按 Esc 关闭
    closeOnMaskClick: false       # 点击遮罩层不关闭（避免误操作）
    focusTrap: true               # 焦点锁定在弹窗内

  # 按钮位置
  actions:
    primaryOnRight: true          # 主按钮在右侧
    cancelOnLeft: true            # 取消按钮在左侧
```

**示例**：
```markdown
标题：删除任务
内容：确定要删除"完成设计稿"吗？此操作不可恢复。
按钮：[取消]  [删除]
       ↑左    ↑右（主按钮）
```

### 2.2 破坏性操作（Destructive Actions）

```yaml
destructive:
  # 样式
  color: danger                   # 使用危险色（红色）
  variant: outlined               # 使用描边样式（避免过于醒目）

  # 确认机制
  confirmation:
    required: true                # 必须二次确认
    type: modal                   # 使用弹窗确认
    title: "确认删除？"
    description: "此操作不可恢复"
    confirmText: "删除"
    cancelText: "取消"

  # 特殊情况
  batch_operation:
    showAffectedCount: true       # 显示影响数量
    example: "确定要删除 5 个任务吗？"
```

**破坏性操作包括**：
- 删除（Delete）
- 清空（Clear）
- 重置（Reset）
- 覆盖（Overwrite）

### 2.3 反馈机制（Feedback）

```yaml
feedback:
  # 成功反馈
  success:
    pattern: toast                # 使用 Toast 提示
    duration: 2000ms              # 2秒后自动消失
    position: top-center          # 顶部居中
    example: "保存成功"

  # 错误反馈
  error:
    pattern: toast                # 使用 Toast 提示
    duration: 4000ms              # 4秒后自动消失（给用户时间阅读）
    position: top-center
    example: "保存失败，请重试"

  # 阻塞性错误
  blockingError:
    pattern: modal                # 使用弹窗（用户必须处理）
    example: "网络连接失败，请检查网络设置"

  # 加载状态
  loading:
    showAfter: 300ms              # 300ms 后显示加载提示（避免闪烁）
    text: "加载中..."
```

### 2.4 下拉菜单与选择（Dropdown & Selection）

```yaml
dropdown:
  # 触发方式
  trigger: click                  # 点击触发（不使用 hover）

  # 关闭行为
  closeOnSelect: true             # 选择后自动关闭
  closeOnClickOutside: true       # 点击外部关闭

  # 多选
  multiSelect:
    showCheckbox: true            # 显示复选框
    closeOnSelect: false          # 选择后不关闭
    showSelectedCount: true       # 显示已选数量
```

---

## 3. 组件规范（Component Contracts）

### 3.1 按钮（Button）

```yaml
button:
  # 变体 - 区分优先级
  variants:
    - primary       # 主按钮（最重要操作）
    - secondary     # 次要按钮（辅助操作）
    - danger        # 危险按钮（删除等破坏性操作）
    - ghost         # 幽灵按钮（低优先级操作）

  # 尺寸
  sizes:
    - sm: 28px height, 12px text   # 小按钮（表格操作）
    - md: 36px height, 14px text   # 标准按钮（表单提交）
    - lg: 44px height, 16px text   # 大按钮（首页 CTA）

  # 状态
  states:
    - default       # 默认状态
    - hover         # 悬停状态（颜色加深）
    - disabled      # 禁用状态（灰色、不可点击）
    - loading       # 加载状态（显示 spinner）

  # 使用规则
  rules:
    - danger_only_for_destructive    # 危险按钮仅用于破坏性操作
    - max_one_primary_per_view       # 每个视图最多一个主按钮
    - loading_disable_interaction    # 加载状态禁用交互
```

**示例**：
```tsx
// ❌ 错误：一个视图有两个主按钮
<Button variant="primary">保存</Button>
<Button variant="primary">发布</Button>

// ✅ 正确：一个主按钮 + 一个次要按钮
<Button variant="secondary">保存草稿</Button>
<Button variant="primary">发布</Button>
```

### 3.2 输入框（Input）

```yaml
input:
  # 尺寸
  sizes:
    - sm: 28px height   # 小输入框（表格内编辑）
    - md: 36px height   # 标准输入框（表单）
    - lg: 44px height   # 大输入框（搜索框）

  # 状态
  states:
    - default       # 默认状态（灰色边框）
    - focus         # 聚焦状态（主色边框）
    - error         # 错误状态（红色边框 + 错误提示）
    - disabled      # 禁用状态（灰色背景）

  # 使用规则
  rules:
    - show_placeholder        # 显示占位符文本
    - error_show_message      # 错误状态显示错误信息
    - required_mark_asterisk  # 必填项标记星号
```

### 3.3 弹窗组件（Modal Component）

```yaml
modalComponent:
  # 宽度
  width:
    sm: 360px       # 小弹窗（简单确认）
    md: 480px       # 标准弹窗（表单）
    lg: 640px       # 大弹窗（复杂内容）
    xl: 800px       # 超大弹窗（详情页）

  # 结构
  structure:
    header:
      titleRequired: true           # 必须有标题
      showCloseButton: true         # 显示关闭按钮（×）
    body:
      padding: 24px                 # 内边距
    footer:
      showCancel: true              # 显示取消按钮
      alignment: right              # 按钮右对齐

  # 遮罩层
  mask:
    opacity: 0.5                    # 遮罩不透明度
    backgroundColor: "#000000"      # 遮罩颜色（黑色）
```

---

## 4. 布局模式（Layout & Page Patterns）

### 4.1 列表页（List Page）

```yaml
listPage:
  # 页面结构
  sections:
    - header          # 页面标题 + 操作按钮
    - filter          # 筛选条件（可选）
    - table           # 数据表格
    - pagination      # 分页器

  # 布局规则
  rules:
    - actions_align_right         # 操作按钮右对齐
    - primary_action_max_1        # 最多一个主操作
    - row_actions_in_dropdown     # 行操作放在下拉菜单
```

**示例结构**：
```
┌─────────────────────────────────────────────┐
│ 任务列表                        [+ 新建任务] │  ← header
├─────────────────────────────────────────────┤
│ [筛选条件] [状态▼] [日期▼] [搜索框]         │  ← filter
├─────────────────────────────────────────────┤
│ ☐  任务名称    负责人    状态    操作       │
│ ☐  完成设计稿  张三      进行中  [⋮]        │  ← table
│ ☐  编写文档    李四      待开始  [⋮]        │
├─────────────────────────────────────────────┤
│                        [1] 2 3 4 5 [下一页] │  ← pagination
└─────────────────────────────────────────────┘
```

### 4.2 表单页（Form Page）

```yaml
formPage:
  # 布局方向
  layout: vertical              # 垂直布局（标签在上）

  # 字段宽度
  fieldWidth:
    short: 200px                # 短字段（日期、数字）
    medium: 400px               # 中等字段（姓名、邮箱）
    long: 100%                  # 长字段（描述、备注）

  # 提交按钮
  submit:
    align: right                # 右对齐
    sticky: true                # 吸底（长表单）
    spacing: 24px               # 与表单内容的间距
```

**示例结构**：
```
┌─────────────────────────────────────────────┐
│ 创建任务                                     │
├─────────────────────────────────────────────┤
│ 任务名称 *                                   │
│ [_____________________________]              │
│                                              │
│ 负责人 *                                     │
│ [选择负责人 ▼]                               │
│                                              │
│ 截止日期                                     │
│ [选择日期 📅]                                │
│                                              │
│ 描述                                         │
│ [_____________________________]              │
│ [                             ]              │
│ [_____________________________]              │
├─────────────────────────────────────────────┤
│                        [取消]  [创建任务]    │  ← sticky footer
└─────────────────────────────────────────────┘
```

### 4.3 详情页（Detail Page）

```yaml
detailPage:
  # 布局方式
  layout: sectioned             # 分区布局（信息分组）

  # 操作按钮位置
  actions:
    position: top_right         # 右上角
    pattern: dropdown           # 使用下拉菜单（多个操作）

  # 信息分组
  sections:
    showTitle: true             # 显示分组标题
    spacing: 32px               # 分组间距
```

---

## 5. 文案规范（Writing & Feedback Rules）

```yaml
copy:
  # 确认弹窗文案
  confirmation:
    delete:
      title: "确认删除？"
      description: "此操作不可恢复"
      confirm: "删除"
      cancel: "取消"
    clear:
      title: "确认清空？"
      description: "清空后数据将无法恢复"

  # 成功提示文案
  success:
    save: "保存成功"
    create: "创建成功"
    delete: "删除成功"
    update: "更新成功"

  # 错误提示文案
  error:
    default: "操作失败，请重试"
    network: "网络连接失败"
    timeout: "请求超时，请重试"
    permission: "无权限执行此操作"

  # 按钮文案
  button:
    confirm: "确定"
    cancel: "取消"
    save: "保存"
    delete: "删除"
    edit: "编辑"
```

**文案原则**：
- **简洁明了**：避免冗长的描述
- **动宾结构**：动词 + 宾语（如"删除任务"，不是"任务删除"）
- **避免专业术语**：使用用户能理解的语言
- **正向表达**：说"是什么"，不是"不是什么"

---

## 6. 规范执行与演进（Enforcement & Evolution）

```yaml
enforcement:
  # 禁止行为
  disallow:
    - custom_color                    # 禁止自定义颜色（使用设计令牌）
    - custom_spacing                  # 禁止自定义间距（使用间距系统）
    - inconsistent_radius             # 禁止不一致的圆角
    - excessive_shadow                # 禁止过度使用阴影

  # 验证检查
  validate:
    - token_usage                     # 检查是否使用设计令牌
    - interaction_consistency         # 检查交互一致性
    - accessibility                   # 检查可访问性（WCAG）

  # 版本管理
  version: "1.0.0"
  lastUpdated: "2026-02-02"
```

### 6.1 如何在项目中定制

**步骤 1：复制规范到项目**
```bash
cp rules/02-design-ui-spec.md your-project/docs/
```

**步骤 2：自定义设计令牌**
```yaml
# 在项目的 design-tokens.yaml 中覆盖
color:
  primary: "#FF6B00"              # 自定义主色（橙色）
  primaryHover: "#E65100"
typography:
  fontFamily: "PingFang SC, sans-serif"  # 使用苹方字体
```

**步骤 3：保持交互规范不变**
- 设计令牌可以自定义，但交互语义、组件规范、布局模式应保持一致

### 6.2 规范演进

**版本更新原则**：
- **MAJOR（主版本）**：交互语义变更（如弹窗关闭行为改变）
- **MINOR（次版本）**：新增组件规范、布局模式
- **PATCH（修订版）**：文案优化、示例补充

**贡献规范**：
1. 在实践中发现规范不足
2. 提出改进建议（GitHub Issue）
3. 讨论并达成共识
4. 更新规范文档
5. 发布新版本

---

## 7. 附录：设计系统参考

**推荐阅读**：
- [Material Design](https://material.io/design) - Google 的设计系统
- [Ant Design](https://ant.design/) - 企业级 UI 设计语言
- [Apple Human Interface Guidelines](https://developer.apple.com/design/) - Apple 设计指南
- [Polaris](https://polaris.shopify.com/) - Shopify 设计系统

**设计工具**：
- Figma - 设计稿和设计系统管理
- Storybook - 组件库文档和展示
- Zeroheight - 设计规范文档平台

---

**最后更新**：2026-02-02
**版本**：v1.0.0
**维护者**：Vibe 设计团队

---

## 说明

- UI-Spec 是系统能力，不是展示文档
- AI 在生成任何 UI 之前，必须完整加载并遵守该规范
- 所有不一致，视为规范缺失或未被正确执行
- 项目可自定义设计令牌，但应保持交互模式的一致性
