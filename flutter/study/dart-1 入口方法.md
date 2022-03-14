# 入口方法介绍

每个 Dart 程序都必须有一个 `main()` 顶级函数作为程序的入口， `main()` 函数返回值为 `void` 并且有一个 `List<String>` 类型的可选参数。

## 打印

```dart
main() {
  print('hello dart');
}


// 没有返回的函数声明
void main() {
  print('hello dart');
}
```

## 注释

以双斜杠开头的一行语句称为单行注释。Dart 同样支持多行注释和文档注释

```dart
// 没有返回值的函数声明形式
void main() {
  print('hello dart');
}


/**
 * 多行注释 和js中注释差不多
 */
```

## 变量

- 关键字声明，可以定义任意类型的变量，根据初始值的类型进行推断

    ```dart
    var str = 'hello dart';
    
    // 定义数字
    var num = 12341;
    ```

- 字面量声明，所赋予的值必须是当前类型的值，否则报错

    ```dart
    String str = 'hello dart';
    int num = 10;
    ```

## 常量

如果你不想更改一个变量，可以使用关键字 `final` 或者 `const` 修饰变量，这两个关键字可以替代 `var` 关键字或者加在一个具体的类型前。一个 final 变量只可以被赋值一次；一个 const 变量是一个编译时常量（const 变量同时也是 final 的）。顶层的 final 变量或者类的 final 变量在其第一次使用的时候被初始化

```dart
final name = 'Bob'; 
final String nickname = 'Forest';
```

使用关键字 `const` 修饰变量表示该变量为 **编译时常量**。如果使用 const 修饰类中的变量，则必须加上 static 关键字，即 `static const`（顺序不能颠倒）。在声明 const 变量时可以直接为其赋值，也可以使用其它的 const 变量为其赋值

```dart
const bar = 1000000;
const double atm = 1.01325 * bar;
```

`const` 关键字不仅仅可以用来定义常量，还可以用来创建 **常量值**，该常量值可以赋予给任何变量。你也可以将构造函数声明为 const 的，这种类型的构造函数创建的对象是不可改变的

```dart
var foo = const [];
final bar = const [];
const baz = []; // Equivalent to `const []`
```

`final`   和 `const`  的区别：

​	`final` 可以开始不赋值 只能赋值一次；而 `final` 不仅有const的编译时常量的特性，最重要的它是运行时常量，并且`final`是惰性初始化，即使在运行时第一次使用前才初始化

## 命名规则

好的代码有一个非常重要的特点就是拥有好的风格；一致的命名、一致的顺序、以及一致的格式让代码看起来是一样的

- 变量名称必须有数字、字母、下划线或者美元字符($)组成
- 声明的变量不能以数字开头
- 声明的变量不能时保留字和关键字
- 变量名是区分大小写的
- 变量名一定要见名思义；变量名建议用名词，方法名建议用动词

- 不要使用字母前缀

- `包`、`文件夹`、`源文件` 中使用 `lowercase_with_underscores` 方式命名