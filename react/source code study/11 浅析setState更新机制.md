# setState更新机制

个组件除了可以接收外界传递的状态外，还可以拥有自己的状态，并且这个状态也可以通过 `setState` 来进行更新。那么 `setState` 是通过什么机制来更新 `state` 的呢？了解其更新机制，对于开发 React 应用以及性能优化都有很大帮助，那么本节内容带大家来学习 `setState` 的使用以及更新机制。

## setState 使用

```jsx
setState(updater, callback)
```

`setState` 可以接收两个参数：第一个参数可以是对象或函数，第二个参数是函数。
第一个参数是对象的写法：

```jsx
this.setState({
    key: newState
});
```

第一个参数是函数写法：

```jsx
this.setState((prevState, props) => {
  return {
      key: prevState.key // prevState 是上一次的 state，props 是此次更新被应用时的 props
  }
})
```

那么，这两种写法的区别是什么呢？
我们来看下面的例子，有一个按钮实现每次点击自增1，输入框展示当前的值是多少。

```jsx
class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      val: 0
    }
  }

  handleClick () {
    this.setState({
        val: this.state.val + 1
    })
  }

  render () {
    return (
      <div className="App">
        <input type="text" value={this.state.val} disabled/>
        <input type="button" onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}
```

假想一下，如果我们在 `handleClick` 方法内调两次 `setState`，是不是每次点击就自增2了呢？

```jsx
 handleClick () {
    this.setState({
        val: this.state.val + 1
    })
     this.setState({
        val: this.state.val + 1
    })
  }
```

然而，代码并不会像期待的那样工作。每次点击按钮，依然是自增1。这是因为调用 `setState` 其实是异步的，也就是 `setState` 调用之后，`this.state` 不会立即映射为新的值。上面代码会解析为以下形式：

```jsx
// 后面的数据会覆盖前面的更改，所以最终只加了一次.
Object.assign(
  previousState,
  {val: state.val + 1},
  {val: state.val + 1},
)
```

如果想基于当前的 `state` 来计算出新的值，那么 `setState` 第一个参数不应该像上面一样传递一个对象，而应该传递一个函数。

```jsx
 handleClick () {
    this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
     this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
 }
```

此时，在 `handleClick` 方法内调两次 `setState`，就能实现每次点击都自增2了。
传递一个函数可以让你在函数内访问到当前的 `state` 值。 `setState` 的调用是分批的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突。

> 在上面我们调用了两次 `setState`，但 `state` 的更新会被合并，所以即使多次调用 `setState`，实际上可能也只是会重新渲染一次。

`setState` 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 `componentDidUpdate` 生命周期内执行。通常建议使用 `componentDidUpdate` 来代替此方式。在这个回调函数中你可以拿到更新后 `state` 的值。

```jsx
this.setState({
    key1: newState1,
    key2: newState2,
    ...
}, callback) // 第二个参数是 state 更新完成后的回调函数
```

通过上面内容，可以知道调用 `setState` 时，组件的 `state` 并不会立即改变， `setState` 只是把要修改的 `state` 放入一个队列， `React` 会优化真正的执行时机，并出于性能原因，会将 `React` 事件处理程序中的多次`React` 事件处理程序中的多次 `setState` 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要，本小节后续会有详细讲解。

> 我们不能直接使用 `this.state.key = value` 方式来更新状态，这种方式 React 内部无法知道我们修改了组件，因此也就没办法更新到界面上。所以一定要使用 React 提供的 `setState` 方法来更新组件的状态。



## 调用 `setState` 发生了什么

我们知道修改 state 方法有两种：

1. 构造函数里修改 `state` ，只需要直接操作 `this.state` 即可， 如果在构造函数里执行了异步操作，就需要调用 `setState` 来触发重新渲染。
2. 在其余的地方需要改变state的时候只能使用 `setState`，这样 React 才会触发 UI 更新。

所以， setState 时会设置新的 `state` 并更新 UI。

当然，`state` 的更新可能是异步的，出于性能考虑，`React` 可能会把多个 `setState` 调用合并成一个调用。那么 state 的更新何时是同步何时又是异步的呢？接下来我们一起深入学习下 setState 的更新机制。



## 图解 setState 更新机制

![图片描述](https://gitbook-media.oss-ap-southeast-1.aliyuncs.com/pics/5f0c1f7d0001253010080588.png)

通过这张图，我们可以看到，在调用 setState 设置 newState 时，会先把 newState 放入队列，如果没有在事务流中，遍历所有的 dirtyComponents 调用 `batchedUpdates` 方法进入更新流程，进入流程后，会将 `isInsideEventHandler` 设置为 `true` 。如果在事务流中，将需更新的组件放入 `dirtyComponents` 中，先将需更新的组件存起来，稍后更新。

所以，在正处于一个更新流程中调用 `setState` 并不会立即更新 `state` ，此时 `isInsideEventHandler` 为 `true`，所以会将更新放入 `dirtyComponents` 中等待稍后更新。
setState 使用的是批量更新策略，通过事务的方式实现 `state` 的批量更新，以此达到性能提升。所以说，setState 的更新并不是绝对的同步，但也不能说是绝对的异步，接下来我们一起探讨下 setState 更新方式。



## 事件中的调用 setState

React 是通过合成事件实现了对于事件的绑定，在组件创建和更新的入口方法 `mountComponent` 和 `updateComponent` 中会将绑定的事件注册到 `document` 节点上，相应的回调函数通过 `EventPluginHub` 存储。
当事件触发时，`document` 上 `addEventListener` 注册的 `callback` 会被回调，回调函数为 `ReactEventListener.dispatchEvent` ，它是事件分发的入口方法。在事件的处理中也是通过同样的事务完成的，当进入事件处理流程后，该事务的 `isBatchingUpdates` 为 `true` ，如果在事件中调用 `setState` 方法，也会进入 `dirtyComponent` 流程，即所谓的异步。上述 demo 中可以体现。



## 原生事件绑定和 setTimeout 中 setState

原生事件是指非react合成事件，原生自带的事件监听 `addEventListener` ，或者也可以用原生 js 直接 `document.querySelector().onclick` 这种绑定事件的形式都属于原生事件。
原生事件绑定不会通过合成事件的方式处理，自然也不会进入更新事务的处理流程。`setTimeout` 也一样，在 `setTimeout` 回调执行时已经完成了更新组件流程，所以不会放入 `dirtyComponent` 进行异步更新，其结果自然是同步的。

```jsx
// 这里只列出了 setState 在 原生事件 和 setTimeout 两种场景中的使用，完整代码在本节末尾 demo 地址获取。
import React from "react"

class App extends React.Component {
  state = {
    native: 'old native value',
    timeout: 'old timeout value'
  }

  componentDidMount() {
    document.getElementById('native').addEventListener('click', this.handleNative)
  }

  handleNative = () => {
    this.setState({
      native: 'new native value'
    })
    console.log('this.state.native', this.state.native) // new native value
  }

  handleTimeout = () => {
    setTimeout(() => {
      this.setState({
        timeout: 'new timeout value'
      })
      console.log('this.state.timeout', this.state.timeout) // new timeout value
    }, 100)
  }

  render() {
    return (
      <div className="App">
        <button id="native">原生事件：{this.state.native}</button>
        <button onClick={this.handleTimeout}>setTimeout：{this.state.timeout}</button>
      </div>
    )
  }
}

export default App
```