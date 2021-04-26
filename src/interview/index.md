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

## 在 React 项目中，想要进行逻辑复用,有哪些方案？

### 组件逻辑复用、组件视图复用

#### 逻辑复用：HOC（高阶组件）

> HOC（高阶组件）类似于高阶函数，在使用高阶组件时，传入一个组件，会返回一个组件。 举个我们使用频率比较多的例子 - withRouter

```javascript
function Acmp(props) {
    const { history, localtion, match } = props
    return <div>view</div>
}

const Bcmp = withRouter(Acmp)
```

`Acmp`组件本身不具备路由相关信息；但是`Acmp`中想要使用路由相关的信息，这是就可以使用`withRouter()`使`Acmp`拥有路由信息

`withRouter()`这个高阶组件的作用就是复用传递给视图组件路由信息的逻辑；调用`withRouter()`将`Acmp`组件传递进去，`withRouter()`返回一个`Bcmp`；调用`Bcmp`组件时，会调用`Acmp`组件，并将路由信息传递给`Acmp`

原理如下：

```javascript
const withRouter = (Cmp) => {
    return () => <Route component={Cmp}>
}
```

#### hooks

> `hooks`的出现，主要目的就是解决逻辑复用的问题，相比高阶组件，`hooks` 的使用更加灵活，更自由。以`Router`的`hooks`对比`withRouter`；使用`withRouter`时，会一次性将路由所有相关数据导入组件，而 `hooks` 我们按照需求汁倒入`location`和`history`等；另外一个组件中，用`redux`相关数据，有需要路由信息时，结果如下

```javascript
function Acmp(props) {
    const { history, location, match } = props
    return <div>view</div>
}

const Bcmp = withRouter(Acmp)
const Ccmp = connect(state => state)(Bcmp)
```

复用一个逻辑就需要在外面包一层，使用起来极不方便；使用 `hooks` 就比这方便得多且灵活

#### render props

render props 同样是 react 中，复用逻辑的小技巧，并不是标准定义的 API。 简单来说，就是组件具有一个 `render` 属性，该属性接收的是一个函数，该组件中要渲染的视图是 `render` 属性的返回值。 举一个我们使用最多的常见，`Route` 组件的 `render` 属性。

```javascript
<Route path="/home" render={() => <Home />} />
```

`Route` 组件中得这个 `render` 属性就是一个关于 render props 得实际应用；将组件内要渲染得视图放在 `render` 属性得返回值中，而组件本身是一个路由逻辑得公用。这样就做到了功能复用而视图自定义。

Route 简易原理如下：

```javascript
function Route(props) {
    const { path, render } = props
    if (matchPath(path)) {
        return (
            <RouterContext.Consumer>
                {context => render(context)}
            </ROuterContext.Consumer>
        )
    }
    return null
}
```

> 高阶组件或 hook，通常用在单一的逻辑复用，比如实时获取当前滚动条位置，或定义 `state`，副作用处理等，都是单一的逻辑。 而 render props 通常是一个完整的功能复用，只是该功能中视图或部分视图需要由使用者定义，比如，弹窗功能，路由功能 等，项目中使用到这些功能的地方有很多，但是使用时，视图可能有差异

## 在 React 中，针对类组件 和 函数组件，分别怎么去进行性能优化？

