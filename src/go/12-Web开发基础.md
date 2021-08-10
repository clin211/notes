# Go Web开发基础

实现一个简单的hello future的接口：

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/", helloFuture)

	// 监听端口并启动服务
	server.ListenAndServe()
}

func helloFuture(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello future")
}
```

在文件所在目录打开命令行终端，输入`go run main.go`；然后打开浏览器访问`http://localhost:8081/`就会打印出如下结果：

<img src="./assets/image-20210801111906903.png" alt="image-20210801111906903" style="zoom:50%;" />

## Web程序运行原理

### Web基本原理

在上面的代码示例中，要编写一个基本的web服务程序是很简单的；只需要调用`net/http`包中的`HandleFunc()`处理函数和`ListenAndServe()`函数即可

Go通过简单的几行代码就可以实现一个web服务器端程序，而且这个web服务器端程序有支持高并发的特性；接下来我们去了解了解web服务器端程序是怎么运行起来的

#### 运行原理

当我们打开某个网站的页面，浏览器就会发起网络请求获取该页面的资源，我们也可以从控制台看到以下的请求信息：

<img src="./assets/image-20210801115348779.png" alt="image-20210801115348779" style="zoom:50%;" />

<img src="./assets/image-20210801115202675.png" alt="image-20210801115202675" style="zoom:50%;" />

在 Network 面板里，我们能看到所有浏览器发起的网络请求，包括页面、图片、CSS 文件、XHR 请求等，还能看到请求的状态（200 成功、404 找不到、缓存、重定向等等）、耗时、请求头和内容、返回头和内容等

接下来，浏览器会加载页面，同时页面中涉及的外部资源也会根据需要，在特定的时机触发请求下载，包括我们看到的 PNG 图片、JavaScript 文件（这里没有 CSS 样式，是因为样式被直出在html页面内容里了）

回到前面的问题，实际上当我们在浏览器输入网页地址，按下回车键后，浏览器的处理过程如下：

- DNS 域名解析（此处涉及 DNS 的寻址过程），找到网页的存放服务器

- 浏览器与服务器建立 TCP 连接

- 浏览器发起 HTTP 请求

- 服务器响应 HTTP 请求，返回该页面的 HTML 内容

- 浏览器解析 HTML 代码，并请求 HTML 代码中的资源（如 JavaScript、CSS、图片等，此处可能涉及 HTTP 缓存）

- 浏览器对页面进行渲染呈现给用户（此处涉及浏览器的渲染原理）

#### DNS 解析
DNS 的全称是 Domain Name System，又称域名系统，它负责把www.baidu.com这样的域名地址翻译成一个 IP（比如14.18.180.206），而客户端与服务器建立 TCP 连接需要通过 IP 通信

让客户端和服务器连接并不是靠域名进行，在网络中每个终端之间实现连接和通信是通过一个唯一的 IP 地址来完成。在建立 TCP 连接前，我们需要找到建立连接的服务器，DNS 的解析过程可以让用户通过域名找到存放文件的服务器

DNS 解析过程会进行递归查询，分别依次尝试从以下途径，按顺序地获取该域名对应的 IP 地址

- 浏览器缓存

- 系统缓存（用户操作系统 Hosts 文件 DNS 缓存）

- 路由器缓存

- 互联网服务提供商 DNS 缓存（联通、移动、电信等互联网服务提供商的 DNS 缓存服务器）

- 根域名服务器

- 顶级域名服务器

- 主域名服务器

DNS 解析过程会根据上述步骤进行递归查询，如果当前步骤没查到，则自动跳转到到下一步骤通过下一个 DNS 服务器进行查找。如果最终依然没找到，浏览器便会将页面响应为打开失败

除此之外，我们在前后端联调过程中也常常需要配置 HOST，这个过程便是修改了浏览器缓存或是系统缓存。通过将特定域名指向我们自身的服务器 IP 地址，便可以实现通过域名访问本地环境、测试环境、预发布环境的服务器资源

那为什么需要配置域名 HOST，而不直接使用 IP 地址进行访问呢？这是因为***浏览器的同源策略会导致跨域问题***

同源策略要求，只有当请求的协议、域名和端口都相同的情况下，我们才可以访问当前页面的 Cookie/LocalStorage/IndexDB、获取和操作 DOM 节点，以及发送 Ajax 请求。**通过同源策略的限制，可以避免恶意的攻击者盗取用户信息，从而可以保证用户信息的安全**

对于非同源的请求，我们常常称为跨域请求，需要进行跨域处理。常见的跨域解决方案有这几种

- 使用`document.domain + iframe`：只有在主域相同的时候才能使用该方法

- 动态创建` script(JSONP)`：通过指定回调函数以及函数的传参数据，让页面执行相应的脚本内容

- 使用`location.hash + iframe`：利用`location.hash`来进行传值

