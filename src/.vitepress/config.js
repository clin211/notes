module.exports = {
    title: 'Forest',
    description: '笔记记录、阅读',
    serche: true,
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: '基础',
                items: [
                    { text: 'javascript', link: '/front-end/js/' },
                    { text: 'vue', link: '/front-end/vue/' },
                    { text: 'react', link: '/front-end/react/' },
                    { text: 'babel', link: '/front-end/babel/' },
                    { text: 'webpack', link: '/front-end/webpack/' },
                    { text: '微信小程序', link: '/front-end/wechat/' },
                    { text: 'node', link: '/front-end/node/' }
                ]
            },
            {
                text: '数据库',
                items: [
                    { text: 'mongoDB', link: '/database/mongoDB/' },
                    { text: 'redis', link: '/database/redis/' },
                    { text: 'mysql', link: '/database/mysql/' }
                ]
            },
            { text: '项目', link: '/project/' },
            { text: 'Go', link: '/go/' },
            { text: '面试', link: '/interview/' }
        ],
        sidebar: {
            '/front-end/js/': [
                { text: 'html中的JavaScript', link: '/front-end/js/' },
                { text: '语言基础', link: '/front-end/js/base' }
            ],
            '/front-end/vue/': [{ text: '', link: '/front-end/vue/' }],
            '/front-end/react/': [{ text: '', link: '/front-end/react/' }],
            '/front-end/wechat/': [{ text: '', link: '/front-end/wechat/' }],
            '/front-end/webpack/': [{ text: '', link: '/front-end/webpack/' }],
            '/front-end/babel/': [{ text: '', link: '/front-end/babel/' }],
            '/front-end/node/': [
                { text: 'koa基础', link: '/front-end/node/' },
                {
                    text: 'webpack构建应用',
                    link: '/front-end/node/1-webpack5-node'
                }
            ],
            '/project/': [{ text: '', link: '/' }],
            '/database/mongodb/': [{ text: '', link: '/' }],
            '/database/redis/': [{ text: '', link: '/' }],
            '/database/mysql/': [{ text: '', link: '/' }],
            '/go/': [{ text: '', link: '/go/' }],
            '/interview/': [{ text: '面试', link: '/interview/' }]
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