React 中，如果组件更新了，会携带它的子孙级组件一起进行更新，虽然组件更新时，会有 diff 约束 DOM 更新。 但组件更新时的 diff，也会消耗很多性能。 如何避免项目中不必要的组件更新就是我们必须要面对的问题。 如果是类组件我们可以使用 `shouldComponentUpdate` 或者`PureComponent` , 函数组件则可以使用 hooks `useMemo()`
::: tip 注意
不管你使用的是哪种优化手段，`state` 一定是一个不可变值，否则拿不到组件更新前的数据， 也就没有办法进行对比，优化也就无从谈起。<br />
官网手册：[React.memo](https://reactjs.org/docs/react-api.html#reactmemo)、[React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
:::

## Vue3 中 Teleport 的作用是什么

> 他的作用就是将一个嵌套在组件内部的某些内容可以渲染到当前组件外部。
> 假设我们有一个 modal 组件，该组件分为触发 modal 打开的 button 以及模态框本体

```HTML
<div style="position: relative;">
    <button @click="modalOpen = true">    Open full screen modal!  </button>
    <telepot to="body">
        <div v-if="modalOpen" class="modal">
            I'm a modal!
            <button @click="modalOpen = false">Close</button>
        <div>
    </telepot>
</div>
```

::: tip  

### teleport 可以包含 vue 组件使用么？

可以，当 teleport 包含的是 vue 组件时，只是将该组件渲染到对应的标签当中，他的 props 等依然是从该组件的父组件进行注入。

### 可以使用多个 teleport 指向同一标签么？

可以的，就比如有一个复用的 modal 组件，他在多个地方被使用时会被指向相同标签比如 body。这时将会按照顺序进行追加，后挂载的元素会在较早挂载元素之后的位置。
:::


## 说一下vue3的composition api?
> composition api意为组合式api，其主要是代码组织结构上的变动。vue2版本的options api，通过一个配置集合将代码划分为多个部分，使得代码组织结构比较清晰，比如父组件直接传入的数据存放于`props`，方法存放于`methods`等，但是其代码逻辑复用方面一直表现得不是很友好。composition api就是用于解决该问题，在vue3当中新增加了一个生命周期函数为`setup`。`setup`将在创建组件之前被执行，一旦`props`被解析时，`setup`将服务于composition api充当入口点。从使用角度来讲composition api主要有以下几点与options api不同响应式数据声明改变，通过`ref/reactive`两个方法均可以声明响应式数据，但是两者使用方式略有不同。`ref`所声明的响应式变量将会返回一个包含有value属性的对象，value的值就是该响应式变量所对应的值。所以在不论在获取还是改变ref声明的响应式变量时都需要通过.value进行操作。`reactive`返回的则是通过`Proxy`处理后的对象。使用生命周期函数时，变为从vue中引入对应生命周期函数例如`onMounted`，生命周期函数接受一个函数作为参数，该函数将会在对应生命周期阶段被执行。`watch`使用方式改变，`watch`作为函数接受至少两个参数，第一个参数为被`watch`的响应式数据，第二个参数为回调函数。当`watch`接受的响应式数据不同会有不同的使用方式，当`watch`的数据为通过`ref`声明的响应式变量时，`watch`直接接受`ref`响应式变量如`watch(refValue)`。当`watch`数据为通过`reactive`声明时，需要传入一个函数，该函数返回reactive变量如`watch(() => reactiveValue.value)`。同时新增watchEffect，他会收集内部依赖，当内部依赖发生改变时就会被执行。`props`现在作为`setup`的第一个参数进行接收，使用`props`时可以通过vue暴露的`toRefs`方法将`props`上的属性转为独立的`ref`响应式变量，从而进行使用。在`setup`当中代码将可以根据功能进行组织并提取，这极大程度的解决了以往代码可读性较低以及逻辑服用难的缺点。
> ### composition api是强制使用的么？我还可以在vue3中使用options api的方式进行开发么？
> composition api并不被强制使用，他只是在大型项目中对于代码复用以及逻辑提取上有很大的有点，并且他极大的提高了代码可读性。vue3是向下兼容的，在vue3当中依然可以通过options api进行开发。同时尤大本人曾在Vue Mastery上表示过，对于新手来讲，options api的学习可能对于上手vue来说更加快速。
> ### 我还可以在setup中通过this来使用实例上的属性么？
> 不可以，因为`setup`执行是在组件创建之前，这时还并没有组件实例，所以在setup中并没有this，如果希望使用一些实例上的方法，可以通过`getCurrentInstance`方法先获取实例在进行操作。