- 使用`window.name + iframe`：原理是`window.name`值在不同的页面（甚至不同域名）加载后依旧存在

- 使用`window.postMessage()`实现跨域通信

- 使用跨域资源共享 `CORS（Cross-origin resource sharing）`

- 使用` Websockets`

其中，CORS 作为现在的主流解决方案，它允许浏览器向跨源服务器，发出 `XMLHttpRequest `请求，从而克服了 Ajax 只能同源使用的限制。实现 CORS 通信的关键是服务器，只要服务端实现了 CORS 接口，就可以进行跨源通信

DNS 解析完成后，浏览器获得了服务端的 IP 地址，接下来便可以向服务端发起 HTTP 请求。目前大多数 HTTP 请求都建立在 TCP 连接上，因此客户端和服务端会先建立起 TCP 连接

::: tip

客户端与服务端之间的通信是非持久连接的，即服务器端在发送了这个应答后就会与客户端断开连接

:::

## HTTP

### 简介

HTTP(全称：Hyper Text Transfer Protocol，即超文本传输协议 )；是一个简单的请求-响应协议，通常运行在TCP协议上。它指定了客户端可能发送给服务端什么样的消息，以及得到什么样的响应。请求和响应消息的头是以ASCII码形式给出的；而消息内容则是以类似MIME的格式给出的

在HTTP传输过程中，客户端总是通过建立一个连接与发送一个HTTP请求来发起一个事务。服务端不能主动与客户端联系，也不能给客户端发出一个回调连接。客户端与服务端都可以提前中断一个连接

### HTTP的主要特点

- 简单快速：客户端向服务端发起请求服务时，只需要传送方法和路径即可。常用的请求方式有GET、HEAD和POST。美中方法规定了客户端与服务端联系的类型
- 灵活：HTTP允许输入任意类型的数据对象。正在传输的类型有`Content-Type`加以标记
- 无连接：无连接的含义是限制每次连接只处理一个请求；服务器在处理完客户端的请求并应答后就断开连接
- 无状态：HTTP是无状态协议。无状态协议是指协议对事务处理没有记忆能力

### URI

HTTP使用统一资源标识符URI(即Uniform Resouerce Identifires)来传输数据和建立连接

统一资源定位符URL(Uniform Resource Locator)是一种特殊类型的URI，它包含了用与查找某个资源的足够信息，在互联网上用来标识某一处的地址

就拿一个在GitHub上搜索资源的网络地址进行解析：

```go
https://github.com/search?o=desc&q=go&s=stars&type=Repositories
```

一个完整的URL的组成包含以下几部分：

- 协议部分

  上面示例中的协议就是`https`，表示该网页使用的协议是HTTPS；在internet中可以使用多种协议，如：HTTP、HTTPS、FTP、WS等等

- 域名部分

  该URL的域名就是https://github.com。在URL中，也可以把IP地址作为域名使用

- 端口部分

  跟在域名后面的便是端口，域名与端口之间使用英文的冒号`:`隔开。如果省略端口部分，则采用默认端口80，也可以自定义端口部分，比如：`https://www.github.com:9090`

- 参数部分

  从`?`处开始到最后的都是参数，多个参数使用`&`连接。上面网址示例中，参数就是`o=desc&q=go&s=stars&type=Repositories`

### URL

URL(Uniform Resource Locator，统一资源定义符)用于描述一个网络上的资源。URL是URI的一个子集，是URI概念的一种实现方式。通俗的说，URL是internet上描述信息资源的字符串，主要用在各种www客户端程序和服务器端程序中

> URL用一种统一的格式来描述各种信息资源，包括文件、服务器的地址和目录等

### URN

URN(Uniform Resource Name，统一资源名)是带有名字的因特网资源。URN是URL的一种更新形式，URN不依赖位置，并且有可能减少失效链接的个数。但是其流行以待时日，因为它需要更精密软件的支持

### URI与URL的区别

URI可用来唯一标识一个资源。Web上的所有可用资源，如HTLM、图像、视频、程序等，都是通过一个URI来定位的；

URI一般由三部分组成：

- 访问资源的命名机制
- 存放资源的主机名
- 资源自身的名称，由路径表示，着重抢到资源

URL是一种具体的URI，即URL不仅可以用来标识一个资源，而且还指明了如何定位这个资源。URL是互联网上用来描述信息资源的字符串，主要用在各种WWW客户端程序和服务器程序上。URL可以用一种统一格式来描述各种信息资源，包含文件、服务器的地址和目录等等

URL一般由三部分组成：

- 协议，又称服务方式
- 存有该资源的主IP地址，有时也包含端口号
- 主机资源的具体地址，如目录和文件名等

### HTTP请求

客户端发送到服务器端的请求消息由请求行(Reques tLine)、请求头(Request Hander)、请求体(Request Body)组成

