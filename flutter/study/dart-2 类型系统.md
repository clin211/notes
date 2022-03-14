# 类型系统

dart语言支持`int`、`double`、`String`、`bool`、`List`、`Sets`、`Maps`、`Runs`、`Symbol` 和 `null`

## 数字类型

dart支持两种数字类型：`int` 和 `double`

`int` ：  整数值；长度不超过 64 位，具体取值范围 [依赖于不同的平台](https://dart.cn/guides/language/numbers)。在 DartVM 上其取值位于 -263 至 263 - 1 之间。在 Web 上，整型数值代表着 JavaScript 的数字（64 位无小数浮点型），其允许的取值范围在 -253 至 253 - 1 之间。

`double` ：64 位的双精度浮点数字

数字类型中定义了一些基本的运算符比如 +、-、*、/ 等，还定义了 `abs()`、`ceil()` 和 `floor()` 等方法（位运算符，比如 >> 定义在 int 中）

```dart
// 整数的变量声明  根据类型推导
var num = 10;
var float = 22.33;
var hex = 0xDEADBEEF;
var exponent = 8e5;
```

字符串与数字之间的转换

```dart
String str = '1.1';
int num = 10;
final PI = 3.14159;

// 字符串转整数
var one = int.parse('1');
print(one); // 1

// 字符串转浮点数
var onePointOne = double.parse(str);
print(onePointOne); // 1.1

// 整数转字符串
String oneAsString = num.toString();
print(oneAsString); // 10

// 浮点数转字符串
String piAsString = PI.toStringAsFixed(2);
print(piAsString); // 3.14
```

## 字符串类型

Dart 字符串（`String` 对象）包含了 UTF-16 编码的字符序列；其中有`''`、`""`、`'''` 三种；

```dart
var s1 = '使用单引号创建字符串字面量。';
var s2 = "双引号也可以用于创建字符串字面量。";
var s3 = '使用单引号创建字符串时可以使用斜杠来转义那些与单引号冲突的字符串：\'。';
var s4 = "而在双引号中则不需要使用转义与单引号冲突的字符串：'";
```

在字符串中，请以 `${`*`表达式`*`}` 的形式使用表达式，如果表达式是一个标识符，可以省略掉 `{}`。如果表达式的结果为一个对象，则 Dart 会调用该对象的 `toString` 方法来获取一个字符串

```dart
String nickname = 'Forest';

// 单个表达式可以不写括号
print('I\'m $nickname'); // I'm Forest

// 当要执行一些操作的时候就要在括号内执行
print('I\'m ${nickname.toUpperCase()}');  // I'm FOREST
```

- 字符串拼接

    使用 `+` 运算符或并列放置多个字符串来连接字符串

    ```dart
    String intr = "I'm " + nickname;
    print(intr); // I'm Forest
    ```

- 创建多行字符串

    使用三个单引号或者三个双引号

    ```dart
      String str = """
        晚上
        吃
        火锅
      """;
      print(str); // 结果如下图：
    ```

    ![image-20211217185909686](assets/image-20211217185909686.png)

    不会连成一行，原本输出

- 在字符串前加上 `r` 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）

    ```dart
    var data = r'在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。';
    print(data); // 在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。
    ```

    



## 布尔类型

Dart 使用 `bool` 关键字表示布尔类型，布尔类型只有两个对象 `true` 和 `false`，两者都是编译时常量

> `==` 运算符负责判断两个对象的内容是否一样，如果两个字符串包含一样的字符编码序列，则表示相等

```dart
var eq = '134' == 134;
print(eq); // false

print(10 >= 9); // true

print(1 < 5); // true

var unicorn;
print(unicorn == null); // true

var isMeanToDoThis = 0 / 0;
print(isMeanToDoThis); // NAN
```

## Lists

数组 (**Array**) 是几乎所有编程语言中最常见的集合类型，在 Dart 中数组由 [`List`](https://api.dart.cn/stable/dart-core/List-class.html) 对象表示。通常称之为 **List**。

Dart 中 List 字面量看起来与 JavaScript 中数组字面量一样

```dart
var lists = ['car', 'boat', 'plane'];
print(lists); // [car, boat, plane]
```

List 的下标索引从 0 开始，第一个元素的下标为 0，最后一个元素的下标为 `list.length - 1`。你可以像 JavaScript 中的用法那样获取 Dart 中 List 的长度以及元素

```dart
var lists = ['car', 'boat', 'plane'];
print(lists[0]); // car
print(lists[1]); // boat
```

**扩展操作符**（`...`）和 **空感知扩展操作符**（`...?`），它们提供了一种将多个元素插入集合的简洁方法

```dart
var lists = ['car', 'boat', 'plane'];  
List arr = ['bus', ...lists]; // 和js中的扩展运算符差不多
print(arr); // [bus, car, boat, plane]
```

```dart
var cars;
List arr1 = ['bus', ...?cars]; // 如果扩展操作符的右边为null的话可以使用 ...?
print(arr1); // [bus]
```

## Set

在 Dart 中，set 是一组特定元素的无序集合； Dart 支持的集合由集合的字面量和 [`Set`](https://api.dart.cn/stable/dart-core/Set-class.html) 类提供

下面是使用 Set 字面量来创建一个 Set 集合的方法：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

可以使用在 `{}` 前加上类型参数的方式创建一个空的 Set，或者将 `{}` 赋值给一个 Set 类型的变量：

```dart
var fruits = <String>{'apple', 'orange'};
print(fruits); // {apple, orange}
```

使用 `add()` 方法或 `addAll()` 方法向已存在的 Set 中添加项目：

```dart
var fruits = <String>{'apple', 'orange'};
fruits.add('pear'); // 添加单个元素

var other = {'peach', 'grape'};
fruits.addAll(other); // 添加多个元素
print(fruits); // {apple, orange, pear, peach, grape}
```

使用  `length`  可以获取  `Set`  中元素的数量

```dart
var fruits = <String>{'apple', 'orange'};
fruits.add('pear'); // 添加单个元素

var other = {'peach', 'grape'};
fruits.addAll(other); // 添加多个元素
print(fruits); // {apple, orange, pear, peach, grape}

print('数量： ${fruits.length}'); // 数量： 5
```

可以在 Set 变量前添加 `const` 关键字创建一个 Set 编译时常量

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};

constantSet.add('helium'); // 报错  声明的常量是不允许被改变的
```

> Set 可以像 List 一样支持使用扩展操作符（`...` 和 `...?`）

## Maps

Map 是用来关联 keys 和 values 的对象。其中键和值都可以是任何类型的对象。每个 *键* 只能出现一次但是 *值* 可以重复出现多次。 Dart 中 Map 提供了 Map 字面量以及 [`Map`](https://api.dart.cn/stable/dart-core/Map-class.html) 类型两种形式的 Map。

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
print(gifts);  // {first: partridge, second: turtledoves, fifth: golden rings}
print(nobleGases); // {2: helium, 10: neon, 18: argon}
```

> Tips:
>
> ​		Dart 将 `gifts` 变量的类型推断为 `Map<String, String>`，而将 `nobleGases` 的类型推断为 `Map<int, String>`。如果你向这两个 Map 对象中添加不正确的类型值

也可以使用 Map 的构造器创建 Map：

```dart
var other = Map<String, String>();
// var other = new Map<String, String>(); // 可以这么写 但不建议
other['animal'] = '老虎';
other['fruits'] = '苹果';
other['car'] = '大奔';
print(other); // {animal: 老虎, fruits: 苹果, car: 大奔}
```

如果检索的 Key 不存在于 Map 中则会返回一个 null：

```dart
var gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
print(gifts['fruits']); // null
```

使用 `length` 可以获取 Map 中键值对的数量：

```dart
var gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
print('gifts count: ${gifts.length}'); // gifts count: 3
```

在一个 Map 字面量前添加 `const` 关键字可以创建一个 Map 编译时常量：

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
constantMap.addAll({11: 'lin'}); // 报错  声明的常量是不允许被改变的
```

Map 可以像 List 一样支持使用扩展操作符（`...` 和 `...?`）以及集合的 if 和 for 操作

## Runes 与 grapheme clusters

在 Dart 中，[runes](https://api.dart.cn/stable/dart-core/Runes-class.html) 公开了字符串的 Unicode 码位。使用 [characters 包](https://pub.flutter-io.cn/packages/characters) 来访问或者操作用户感知的字符，也被称为 [Unicode (扩展) grapheme clusters](https://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)

Unicode 编码为每一个字母、数字和符号都定义了一个唯一的数值。因为 Dart 中的字符串是一个 UTF-16 的字符序列，所以如果想要表示 32 位的 Unicode 数值则需要一种特殊的语法

表示 Unicode 字符的常见方式是使用 `\uXXXX`，其中 XXXX 是一个四位数的 16 进制数字。例如心形字符（♥）的 Unicode 为 `\u2665`。对于不是四位数的 16 进制数字，需要使用大括号将其括起来。例如大笑的 emoji 表情（😆）的 Unicode 为 `\u{1f600}`

如果你需要读写单个 Unicode 字符，可以使用 characters 包中定义的 `characters` getter。它将返回 [`Characters`](https://pub.flutter-io.cn/documentation/characters/latest/characters/Characters-class.html) 对象作为一系列 grapheme clusters 的字符串

```dart
import 'package:characters/characters.dart';
...
var hi = 'Hi 🇩🇰';
print(hi); // Hi 🇩🇰
print('The end of the string: ${hi.substring(hi.length - 1)}'); // The end of the string: ???
print('The last character: ${hi.characters.last}\n'); // The last character: 🇩🇰
```

## Symbols

[`Symbol`](https://api.dart.cn/stable/dart-core/Symbol-class.html) 表示 Dart 中声明的操作符或者标识符。你几乎不会需要 Symbol，但是它们对于那些通过名称引用标识符的 API 很有用，因为代码压缩后，尽管标识符的名称会改变，但是它们的 Symbol 会保持不变

可以使用在标识符前加 `#` 前缀来获取 Symbol：

```dart
#radix
#bar
```

> Symbol 字面量是编译时常量
