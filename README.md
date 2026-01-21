# Global Development Standards

> 一套可复用、可进化的跨项目 AI 协作开发规范体系。

## 📂 目录结构

```
global-standards/
├── .cursorrules    # 核心规则文件 (AI 读取此文件)
├── README.md       # 本说明文件
└── CHANGELOG.md    # 规则演进历史
```

## 🔗 如何在项目中引用

在项目根目录的 `.cursorrules` / `CLAUDE.md` / `.github/copilot-instructions.md` **开头**添加：

```markdown
# 全局规范引用 (必读)
> ⚠️ **强制执行**：在执行任何开发任务前，必须先阅读以下全局规范：
> - 路径：`~/Desktop/vibe/global-standards/.cursorrules`
> - 全局规范优先级 **高于** 本项目特定规则 (除非明确标注覆盖)。
```

## 📝 如何贡献新规则

1.  在项目开发/复盘中发现可沉淀的通用经验。
2.  将经验抽象为通用规则，添加到 `.cursorrules` 对应章节。
3.  更新 `CHANGELOG.md`。
4.  提交：`git commit -m "feat(rules): 新增 XXX 规则"`

## 🕰️ 变更历史

详见 [CHANGELOG.md](./CHANGELOG.md)
