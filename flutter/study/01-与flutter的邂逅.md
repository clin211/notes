# 与flutter的邂逅

##  什么是Flutter？

**Flutter**是一款全平台全端（移动端、桌面端、Web端）应用程序SDK，基于Dart语言开发，由Google开源。2015年4月发布1.0版本主推移动端高性能，2021年3月发布2.0版本全端跨端支持。

![image-20210914124742201](https://assets-website.oss-cn-chengdu.aliyuncs.com/notes/2022/03/14/15-59-35-1647244775-1647244775970-CBwd0e-008i3skNgy1gvwkcgl11xj30iw092jrw.jpg)

> 什么是Dart？
>
> **Dart**是由谷歌开发的通用的编程语言，它常用于构建web、服务器、桌面和移动应用程序。

## 环境安装

> 此系列文章中所有配置均是macOS系统上完成的

### 系统配置要求

想要安装并运行 Flutter，你的开发环境需要最低满足以下要求：

- **磁盘空间**：2.8 GB（不包含 IDE 或其余工具所需要的磁盘空间）
- **工具**：Flutter 使用 `git` 进行安装和升级，我们建议您安装包含了 `git` 的 Xcode，或者您也可以 [单独安装 `git`](https://git-scm.com/download/mac)。

### 获取 Flutter SDK

1. 进入[官网](https://flutter.cn/docs/get-started/install/macos)，获取SDK，点击下载

2. 将下载后的SDK压缩包解压到工作目录，然后解压

3. 配置环境变量

    <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gvwkpmo7uoj31e601ugm7.jpg" alt="image-20211029225738063" style="zoom: 50%;" />

    > 注意：
    >
    > ​		一定是要找到自己的SDK文件路径下`bin`来添加，否则会找不到的；可以使用命令：`export PATH="$PATH:pwd/flutter/bin"`(pwd换成自己的SDK目录)；获取去根目录下找到`.bash_profile`或者`.zshrc`文件中手动添加，然后再执行`source .bash_profile`来刷新我们配置的环境变量；命令执行成功后执行`flutter --version`来检测是否配置成功，如果打印如下图所示则说明配置成功了
    >
    > <img src="https://assets-website.oss-cn-chengdu.aliyuncs.com/notes/2022/03/14/16-00-26-1647244826-1647244826640-1E1P6x-008i3skNgy1gvwl08pu3wj30zo04ojs7.jpg" alt="image-20211029230749938" style="zoom:50%;" />

### 配置开发环境

#### 安装xcode和cocoapods

1. 通过 [直接下载](https://developer.apple.com/xcode/) 或者通过 [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835) 来安装最新稳定版 Xcode；

2. 通过在命令行中运行以下命令来配置 Xcode command-line tools:

    ```shell
    $ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
    $ sudo xcodebuild -runFirstLaunch
    ```

    当你安装了最新版本的 Xcode，大部分情况下，上面的路径都是一样的。但如果你安装了不同版本的 Xcode，你可能要更改一下上述命令中的路径。

3. 运行一次 Xcode 或者通过输入命令 `sudo xcodebuild -license` 来确保已经同意 Xcode 的许可协议。

4. 安装[CocoaPods](https://guides.cocoapods.org/using/getting-started.html#getting-started)，可以使用`brew install cocoapods`或者使用`sudo gem install cocoapods`安装

#### 配置iOS模拟器

如果想将程序运行在模拟器上的话，可以手动打开模拟器也可以使用`open -a Simulator`命令打开

#### 安装 Android Studio

1. 下载并安装 [Android Studio](https://developer.android.google.cn/studio)。
2. 运行 Android Studio，并进入 ‘Android Studio Setup Wizard’，这会安装最新的 Android SDK， Android SDK Platform-Tools 以及 Android SDK Build-Tools，这些都是在开发 Android Flutter 应用时所需要的。
3. 运行 `flutter doctor` 确保 Flutter 已经定位到了你的 Android Studio 的安装位置。如果 Flutter 并未定位到，运行 `flutter config --android-studio-dir <directory>` 设置你的 Android Studio 的安装目录。

#### 配置 Android 设备

在 Android 设备上运行或测试 Flutter 应用之前，你需要一个运行 Android 4.1（API 版本 16）或者更高的设备。

1. 在设备上打开 **Developer options** 和 **USB debugging** 选项，你可以在 [Android documentation](https://developer.android.google.cn/studio/debug/dev-options) 上查看更详细的方法介绍。
2. 如果是在 Windows 平台上使用，需要安装 [Google USB Driver](https://developer.android.google.cn/studio/run/win-usb)
3. 通过 USB 接口连接手机和电脑，如果在设备上弹出需要授权弹窗，允许授权以便让电脑能够访问你的开发设备。
4. 在命令行中，使用 `flutter devices` 命令来确保 Flutter 能够识别出你所连接的 Android 设备。

#### 配置 Android 模拟器

根据以下步骤来将 Flutter 应用运行或测试于你的 Android 模拟器上：

1. 激活机器上的 [VM acceleration](https://developer.android.google.cn/studio/run/emulator-acceleration) 选项。

2. 打开 **Android Studio**，点击 **AVD Manager** 按钮，选择 **Create Virtual Device…**

    - 在一些旧的 Android Studio 版本里，需要通过 **Android Studio > Tools > Android > AVD Manager**，然后选择 **Create Virtual Device…** 选项。（只有在 Android 项目中才会显示 **Android** 子选项。）
    - 如果你以及还没打开某个项目，你可以选择 **Configure > AVD Manager** 然后选择 **Create Virtual Device** 选项

3. 选择相应的设备并选择 **Next** 选项。

4. 选择一个或多个你想要模拟的 Android 版本的系统镜像，然后选择 **Next** 选项。推荐选择 **x86** 或者 **x86_64** 镜像。

5. 在 Emulated Performance 下选择 **Hardware - GLES 2.0** 选项来开启 [硬件加速](https://developer.android.google.cn/studio/run/emulator-acceleration)。

6. 确保 AVD 选项配置正确，并选择 **Finish** 选项。

    想要查看上述步骤的更多详细信息，请查看 [Managing AVDs](https://developer.android.google.cn/studio/run/managing-avds) 页面。

7. 在 Android Virtual Device Manager 中，点击工具栏中的 **Run** 选项，模拟器会启动并为你所选择的系统版本和设备显示出相应的界面。

#### 开启桌面端支持

在命令行中执行以下命令以开启桌面端支持

```shell
$ flutter config --enable-macos-desktop
```

更多详情请查看 [Flutter 的桌面端支持](https://flutter.dev/desktop)

## 创建项目

1. 通过运行以下命令来创建一个新的 Flutter 应用：

    ```shell
    $ flutter create my_app
    ```

2. 上述命令创建了一个 `my_app` 的目录，包含了 Flutter 初始的应用模版，切换路径到这个目录内：*content_copy*

    ```shell
    $ cd my_app
    ```

3. 确保模拟器已经处于运行状态，输入以下命令来启动应用：

    ```shell
    $ flutter run
    ```

    > 如果没有启动模拟器的话，会默认运行在web浏览器中，也可以使用命令`flutter devices`查看当前可以运行的设备，如下图：
    >
    > <img src="https://assets-website.oss-cn-chengdu.aliyuncs.com/notes/2022/03/14/16-39-25-1647247165-1647247165061-cx6kqx-008i3skNgy1gvwlc1vdrqj31i005idgw.jpg" alt="image-20211029231911261" style="zoom:50%;" />