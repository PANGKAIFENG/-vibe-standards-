---
name: eval-harness
description: Claude Code 会话的正式评估框架，实现评估驱动开发（EDD）原则
tools: Read, Write, Edit, Bash, Grep, Glob
---

# 评估框架技能

Claude Code 会话的正式评估框架，实现评估驱动开发（EDD）原则。

## 哲学

评估驱动开发将评估视为"AI 开发的单元测试"：
- 在实现之前定义预期行为
- 在开发过程中持续运行评估
- 跟踪每次更改的回归
- 使用 pass@k 指标进行可靠性测量

## 评估类型

### 能力评估
测试 Claude 是否能做以前不能做的事情：
```markdown
[CAPABILITY EVAL: feature-name]
Task: 描述 Claude 应该完成什么
Success Criteria:
  - [ ] 标准 1
  - [ ] 标准 2
  - [ ] 标准 3
Expected Output: 预期结果描述
```

### 回归评估
确保更改不会破坏现有功能：
```markdown
[REGRESSION EVAL: feature-name]
Baseline: SHA 或检查点名称
Tests:
  - existing-test-1: PASS/FAIL
  - existing-test-2: PASS/FAIL
  - existing-test-3: PASS/FAIL
Result: X/Y 通过（之前 Y/Y）
```

## 评分器类型

### 1. 基于代码的评分器
使用代码进行确定性检查：
```bash
# 检查文件是否包含预期模式
grep -q "export function handleAuth" src/auth.ts && echo "PASS" || echo "FAIL"

# 检查测试是否通过
npm test -- --testPathPattern="auth" && echo "PASS" || echo "FAIL"

# 检查构建是否成功
npm run build && echo "PASS" || echo "FAIL"
```

### 2. 基于模型的评分器
使用 Claude 评估开放式输出：
```markdown
[MODEL GRADER PROMPT]
评估以下代码更改：
1. 是否解决了陈述的问题？
2. 结构是否良好？
3. 是否处理了边界情况？
4. 错误处理是否适当？

评分：1-5（1=差，5=优秀）
理由：[解释]
```

### 3. 人工评分器
标记为手动审查：
```markdown
[HUMAN REVIEW REQUIRED]
Change: 描述更改了什么
Reason: 为什么需要人工审查
Risk Level: LOW/MEDIUM/HIGH
```

## 指标

### pass@k
"k 次尝试中至少一次成功"
- pass@1：首次尝试成功率
- pass@3：3 次尝试内成功
- 典型目标：pass@3 > 90%

### pass^k
"所有 k 次试验都成功"
- 更高的可靠性标准
- pass^3：连续 3 次成功
- 用于关键路径

## 评估工作流程

### 1. 定义（编码前）
```markdown
## EVAL DEFINITION: feature-xyz

### 能力评估
1. 可以创建新用户账户
2. 可以验证邮箱格式
3. 可以安全地哈希密码

### 回归评估
1. 现有登录仍然有效
2. 会话管理未更改
3. 登出流程完好

### 成功指标
- 能力评估 pass@3 > 90%
- 回归评估 pass^3 = 100%
```

### 2. 实现
编写代码以通过定义的评估。

### 3. 评估
```bash
# 运行能力评估
[运行每个能力评估，记录 PASS/FAIL]

# 运行回归评估
npm test -- --testPathPattern="existing"

# 生成报告
```

### 4. 报告
```markdown
EVAL REPORT: feature-xyz
========================

能力评估：
  create-user:     PASS (pass@1)
  validate-email:  PASS (pass@2)
  hash-password:   PASS (pass@1)
  总体：           3/3 通过

回归评估：
  login-flow:      PASS
  session-mgmt:    PASS
  logout-flow:     PASS
  总体：           3/3 通过

指标：
  pass@1: 67% (2/3)
  pass@3: 100% (3/3)

状态：准备审查
```

## 集成模式

### 实现前
```
/eval define feature-name
```
在 `.claude/evals/feature-name.md` 创建评估定义文件

### 实现中
```
/eval check feature-name
```
运行当前评估并报告状态

### 实现后
```
/eval report feature-name
```
生成完整评估报告

## 评估存储

在项目中存储评估：
```
.claude/
  evals/
    feature-xyz.md      # 评估定义
    feature-xyz.log     # 评估运行历史
    baseline.json       # 回归基线
```

## 最佳实践

1. **在编码前定义评估** - 强制清晰思考成功标准
2. **频繁运行评估** - 尽早发现回归
3. **随时间跟踪 pass@k** - 监控可靠性趋势
4. **尽可能使用代码评分器** - 确定性 > 概率性
5. **安全性人工审查** - 永远不要完全自动化安全检查
6. **保持评估快速** - 慢评估不会被运行
7. **评估与代码一起版本控制** - 评估是一等公民工件

## 示例：添加身份验证

```markdown
## EVAL: add-authentication

### 阶段 1：定义（10 分钟）
能力评估：
- [ ] 用户可以用邮箱/密码注册
- [ ] 用户可以用有效凭证登录
- [ ] 无效凭证被拒绝并显示正确错误
- [ ] 会话在页面刷新后持续存在
- [ ] 登出清除会话

回归评估：
- [ ] 公共路由仍可访问
- [ ] API 响应未更改
- [ ] 数据库架构兼容

### 阶段 2：实现（视情况而定）
[编写代码]

### 阶段 3：评估
运行：/eval check add-authentication

### 阶段 4：报告
EVAL REPORT: add-authentication
==============================
能力：5/5 通过（pass@3: 100%）
回归：3/3 通过（pass^3: 100%）
状态：可以发布
```