#### 请求行

请求行由请求方法、URI、HTTP协议/协议版本这三部分组成

在日常网络请求中，最常用的请求方法有两种：GET和POST

在浏览器中输入URL按`enter`键后，便发起了一个GET请求，请求的参数直接包含在URL中；POST请求大都在提交表单是发送

##### GET和POST的主要区别：

- GET请求中的参数包含在URL中，数据可以在URL中看到；而POST请求的URL不包含这些参数，参数都是包含在请求体中
- 一个GET请求提交的数据最多只有1024byte，而POST则没有限制

#### 常用的请求方法：

| 请求方法 | 描述                                                          |
| -------- | ------------------------------------------------------------- |
| GET      | 请求页面，并返回页面内容                                      |
| POST     | 向指定资源提交数据(表单或者文件上传)                          |
| HEAD     | 类似GET请求，只不过返回的响应体中没有具体的内容，用于获取报头 |
| PUT      | 从客户端型服务端传送的数据取代(覆盖)指定文档(资源)的内容      |
| DELETE   | 请求服务端删除置顶内容                                        |
| OPTIONS  | 允许客户端查看服务器的性能                                    |
| CONNECT  | 把服务器当作跳板，让服务器代替客户端访问网页                  |
| TRACE    | 显示服务器收到的请求，主要用于测试或诊断                      |

#### 请求头

请求头包含服务器要使用的附加信息，比较重要的信息有Cookie、Referer、User-Agent等。常用的HTTP请求头信息如下表：

| 请求头          | 示例                                          | 说明                                                                       |
| --------------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| Accept          | Accept:text/plain,text/html                   | 指定客户端能够接受的内容类型                                               |
| Accept-Charset  | Accept-Charset:iso-8859-5                     | 浏览器可以接受的字符串编码集                                               |
| Accept-Encoding | Accept-Encoding: gzip, deflate, br            | 指定浏览器可以支持的Web服务器返回内容压缩编码类型                          |
| Accept-Language | Accept-Language: en-US,en;q=0.5               | 浏览器可接受的语言                                                         |
| Accept-Ranges   | Accept-Ranges: bytes                          | 用于定义范围请求的单位                                                     |
| Authorization   | Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l | 用于验证用户代理身份的凭证                                                 |
| Cache-Control   | Cache-control: no-cache                       | 用于在http请求和响应中，通过指定指令来实现缓存机制                         |
| Connection      | Connection: keep-alive                        | 决定当前的事务完成后，是否会关闭网络连接                                   |
| Cookie          | Cookie: name=value; name2=value2;             | 在发送HTTP请求时，会把保存在该请求域名下的所有cookie值一起发送给Web服务器  |
| Content-Length  | Content-Length:512                            | 用来指明发送给接收方的消息主体的大小，即用十进制数字表示的八位元组的数目。 |

#### 请求体

请求体是指HTTP请求中传递数据的实体，常用于POST、PUT等请求体中

### HTTP响应

HTTP响应有服务器端返回给客户端，可以分为三个部分：响应状态码(Response Code)、响应头(Response Headers)和响应体(Response Body)

#### 响应状态码

