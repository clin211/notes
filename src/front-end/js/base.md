## 语法

### 区分大小写

> 无论是变量名、函数名还是操作符，都是区分大小写的，比如：test 和 Test 是两个完全不同的变量，类似 typeof 不能作为函数名，因为他是一个关键字；typeof 也是一个完全有效的函数名

### 标识符

> 所谓标识符，就是变量、函数、属性或者函数参数的名称；其规范：
>
> -   第一个字符必须是一个字母、下划线或者美元符号
> -   剩下的字符可以是字母(可以是 ASCII 编码或者 Unicode 编码)、下划线、美元符号或者数字

按照惯例，ECMAScript 标识符使用驼峰大小写形式，也就是第一个单词的首字母小写，后面每个单词的首字母大写（不是强制性要求，但是建议这么写）

### 注释：

> 单行注释和块注释
> 单行注释：以两个斜杠字符开头
> 块注释：以一个斜杠和一个星号开头，以它们反向组合结尾

```javascript
// 单行注释

/* 块注释 */
```

### 严格模式：

> 在 ECMAScript 5 增加了严格模式的概念。严格模式是一种不同的 JavaScript 解析和执行模型，ECMAScript 3 的一些不规范写法在这种模式下不会被处理，对于不安全的活动将抛出错误，要对整个脚本启动严格模式，在脚本开头加上这一行：`use strict`
> 虽然看起来像个没有赋值的字符串，但它其实是一个预处理指令。任何支持 JavaScript 引擎看到它都会切换到严格模式。选择这种语法形式的目的是不破坏 ECMAScript 3 语法
> 也可以单独自定一个函数在严格模式下执行，只要把这个预处理指令放到函数体头部即可：

```javascript
function doSomething() {
    'use strict'
}
```

> 严格模式会影响 JavaScript 执行的很多方面所有现代浏览器都支持严格模式

### 语句

> ECMAScript 中的语句以分号结尾；省略分号意味着有解析器确定语句在哪里结尾。如下面的例子：

```javascript
let sum = a + b // 没有加分号也有效，但不推荐
let diff = a - b // 加分号有效，推荐
```

> 即使语句末尾的分号不是必须的，也应该加上；记者分号有助于防止省略造成的问题，比如一个可以避免输入内容不完整；此外，加分号也便于开发者通过删除空行来压缩代码（如果没有结尾的分号，只能删除空行，则会导致语法出错）；加分号也有助于在某些情况下提升性能，因此解析器会尝试在合适的位置不上分号以纠正语法错误。
> 多条语句可以合并一个代码块中；代码块由一个左花括号标识开始，一个右花括号标识结束：

```javascript
if (test) {
    test = false
    console.log(test)
}
```

> if 之类的控制语句只在执行多条语句时要求必须有代码块。不过，最佳实践是始终在控制语句中使用代码块，即使要执行的只有一个语句，如下：

```javascript
if (test) console.log(test)

if (test) {
    console.log(test)
}
```

### 保留字与关键字

ECMA-262 描述了一组保留的关键字，这些关键字有特殊用途：

-   比如标识控制语句的开始与结束或者执行特定的操作
-   保留字不能标识符和属性名

### 变量

ECMAScript 变量是松散类型的，意思是变量可以用于保存任何类型的数据；每个变量只不过是一个用户保存任意值的命名占位符。目前有三个关键字可以生命变量：`var`、`let`、`const`；

> var 在 ECMAScript 的所有版本中都可以使用，而 const 和 let 只能在 ECMAScript 6 及更晚的版本中使用

#### var 关键字

用于定义变量，关键字 var 后跟变量名，可用于保存任何类型的值

```javascript
var message
```

-   var 声明作用域
    > 局部变量和全局变量：
    > 局部变量：比如在一函数内定义一个变量，就意味着该变量在函数退出时销毁该变量

```javascript
function sayHi() {
    var test = 'hi!'
}
sayHi()
console.log(test) //  test is not defined
```

> 全局变量：比如在函数内部定义变量时省略 var 操作符即可创建一个全局变量；在严格模式下，给未声明的标量赋值，则会抛出`ReferenceError`错误

