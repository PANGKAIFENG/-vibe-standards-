#!/usr/bin/env node

/**
 * Vibe Standards Linter
 * 自动检查项目是否符合 vibe-standards 规范
 */

const fs = require('fs');
const path = require('path');

// ANSI 颜色
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
};

let hasError = false;

/**
 * 检查文档目录中的文件命名
 */
function checkDocumentNaming() {
    console.log('\n📝 检查文档文件命名...');

    const docsDir = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsDir)) {
        console.log(`${colors.yellow}⚠ docs/ 目录不存在，跳过${colors.reset}`);
        return;
    }

    const errors = [];

    // 递归检查所有 .md 文件
    function checkDir(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                checkDir(filePath);
            } else if (file.endsWith('.md')) {
                // 检查是否包含中文字符
                const hasChinese = /[\u4e00-\u9fa5]/.test(file);
                const isEnglishOnly = /^[a-zA-Z0-9\-_.]+$/.test(file);

                if (isEnglishOnly && !hasChinese) {
                    errors.push({
                        file: filePath.replace(process.cwd(), '.'),
                        suggestion: file.replace(/-/g, ''),
                    });
                }
            }
        });
    }

    checkDir(docsDir);

    if (errors.length > 0) {
        hasError = true;
        console.log(`${colors.red}❌ 发现 ${errors.length} 个文档文件命名违规：${colors.reset}`);
        errors.forEach(({ file, suggestion }) => {
            console.log(`  ${file}`);
            console.log(`  ${colors.yellow}建议: ${suggestion}${colors.reset}`);
        });
    } else {
        console.log(`${colors.green}✅ 所有文档文件命名符合规范${colors.reset}`);
    }
}

/**
 * 检查代码目录命名（应使用 kebab-case）
 */
function checkCodeDirNaming() {
    console.log('\n📂 检查代码目录命名...');

    const codeDirs = ['src', 'components', 'pages', 'lib', 'utils'];
    const errors = [];

    codeDirs.forEach(dirName => {
        const dirPath = path.join(process.cwd(), dirName);
        if (!fs.existsSync(dirPath)) return;

        function checkDir(dir, depth = 0) {
            if (depth > 4) return; // 最大深度 4 层

            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    // 检查是否为 kebab-case
                    const isKebabCase = /^[a-z0-9\-]+$/.test(file);
                    const hasChinese = /[\u4e00-\u9fa5]/.test(file);

                    if (!isKebabCase || hasChinese) {
                        errors.push(filePath.replace(process.cwd(), '.'));
                    }

                    checkDir(filePath, depth + 1);
                }
            });
        }

        checkDir(dirPath);
    });

    if (errors.length > 0) {
        hasError = true;
        console.log(`${colors.red}❌ 发现 ${errors.length} 个代码目录命名违规（应使用 kebab-case）：${colors.reset}`);
        errors.forEach(file => console.log(`  ${file}`));
    } else {
        console.log(`${colors.green}✅ 代码目录命名符合规范${colors.reset}`);
    }
}

/**
 * 主函数
 */
function main() {
    console.log('🔍 Vibe Standards Linter - 规范检查中...\n');

    checkDocumentNaming();
    checkCodeDirNaming();

    console.log('\n' + '='.repeat(50));
    if (hasError) {
        console.log(`${colors.red}❌ 检查失败，请修复以上问题${colors.reset}`);
        process.exit(1);
    } else {
        console.log(`${colors.green}✅ 所有检查通过${colors.reset}`);
        process.exit(0);
    }
}

main();