HTTP 响应状态代码指示特定 [HTTP](https://developer.mozilla.org/zh-cn/HTTP) 请求是否已成功完成。响应分为五类：信息响应(`100`–`199`)，成功响应(`200`–`299`)，重定向(`300`–`399`)，客户端错误(`400`–`499`)和服务器错误 (`500`–`599`)。状态代码由 [section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10)定义

- 信息响应

| 状态码 | 说明                                                                                                                                                |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 100    | 临时响应，客户端应该继续请求，如果已经完成，则忽略它。                                                                                              |
| 101    | 响应客户端的 [Upgrade (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 请求头发送的，并且指示服务器也正在切换的协议。    |
| 102    | 表示服务器已收到并正在处理该请求，但没有响应可用。                                                                                                  |
| 103    | 用于与[`Link`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link) 链接头一起使用，以允许用户代理在服务器仍在准备响应时开始预加载资源。 |

- 成功响应

| 状态码 | 说明                                                                                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200    | 请求成功。成功的含义取决于 HTTP 方法：**GET**：资源已被提取并在消息正文中传输。 **HEAD**：实体标头位于消息正文中。 **POST**：描述动作结果的资源在消息体中传输。 **TRACE**：消息正文包含服务器收到的请求消息。 |
| 201    | 该请求已成功，并因此创建了一个新的资源。这通常是在 POST 请求，或是某些 PUT 请求之后返回的响应。                                                                                                               |
| 202    | 请求已经接收到，但还未响应，没有结果。                                                                                                                                                                        |
| 203    | 服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。当前的信息可能是原始版本的子集或者超集。                                                        |
| 204    | 服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。                                                                                                                                  |
| 205    | 服务器成功处理了请求，且没有返回任何内容。                                                                                                                                                                    |
| 206    | 服务器已经成功处理了部分 GET 请求。                                                                                                                                                                           |
| 207    | 由 WebDAV(RFC 2518)扩展的状态码，代表之后的消息体将是一个 XML 消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码。                                                                              |
| 208    | 在 DAV 里面使用: propstat 响应元素以避免重复枚举多个绑定的内部成员到同一个集合。                                                                                                                              |
| 226    | 服务器已经完成了对资源的 GET 请求，并且响应是对当前实例应用的一个或多个实例操作结果的表示。                                                                                                                   |

- 重定向

| 状态码 | 说明                                                                                                                                                                                                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 300    | 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。                                                                                                     |
| 301    | 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。                |
| 302    | 请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。                                                      |
| 303    | 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。这个方法的存在主要是为了允许由脚本激活的 POST 请求输出重定向到一个新的资源。                                                                         |
| 304    | 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。                                  |
| 305    | 被请求的资源必须通过指定的代理才能被访问。Location 域中将给出指定的代理所在的 URI 信息，接收者需要重复发送一个单独的请求，通过这个代理才能访问相应资源。只有原始服务器才能建立 305 响应。                                                    |
| 307    | 请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。                                                      |
| 308    | 这意味着资源现在永久位于由 `Location:` HTTP Response 标头指定的另一个 URI。 这与 `301 Moved Permanently HTTP` 响应代码具有相同的语义，但用户代理不能更改所使用的 HTTP 方法：如果在第一个请求中使用 `POST`，则必须在第二个请求中使用 `POST`。 |

- 客户端响应

| 状态码 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。2、请求参数有误。                                                                                                                                                                                                                                                                                                                                 |
| 401    | 当前请求需要用户验证。该响应必须包含一个适用于被请求资源的 WWW-Authenticate 信息头用以询问用户信息。客户端可以重复提交一个包含恰当的 Authorization 头信息的请求。如果当前请求已经包含了 Authorization 证书，那么 401 响应代表着服务器验证已经拒绝了那些证书。如果 401 响应包含了与前一个响应相同的身份验证询问，且浏览器已经至少尝试了一次验证，那么浏览器应当向用户展示响应中包含的实体信息，因为这个实体信息中可能包含了相关诊断信息。 |
| 402    | 此响应码保留以便将来使用，创造此响应码的最初目的是用于数字支付系统，然而***现在并未使用***。                                                                                                                                                                                                                                                                                                                                             |
| 403    | 服务器已经理解请求，但是拒绝执行它。                                                                                                                                                                                                                                                                                                                                                                                                     |
| 404    | 请求失败，请求所希望得到的资源未被在服务器上发现。                                                                                                                                                                                                                                                                                                                                                                                       |
| 405    | 请求行中指定的请求方法不能被用于请求相应的资源。                                                                                                                                                                                                                                                                                                                                                                                         |
| 406    | 请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体。                                                                                                                                                                                                                                                                                                                                                                       |
| 407    | 与 401 响应类似，只不过客户端必须在代理服务器上进行身份验证。                                                                                                                                                                                                                                                                                                                                                                            |
| 408    | 请求超时。客户端没有在服务器预备等待的时间内完成一个请求的发送。                                                                                                                                                                                                                                                                                                                                                                         |
| 409    | 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。                                                                                                                                                                                                                                                                                                                                                                                 |
| 410    | 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。                                                                                                                                                                                                                                                                                                                                                                         |
| 411    | 服务器拒绝在没有定义 `Content-Length` 头的情况下接受请求。                                                                                                                                                                                                                                                                                                                                                                               |
| 412    | 服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。                                                                                                                                                                                                                                                                                                                                                                   |
| 413    | 服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围。                                                                                                                                                                                                                                                                                                                                                 |
| 414    | 请求的 URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务。                                                                                                                                                                                                                                                                                                                                                              |
| 415    | 对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝。                                                                                                                                                                                                                                                                                                                                           |
| 416    | 如果请求中包含了 Range 请求头，并且 Range 中指定的任何数据范围都与当前资源的可用范围不重合，同时请求中又没有定义 If-Range 请求头，那么服务器就应当返回 416 状态码。                                                                                                                                                                                                                                                                      |
| 417    | 此响应代码意味着服务器无法满足 [`Expect`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expect) 请求标头字段指示的期望值。                                                                                                                                                                                                                                                                                                   |
| 418    |                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 421    | 该请求针对的是无法产生响应的服务器。 这可以由服务器发送，该服务器未配置为针对包含在请求 URI 中的方案和权限的组合产生响应。                                                                                                                                                                                                                                                                                                               |
| 422    | 请求格式良好，但由于语义错误而无法遵循                                                                                                                                                                                                                                                                                                                                                                                                   |
| 423    | 正在访问的资源被锁定。                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 424    | 由于先前的请求失败，所以此次请求失败。                                                                                                                                                                                                                                                                                                                                                                                                   |
| 425    | 服务器不愿意冒着风险去处理可能重播的请求。                                                                                                                                                                                                                                                                                                                                                                                               |
| 426    | 服务器拒绝使用当前协议执行请求，但可能在客户机升级到其他协议后愿意这样做。                                                                                                                                                                                                                                                                                                                                                               |
| 428    | 原始服务器要求该请求是有条件的。 旨在防止“丢失更新”问题，即客户端获取资源状态，修改该状态并将其返回服务器，同时第三方修改服务器上的状态，从而导致冲突。                                                                                                                                                                                                                                                                                  |
| 429    | 用户在给定的时间内发送了太多请求                                                                                                                                                                                                                                                                                                                                                                                                         |
| 431    | 服务器不愿意处理请求，因为它的 请求头字段太大（ Request Header Fields Too Large）。 请求可以在减小请求头字段的大小后重新提交。                                                                                                                                                                                                                                                                                                           |
| 451    | 用户请求非法资源，例如：由政府审查的网页。                                                                                                                                                                                                                                                                                                                                                                                               |

- 服务端响应

| 状态码 | 说明                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------- |
| 500    | 服务器遇到了不知道如何处理的情况。                                                                      |
| 501    | 此请求方法不被服务器支持且无法被处理。只有`GET`和`HEAD`是要求服务器支持的，它们必定不会返回此错误代码。 |
| 502    | 此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。                    |
| 503    | 服务器没有准备好处理请求。 常见原因是服务器因维护或重载而停机。                                         |
| 504    | 当服务器作为网关，不能及时得到响应时返回此错误代码。                                                    |
| 505    | 服务器不支持请求中所使用的 HTTP 协议版本。                                                              |
| 506    | 服务器有一个内部配置错误：对请求的透明内容协商导致循环引用。                                            |
| 507    | 服务器有内部配置错误：所选的变体资源被配置为参与透明内容协商本身，因此不是协商过程中的适当端点。        |
| 508    | 服务器在处理请求时检测到无限循环。                                                                      |
| 510    | 客户端需要对请求进一步扩展，服务器才能实现它。服务器会回复客户端发出扩展请求所需的所有信息。            |
| 511    | 511 状态码指示客户端需要进行身份验证才能获得网络访问权限。                                              |

#### 响应头

**响应头（Response header）** 可以定义为：被用于http响应中并且和响应消息主体无关的那一类 [HTTP header](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP_header)。像[`Age`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Age), [`Location`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location) 和 [`Server`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Server)都属于响应头，他们被用于描述响应。

并非所有出现在响应中的http header都属于响应头，例如[`Content-Length`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Length)就是一个代表响应体消息大小的[entity header](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity_header)，虽然你也可以把它叫做响应头。

#### 响应体

响应体是HTTP请求返回的内容；响应的正文数据都在响应体中。比如：在请求网页时，响应体就是网页的HTML代码；在请求一张图片时，响应体就是图片的二进制数据。我们请求网页后，浏览器要解析的内容就是响应体

## 创建简单的服务器端程序

使用Go语言编程的原因之一无疑是其高性能和开发的高效率。在Go Web开发中主要使用的是`net/http`包

### 创建和解析HTTP服务器端

> 要创建一个Go语言的HTTP服务器端，需首先使用`HandleFunc()`函数注册路由，然后通过`ListenAndServe()`函数开启对客户端的监听

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/", helloFuture)

	// 监听端口并启动服务
	server.ListenAndServe()
}

func helloFuture(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello future")
}
```

运行当前程序，将终端路径切换到当前程序文件目录下，运行程序，命令：`go run main.go`；然后在终端中访问`http://localhost:8081`，效果图如下：

<img src="./assets/image-20210808105137961.png" alt="image-20210808105137961" style="zoom:50%;" />

### 内部调用逻辑分析

如果要创建一个Web服务器端，则需要：

- 调用`http.HandleFunc()`函数

- 调用`http.ListenAndServe()`函数，此函数有两个参数，当前监听的端口号和实践处理器handler

### 创建客户端请求

在Go语言中创建客户端，最核心的HTTP请求方法就是`NewRequest()`函数

#### 创建GET请求

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/", handleGet)

	// 监听端口并启动服务
	server.ListenAndServe()
}


func handleGet(w http.ResponseWriter, r *http.Request) {
	response, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
	if err != nil {
		fmt.Println("err", err)
	}
	closer := response.Body
	bytes, err := ioutil.ReadAll(closer)
	fmt.Fprintf(w, string(bytes))
}
```

运行程序后，结果如下：

![image-20210808110515633](./assets/image-20210808110515633.png) 

#### 创建POST请求

```go
package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/post", handlePost)

	// 监听端口并启动服务
	server.ListenAndServe()
}

