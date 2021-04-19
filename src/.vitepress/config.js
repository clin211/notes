module.exports = {
    title: 'Forest',
    description: '笔记记录、阅读',
    serche: true,
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端',
                items: [
                    { text: 'javascript', link: '/front-end/js/' },
                    { text: 'vue', link: '/front-end/vue' },
                    { text: 'react', link: '/front-end/react' },
                    { text: '微信小程序', link: '/front-end/wechat' }
                ]
            },
            {
                text: '数据库',
                items: [
                    { text: 'mongoDB', link: '/database/mongoDB' },
                    { text: 'redis', link: '/database/mongoDB' },
                    { text: 'mysql', link: '/database/mongoDB' }
                ]
            },
            { text: '项目', link: '/project' },
            { text: 'Go', link: '/go' }
        ],
        sidebar: {
            '/project/': [
                { text: '简介', link: '/' },
                { text: '快速上手', link: '/quick-start' },
                { text: '常见问题', link: '/faq' },
                { text: 'API 文档', link: '/api' },
                { text: '相关文档', link: '/link' }
            ],
            '/note/': [],
            '/front-end/js/': [
                { text: 'html中的JavaScript', link: '/front-end/js/' },
                { text: '语言基础', link: '/front-end/js/base' }
            ]
        },
        lastUpdated: '更新时间',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: '',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'src',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'main',
        // 默认是 false, 设置为 true 来启用
        editLinks: true
    }
}
