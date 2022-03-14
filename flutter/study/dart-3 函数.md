# 函数

Dart 是一种真正面向对象的语言，所以即便函数也是对象并且类型为 [Function](https://api.dart.cn/stable/dart-core/Function-class.html)，这意味着函数可以被赋值给变量或者作为其它函数的参数。你也可以像调用函数一样调用 Dart 类的实例

声明语法：

```dart
返回类型 函数名(参数类型 行参) {
  // 逻辑快
}
```

示例如下：

```dart
String getEmailById(String id) {
  return 'xxxx@qq.com';
}
```

如果函数体内只包含一个表达式，你可以使用简写语法(和javascript中的箭头函数差不多)：

```dart
String getEmailById(String id) => 'xxxx@qq.com';
```

> 在 => 与 ; 之间的只能是 *表达式* 而非 *语句*。比如你不能将一个 [if语句](https://dart.cn/guides/language/language-tour#if-and-else) 放在其中，但是可以放置 [条件表达式](https://dart.cn/guides/language/language-tour#conditional-expressions)。

### 参数

函数可以有两种形式的参数：**必要参数** 和 **可选参数**。必要参数定义在参数列表前面，可选参数则定义在必要参数后面。可选参数可以是 **命名的** 或 **位置的**。

> 向函数传入参数或者定义函数参数时，可以使用 [尾逗号](https://dart.cn/guides/language/language-tour#trailing-comma)。

#### 命名参数

**命名参数默认为可选参数，除非他们被特别标记为 `required`。**

当你调用函数时，可以使用 `参数名: 参数值` 的形式来指定命名参数。

```dart
enableFlags(bold: true, hidden: false);
```

定义函数时，使用 `{参数1, 参数2, …}` 来指定命名参数

```dart
void enableFlags({bool? bold, bool? hidden}) {...}
```

虽然命名参数是可选参数的一种类型，但是你仍然可以使用 `required` 来标识一个命名参数是必须的参数，此时调用者必须为该参数提供一个值

#### 可选的位置参数

使用 `[]` 将一系列参数包裹起来作为位置参数

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

void main(){
  var says = say('Bob', 'Howdy', 'smoke signal');
  print(says); // Bob says Howdy with a smoke signal
}
```

#### 默认参数值

可以用 `=` 为函数的命名参数和位置参数定义默认值，默认值必须为编译时常量，没有指定默认值的情况下默认值为 `null`。

下面是设置可选参数默认值示例

```dart
void enableFlags({bool bold = false, bool hidden = false}) {}

enableFlags(bold: true); // 覆盖默认参数
```

> 在老版本的 Dart 代码中会使用冒号（`:`）而不是 `=` 来设置命名参数的默认值。原因在于刚开始的时候命名参数只支持 `:`

List 或 Map 同样也可以作为默认值。

下面的示例定义了一个名为 `doStuff()` 的函数，并为其名为 `list` 和 `gifts` 的参数指定了一个 List 类型的值和 Map 类型的值

```dart
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list'); // list:  [1, 2, 3]
  print('gifts: $gifts'); // gifts: {first: paper, second: cotton, third: leather}
}
```

### main() 函数

每个 Dart 程序都必须有一个 `main()` 顶级函数作为程序的入口， `main()` 函数返回值为 `void` 并且有一个 `List<String>` 类型的可选参数。

下面是一个简单 `main()` 函数：

```dart
void main() {
  print('Hello, World!');
}
```

### 函数是一级对象

可以将函数作为参数传递给另一个函数。例如：

```dart
void main(){
  example();
}

void printElement(int element) {
  print(element);
}

void example() {
  var list = [1, 2, 3];

  // Pass printElement as a parameter.
  list.forEach(printElement);
}
```

### 匿名函数

大多数方法都是有名字的，比如 `main()` 或 `printElement()`。你可以创建一个没有名字的方法，称之为 **匿名函数**、 **Lambda 表达式** 或 **Closure 闭包**。你可以将匿名方法赋值给一个变量然后使用它，比如将该变量添加到集合或从中删除。

**匿名方法看起来与命名方法类似，在括号之间可以定义参数，参数之间用逗号分割。**

后面大括号中的内容则为函数体：

```
([[类型] 参数[, …]]) { 函数体;};
```

下面代码定义了只有一个参数 `item` 且没有参数类型的匿名方法。 List 中的每个元素都会调用这个函数，打印元素位置和值的字符串：

```dart
const list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
```

### 词法作用域

Dart 是词法有作用域语言，变量的作用域在写代码的时候就确定了，大括号内定义的变量只能在大括号内访问，与 JavaScript 类似。

下面是一个嵌套函数中变量在多个作用域中的示例：

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      print(topLevel);
      print(insideMain);
      print(insideFunction);
      print(insideNestedFunction);
    }
  }
}
```

### 词法闭包

**闭包** 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

函数可以封闭定义到它作用域内的变量。接下来的示例中，函数 `makeAdder()` 捕获了变量 `addBy`。无论函数在什么时候返回，它都可以使用捕获的 `addBy` 变量。

```dart
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

// Create a function that adds 2.
var add2 = makeAdder(2);

// Create a function that adds 4.
var add4 = makeAdder(4);

print(add2(3) == 5);
print(add4(3) == 7);
```

### 返回值

所有的函数都有返回值。没有显示返回语句的函数最后一行默认为执行 `return null;`

