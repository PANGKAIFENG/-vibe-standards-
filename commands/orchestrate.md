# Orchestrate 命令

用于复杂任务的顺序代理工作流程。

## 使用方法

`/orchestrate [workflow-type] [task-description]`

## 工作流程类型

### feature
完整功能实现工作流程：
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Bug 调查和修复工作流程：
```
explorer -> tdd-guide -> code-reviewer
```

### refactor
安全重构工作流程：
```
architect -> code-reviewer -> tdd-guide
```

### security
以安全为重点的审查：
```
security-reviewer -> code-reviewer -> architect
```

## 执行模式

对工作流程中的每个代理：

1. **调用代理**，传递来自前一个代理的上下文
2. **收集输出**作为结构化交接文档
3. **传递给下一个代理**在链中
4. **汇总结果**到最终报告

## 交接文档格式

在代理之间，创建交接文档：

```markdown
## HANDOFF: [前一个代理] -> [下一个代理]

### 上下文
[完成工作的摘要]

### 发现
[关键发现或决策]

### 修改的文件
[触及的文件列表]

### 待解决问题
[下一个代理的未解决项目]

### 建议
[建议的下一步]
```

## 示例：功能工作流程

```
/orchestrate feature "添加用户身份验证"
```

执行：

1. **Planner 代理**
   - 分析需求
   - 创建实现计划
   - 识别依赖关系
   - 输出: `HANDOFF: planner -> tdd-guide`

2. **TDD Guide 代理**
   - 读取 planner 交接
   - 首先编写测试
   - 实现以通过测试
   - 输出: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code Reviewer 代理**
   - 审查实现
   - 检查问题
   - 建议改进
   - 输出: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security Reviewer 代理**
   - 安全审计
   - 漏洞检查
   - 最终批准
   - 输出: 最终报告

## 最终报告格式

```
编排报告
====================
工作流程: feature
任务: 添加用户身份验证
代理: planner -> tdd-guide -> code-reviewer -> security-reviewer

摘要
-------
[一段摘要]

代理输出
-------------
Planner: [摘要]
TDD Guide: [摘要]
Code Reviewer: [摘要]
Security Reviewer: [摘要]

文件更改
-------------
[列出所有修改的文件]

测试结果
------------
[测试通过/失败摘要]

安全状态
---------------
[安全发现]

建议
--------------
[发布 / 需要改进 / 阻塞]
```

## 并行执行

对于独立检查，并行运行代理：

```markdown
### 并行阶段
同时运行：
- code-reviewer (质量)
- security-reviewer (安全)
- architect (设计)

### 合并结果
将输出合并到单个报告
```

## 参数

$ARGUMENTS:
- `feature <description>` - 完整功能工作流程
- `bugfix <description>` - Bug 修复工作流程
- `refactor <description>` - 重构工作流程
- `security <description>` - 安全审查工作流程
- `custom <agents> <description>` - 自定义代理序列

## 自定义工作流程示例

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "重新设计缓存层"
```

## 提示

1. **对复杂功能从 planner 开始**
2. **合并前始终包括 code-reviewer**
3. **对 auth/payment/PII 使用 security-reviewer**
4. **保持交接简洁** - 关注下一个代理需要什么
5. **如果需要在代理之间运行验证**
