module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     ✨ 新增功能' },
    { value: 'fix', name: 'fix:      🐛 修复 Bug' },
    { value: 'docs', name: 'docs:     📝 文档变更' },
    { value: 'style', name: 'style:    💄 代码格式 (不影响代码运行的变动，如空格、分号等)' },
    { value: 'refactor', name: 'refactor: ♻️  代码重构 (既不修复 bug 也不增加新功能的代码重构)' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化' },
    { value: 'test', name: 'test:     ✅ 测试相关' },
    { value: 'build', name: 'build:    📦 构建变动 (构建系统或外部依赖变更)' },
    { value: 'ci', name: 'ci:       🎡 CI/CD 配置' },
    { value: 'chore', name: 'chore:    🔨 辅助工具变动 (非 src 或测试文件修改)' },
    { value: 'revert', name: 'revert:   ⏪ 回退 Commit' },
  ],

  // 消息步骤
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    customScope: '请输入自定义的scope:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)',
  },

  // 跳过 scope、customScope 及其他不常用字段
  skipQuestions: ['scope', 'customScope', 'body', 'breaking', 'footer'],

  // subject 限制长度
  subjectLimit: 100,
};
