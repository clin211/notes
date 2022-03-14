# 运算符与流程控制

## 运算符

Dart 支持下表的操作符。你可以将这些运算符实现为 [一个类的成员](https://dart.cn/guides/language/language-tour#_operators)

| 描述           | 运算符                                              |
| -------------- | --------------------------------------------------- |
| 一元后缀       | `表达式++` `表达式--` `()` `[]` `.` `?.`            |
| 一元前缀       | `-表达式` `!表达式` `~表达式` `++表达式` `--表达式` |
| 乘除法         | `*` `/` `%` `~/`                                    |
| 加减法         | `+` `-`                                             |
| 位运算         | `<<` `>>` `>>>`                                     |
| 二进制与       | `&`                                                 |
| 二进制异或     | `^`                                                 |
| 二进制或       | `|`                                                 |
| 关系和类型测试 | `>=` `>` `<=` `<` `as` `is` `is!`                   |
| 相等判断       | `==` `!=`                                           |
| 逻辑与         | `&&`                                                |
| 逻辑或         | `||`                                                |
| 空判断         | `??`                                                |
| 条件表达式     | `*表达式 1* ? *表达式 2* : *表达式 3*`              |
| 级联           | `..` `?..`                                          |
| 赋值           | `=` `*=` `/=` `+=` `-=` `&=` `^=` *等等……*          |

> ```dart
> %` 运算符优先级高于 `==` ，而 `==` 高于 `&&
> ```

### 算术运算符

Dart 支持常用的算术运算符：

| 运算符      | 描述                                       |
| ----------- | ------------------------------------------ |
| `+`         | 加                                         |
| `–`         | 减                                         |
| `-*表达式*` | 一元负, 也可以作为反转（反转表达式的符号） |
| `*`         | 乘                                         |
| `/`         | 除                                         |
| `~/`        | 除并取整  波浪线和斜线的组合               |
| `%`         | 取模                                       |

### 关系运算符

下表列出了关系运算符及含义：

| Operator`==` | 相等     |
| ------------ | -------- |
| `!=`         | 不等     |
| `>`          | 大于     |
| `<`          | 小于     |
| `>=`         | 大于等于 |
| `<=`         | 小于等于 |

要判断两个对象 x 和 y 是否表示相同的事物使用 `==` 即可。（在极少数情况下，可能需要使用 [identical()](https://api.dart.cn/stable/dart-core/identical.html) 函数来确定两个对象是否完全相同）。下面是 `==` 运算符的一些规则：

1. 当 **x** 和 **y** 同时为空时返回 true，而只有一个为空时返回 false。
2. 返回对 **x** 调用 `==` 方法的结果，参数为 **y**。（像 `==` 这样的操作符是对左侧内容进行调用的。详情请查阅 [操作符](https://dart.cn/guides/language/language-tour#_operators)。）

### 类型判断运算符

`as`、`is`、`is!` 运算符是在运行时判断对象类型的运算符。

| Operator | Meaning                                                      |
| -------- | ------------------------------------------------------------ |
| `as`     | 类型转换（也用作指定 [类前缀](https://dart.cn/guides/language/language-tour#specifying-a-library-prefix))） |
| `is`     | 如果对象是指定类型则返回 true                                |
| `is!`    | 如果对象是指定类型则返回 false                               |

当且仅当 `obj` 实现了 `T` 的接口，`obj is T` 才是 true。例如 `obj is Object` 总为 true，因为所有类都是 Object 的子类。

仅当你确定这个对象是该类型的时候，你才可以使用 `as` 操作符可以把对象转换为特定的类型(相当于`TypeScript`中的类型别名)。例如：

```dart
(employee as Person).firstName = 'Bob';
```

如果你不确定这个对象类型是不是 `T`，请在转型前使用 `is T` 检查类型。

```dart
if (employee is Person) {
  employee.firstName = 'Bob';
}
```

> 上述两种方式是有区别的：如果 `employee` 为 null 或者不为 `Person` 类型，则第一种方式将会抛出异常，而第二种不会。

### 赋值运算符

可以使用 `=` 来赋值，同时也可以使用 `??=` 来为值为 null 的变量赋值。

```dart
// 将value赋值给a 但是不确定value是否存在
a = value;
// 如果b为空，则赋值给b;否则，b保持不变
b ??= value;
```

像 `+=` 这样的赋值运算符将算数运算符和赋值运算符组合在了一起。

| `=`  | `*=`  | `%=`  | `>>>=` | `^=` |
| ---- | ----- | ----- | ------ | ---- |
| `+=` | `/=`  | `<<=` | `&=`   | `|=` |
| `-=` | `~/=` | `>>=` |        |      |

下表解释了符合运算符的原理：

| 场景                    | 复合运算  | 等效表达式   |
| ----------------------- | --------- | ------------ |
| **假设有运算符 *op*：** | `a op= b` | `a = a op b` |
| **示例：**              | `a += b`  | `a = a + b`  |

下面的例子展示了如何使用赋值以及复合赋值运算符：

```dart
var a = 2;
a *= 3; 
print(a == 6); // true
```

### 逻辑运算符

使用逻辑运算符你可以反转或组合布尔表达式。

| 运算符    | 描述                                                      |
| --------- | --------------------------------------------------------- |
| `!表达式` | 对表达式结果取反（即将 true 变为 false，false 变为 true） |
| `||`      | 逻辑或                                                    |
| `&&`      | 逻辑与                                                    |

下面是使用逻辑表达式的示例：

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

### 条件表达式

Dart 有两个特殊的运算符可以用来替代 [if-else](https://dart.cn/guides/language/language-tour#if-和-else) 语句(sanmu)：

`条件 ? 表达式1 : 表达式2`
如果条件为 true，执行表达式 1并返回执行结果，否则执行表达式 2 并返回执行结果

`表达式1 ?? 表达式2`
如果表达式 1 为非 null 则返回其值，否则执行表达式 2 并返回其值

- 根据布尔表达式确定赋值时，请考虑使用 `?` 和 `:`

    ```dart
    var visibility = isPublic ? 'public' : 'private';
    ```

- 如果赋值是根据判定是否为 null 则考虑使用 `??`

    ```dart
    String playerName(String? name) => name ?? 'Guest';
    ```

    

### 级联运算符

级联运算符 (`..`, `?..`) 可以让你在同一个对象上连续调用多个对象的变量或方法。

比如下面的代码：

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

### 其他运算符

大多数其它的运算符，已经在其它的示例中使用过：

| 运算符 | 名字          | 描述                                                         |
| ------ | ------------- | ------------------------------------------------------------ |
| `()`   | 使用方法      | 代表调用一个方法                                             |
| `[]`   | 访问 List     | 访问 List 中特定位置的元素                                   |
| `?[]`  | 判空访问 List | 左侧调用者不为空时，访问 List 中特定位置的元素               |
| `.`    | 访问成员      | 成员访问符                                                   |
| `?.`   | 条件访问成员  | 与上述成员访问符类似，但是左边的操作对象不能为 null，例如 foo?.bar，如果 foo 为 null 则返回 null ，否则返回 bar |

## 流程控制

- `if` 和 `else`
- `for` 循环
- `while` 和 `do`-`while` 循环
- `break` 和 `continue`
- `switch` 和 `case`
- `assert`

> 使用 `try-catch` 和 `throw` 也能影响控制流

### If 和 Else

Dart 支持 `if - else` 语句，其中 `else` 是可选的，比如下面的例子。你也可以参考[条件表达式](https://dart.cn/guides/language/language-tour#conditional-expressions)。

```dart
bool isPublic = false;
if (isPublic) {
  print('public');
} else {
  print('previte');
}
```

> **不同于 JavaScript，Dart 的 if 语句中的条件必须是布尔值而不能为其它类型**

### For 循环

你可以使用标准的 `for` 循环进行迭代

```dart
var lists = [1, 2, 3, 4, 5, 6];
for (var i = 0; i < lists.length; i++) {
  print('第$i元素为${lists[i]}');
}

结果如下：
  第0元素为1
  第1元素为2
  第2元素为3
  第3元素为4
  第4元素为5
  第5元素为6
```

在 Dart 语言中，`for` 循环中的闭包会自动捕获循环的 **索引值** 以避免 JavaScript 中一些常见的陷阱

```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

上述代码执行后会输出 `0` 和 `1`，但是如果在 JavaScript 中执行同样的代码则会输出两个 `2`

如果要遍历的对象是一个可迭代对象（例如 List 或 Set），并且你不需要知道当前的遍历索引，则可以使用 `for-in` 方法进行 [遍历](https://dart.cn/guides/libraries/library-tour#iteration)：

```dart
const iterable = ['Salad', 'Popcorn', 'Toast'];
for (final element in iterable) {
  print(element);
}
```

可迭代对象同时可以使用 [forEach()](https://api.dart.cn/stable/dart-core/Iterable/forEach.html) 方法作为另一种选择：

```dart
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

### While 和 Do-While

`while` 循环会在执行循环体前先判断条件：

```dart
while (!isDone()) {
  doSomething();
}
```

`do-while` 循环则会 **先执行一遍循环体** 再判断条件：

```dart
do {
  printLine();
} while (!atEndOfPage());
```

### Break 和 Continue

使用 `break` 可以中断循环：

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

使用 `continue` 可以跳过本次循环直接进入下一次循环：

```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

### Switch 和 Case

Switch 语句在 Dart 中使用 `==` 来比较整数、字符串或编译时常量，比较的两个对象必须是同一个类型且不能是子类并且没有重写 `==` 操作符。 [枚举类型](https://dart.cn/guides/language/language-tour#enumerated-types)非常适合在 `Switch` 语句中使用

每一个非空的 `case` 子句都必须有一个 `break` 语句，也可以通过 `continue`、`throw` 或者 `return` 来结束非空 `case` 语句；如果没有break等关键字来结束非空`case` 的话会报错，如果有多个`case`公用一个逻辑块的话，可以使用`continue`关键字配合`label`的方式实现

不匹配任何 `case` 语句的情况下，会执行 `default` 子句中的代码：

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    print('close');
    break;
  case 'PENDING':
    print('pending');
    break;
  case 'APPROVED':
    print('approved');
    break;
  case 'DENIED':
    print('denied');
    break;
  case 'OPEN':
    print('open');
    break;
  default:
    print('default');
}
```

> 使用`continue`配合`label` 的形式实现`fall-through`：
>
> ```dart
> var command = 'CLOSED';
> switch (command) {
>   case 'CLOSED':
>     print('closed');
>     continue nowClosed;
> 
>     nowClosed:
>   case 'NOW_CLOSED':
>     print('now closed');
>     break;
> }
> 
> // 结果是两个都会被打印
> ```

### 断言

在开发过程中，可以在条件表达式为 false 时使用 — `assert(条件, 可选信息)`; — 语句来打断代码的执行；`assert` 一共有两个参数，第一个参数可以是值为布尔值的任何表达式。如果表达式的值为 true，则断言成功，继续执行。如果表达式的值为 false，则断言失败，抛出一个 [`AssertionError`](https://api.dart.cn/stable/dart-core/AssertionError-class.html) 异常；`assert` 的第二个参数可以为其添加一个字符串消息

如何判断 assert 是否生效？assert 是否生效依赖开发工具和使用的框架：

- Flutter 在[调试模式](https://flutter.cn/docs/testing/debugging#debug-mode-assertions)时生效。
- 一些开发工具比如 [dartdevc](https://dart.cn/tools/dartdevc) 通常情况下是默认生效的。
- 其他一些工具，比如 [`dart run`](https://dart.cn/tools/dart-run)以及 [`dart2js`](https://dart.cn/tools/dart2js) 通过在运行 Dart 程序时添加命令行参数 `--enable-asserts` 使 assert 生效。

在生产环境代码中，断言会被忽略，与此同时传入 `assert` 的参数不被判断。

### 捕获异常

捕获异常可以避免异常继续传递（重新抛出异常除外）。捕获一个异常可以给你处理它的机会：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

对于可以抛出多种异常类型的代码，也可以指定多个 catch 语句，每个语句分别对应一个异常类型，如果 catch 语句没有指定异常类型则表示可以捕获任意异常类型：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

如上述代码所示可以使用 `on` 或 `catch` 来捕获异常，使用 `on` 来指定异常类型，使用 `catch` 来捕获异常对象，两者可同时使用

你可以为 `catch` 方法指定两个参数，第一个参数为抛出的异常对象，第二个参数为栈信息 [`StackTrace`](https://api.dart.cn/stable/dart-core/StackTrace-class.html) 对象：

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

关键字 `rethrow` 可以将捕获的异常再次抛出：

```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

### Finally

无论是否抛出异常，`finally` 语句始终执行，如果没有指定 `catch` 语句来捕获异常，则异常会在执行完 `finally` 语句后抛出：

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

`finally` 语句会在任何匹配的 `catch` 语句后执行：

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```