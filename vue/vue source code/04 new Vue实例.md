# new Vue()实例

Vue 在使用时都是以实例为单位来初始化运行，从我们最熟悉的根组件（`const app = new Vue()`）到自定义组件，在运行时都是一个个 Vue 实例。因此要理解 Vue，就需要首先理解 Vue 实例。

在实际开发过程中，我们可以用 Vue devtools 来查看 Vue 实例的结构：

```javascript
// index.js
import Vue from 'vue/dist/vue';
import Hello from './hello.vue';
const app = new Vue({
	components: {
		Hello
	},
    template: '<hello foo="foo value"></hello>',
    el: '#app',
});

// hello.vue
export default {
    template: '<div id="app"><h1>Hello</h1><span>{{message}}</span></div>',
    props: ['foo'],
    computed: {
        helloWorld(){
            return 'hello ' + this.message;
        }
    },
    data(){
        return {
            message: 'world'
        }
    },
};
```

在这个例子中我们定义了一个组件 `Hello`，然后将它从 `app` 根组件中进行挂载，最后将 `app` 挂载到`#app` 上。

![图片描述](https://gitbook-media.oss-ap-southeast-1.aliyuncs.com/pics/5fc5a3490001f5a713841022.png)

在 Vue devtools 中可以清晰地看到两个 Vue 实例，且可以查看实例上的各种属性（`data`、`props`、`computed` 等），使我们对 Vue 实例有一个非常直观的印象。

通过这个视图，也可以看到 Vue 实例之间的树状关系。我们使用 HTML 来编写页面时，页面是一个 HTML 树，类似的，当我们使用 Vue 来编写页面时，页面的结构也是一棵树，只是这棵树由 Vue 实例组成。



## Vue 构造函数

当我们需要产生很多实例的时候，就会很自然地想起类。Vue 实例也由 “类” 产生，只不过使用了 ES5 构造函数的形式，这一点在前面讲解 JavaScript 的类时，我们也提到过，Vue 中比较多地使用了构造函数来产生实例。

当我们写下 `import Vue from 'vue'` 时，`Vue` 变量就是指代的 Vue 构造函数，它最原始的定义位于 `core/instance/index.js` 中：

```javascript
function Vue (options) {
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

这段代码比较简单，它定义了一个 `Vue` 构造函数，构造函数中唯一的一行代码是调用了实例的`_init()` 方法。在这段代码的最后，`Vue` 构建函数作为整个模块唯一的成员被导出。

而中间的 5 行 mixin 是在干什么呢？

首先我们需要注意到，在这几行代码中，并没有`_init()` 方法的定义，因此这个方法必然来自下面几行代码。事实上在第一章中，我们已经将 `initMixin()` 作为 mixin 的示例进行了分析，它的作用就是在 `Vue` 构造函数上添加`_init()` 方法。同理，其他的 mixin 也是为了给 Vue 原型对象增加一些新的成员。至于这些成员具体是什么，作用是什么，稍后再做分析。总之就是经过这几个 mixin 的调用之后，`Vue` 构造函数的原型上多了一些成员。



## 初始化

当调用 `new Vue()` 时，就会产生一个 Vue 实例，并调用`_init()` 方法。

```javascript
let uid = 0
Vue.prototype._init = function (options) {
	const vm: Component = this
	// 实例唯一id
	vm._uid = uid++

	// 内部标记，主要用于防止被当成普通对象来监听变化
	vm._isVue = true

	// merge options
	if (options && options._isComponent) {
	  // optimize internal component instantiation
	  // since dynamic options merging is pretty slow, and none of the
	  // internal component options needs special treatment.
	  initInternalComponent(vm, options)
	} else {
	  vm.$options = mergeOptions(
	    resolveConstructorOptions(vm.constructor),
	    options || {},
	    vm
	  )
	}

	vm._renderProxy = vm

	// expose real self
	vm._self = vm
	initLifecycle(vm)
	initEvents(vm)
	initRender(vm)
	callHook(vm, 'beforeCreate')
	initInjections(vm) // resolve injections before data/props
	initState(vm)
	initProvide(vm) // resolve provide after data/props
	callHook(vm, 'created')

	if (vm.$options.el) {
	  vm.$mount(vm.$options.el)
	}
}
```

这个过程中值得注意的一些点：

- `uid` 是一个全局共享的变量，并不在构造函数中，因此每次调用都会 `+1`，这样可以确保每个组件的`_uid` 都不一样。
- `_isVue` 标记对象为 Vue 实例，如果这个组件在后续被当作普通对象来监听变化时，能识别出来这是一个 Vue 实例。
- 如果选项`_isComponent` 为 `true`，则说明组件是一个自定义组件。会调用 `initInternalComponent` 方法，会写入 `parent`/`_parentVnode`/`propsData`/`_parentListeners`/`_renderChildren`/`_componentTag` 属性。如果 `render` 选项存在，还会写入 `render`/`staticRenderFns`。
- 如果不是内部组件，则会合并组件的 constructor（即 Vue 构造函数）的调用参数、options 对象，还有 vm 实例本身的属性（也就是说包括上面的`_uid` 之类的都会合并进去）。（`Vue.options` 是一个预先定义好的配置对象。）
- `_self` 把 `vm` 自己挂上去。
- 初始化
  - 初始化生命周期
  - 初始化事件绑定
  - 初始化 Render
  - 调用钩子 `beforeCreate`
  - 初始化依赖注入 Injections
  - 初始化状态 State
  - 初始化依赖注入 Provide
  - 调用钩子 `created`
- 如果声明了`.el` 属性，则调用 `$mount(el)`

这便是整个初始化的大致过程，由此我们就可以对 Vue 构造函数及其实例初始化的过程有一个大概的认知。在后续的章节中，将不断提及这些初始化的过程，因此清楚地了解到 Vue 实例初始化的过程有助于我们在后续解读源码时更明白每一个部分的作用。

附：在初始化的过程中，除了上述介绍过的成员外，还有一些我们没有介绍的成员，各个过程中添加的成员详细列表如下：

init:

- `_init()` 用于初始化的方法，在实例产生时被调用
- `_uid` 实例唯一 id
- `_isVue` 标识是否是 Vue 实例
- `_renderProxy` 实例的 Proxy 包装代理，当在开发环境访问不存在的属性时产生提示
- `_self` 引用自身
- `$options` 实例初始化时传入的选项

lifycycle:

- `$parent` 指向父 Vue 实例
- `$root` 指向根 Vue 实例
- `$children` 包含子 Vue 实例的引用
- `$refs` 实例中包含的引用（参见相关文档）
- `_watcher` 与实例关联的 watcher 对象
- `_inactive` 与`_directInactive` 都是使用 keep-alive 时标记组件是否是活跃的
- `_directInactive` 与`_inactive` 都是使用 keep-alive 时标记组件是否是活跃的
- `_isMounted` 标记实例是否已挂载
- `_isDestroyed` 标记实例是否已被销毁
- `_isBeingDestroyed` 标记实例是否正在被销毁

events:

- `_events` 存储与实例关联的事件回调函数
- `hasHookEvent` 标记是否监听了 hook 事件

render:

- `_vnode` 虚拟 DOM
- `_staticTrees` 存储静态渲染的节点
- `$vnode` 父节点的虚拟 DOM 引用
- `$slots` slots
- `$scopedSlots` 作用域 slots
- `_c` 创建 VNode 的方法
- `$createElement` 创建 VNode 的方法
- `$attrs` Vue 实例上的属性
- `$listeners` Vue 实例上绑定的事件

state:

- `_watchers` Watcher 实例引用
- `_data` 数据（状态）引用
- `_provided` 组件中通过 provide 提供的内容的引用