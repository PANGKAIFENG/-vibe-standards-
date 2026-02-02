# Git 工作流

## 提交信息格式

```
<type>: <description>

<optional body>
```

类型：feat, fix, refactor, docs, test, chore, perf, ci

注意：通过 ~/.claude/settings.json 全局禁用归属。

## Pull Request 工作流

创建 PR 时：
1. 分析完整提交历史（不只是最新提交）
2. 使用 `git diff [base-branch]...HEAD` 查看所有变更
3. 起草全面的 PR 摘要
4. 包含测试计划和待办事项
5. 如果是新分支，使用 `-u` 标志推送

## 功能实现工作流

1. **先规划**
   - 使用 **planner** 代理创建实现计划
   - 识别依赖和风险
   - 分解为阶段

2. **TDD 方法**
   - 使用 **tdd-guide** 代理
   - 先写测试（RED 红灯）
   - 实现以通过测试（GREEN 绿灯）
   - 重构（IMPROVE 改进）
   - 验证 80%+ 覆盖率

3. **代码审查**
   - 编写代码后立即使用 **code-reviewer** 代理
   - 处理 CRITICAL 和 HIGH 级别问题
   - 尽可能修复 MEDIUM 级别问题

4. **提交和推送**
   - 详细的提交信息
   - 遵循约定式提交格式
