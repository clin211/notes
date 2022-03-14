# 类

Dart 是支持基于 mixin 继承机制的面向对象语言，所有对象都是一个类的实例，而除了 `Null` 以外的所有的类都继承自 [`Object`](https://api.dart.cn/stable/dart-core/Object-class.html) 类。 **基于 mixin 的继承** 意味着尽管每个类（[top class](https://dart.cn/null-safety/understanding-null-safety#top-and-bottom) `Object?` 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。 [扩展方法](https://dart.cn/guides/language/language-tour#extension-methods) 是一种在不更改类或创建子类的情况下向类添加功能的方式

### 使用类的成员

对象的 **成员** 由函数和数据（即 **方法** 和 **实例变量**）组成。方法的 **调用** 要通过对象来完成，这种方式可以访问对象的函数和数据。

- 使用（`.`）来访问对象的实例变量或方法

    ```dart
    var p = Point(2, 2);
    assert(p.y == 2);
    double distance = p.distanceTo(Point(4, 4));
    ```

- 使用 `?.` 代替 `.` 可以避免因为左边表达式为 null 而导致的问题

    ```dart
    var a = p?.y; // p存在则继续访问y的值
    ```

    

### 使用构造函数

可以使用 **构造函数** 来创建一个对象。构造函数的命名方式可以为 `*类名*` 或 `*类名* . *标识符* `的形式。例如下述代码分别使用 `Point()` 和 `Point.fromJson()` 两种构造器创建了 `Point` 对象：

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

以下代码具有相同的效果，但是构造函数名前面的的 `new` 关键字是可选的：

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

一些类提供了[常量构造函数](https://dart.cn/guides/language/language-tour#constant-constructors)。使用常量构造函数，在构造函数名之前加 `const` 关键字，来创建编译时常量时：

```dart
var p = const ImmutablePoint(2, 2);
```

两个使用相同构造函数相同参数值构造的编译时常量是同一个对象：

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

print(identical(a, b)); // They are the same instance!
```

在 **常量上下文** 场景中，你可以省略掉构造函数或字面量前的 `const` 关键字。例如下面的例子中我们创建了一个常量 Map：

```dart
// Lots of const keywords here.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

根据上下文，你可以只保留第一个 `const` 关键字，其余的全部省略：

```dart
// Only one const, which establishes the constant context.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

但是如果无法根据上下文判断是否可以省略 `const`，则不能省略掉 `const` 关键字，否则将会创建一个 **非常量对象** 例如：

```dart
var a = const ImmutablePoint(1, 1); // Creates a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant

print(!identical(a, b)); // NOT the same instance!
```

### 获取对象的类型

可以使用 `Object` 对象的 `runtimeType` 属性在运行时获取一个对象的类型，该对象类型是 [`Type`](https://api.dart.cn/stable/dart-core/Type-class.html) 的实例。

```dart
print('The type of a is ${a.runtimeType}');
```

### 实例变量

下面是声明实例变量的示例：

```dart
class Point {
  double? x; // Declare instance variable x, initially null.
  double? y; // Declare y, initially null.
  double z = 0; // Declare z, initially 0.
}
```

所有未初始化的实例变量其值均为 `null`。

所有实例变量均会隐式地声明一个 *Getter* 方法。非终值的实例变量和 `late final` 声明但未声明初始化的实例变量还会隐式地声明一个 *Setter* 方法。你可以查阅 [Getter 和 Setter](https://dart.cn/guides/language/language-tour#getters-and-setters) 获取更多相关信息。

```dart
class Point {
  double? x; // 声明实例变量x，初始值为空
  double? y; // 声明y，初始值为null
}

void main() {
  var point = Point();
  point.x = 4; // 给成员变量赋值
  print(point.x == 4); // true
  print(point.y == null); // true
}
```

### 构造函数

声明一个与类名一样的函数即可声明一个构造函数（对于[命名式构造函数](https://dart.cn/guides/language/language-tour#named-constructors) 还可以添加额外的标识符）。大部分的构造函数形式是生成式构造函数，其用于创建一个类的实例：

```dart
class Point {
  double x = 0;
  double y = 0;

  Point(double x, double y) {
    // There's a better way to do this, stay tuned.
    this.x = x;
    this.y = y;
  }
}
```

使用 `this` 关键字引用当前实例

> 当且仅当命名冲突时使用 `this` 关键字才有意义，否则 Dart 会忽略 `this` 关键字

对于大多数编程语言来说在构造函数中为实例变量赋值的过程都是类似的，而 Dart 则提供了一种特殊的语法糖来简化该步骤：

```dart
class Point {
  double x = 0;
  double y = 0;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
}
```

#### 默认构造函数

如果你没有声明构造函数，那么 Dart 会自动生成一个无参数的构造函数并且该构造函数会调用其父类的无参数构造方法。

#### 构造函数不被继承

子类不会继承父类的构造函数，如果子类没有声明构造函数，那么只会有一个默认无参数的构造函数。

#### 命名式构造函数

可以为一个类声明多个命名式构造函数来表达更明确的意图：

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  double x = 0;
  double y = 0;

  Point(this.x, this.y);

  // Named constructor
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

记住构造函数是不能被继承的，这将意味着子类不能继承父类的命名式构造函数，如果你想在子类中提供一个与父类命名构造函数名字一样的命名构造函数，则需要在子类中显式地声明。

#### 调用父类非默认构造函数

默认情况下，子类的构造函数会调用父类的匿名无参数构造方法，并且该调用会在子类构造函数的函数体代码执行前，如果子类构造函数还有一个 [初始化列表](https://dart.cn/guides/language/language-tour#initializer-list)，那么该初始化列表会在调用父类的该构造函数之前被执行，总的来说，这三者的调用顺序如下：

1. 初始化列表
2. 父类的无参数构造函数
3. 当前类的构造函数

如果父类没有匿名无参数构造函数，那么子类必须调用父类的其中一个构造函数，为子类的构造函数指定一个父类的构造函数只需在构造函数体前使用（`:`）指定。

下面的示例中，Employee 类的构造函数调用了父类 Person 的命名构造函数。点击运行按钮执行示例代码。