#!/bin/sh

# Vibe Standards Pre-commit Hook
# 在提交前自动检查规范

echo "🔍 Vibe Standards 规范检查..."

# 运行 vibe-lint
node ./vibe-standards/scripts/vibe-lint.js

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ 提交被阻止：请先修复规范违规问题"
  echo "💡 提示：查看上方错误信息，将文件重命名为中文"
  exit 1
fi

echo "✅ 规范检查通过，继续提交"
exit 0