func handlePost(w http.ResponseWriter, r *http.Request) {
  url := "http://localhost:5000/register"
	body := `{
		"nickname": "Forest",
		"password": "Xdm1234@qq.com",
		"email": "767425412@qq.com",
		"avatar": "",
		"motto": "我不怕失败，即使头破血流我也要奋力向前"
	}`
  
	response, err := http.Post(url, "application/x-www-form-urlencoded", bytes.NewBuffer([]byte(body)))
	if err != nil {
		fmt.Println("err:", err)
	}
  
	b, err := ioutil.ReadAll(response.Body)
  if err != nil {
		fmt.Println("err:", err)
	}
  
	fmt.Fprintf(w, string(b))
}
```

#### 创建PUT请求

PUT方法在Go语言中没有给单独封装，只能直接调用`http.NewRequest()`函数来实现

```go
package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/put", handlePut)

	// 监听端口并启动服务
	server.ListenAndServe()
}

func handlePut(w http.ResponseWriter, r *http.Request) {
	url := "http://localhost:500/update"
	payload := strings.NewReader(`{
		"userId": 1,
		"nickname": "clin",
		"email": "767425412lin@gmail.com",
	}`)

	requset, _ := http.NewRequest("PUT", url, payload)
	requset.Header.Add("Content-Type", "application/json")
	response, _ := http.DefaultClient.Do(requset)

	defer response.Body.Close()
	body, _ := ioutil.ReadAll(response.Body)

	fmt.Println("body:", body)
}
```

#### 创建DELETE请求

DELETE方法也一样，没有单独被封装，也只能调用`http.NewRequest()`函数来创建

```go
package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {
	// 启动一个http服务
	server := &http.Server{
		Addr: "0.0.0.0:8081",
	}

	// 服务响应
	http.HandleFunc("/delete", handleDelete)

	// 监听端口并启动服务
	server.ListenAndServe()
}


