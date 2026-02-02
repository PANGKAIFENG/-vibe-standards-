# 安全指南

## 强制安全检查

在任何提交前必须检查：
- [ ] 无硬编码密钥（API 密钥、密码、令牌）
- [ ] 所有用户输入已验证
- [ ] SQL 注入防护（参数化查询）
- [ ] XSS 跨站脚本防护（HTML 清洗）
- [ ] CSRF 跨站请求伪造防护已启用
- [ ] 身份验证/授权已验证
- [ ] 所有端点都有速率限制
- [ ] 错误信息不泄露敏感数据

## 密钥管理

```typescript
// ❌ 永远不要：硬编码密钥
const apiKey = "sk-proj-xxxxx"

// ✅ 始终使用：环境变量
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## 安全响应协议

如果发现安全问题：
1. 立即停止
2. 使用 **security-reviewer** 代理
3. 在继续之前修复 CRITICAL 级别问题
4. 轮换任何暴露的密钥
5. 审查整个代码库中的类似问题
