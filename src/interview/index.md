---
title: 面试题
---

## keep-alive  组件有什么作用？

> 主要用于保留组件状态或避免重新渲染。 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

## 说下 vue 生命周期钩子函数?

> -Vue 实例创建阶段的生命周期函数
>
> -   初始化事件及生命周期函数
>     -   brforeCreate() ---------- data 和 methods 中的数据都还没有初始化
>     -   创建中，正在初始化 data 和 methods
>     -   Created() -------------- 如果需要操作 data 中的数据或操作方法，可以放在这个函数里
> -   开始编译模板
>     -   beforeMount() --------- 模板编译好了，但是还没有放到页面中去 - 把编译好的模板放到浏览器中去进行渲染
>     -   mounted() ------------- 页面渲染完成，Vue 实例初始化完毕
> -   Vue 实例运行阶段的生命周期函数
>     -   如果数据发生改变
>         -   beforeUpdate() -------- 页面数据还没有更新，但是 data 中的数据已经更新完毕，页面与数据不同步
>     -   Diff, 这一步执行，是先根据 data 中的最新数据，在内存中重新计算出一份 dom 树，对比新老两个 dom 树之间的差异...
>         -   update() ---------------- 这时候，数据和页面已经完成更新
> -   Vue 实例销毁阶段的生命周期函数
>     -   beforeDestroy() -------- 销毁执行之前，实例身上所有的数据和事件，指令等等都可以用，此刻还没有真正执行销毁
>     -   destroyed() ------------- 执行这个函数的时候，组件中的数据，方法，指令，过滤器等等完全销毁

## Vue 中 computed 和 watch 区别?

> -   computed  是计算属性，依赖其他属性计算值，并且 computed  的值有缓存，只有当计算值变化才会返回内容。
> -   watch  监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

## React 的组件间通信都有哪些形式？

> -   父传子：在 React 中，父组件调用子组件时可以将要传递给子组件的数据添加在子组件的属性中，在子组件中通过 props 属性进行接收。这个就是父组件向子组件通信。
> -   子传父：React 是单向数据流，数据永远只能自上向下进行传递。当子组件中有些数据需要向父级进行通信时，需要在父级中定义好回调，将回调传递给子组件，子组件调用父级传递过来的回调方法进行通信。
> -   跨组件通信 - context。使用 context API，可以在组件中向其子孙级组件进行信息传递。

## React 中如何实现路由懒加载？

在 React 16 中，新增了 lazy 方法，通过 lazy 方法可以轻松实现组件懒加载，当然要实现路由懒加载的话，其实也只需要把路由组件结合 lazy 使用即可。   参考代码如下：

```javascript
import { Route } from 'react-router-dom'
import React, { Suspense } from 'react'
const HomeView = React.lazy(() => import('./home'))
function App() {
    return (
        <div>
            <h1>路由懒加载</h1>              
            <Route
                path="/"
                exact
                render={() => {
                    return (
                        <Suspense
                            fallback={<div>组件Loading进来之前的占位内容</div>}
                        >
                                          
                            <HomeView />
                                  
                        </Suspense>
                    )
                }}
            />
                       
        </div>
    )
}
export default App
```

在上述代码中使用 lazy 引入了一个动态组件，然后将该组件放入了根路由中。这样的话只有用户访问网站首页时，才会动态加载这个组件。注意在 React 规范中，lazy 和 Suspense 必须配合使用，lazy 引入的动态组件必须要放入 Suspense 中，Suspense 的 fallback 属性是 lazy 的组件没有加载进来之前的占位内容。

## React 的生命周期函数都有哪些，分别有什么作用？

React 的生命周期已经经历了 3 次改动，最新的版本可以看下图：

> -   挂载阶段：
>
>     -   constructor: 初始化组件，初始化组件的 state 等。
>     -   static getDerivedStateFromProps()：该函数用于将 props 中的信息映射到 state 中。
>     -   render: 生成虚拟 DOM
>     -   componentDidMount：组件挂载完成，通过在该函数中去处理副作用 更新阶段：
>     -   static getDerivedStateFromProps()
>     -   shouldComponentUpdate()：该生命周期函数用于判断是否要进行组件更新。
>     -   render()：生成虚拟 DOM
>     -   getSnapshotBeforeUpdate()：组件已经完成 diff，即将更新真实 DOM，用户获取上一次的 DOM 快照。该函数必须搭配 componentDidUpdate 一块使用，返回值会变成 componentDidUpdate 第三个参数。
>     -   componentDidUpdate()： 组件更新完成，通常在该函数中进行副作用处理。
>
> -   即将卸载：
>     -   componentWillUnmount：组件即将卸载，用于删除组件添加到全局的数据或事件。

## 说一下 React Hooks 在平时开发中需要注意的问题和原因?

-   不要在循环，条件或嵌套函数中调用 Hook，必须始终在 React 函数的顶层使用 Hook

这是因为 React 需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用 Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。

-   使用 useState 时候，使用 push，pop，splice 等直接更改数组对象的坑