func handleDelete(w http.ResponseWriter, r *http.Request){
	url := "http://www.shirdon.com/comment/update"
	payload := strings.NewReader(`{
		"userId": 1,
	}`)

	requset, _ := http.NewRequest("DELETE", url, payload)
	requset.Header.Add("Content-Type", "application/json")
	response, _ := http.DefaultClient.Do(requset)

	defer response.Body.Close()
	body, _ := ioutil.ReadAll(response.Body)

	fmt.Println("body:", body)
	fmt.Fprintf(w, `{success: ok}`)
}
```

## 模版引擎

Go语言中通用的模版引擎库`text/template`用于处理任意格式的文本。另外，Go语言还单独提供了`html/template`包，用于生成可对抗代码注入的安全HTML文档

### 模板原理

#### 模板和模板引擎

在给予MVC模型的Web架构中，我们常将不变的部分提出来成为模版，而那些可变部分有后端程序提供数据，借助模版引擎渲染来生成动态网页

模板可以被理解为事先定义好的HTML文档。模板渲染可以被简单理解为文本替换操作——是后端用相应的数据去替换HTML文档中实现准备好的标记

模板的诞生是为了将显示于数据分离（即前后端分离）；模板技术多种多样，但本质是将模板文件和数据通过模板引擎生成最终的HTML文档。模版引擎有很多，比如：Node.js的[ejs](https://link.zhihu.com/?target=https%3A//ejs.bootcss.com/)、[nunjucks](https://link.zhihu.com/?target=https%3A//nunjucks.bootcss.com/)等等

#### Go语言的模板引擎

Go语言内置了文本模板引擎`text/template`包，以及用于生成HTML文档的`html/template`包，它们的使用基本类似，大致总结为以下几点：

- 模板文件的后缀通常是`.tmpl`和`.tpl`(也可以使用其他的后缀)，必须使用`UTF-8`编码
- 模板文件中使用`{{}}`来包裹和表示需要传入的数据
- 传给模板的数据可以通过点号`.`来访问。如果是符合类型的数据，则可以通过`{{.FieldName}}`来访问它的字段
- 出`{{}}`包裹外，其他的内容均不做任何处理，原样输出

Go语言模版引擎的使用分为：**定义模板文件**、**解析模板文件和渲染文件**

1. 定义模板文件

   定义模板文件是指按照相应的语法规则去定义模板文件

2. 解析模板文件

   `html/template`包提供了以下方法来解析模板文件、获取模板对象；可以通过`New()`函数来创建模板对象，并为其挺假一个模板名称。`New()`函数的定义如下：

   ```go
   func New(name string) *Template
   ```

   可以使用`Parse()`函数来创建模板对象并完成解析模版内容。`Parse()`定义方法如下：

   ```go
   func (t *Template) Parse(src string) (*Template, err)
   ```

   如果要解析模板文件，则可以使用`ParseFile()`函数，该函数会返回模板对象。该函数定义如下：

   ```go
   func ParseFiles(filenames ...string) (*Template, error)
   ```

   如果要批量解析文件，则可以使用`ParseGlob()`函数。该函数的定义如下：

   ```go
   func ParseGlob(pattern string) (*Template, error)
   ```

   可以使用`ParseGlob()`函数来进行正则匹配，比如在当前解析目录下有以`a`开头的模板文件，则使用`template.ParseGlob("a*")`

3. 渲染模板文件

   `html/template`包提供了`Execute()`和`ExecteTemplate()`方法来渲染模板

   ```go
   func (t *template) Execute(wr Writer, data interface{}) error {}
   
   func (t *template) ExecuteTemplate(wr io.Writer, name string, data interface{}) error {}
   ```

   在创建`New()`函数时就为模板对象添加了一个模板名称，执行`Execute()方法后会默认去寻找该名称进行数据融合

   使用`ParseFile()`函数可以一次加载多个模板，此时不可以使用`Execute()`来执行数据融合，可以通过`ExecuteTemplate()`方法指定模板名称来执行数据融合

