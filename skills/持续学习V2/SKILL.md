---
name: continuous-learning-v2
description: 基于直觉的学习系统，通过 hooks 观察会话，创建带置信度评分的原子直觉，并将它们演进为技能/命令/代理。
version: 2.0.0
---

# 持续学习 v2 - 基于直觉的架构

一个高级学习系统，通过原子化的"直觉"——带置信度评分的小型学习行为——将你的 Claude Code 会话转化为可复用的知识。

## v2 的新特性

| 特性 | v1 | v2 |
|------|----|----|
| 观察 | Stop hook（会话结束）| PreToolUse/PostToolUse（100% 可靠）|
| 分析 | 主上下文 | 后台代理（Haiku）|
| 粒度 | 完整技能 | 原子化"直觉" |
| 置信度 | 无 | 0.3-0.9 加权 |
| 演进 | 直接到技能 | 直觉 → 聚类 → 技能/命令/代理 |
| 共享 | 无 | 导出/导入直觉 |

## 直觉模型

直觉是一个小型学习行为：

```yaml
---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
domain: "code-style"
source: "session-observation"
---

# 偏好函数式风格

## 动作
在适当时使用函数式模式而不是类。

## 证据
- 观察到 5 次函数式模式偏好的实例
- 用户在 2025-01-15 将基于类的方法修正为函数式
```

**属性：**
- **原子化** — 一个触发器，一个动作
- **置信度加权** — 0.3 = 暂定，0.9 = 几乎确定
- **领域标签** — 代码风格、测试、git、调试、工作流程等
- **证据支持** — 跟踪是什么观察创建了它

## 工作原理

```
会话活动
      │
      │ Hooks 捕获提示 + 工具使用（100% 可靠）
      ▼
┌─────────────────────────────────────────┐
│         observations.jsonl              │
│   （提示、工具调用、结果）              │
└─────────────────────────────────────────┘
      │
      │ 观察者代理读取（后台，Haiku）
      ▼
┌─────────────────────────────────────────┐
│          模式检测                       │
│   • 用户修正 → 直觉                     │
│   • 错误解决 → 直觉                     │
│   • 重复工作流 → 直觉                   │
└─────────────────────────────────────────┘
      │
      │ 创建/更新
      ▼
┌─────────────────────────────────────────┐
│         instincts/personal/             │
│   • prefer-functional.md (0.7)          │
│   • always-test-first.md (0.9)          │
│   • use-zod-validation.md (0.6)         │
└─────────────────────────────────────────┘
      │
      │ /evolve 聚类
      ▼
┌─────────────────────────────────────────┐
│              evolved/                   │
│   • commands/new-feature.md             │
│   • skills/testing-workflow.md          │
│   • agents/refactor-specialist.md       │
└─────────────────────────────────────────┘
```

## 快速开始

### 1. 启用观察 Hooks

添加到你的 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh pre"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh post"
      }]
    }]
  }
}
```

### 2. 初始化目录结构

```bash
mkdir -p ~/.claude/homunculus/{instincts/{personal,inherited},evolved/{agents,skills,commands}}
touch ~/.claude/homunculus/observations.jsonl
```

### 3. 运行观察者代理（可选）

观察者可以在后台运行分析观察：

```bash
# 启动后台观察者
~/.claude/skills/continuous-learning-v2/agents/start-observer.sh
```

## 命令

| 命令 | 描述 |
|------|------|
| `/instinct-status` | 显示所有学习到的直觉及其置信度 |
| `/evolve` | 将相关直觉聚类成技能/命令 |
| `/instinct-export` | 导出直觉以供共享 |
| `/instinct-import <file>` | 从他人导入直觉 |

## 配置

编辑 `config.json`：

```json
{
  "version": "2.0",
  "observation": {
    "enabled": true,
    "store_path": "~/.claude/homunculus/observations.jsonl",
    "max_file_size_mb": 10,
    "archive_after_days": 7
  },
  "instincts": {
    "personal_path": "~/.claude/homunculus/instincts/personal/",
    "inherited_path": "~/.claude/homunculus/instincts/inherited/",
    "min_confidence": 0.3,
    "auto_approve_threshold": 0.7,
    "confidence_decay_rate": 0.05
  },
  "observer": {
    "enabled": true,
    "model": "haiku",
    "run_interval_minutes": 5,
    "patterns_to_detect": [
      "user_corrections",
      "error_resolutions",
      "repeated_workflows",
      "tool_preferences"
    ]
  },
  "evolution": {
    "cluster_threshold": 3,
    "evolved_path": "~/.claude/homunculus/evolved/"
  }
}
```

## 文件结构

```
~/.claude/homunculus/
├── identity.json           # 你的配置文件，技术水平
├── observations.jsonl      # 当前会话观察
├── observations.archive/   # 已处理的观察
├── instincts/
│   ├── personal/           # 自动学习的直觉
│   └── inherited/          # 从他人导入的
└── evolved/
    ├── agents/             # 生成的专家代理
    ├── skills/             # 生成的技能
    └── commands/           # 生成的命令
```

## 与 Skill Creator 的集成

当你使用 [Skill Creator GitHub App](https://skill-creator.app) 时，它现在会生成**两者**：
- 传统的 SKILL.md 文件（向后兼容）
- 直觉集合（用于 v2 学习系统）

来自仓库分析的直觉有 `source: "repo-analysis"` 并包含源仓库 URL。

## 置信度评分

置信度随时间演进：

| 分数 | 含义 | 行为 |
|------|------|------|
| 0.3 | 暂定 | 建议但不强制 |
| 0.5 | 中等 | 在相关时应用 |
| 0.7 | 强 | 自动批准应用 |
| 0.9 | 几乎确定 | 核心行为 |

**置信度增加**当：
- 重复观察到模式
- 用户没有修正建议的行为
- 来自其他来源的类似直觉一致

**置信度降低**当：
- 用户明确修正行为
- 长时间未观察到模式
- 出现矛盾证据

## 为什么用 Hooks 而不是 Skills 进行观察？

> "v1 依赖技能来观察。技能是概率性的——基于 Claude 的判断，它们触发约 50-80% 的时间。"

Hooks 触发 **100%**，确定性地。这意味着：
- 每个工具调用都被观察
- 没有模式被遗漏
- 学习是全面的

## 向后兼容性

v2 完全兼容 v1：
- 现有的 `~/.claude/skills/learned/` 技能仍然有效
- Stop hook 仍然运行（但现在也馈入 v2）
- 渐进迁移路径：两者并行运行

## 隐私

- 观察**本地**保留在你的机器上
- 只有**直觉**（模式）可以导出
- 没有实际代码或对话内容被共享
- 你控制导出什么

## 相关

- [Skill Creator](https://skill-creator.app) - 从仓库历史生成直觉
- [Homunculus](https://github.com/humanplane/homunculus) - v2 架构的灵感来源
- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - 持续学习部分

---

*基于直觉的学习：一次一个观察，教会 Claude 你的模式。*
