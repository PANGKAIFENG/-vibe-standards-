---
name: strategic-compact
description: 在逻辑间隔建议手动上下文压缩，以通过任务阶段保留上下文，而不是任意自动压缩。
---

# 策略性压缩技能

在工作流程的战略点建议手动 `/compact`，而不是依赖任意的自动压缩。

## 为什么需要策略性压缩？

自动压缩在任意点触发：
- 经常在任务中间，丢失重要上下文
- 不知道逻辑任务边界
- 可能中断复杂的多步操作

在逻辑边界进行策略性压缩：
- **探索后，执行前** - 压缩研究上下文，保留实现计划
- **完成里程碑后** - 为下一阶段重新开始
- **重大上下文切换前** - 在不同任务前清除探索上下文

## 工作原理

`suggest-compact.sh` 脚本在 PreToolUse（Edit/Write）时运行，并：

1. **跟踪工具调用** - 计算会话中的工具调用次数
2. **阈值检测** - 在可配置阈值时建议（默认：50 次调用）
3. **定期提醒** - 阈值后每 25 次调用提醒

## Hook 设置

添加到你的 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "tool == \"Edit\" || tool == \"Write\"",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/strategic-compact/suggest-compact.sh"
      }]
    }]
  }
}
```

## 配置

环境变量：
- `COMPACT_THRESHOLD` - 第一次建议前的工具调用次数（默认：50）

## 最佳实践

1. **规划后压缩** - 一旦计划确定，压缩以重新开始
2. **调试后压缩** - 在继续之前清除错误解决上下文
3. **实现中不要压缩** - 为相关更改保留上下文
4. **阅读建议** - Hook 告诉你*何时*，你决定*是否*

## 相关

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Token 优化部分
- 内存持久化 hooks - 用于在压缩后仍然存在的状态