### 使用html/template包

#### 创建模板

在Go语言中，可以通过将模板应用于一个数据结构（即把该数据结构作为模板的参数）来执行并输出HTML文档

模板在执行时会遍历数据结构，并将指针指向运行中的数据结构中的`.`的当前位置

用作模板的输入文本必须是UTF-8编码的文本；Action是数据运算和控制单位，Action有`{{`和`}}`界定；在Action之外的所有文本都不做修改的复制到输出中。Action内部不能有换行，但注释可以有换行

接下来就创建并实践模板吧

- 新建一个项目example，然后在example中分别创建examp/template/index.tmpl和main.go

- 创建模板文件

  ```shell
  // example/template/index.tmpl
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>模板</title>
  </head>
  <body>
      <p>加油，少年！{{.}}</p>
  </body>
  </html>
  ```

- 创建用于创建和渲染模板的文件(main.go)

  ```go
  package main
  
  import (
  	"fmt"
  	"html/template"
  	"net/http"
  )
  
  func helloHandleFunc(w http.ResponseWriter, r *http.Request) {
  
  	// 解析模板
  	tpl, err := template.ParseFiles("./template/index.tmpl")
  	if err != nil {
  		fmt.Println("template parsefile failed, err:", err)
  		return
  	}
  
  	// 渲染模版
  	name := "learn Go"
  	tpl.Execute(w, name)
  }
  func main() {
  	http.HandleFunc("/", helloHandleFunc)
  	http.ListenAndServe(":8082", nil)
  }
  ```

- 在命令行终端输入启动命令(注意，一定是在文件所在路径下)

  ```shell
  go run main.go
  ```

- 在浏览器中访问`http://localhost:8082/`，最终效果图如下所示：

  <img src="./assets/image-20210809065158135.png" alt="image-20210809065158135" style="zoom:50%;" />

#### Go语言模板语法

模板语法都包含在`{{`和`}}`中间，其中`.`表示当前对象，在传入一个结构体对象时，可以根据`.`来访问结构体的对应字段，例如来写一个个人信息的模板渲染：

```go
// example/template/user.tpml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>模板</title>
  </head>
  <body>
    <table border="1">
      <thead>
          <th rowspan="2">个人信息</th>
      </thead>
      <tr>
        <td>nickname</td>
        <td>{{.Nickname}}</td>
      </tr>
      <tr>
        <td>age</td>
        <td>{{.Age}}</td>
      </tr>
      <tr>
        <td>gender</td>
        <td>{{.Gender}}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{{.Email}}</td>
      </tr>
    </table>
  </body>
</html>
```

完善解析模板的文件及数据

```go
// example/main.go
type User struct {
	Nickname string
	Gender string
	Age int
	Email string
}

func handleSayHi(w http.ResponseWriter, r *http.Request){
	// 解析模板
	tpl, err := template.ParseFiles("./template/user.tmpl")
	if err != nil {
		fmt.Println("create template failed, err:", err)
		return
	}

	// 利用给定数据渲染模版，并将结果写入w
	user := User{
		Nickname: "Forest",
		Gender: "man",
		Age: 22,
		Email: "767425412@qq.com",
	}
	tpl.Execute(w, user)
}
```

重新运行命令启动程序，然后在浏览器中访问：`http://localhost:8082/say-hi`，效果图如下：

<img src="./assets/image-20210809071300780.png" alt="image-20210809071300780" style="zoom:50%;" />

> 在传入的变量时map时，也可以在模板文件中通过`.`来访问值

#### **常用模板语法**

- 注释

  在Go语言中，HTML模板的注释结构如下：

  ```go
  {{/* 这是一个注释，不会被解析 */}}
  ```

