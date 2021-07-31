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
                    { text: 'Ts', link: '/front-end/typescript/' },
                    // { text: '微信小程序', link: '/front-end/wechat/' },
                    { text: 'node', link: '/front-end/node/' },
                    { text: 'nest', link: '/front-end/nest/' },
                    { text: 'react-native', link: '/front-end/react-native/' }
                ]
            },
            // {
            //     text: '数据库',
            //     items: [
            //         { text: 'mongoDB', link: '/database/mongoDB/' },
            //         { text: 'redis', link: '/database/redis/' },
            //         { text: 'mysql', link: '/database/mysql/' }
            //     ]
            // },
            // { text: '项目', link: '/project/' },
            { text: 'Go', link: '/go/' },
            {
                text: '工具',
                items: [
                    { text: 'Git', link: '/utils/git/' },
                    { text: 'Docker', link: '/utils/docker/' },
                ]
            },
            {
                text: 'other', link: '/other/'
            },
            { text: '面试', link: '/interview/' },
            { text: 'GitHub', link: 'https://github.com/Forest-211' }
        ],
        sidebar: {
            '/front-end/js/': [
                { text: 'html中的JavaScript', link: '/front-end/js/' },
                { text: '语言基础', link: '/front-end/js/base' }
            ],
            '/front-end/vue/': [{ text: '', link: '/front-end/vue/' }],
            '/front-end/react/': [{ text: '', link: '/front-end/react/' }],
            '/front-end/typescript/': [
                { text: 'TypeScript', link: '/front-end/typescript/' },
                { text: '环境准备', link: '/front-end/typescript/01-环境准备' },
                { text: '为什么要学习TS', link: '/front-end/typescript/02-为什么要学习TypeScript' },
            ],
            '/front-end/webpack/': [{ text: '', link: '/front-end/webpack/' }],
            '/front-end/node/': [
                { text: 'koa基础', link: '/front-end/node/' },
                {
                    text: 'webpack构建应用',
                    link: '/front-end/node/1-webpack5-node'
                }
            ],
            '/front-end/react-native/': [
                { text: 'React Native', link: '/front-end/react-native/' },
                { text: '环境搭建', link: '/front-end/react-native/01' },
                { text: '基本认识', link: '/front-end/react-native/02' },
                { text: '开发必备', link: '/front-end/react-native/03' },
                { text: '导航系统', link: '/front-end/react-native/04' }
            ],
            '/front-end/nest/': [
                { text: '概述', link: '/front-end/nest/' },
                { text: '基本介绍', link: '/front-end/nest/01' },
            ],
            '/project/': [{ text: '', link: '/' }],
            '/database/mongoDB/': [
                { text: '', link: '/' },
                {
                    text: '认识MongoDB',
                    link: '/database/mongodb/01-MongoDB'
                }
            ],
            '/database/redis/': [{ text: '', link: '/' }],
            '/database/mysql/': [{ text: '', link: '/' }],
            '/go/': [
                { text: 'Go', link: '/go/' },
                { text: '起步', link: '/go/01-基础' },
                { text: '数组与切片', link: '/go/02-数组与切片' },
                { text: '流程控制与循环', link: '/go/03-流程控制与循环' },
                { text: 'map', link: '/go/04-map' },
                { text: '函数', link: '/go/05-函数' },
                { text: '结构体与方法', link: '/go/06-结构体与方法' },
                { text: '接口', link: '/go/07-接口' },
            ],
            '/utils/git/': [
                { text: 'Git', link: '/utils/git/' },
                { text: '基本配置及常用命令', link: '/utils/git/01' },
                { text: '常见使用场景', link: '/utils/git/02' },
                { text: '多人协作', link: '/utils/git/03' },
            ],
            '/utils/docker/': [
                { text: 'Docker', link: '/utils/docker/' },
                { text: 'docker', link: '/utils/docker/01-docker' },
                { text: 'docker-compose', link: '/utils/docker/02-docker-compose' },
                { text: 'Dockerfile', link: '/utils/docker/03-Dockerfile' },
                { text: 'CI/CD', link: '/utils/docker/04-ci' },
            ],
            '/other/': [
                { text: '概览', link: '/other/' },
                { text: '研发准备', link: '/other/01' }
            ],
            '/interview/': [{ text: '面试', link: '/interview/' }]
        },
        // lastUpdated: '更新时间',
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