使用 push 直接更改数组无法获取到新值，应该采用析构方式，但是在 class 里面不会有这个问题

代码示例

```javascript
function Indicatorfilter() {
    let [num, setNums] = useState([0, 1, 2, 3])
    const test = () => {
        // 这里坑是直接采用 push 去更新 num
        // setNums(num)是无法更新 num 的
        // 必须使用 num = [...num ,1]
        num.push(1)
        // num = [...num ,1]
        setNums(num)
    }
    return (
        <div className="filter">
            <div onClick={test}>测试</div>
            <div>
                {num.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    )
}

class Indicatorfilter extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            nums: [1, 2, 3]
        }
        this.test = this.test.bind(this)
    }

    test() {
        // class 采用同样的方式是没有问题的
        this.state.nums.push(1)
        this.setState({
            nums: this.state.nums
        })
    }

    render() {
        let { nums } = this.state
        return (
            <div>
                <div onClick={this.test}>测试</div>
                <div>
                    {nums.map((item: any, index: number) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            </div>
        )
    }
}
```

-   useState 设置状态的时候，只有第一次生效，后期需要更新状态，必须通过 useEffect

看下面的例子

TableDeail 是一个公共组件，在调用它的父组件里面，我们通过 set 改变 columns 的值，以为传递给 TableDeail 的 columns 是最新的值，所以 tabColumn 每次也是最新的值，但是实际 tabColumn 是最开始的值，不会随着 columns 的更新而更新

```javascript
const TableDeail = ({ columns }: TableData) => {
    const [tabColumn, setTabColumn] = useState(columns)
}

// 正确的做法是通过useEffect改变这个值
const TableDeail = ({ columns }: TableData) => {
    const [tabColumn, setTabColumn] = useState(columns)
    useEffect(() => {
        setTabColumn(columns)
    }, [columns])
}
```

-   善用 useCallback

父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用 useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。

-   不要滥用 useContext

可以使用基于 useContext 封装的状态管理工具。

## Token 一般是存放在哪里? Token 放在 cookie 和放在 localStorage、sessionStorage 中有什么不同?

> -   Token 其实就是访问资源的凭证。
> -   一般是用户通过用户名和密码登录成功之后，服务器将登陆凭证做数字签名，加密之后得到的字符串作为 token。
> -   它在用户登录成功之后会返回给客户端，客户端主要有这么几种存储方式：存储在 localStorage 中，每次调用接口的时候都把它当成一个字段传给后台存储在 cookie 中，让它自动发送，不过缺点就是不能跨域拿到之后存储在 localStorage 中，每次调用接口的时候放在 HTTP 请求头的 Authorization 字段里
> -   所以 token 在客户端一般存放于 localStorage，cookie，或 sessionStorage 中。将 token 存放在 webStroage 中，可以通过同域的 js 来访问 。这样会导致很容易受到 xss 攻击，特别是项目中引入很多 第三方 js 类库的情况下。如果 js 脚本被盗用，攻击者就 可以轻易访问你的网站，webStroage 作为一种储存机制，在传输过程中不会执行任何安全标准。
> -   XSS 攻击：cross-site Scripting（跨站脚本攻击）是一种注入代码攻击 。恶意攻击者在目标网站上注入 script 代码，当访问者浏览网站的时候通过执行注入的 script 代码达到窃取用户信息，盗用用户身份等。
> -   将 token 存放在 cookie 中可以指定 httponly，来防止被 Javascript 读取，也可以指定 secure，来保证 token 只在 HTTPS 下传输。缺点是不符合 Restful 最佳实践，容易受到 CSRF 攻击。
> -   CSRF 跨站点请求伪造(Cross—Site Request Forgery)，跟 XSS 攻击一样，存在巨大的危害性。简单来说就是恶意攻击者盗用已经认证过的用户信息，以用户信息名义进行一些操作（如发邮件、转账、购买商品等等）。由于身份已经认证过，所以目标网站会认为操作都是真正的用户操作的 。CSRF 并不能拿到用户信息，它只是盗用的用户凭证去进行操作。

## WebSocket 是怎么实现点对点通信和广播通信的？

> webSocket 是一种全双工通信协议。websocket 让服务端和客户端通信变得简单。最大的特点是可以通过服务端主动推送消息到客户端。前端基于 nodejs 和 WebSocket 实现点对点及广播通信。
>
> -   广播通信顾名思义是类似广播一样给多个人进行广播消息。
> -   点对点通信顾名思义就是一对一的通信，例如多人实时聊天，可以指定用户来发送消息。点对点通信中需要注意服务端需要记录每个 socket 客户端的连接 ，需要将客户端及服务端 socket 对象关联起来。广播数据的时候，广播指定对象就可以了
> -   WebSocket 区分广播通信及点对点通信核心在于区分每一个连接的 socket 对象。广播通信需要对于非自身的所有连接的 socket 对象进行通信。而点对点通信，通过关联用户及 socket 对象，且保存每一个 socket 连接，查找指定的 socket 对象，来达到发送指定 socket 连接的目的。