- 管道(pipeline)

  管道是指产生数据的操作；比如：`{{.}}`、`{{.Nickname}}`等，Go的模板语法中支持用管道符`|`来链接多个命令，用法和UNIX下的管道类似：`|`前面的命令会将晕眩结果(或返回值)传递给后一个命令的最后一个位置

  ::: tip 注意

  并不是只有使用`|`才是管道，在Go的模板语法中，pipeline的概念时传递数据，只要能产生数据的结构，都是pipeline

  :::

- 变量

  在Action里可以初始化一个变量来捕获管道的执行结果。初始化语法如下：

  ```go
  $variable := pipline
  ```

  其中`$variable`是变量的名字。声明变量的Action不会产生任何输出

- 条件判断

  Go模板语法中的条件判断有一下几种：

  ```
  {{if pipline}} T1 {{end}}
  {{if pipline}} T1 {{else}} T0 {{end}}
  {{if pipline}} T1 {{else if pipline}} T0 {{end}}
  ```
  
  

- renge关键字

  在Go的模板语法中，使用`range`关键字进行遍历，其中`pipline`的值必须是数组、切片、map或者channel。其语法以`{{range pipline}}`开头，以`{{end}}`结尾，形式如下：

  ```go
  {{range pipline}} T1 {{end}}
  ```

  如果`pipline`的值值其长度为0，则不会有任何输出。中间也可以有`{{else}}`，如下：

  ```go
  {{range pipline}} T1 {{else}} T0 {{end}}
  ```

  如果`pipline`的值其长度为0则会执行T0

  示例如下：

  ```go
  package main
  
  import (
  	"html/template"
  	"log"
  	"net/http"
  )
  
  func handleRange(w http.ResponseWriter, r *http.Request) {
  	rangeTemplate := `<p>{{if .Kind}}</p>
  	<p>{{range $i, $v := .MapContent}}</p>
  	<p>{{$i}} => {{$v}},{{$.OutsideContent}}</p>
  	<p>{{end}}</p>
  	<p>{{else}}</p>
  	<p>{{range .MapContent}}</p>
  	<p>{{.}}, {{$.OutsideContent}}</p>
  	<p>{{end}}</p>
  	<p>{{end}}</p>`
  
  	str1 := []string{"first range", "use index and value"}
  	str2 := []string{"second range", "not use index and value"}
  
  	type Content struct {
  		MapContent     []string
  		OutsideContent string
  		Kind           bool
  	}
  
  	var content = []Content{
  		{str1, "第一次外面的内容", true},
  		{str2, "第二次外面的内容", false},
  	}
  
  	// 创建模板并将字符解析进去
  	t := template.Must(template.New("range").Parse(rangeTemplate))
  	fmt.Println("t:", t)
  	for _, c := range content {
  		err := t.Execute(w, c)
  		if err != nil {
  			log.Println("executing template:", err)
  		}
  	}
  }
  
  func main() {
  	http.HandleFunc("/range", handleRange)
  	http.ListenAndServe(":8082", nil)
  }
  ```

  重新运行程序后，访问浏览器效果图如下：

  <img src="./assets/image-20210811072640545.png" alt="image-20210811072640545" style="zoom:50%;" />

- with关键字

  在Go的模板语法中，`with`关键字和`if`关键字有点类似，`{{with}}`操作尽在传递的管道部位空时有条件地执行其主体。如下：

  ```go
  {{with pipline}} T1 {end}
  ```

  如果`pipline`为空，则不产生输出。中间也可以`{{else}}`；例如：

  ```go
  {{with pipline}} T1 {{else}} T0 {{end}}
  ```

  如果`pipline`为空，则不改变`.`并执行T0；否则将`.`设为`pipline`的值并执行T1

- 比较函数

  布尔函数会将任何类型的零值是为假，将其余视为真。例如下面常用的二元比较运算符：

  | 运算符 | 说明                             |
  | ------ | -------------------------------- |
  | eq     | 相等判断；例如：arg1 == arg2     |
  | ne     | 不相等判断；例如：arg1 != arg2   |
  | lt     | 小于判断；例如：arg1 < arg2      |
  | le     | 小于等于判断；例如：arg1 <= arg2 |
  | gt     | 大于判断；例如：arg1 > arg2      |
  | ge     | 大于等于判断；例如：arg1 >= arg2 |

  为简化多参数相等检测，`eq`可以接受2个或者多个参数，它将第一个参数和其余参数依次比较，如下：

  ```go
  {{eq arg1 arg2 arg3 ... argn}}
  ```

  即只能做如下比较

  ```go
  arg1 ==arg2 || arg1 == arg2 || ... || arg1 == argn
  ```

  比较函数只适用基本类型（或在重定义的基本类型，如"type Balance float32"）。但整数和浮点数不能互相比较

- 预定义函数
- 自定义函数
- 使用嵌套模板
  