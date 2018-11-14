export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
            { path: '/user/register', component: './User/Register' },
            { path: '/user/register-result', component: './User/RegisterResult' },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
            // home
            { path: '/', redirect: '/home/minihome' },
            {
                path: '/home',
                icon: 'home',
                name: 'home',
                routes: [
                    { path: '/home', redirect: '/home/minihome' },
                    {
                        path: '/home/minihome',
                        name: 'home',
                        component: './home/minihome',
                    }
                ],
            },
            // oils
            {
                path: '/oils',
                icon: 'oils',
                // hideInMenu: true,
                name: 'oils',
                routes: [
                    { path: '/oils', redirect: "/oils/minioils" },
                    {
                        path: '/oils/minioils',
                        name: 'index',
                        component: './oils/index',
                    },
                    {
                        path: '/oils/ministream',
                        name: 'stream',
                        component: './oils/stream',
                    },
                ],
            },

            // manage
            {
                path: '/manage',
                icon: 'setting',
                hideInMenu: true,
                name: 'manage',
                routes: [{
                        path: '/manage/user',
                        icon: 'usergroupadd',
                        name: 'user',
                        component: './manage/manage',
                    },
                    {
                        path: '/manage/rolemanagement',
                        icon: 'user-add',
                        name: 'rolemanagement',
                        component: './manage/role-management',
                    },
                    {
                        path: '/manage/meunmanagement',
                        icon: 'bars',
                        name: 'meunmanagement',
                        component: './manage/meun-management',
                    },
                ],
            },
            // store
            {
                path: '/store',
                name: 'store',
                // hideInMenu: true,
                icon: 'user',
                routes: [
                    { path: '/store', redirect: '/store/running' },
                    {
                        path: '/store/running',
                        name: 'running',
                        icon: 'user',
                        component: './store/runningWater',
                    },
                    {
                        path: '/store/index',
                        name: 'store',
                        icon: 'user',
                        component: './store/before/store',
                    },
                    {
                        path: '/store/storemanage',
                        name: 'storemanage',
                        icon: 'user',
                        component: './store/storemanage',
                    },
                    {
                        path: '/store/beform',
                        name: 'before',
                        icon: 'user',
                        routes: [{
                            path: '/store/beform/store',
                            name: 'form',
                            icon: 'user',
                            component: './store/Form',
                        }, ],
                    },
                ],
            },
            // dashboard

            {
                path: '/dashboard',
                name: 'dashboard',
                hideInMenu: true,
                icon: 'dashboard',
                routes: [{
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        component: './Dashboard/Analysis',
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                        component: './Dashboard/Monitor',
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
                        component: './Dashboard/Workplace',
                    },
                ],
            },
            // forms
            {
                path: '/form',
                icon: 'form',
                hideInMenu: true,
                name: 'form',
                routes: [{
                        path: '/form/basic-form',
                        name: 'basicform',
                        component: './Forms/BasicForm',
                    },
                    {
                        path: '/form/step-form',
                        name: 'stepform',
                        component: './Forms/StepForm',
                        hideChildrenInMenu: true,
                        routes: [{
                                path: '/form/step-form',
                                name: 'stepform',
                                redirect: '/form/step-form/info',
                            },
                            {
                                path: '/form/step-form/info',
                                name: 'info',
                                component: './Forms/StepForm/Step1',
                            },
                            {
                                path: '/form/step-form/confirm',
                                name: 'confirm',
                                component: './Forms/StepForm/Step2',
                            },
                            {
                                path: '/form/step-form/result',
                                name: 'result',
                                component: './Forms/StepForm/Step3',
                            },
                        ],
                    },
                    {
                        path: '/form/advanced-form',
                        name: 'advancedform',
                        authority: ['admin'],
                        component: './Forms/AdvancedForm',
                    },
                ],
            },
            // list
            {
                path: '/list',
                icon: 'table',
                hideInMenu: true,
                name: 'list',
                routes: [{
                        path: '/list/table-list',
                        name: 'searchtable',
                        component: './List/TableList',
                    },
                    {
                        path: '/list/basic-list',
                        name: 'basiclist',
                        component: './List/BasicList',
                    },
                    {
                        path: '/list/card-list',
                        name: 'cardlist',
                        component: './List/CardList',
                    },
                    {
                        path: '/list/search',
                        name: 'searchlist',
                        component: './List/List',
                        routes: [{
                                path: '/list/search',
                                redirect: '/list/search/articles',
                            },
                            {
                                path: '/list/search/articles',
                                name: 'articles',
                                component: './List/Articles',
                            },
                            {
                                path: '/list/search/projects',
                                name: 'projects',
                                component: './List/Projects',
                            },
                            {
                                path: '/list/search/applications',
                                name: 'applications',
                                component: './List/Applications',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/profile',
                name: 'profile',
                hideInMenu: true,
                icon: 'profile',
                routes: [
                    // profile
                    {
                        path: '/profile/basic',
                        name: 'basic',
                        component: './Profile/BasicProfile',
                    },
                    {
                        path: '/profile/advanced',
                        name: 'advanced',
                        authority: ['admin'],
                        component: './Profile/AdvancedProfile',
                    },
                ],
            },
            {
                name: 'result',
                hideInMenu: true,
                icon: 'check-circle-o',
                path: '/result',
                routes: [
                    // result
                    {
                        path: '/result/success',
                        name: 'success',
                        component: './Result/Success',
                    },
                    { path: '/result/fail', name: 'fail', component: './Result/Error' },
                ],
            },
            {
                name: 'exception',
                hideInMenu: true,
                icon: 'warning',
                path: '/exception',
                routes: [
                    // exception
                    {
                        path: '/exception/403',
                        name: 'not-permission',
                        component: './Exception/403',
                    },
                    {
                        path: '/exception/404',
                        name: 'not-find',
                        component: './Exception/404',
                    },
                    {
                        path: '/exception/500',
                        name: 'server-error',
                        component: './Exception/500',
                    },
                    {
                        path: '/exception/trigger',
                        name: 'trigger',
                        hideInMenu: true,
                        component: './Exception/TriggerException',
                    },
                ],
            },
            {
                name: 'account',
                icon: 'user',
                hideInMenu: true,
                path: '/account',
                routes: [{
                        path: '/account/center',
                        name: 'center',
                        component: './Account/Center/Center',
                        routes: [{
                                path: '/account/center',
                                redirect: '/account/center/articles',
                            },
                            {
                                path: '/account/center/articles',
                                component: './Account/Center/Articles',
                            },
                            {
                                path: '/account/center/applications',
                                component: './Account/Center/Applications',
                            },
                            {
                                path: '/account/center/projects',
                                component: './Account/Center/Projects',
                            },
                        ],
                    },
                    {
                        path: '/account/settings',
                        name: 'settings',
                        component: './Account/Settings/Info',
                        routes: [{
                                path: '/account/settings',
                                redirect: '/account/settings/base',
                            },
                            {
                                path: '/account/settings/base',
                                component: './Account/Settings/BaseView',
                            },
                            {
                                path: '/account/settings/security',
                                component: './Account/Settings/SecurityView',
                            },
                            {
                                path: '/account/settings/binding',
                                component: './Account/Settings/BindingView',
                            },
                            {
                                path: '/account/settings/notification',
                                component: './Account/Settings/NotificationView',
                            },
                        ],
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
];