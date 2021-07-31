# 为什么要学习TypeScript

> 也许是你开发过程中受够了`cannot read property blah of undefined JavaScript`错误；也许是你开发时的预期与你实际结果不一致而导致排错过程中手脚无措；也许在前端目前三足鼎立的框架中都采用了TS的架构；也许......

## 使用TypeScript的优点

> 类型系统----能检测常见的错误类型。
>  强类型检测----检测代码是否符合类型安全要求的特殊程序。
>  借助类型避免程序做无效的事情。

## TypeScript VS JavaScript

| 类型系统特性     | JavaScript         | TypeScript         |
| ---------------- | ------------------ | ------------------ |
| 类型是如何绑定的 | 动态               | 静态               |
| 是否自动转换类型 | 是                 | 否（多数时候）     |
| 何时检测类型     | 运行时             | 编译时             |
| 何时报错         | 运行时（多数时候） | 编译时（多数时候） |

### 类型时如何绑定的？

- `JavaScript`动态绑定类型，因此必须运行程序才能知道类型；运行之前对类型一无所知。
- `TypeScript`是渐进式类型语言；在编译时知道所有类型（包括类型推导）。

### 是否自定转换类型？

- `JavaScript`是弱类型语言，如果执行无效的操作，它便会“自作聪明”的进行类型转换。

  ```JavaScript
  console.log(1 + [])                 // 打印出字符串 1
  console.log('1' + undefined)        // "1undefined" undefined转换字符串
  console.log('1' + null)             // "1null" null转换字符串
  console.log('1' + true)             // "1true" true转换字符串
  console.log('1' + 1n)               // '11' 比较特殊字符串和BigInt相加，BigInt转换为字符串
  console.log(1 + undefined)          // NaN  undefined转换数字相加NaN
  console.log(1 + null)               // 1    null转换为0
  console.log(1 + true)               // 2    true转换为1，二者相加为2
  console.log(1 + 1n )                // 错误  不能把BigInt和Number类型直接混合相加
  console.log('1' + 3)                // '13' 字符串拼接
  console.log(10 + {})                // "10[object Object]"，注意：{}会默认调用valueOf是{}，不是基础类型继续转换，调用toString，返回结果"[object Object]"，于是和10进行'+'运算，按照字符串拼接规则来，参考'+'的规则C
  console.log([1,2,undefined,4,5] + 10)// "1,2,,4,510"，注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组，不是基础数据类型继续转换，也还是调用toString，返回"1,2,,4,5"，然后再和10进行运算，还是按照字符串拼接规则，参考'+'的第3条规则
  ```

- `TypeScript`中则会在编译环节报错。

  ```typescript
  console.log(1 + [])                 // 报错：Operator '+' cannot be applied to types 'number' and 'never[]'
  console.log('1' + undefined)        // "1undefined" 
  console.log('1' + null)             // "1null" 
  console.log('1' + true)             // "1true" 
  console.log('1' + 1n)               // '11' 
  console.log(1 + undefined)          // 报错：Object is possibly 'undefined'
  console.log(1 + null)               // 报错：Object is possibly 'null'.
  console.log(1 + true)               // 报错：Operator '+' cannot be applied to types 'number' and 'boolean'.
  console.log(1 + 1n)                 // 报错：Operator '+' cannot be applied to types '1' and '1n'.
  console.log('1' + 3)                // '13' 
  console.log(10 + {})                // 报错：Operator '+' cannot be applied to types 'number' and '{}'.
  console.log([1, 2, undefined, 4, 5] + 10) // 报错：Operator '+' cannot be applied to types '(number | undefined)[]' and 'number'
  ```

### 何时检测类型？

- 在`Javascript`中，大多数情况下不在你使用的什么类型，自会尽它之能的转换成预期的类型。
- `TypeScript`则是编译环节对代码做类型检测；`TypeScript`会对代码做静态分析，找出这类错误，在运行之前进行反馈提示。

### 何时报告错误

- `JavaScript`在运行是抛出异常或执行幼年时类型转换，也意味着，必须真正运行程序才能知道有些操作是否是无效的。
- `TypeScript`在编译时报告语法和类型相关的错误，实际上，这些错误会在代码编辑器上显示，输入代码后立即反馈；还有些错误还是不能在编译时发现的错误，比如：堆栈溢出、网络连接和恶意的用户输入等等。