```javascript
function sayHi() {
    test = 'global variable'
}

sayHi()
console.log(test) // global variable
```

> 如果需要定义多个变量，可以在一条语句中用逗号隔开每个变量

```javascript
var message = 'hi',
    found = false,
    age = 20
```

> 在严格模式下，不能定义名为 eval 和 arguments 的变量，否则会导致语句错误

-   var 声明提升
    > 使用 var 关键字声明的变量会自动提升到函数作用域顶部

```javascript
function foo() {
    console.log(age)
    var age = 26
}

foo() // undefined
// 之所以打印出undefined，没有报错，是因为ECMAScript运行时把它看成等价如下代码：
function foo() {
    var age
    console.log(age)
    age = 20
}
```

> 这就是所谓的变量提升，也就是把所有变量声明都拉到函数作用域的顶部。还可以使用 var 声明同一个变量也没有问题：

```javascript
function foo() {
    var age = 20
    var age = 21
    var age = 22
    var age = 23
    console.log(age) // 23
}
```

#### let 声明

> 和 var 的作用差不多，但有着非常重要的区别，最明显的区别时，let 声明的范围是块级作用域，而 var 声明的范围是函数作用域；如下两段代码：

```javascript
// a.js
if (true) {
    var name = 'matt'
    console.log(name) // matt
}
console.log(name) // matt

// b.js
if (true) {
    let name = 'matt'
    console.log(name) // matt
}
console.log(name) // ReferenceError: name a is undefined
```

> 之所以 b.js 中 if 外的打印会报错，是因为 name 变量的作用域被限制在 if 以内了，变量不能在外部使用；块作用域是函数作用域的子集，因此适用于 var 的作用域同样也适用于 let

```javascript
var name = 'foo'
var name = 'bar'

let name = 'foo'
let name = 'bar' // Uncaught SyntaxError: Identifier 'name' has already been declared
```

> var 对同一标识符在同一作用域中重新定义不会报错，而 let 则会报错

```javascript
var age = 20
let age = 20 // Uncaught SyntaxError: Identifier 'age' has already been declared
```

> 对声明冗余报错不会因混用 let 和 var 而受影响；这两关键字声明的并不是不同类型的变量，他们只是指出变量在相关作用域如何存在

| 区别                  |                             var                             |                                                     let                                                      |
| --------------------- | :---------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
| 暂时性死区            |               变量提升，没有暂时性死区的概念                | 在变量声明的作用域前使用该变量或者作用域之外使用该变量都会报错，故而不能在此之前以任何方式来引用未声明的变量 |
| 全局声明              |          var 声明的变量会会成为 window 对象的属性           |                                    let 声明的则不会成为 window 对象的属性                                    |
| 条件声明              | JavaScript 引擎会自动将多余的声明在作用域顶部合并为一个声明 |                                     条件块中 let 声明的作用域仅限于该块                                      |
| for 循环中的 let 声明 |              定义的迭代变量会渗透到循环体外部               |                                   定义的迭代变量的作用域仅在 for 循环内部                                    |

##### const 声明

> const 的行为与 let 基本相同，唯一一个重要的区别就是用它声明变量的时候必须初始化值，且尝试修改 const 声明的变量会导致运行出错

特点：

-   声明时必须初始化值，且不能重新赋值给变量
-   不允许重复声明
-   声明的变量的作用域也是块
-   const 不能用在 for 循环中来声明迭代变量（因为迭代变量会自增）；如果只想用 const 声明每次迭代只是创建一个新变量，则不会有问题，比如用在 for-in、for-of 中

```javascript
<script>
    const age = 26;
    age = 36; // Uncaught TypeError: Assignment to constant variable.

		// for
    for (const i = 0; i < 10; i++) { // Uncaught TypeError: Assignment to constant variable.
        console.log(i)
    }

    // for in
    for (const key in {name: 'Forest', age: 21}) {
        console.log(key); // name age
    }

    // for of
    for (const item of [1, 1, 2, 3, 5, 8, 13, 21, 34]) {
        console.log(item); // 1, 1, 2, 3, 5, 8, 13, 21, 34
    }
</script>
```

