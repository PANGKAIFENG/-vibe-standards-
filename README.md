# Vibe Standards - 统一规范体系

**基于 Everything Claude Code（通用开发规范）+ Vibe Coding 实践（产品规范），为 AI 协作开发提供完整规范。**

[![GitHub](https://img.shields.io/badge/GitHub-vibe--standards-blue)](https://github.com/PANGKAIFENG/-vibe-standards-)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

经过实践沉淀，整合 50+ 份通用开发规范 + 产品需求文档编写标准，为 Claude Code 提供开箱即用的规范体系。

---

## 📚 规范内容

### 🤖 Agents（10个）
专业助手，用于委托复杂任务：
- **planner** - 功能实现规划
- **architect** - 系统设计决策
- **tdd-guide** - 测试驱动开发
- **code-reviewer** - 代码质量和安全审查
- **security-reviewer** - 安全漏洞分析
- **build-error-resolver** - 构建错误修复
- **e2e-runner** - E2E 测试（Playwright）
- **refactor-cleaner** - 死代码清理
- **doc-updater** - 文档更新
- **database-reviewer** - 数据库审查

### ⚡ Commands（15个）
快捷命令，提升开发效率：
- **/plan** - 创建实现计划
- **/tdd** - 测试驱动开发
- **/code-review** - 代码审查
- **/e2e** - E2E 测试生成
- **/build-fix** - 修复构建错误
- **/refactor-clean** - 代码重构清理
- **/orchestrate** - 多代理编排
- **/learn** - 提取可复用模式
- **/checkpoint** - 保存验证状态
- **/verify** - 运行验证循环
- **/update-docs** - 更新文档
- **/update-codemaps** - 更新代码地图
- **/test-coverage** - 测试覆盖率检查
- **/eval** - 评估开发质量
- **/setup-pm** - 配置包管理器

### 🔧 Skills（14个）
工作流定义和领域知识：
- **coding-standards** - 通用编码标准
- **frontend-patterns** - React/Next.js 模式
- **backend-patterns** - API/数据库/缓存模式
- **tdd-workflow** - TDD 方法论
- **security-review** - 安全检查清单
- **postgres-patterns** - PostgreSQL 最佳实践
- **clickhouse-io** - ClickHouse 数据分析
- **continuous-learning** - 自动提取会话模式
- **continuous-learning-v2** - 基于直觉的学习系统
- **iterative-retrieval** - 渐进式上下文细化
- **strategic-compact** - 手动上下文压缩
- **eval-harness** - 评估框架
- **verification-loop** - 持续验证
- **project-guidelines-example** - 项目指南示例

### 📋 Rules（9个）
始终遵循的全局规则：
- **01-requirement-prd-standard** - PRD 生成规范（新增⭐）
- **agents** - 代理编排规则
- **git-workflow** - Git 工作流和提交规范
- **coding-style** - 编码风格（不可变性、文件组织）
- **testing** - 测试要求（TDD、80% 覆盖率）
- **security** - 安全检查（OWASP Top 10）
- **performance** - 性能优化（模型选择、上下文管理）
- **patterns** - 通用开发模式
- **hooks** - Hooks 系统使用

### 👤 Contexts（3个）
角色上下文切换：
- **dev** - 开发者模式
- **review** - 审查模式
- **research** - 研究模式

---

## 🚀 快速开始

### 1. 安装 Claude Code

```bash
# 安装 Claude Code CLI
npm install -g @anthropics/claude-code
```

### 2. 使用 Vibe Standards

**方式一：作为 Claude Code 插件使用**
```bash
# 在你的项目中引用 vibe-standards
# 在 ~/.claude/settings.json 中添加：
{
  "pluginPaths": [
    "/path/to/vibe-standards"
  ]
}
```

**方式二：直接复制到全局配置**
```bash
# 复制规范到 Claude 全局目录
cp -r agents ~/.claude/agents/
cp -r commands ~/.claude/commands/
cp -r skills ~/.claude/skills/
cp -r rules ~/.claude/rules/
cp -r contexts ~/.claude/contexts/
```

### 3. 开始使用

在 Claude Code 中使用规范：
```bash
# 使用命令
/plan  # 创建实现计划
/tdd   # 测试驱动开发

# 代理会自动加载
# 规则会自动应用
```

详细指南：参考 [guides/quick-start.md](guides/quick-start.md)

---

## 📦 特色功能

### ✅ 完整的开发规范
- **代码质量**：不可变性、文件组织、错误处理
- **测试驱动**：TDD 工作流、80% 覆盖率要求
- **安全优先**：OWASP Top 10、secrets 管理
- **Git 规范**：约定式提交、PR 工作流

### ✅ 产品规范（新增）
- **PRD 编写标准**：8 大章节模板
- **用户场景**：真实场景 + 用户诉求
- **界面布局**：ASCII/Mermaid 图 + UI Mockup
- **操作流程**：正常路径 + 异常处理

### ✅ 专业代理团队
- **规划 + 设计**：planner + architect
- **开发 + 测试**：tdd-guide + code-reviewer
- **安全 + 性能**：security-reviewer + database-reviewer
- **维护 + 文档**：refactor-cleaner + doc-updater

---

## 🔗 相关资源

- **原始仓库**：[Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
- **项目实践**：基于"新白板"项目的 Vibe Coding 工作流
- **PRD 规范**：[rules/01-requirement-prd-standard.md](rules/01-requirement-prd-standard.md)

---

## 🎯 适用场景

### 产品经理
- 使用 PRD 规范编写产品需求文档
- 与 AI 协作生成 PRD
- 按工作流程推进（需求→设计→开发→测试）

### 开发人员
- 使用 agents 处理复杂任务（规划、架构、测试）
- 使用 commands 快速执行常见操作
- 遵循 rules 确保代码质量和安全

### 团队协作
- 统一的规范体系，减少沟通成本
- AI 按规范输出，确保一致性
- Git 规范管理，清晰的提交历史

---

## 📄 许可证

MIT License

---

## 🙏 致谢

本项目基于以下开源项目：
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - 提供了 50+ 份通用开发规范
- Anthropic Claude Code - AI 协作开发工具

---

## 📝 版本历史

### v1.0.0（2026-02-02）
- ✅ 整合 Everything Claude Code 所有翻译内容（50+ 文件）
- ✅ 新增 PRD 生成规范（产品需求文档编写标准）
- ✅ 扁平化目录结构，与 ECC 保持一致
- ✅ 完整的 agents、commands、skills、rules、contexts 体系

---

**维护者**：PM + Claude 协作团队
**更新时间**：2026-02-02
