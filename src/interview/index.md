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

## 客户端缓存有几种方式?浏览器出现 from disk、from memory 的 策略是啥?

1.强缓存

-   服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。
-   `Cache-control` （相对值）、 `Expries`（绝对值）
-   Expries 是 http1.0 的标准

```javascript
let nowTime = new Date()
nowTime.setTime(new Date().getTime() + 3600 * 1000)
ctx.set('Expires', nowTime.toUTCString())
```

到了`HTTP/1.1`，`Expire`已经被`Cache-Control`替代`ctx.set("Cache-control","max-age=3600") // 设置缓存时间 3600s`

-   public：所有内容都将被缓存（客户端和代理服务器都可缓存） - private：所有内容只有客户端可以缓存，`Cache-Control`的默认取值 - no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定 - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存 - max-age=xxx ：缓存内容将在 xxx 秒后失效`Cache-Control`优先级比`Expires`高`from memory cache`代表使用内存中的缓存，`from disk cache`则代表使用的是硬盘中的缓存，浏览器读取缓存的顺序为`memory –> disk`。

-   协商缓存让客户端与服务器之间能实现缓存文件是否更新的验证、提升缓存的复用率，将缓存信息中的`Etag`和`Last-Modified`通过请求发送给服务器，由服务器校验，返回 304 状态码时，浏览器直接使用缓存。出现` from disk`、`from memory` 的策略是强缓存。
    -   `Last-Modify/if-Modify-Since
    -   ETag/if-None-Macth`
    -   协商缓存的标识也是在响应报文的 HTTP 头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：`Last-Modified / If-Modified-Since`和`Etag / If-None-Match`，其中`Etag / If-None-Match`的优先级比`Last-Modified / If-Modified-Since`高。
    -   缓存关系强缓存优于协商缓存，强缓存中 `Cache-control` 优于 `Expries`，协商缓存中`ETag/ If-None-Match` 优先级高于 `Last-Modified / If-Modified-Since`。

## 说一下 CORS 的简单请求和复杂请求的区别?

-   `CORS(Cross-origin resource sharing)`，跨域资源共享，是一份浏览器技术的规范，用来避开浏览器的同源策略。相关头部设置如下：
    -   `Access-Control-Allow-Origin` 指示请求的资源能共享给哪些域。 `Access-Control-Allow-Credentials` 指示当请求的凭证标记为 `true` 时，是否响应该请求。 `Access-Control-Allow-Headers` 用在对预请求的响应中，指示实际的请求中可以使用哪些 `HTTP` 头。 `Access-Control-Allow-Methods` 指定对预请求的响应中，哪些 `HTTP` 方法允许访问请求的资源。 `Access-Control-Expose-Headers` 指示哪些 `HTTP` 头的名称能在响应中列出。 `Access-Control-Max-Age` 指示预请求的结果能被缓存多久。 `Access-Control-Request-Headers` 用于发起一个预请求，告知服务器正式请求会使用那些 `HTTP` 头。 `Access-Control-Request-Method` 用于发起一个预请求，告知服务器正式请求会使用哪一种 `HTTP` 请求方法。 `Origin` 指示获取资源的请求是从什么域发起的。
    -   `CORS`可以分成两种简单请求和复杂请求。简单请求是满足以下下条件的请求
    -   HTTP 方法是下列之一
        -   HEAD
        -   GET
        -   POST
    -   HTTP 头信息不超出以下几种字段
        -   Accept
        -   Accept-Language
        -   Content-Language
        -   Last-Event-ID
        -   Content-Type，但仅能是下列之一
        -   application/x-www-form-urlencoded
        -   multipart/form-datatext/plain`
    -   反之就是复杂请求，复杂请求表面上看起来和简单请求使用上差不多，但实际上浏览器发送了不止一个请求。其中最先发送的是一种"预请求"，此时作为服务端，也需要返回"预回应"作为响应。预请求实际上是对服务端的一种权限请求，只有当预请求成功返回，实际请求才开始执行。

## 节流和防抖分别是什么？在什么场景下使用？请分别实现一个节流函数和一个防抖函数

## 怎么禁止让 js 读取 cookie？怎么让 cookie 只在 HTTPS 下传输？

> 由于 cookie 会存放在客户端，一般情况下会保存一些凭证及状态信息，为了防止 cookie 泄露造成安全问题。可以这只 cookie 的 HttpOnly 属性，那么通过程序(JS 脚本、Applet 等)将无法读取到 Cookie 信息，这样能有效的防止 XSS 攻击。cookie 中有个属性 secure，当该属性设置为 true 时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该 cookie 信息，所以不会被窃取到 Cookie 的具体内容。就是只允许在加密的情况下将 cookie 加在数据包请求头部，防止 cookie 被带出来。secure 属性是防止信息在传递的过程中被监听捕获后信息泄漏。但是这两个属性并不能解决 cookie 在本机出现的信息泄漏的问题。

## v-if 和 v-for 为什么不能连用？

> v-for 比 v-if 优先，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候 。可以采取多层包裹来解决性能损耗问题。例如外层给标签绑定指令 v-if 或者是内层标签绑定 v-if

## 单页面应用和多页面应用区别及优缺点?

-   单页应用：
    -   优点：
        -   用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点 SPA 对服务器压力较小
        -   前后端分离
        -   页面切换体验好
    -   缺点：
        -   不利于 SEO
        -   导航不可用，需要自己实现导航
        -   初次加载好事长
        -   页面复杂度提高
-   多页应用
    -   优点：
        -   对于 SEO 友好
        -   容易扩展
        -   更易的数据分析
    -   缺点：
        -   程序开发成本高
        -   增加服务端压力，多页面会不停的加载
        -   用户体验相对较差

## v-model  该如何实现？

> v-model 本质上是 v-on 和 v-bind 的语法糖。
> v-model 在内部为不同元素抛出不同的事件，如：text 和 textarea 元素使用 value 属性和 input 事件；checkbox 和 radio 使用 checked 属性和 change 事件；select 字段将 value 作为 prop 并将 change 作为事件。

-   v-model 作用在普通表单上

```javascript
<input v-model="myvalue" />
//  等同于
<input v-bind:value="myvalue" v-on:input="myvalue=$event.target.value">
```

v-model 作用在组件上 父组件 v-model 语法糖本质上可以修改为 `<child :value="message" @input="function(e){message = e}"></child>`在组件的实现中，我们是可以通过 v-model 属性 来配置子组件接收的 prop 名称，以及派发的事件名称。例如：

```javascript
// 父组件
//html
<mycom v-model="myvalue" />
//等同于
<mycom
    :value="myvalue"
    @input="(e)=>{myvalue = e}"
/>

//js
new Vue({
    el: "#app",
    components:{
        mycom
    },
    data: {
        myvalue: "123"
    }
})

// 子组件
let mycom = {
    props:['value'],
    template:`<div><input :value="value"  @input="fn" /></div>`,
    methods:{
        fn(e){
            this.$emit('input',e.target.value)
        }
    }
}

```

## vue2 中为什么检测不到数组的变化，如何解决?

由于由 JavaScript 的限制，Vue 不能检测数组变动。解决方案是通过全局 Vue.set 或者用实例方法 vm.$set 来修改。同样也可以通过变异方法 splice 来修改数组触发数据响应式