#### 声明风格及最佳实践

> ECMAScript 6 增加的 let 和 const 解决了怪异行为的 var 所造成的各种问题，从客观上为这门语言更精确地声明作用域和语义提供了过呢个好的支持，这也有助于代码提升质量的最佳实践也逐渐显现。

##### 实践建议

-   尽可能的不使用 var；const 和 let 声明的变量有助于代码质量的提升，因为有了明确的作用域、声明位置，以及不变的值
-   const 优先，let 次之；使用从 const 声明可以让浏览器运行时强制保持变量不变，也可以然静态代码分析工具提前发现不合法的赋值操作，只在提前知道未来会修改变量时，在使用 let。

## 基本数据类型

> 在 ECMAScript 中的数据类型有：Undefined、Null、Boolean、Number、String、Array、Symbol、Object

### 判断数据类型

#### typeof 操作符

> 因为 ECMAScript 的类型系统时松散的，所以需要一种给手段来确定任意变量的数据类型；typeof 就是为此而生；返回下列字符串的相关说明：
>
> -   "undefined": 表示未定义
> -   "boolean": 表示值为布尔值
> -   "string"：表示值为字符串
> -   "number"：表示值为数值
> -   "object"：表示值为对象（而不是函数）或者 null
> -   "function"：表示值为函数
> -   "symbol"：表示值为符号

```javascript
<script>
    const name = 'Forest';
    const age = 21;
    const haveGirlFriend = false;
    const skills = ['html5', 'css3', 'javascript', 'git', 'vue', 'react', 'node', '微信小程序', '微信云开发', '微信公众号开发', 'go', 'mongodb', 'mysql', 'redis', 'docker', 'jenkins'];
    const hobby = {
        ball: ['篮球', '乒乓球'],
        read: {name: 'javascript高级程序设计', version: '第四版'}
    }
    const func = () => hobby['read']
    const symbolVal = Symbol(name);
    const deposit = null;

    console.log(typeof name);           // string
    console.log(typeof age);            // number
    console.log(typeof haveGirlFriend); // boolean
    console.log(typeof skills);         // object  数组也是一个特殊的object
    console.log(typeof hobby);          // object
    console.log(typeof deposit);        // object  因为特殊值null被认为是一个对空对象的引用，所以返回值为null
    console.log(typeof func);           // function
    console.log(typeof symbolVal);      // symbol
    console.log(typeof girlFriend);     // undefined
</script>
```

> 在 JavaScript 中判断类型的方法可不止`typeof`， 还可以使用`instanceof`、`Object.prototype.toString`

#### instance 判断值的类型

> instanceof 的方法通过 new 一个对象，这个新对象就是它原型链继承上面的对象了，通过 instanceof 我们能判断这个对象是否是之前那个构造函数生成的对象，这样就基本可以判断出这个新对象的数据类型

```javascript
let Car = function () {}
let benz = new Car()
console.log(benz instanceof Car) // true
let car = new String('Mercedes Benz')
console.log(car instanceof String) // true
let str = 'Covid-19'
console.log(str instanceof String) // false
```

> Tips:
>
> -   instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；
> -   而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。

#### Object.prototype.toString()

> toString() 是 Object 的原型方法，调用该方法，可以统一返回格式为`[object Xxx]` 的字符串，其中 `Xxx `就是对象的类型。对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息。

```javascript
console.log(Object.prototype.toString({})) // [object Object]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call('1')) // [object String]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call(function () {})) // [object Function]
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(/123/g)) // [object RegExp]
console.log(Object.prototype.toString.call(new Date())) // [object Date]
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call(document)) // [object HTMLDocument]
console.log(Object.prototype.toString.call(window)) // [object Window]
```

> Object.prototype.toString.call() 可以很好地判断引用类型，甚至可以把 document 和 window 都区分开来。

> 但是在写判断条件的时候一定要注意，使用这个方法最后**_返回统一字符串格式为 "[object Xxx]" ，而这里字符串里面的 "Xxx" ，第一个首字母要大写（注意：使用 typeof 返回的是小写）_**
