import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Forest notes',
    description: '学习笔记、技术分享、深入思考',
    lastUpdated: true,
    base: '/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outline: 3,
        returnToTopLabel: 'Top up',
        siteTitle: false,
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档',
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                },
                            },
                        },
                    },
                },
            },
        },
        nav: [
            {
                text: 'front end',
                items: [
                    { text: 'vue', link: '/front-end/vue/' },
                    { text: 'react', link: '/front-end/react/' },
                    { text: 'react-native', link: '/front-end/react-native/' },
                    { text: 'flutter', link: '/front-end/flutter/' },
                    { text: 'electron', link: '/front-end/electron/' },
                    { text: 'typescript', link: '/front-end/typescript/' },
                ],
            },
            {
                text: 'backend',
                items: [
                    {
                        text: 'Go',
                        items: [
                            { text: 'gin', link: '/backend/go/gin/' },
                            { text: 'echo', link: '/backend/go/gin/' },
                        ],
                    },
                    {
                        text: 'Node.js',
                        items: [
                            {
                                text: 'Nest',
                                link: '/backend/nodejs/nestjs/',
                            },
                            {
                                text: 'Koa',
                                link: '/backend/nodejs/nestjs/',
                            },
                        ],
                    },
                ],
            },
            {
                text: 'Algorithms',
                link: '/algorithms/',
            },
        ],
        sidebar: {
            '/algorithms/': [
                {
                    text: 'Algorithms',
                    link: '/algorithms/',
                    items: [
                        {
                            text: '时间复杂度',
                            link: '/algorithms/01-时间复杂度',
                        },
                        {
                            text: '空间复杂度',
                            link: '/algorithms/02-空间复杂度',
                        },
                    ],
                },
            ],
            '/front-end/vue': [],
            '/front-end/react': [],
            '/front-end/react-native': [],
            '/front-end/flutter': [],
            '/front-end/electron': [],
            '/front-end/typescript': [],
            '/backend/go/gin/': [
                { text: 'Restful API', link: '/backend/go/gin/01' },
            ],
            '/backend/nodejs/nestjs/': [],
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/forest-211' },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright ©2021-present Forest-211',
        },
    },
});
