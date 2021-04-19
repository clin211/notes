## script元素
### JavaScript在网页中解决的问题
> 希望将JavaScript引入到html页面的同时，不会导致页面在其他浏览器中渲染出问题

### JavaScript元素中的属性
> async：可选，表示立即下载文件资源，不会阻止页面其他操作；比如下载资源、等待其他脚本加载。此属性只对外部脚本文件有效。
> charset：可选，使用src属性指定的代码字符集。
> crossorigin：可选，配置相关请求的CORS(跨源资源共享)设置，默认不使用CORS。 `corsorigin="anonymous"` 配置文件请求不比设置凭据标志。 `corsorigin="use-credentials"` 设置凭据标志，意味着出站请求会包含凭据。
> defer：可选，表示文档解析或者显示完成之后再执行脚本；只对外部脚本文件有效，在IE7及更早的浏览器版本中，对行内脚本也可以指定这个属性。
> integrity：可选，允许比对接收到资源的签名和指定的加密签名以及验证子资源完整性，如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行，这个属性可以用于确保内容分发网络不会提供恶意内容。
> language：废弃，最初用于表示代码块的脚本语言(如“JavaScript”、“JavaScript1.2”、或“VBScript”)，大多数浏览器都会忽略这个属性。
> src：可选，表示包含要执行的代码的外部文件。
> type：可选，代替language，表示代码中脚本语言的内容类型(也称MIME类型)，如果这个值是module，则代码会当成es6模块



> Tips:
> script的使用方式有两种：
> - 通过它直接在网页中嵌入JavaScript代码，但在执行代码中不能有 `</script>` 

```javascript
<script>
		function say(){
				alert('say hi');
  			console.log('</script>');// 报错，js解析时会将其解析为script的结束标签
		}  
</script>

// 修改后如下代码
<script>
		function say(){
				alert('say hi');
  			console.log('<\/script>');// \转义
		}  
</script>
```

- src引入外部文件内；例如：
```javascript
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```


### 标签的位置
> 之前都将script元素放到head标签内，这样也就意味着要将所有的JavaScript代码都下载、解析和解释完成之后，才能开始渲染页面，，对于需要很多JavaScript的页面，这就会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白，为解决这个问题，现代web应用程序通常将所有的JavaScript引入放在body元素中的页面内容后面。



### 推迟执行脚本
> 在HTML 4.01为script元素定义了一个叫defer的属性，这个属性表示脚本再执行的时候不会改变页面的结构，因此这个脚本完全可以在整个页面解析完成之后再运行，HTML5规范要求脚本应该按照他们出现的顺序执行，因此第一个推迟的脚本会在第二个推迟的脚本之前执行，而且两者都会在DOMContentLoaded事件之前执行；不过在实际当中，推迟脚本不一定总会按照顺序执行或者再DOMContentLoad事件之前执行，因此最好只包含一个这样的脚本。
> defer属性只对外部脚本文件才生效，对defer属性的支持是从IE4.0、Firefox3.5、Safari 5和chrome 7开始的，其他浏览器则会忽略这一属性，考虑到这一点、还是把推迟脚本放在页面底部较好

### 异步执行脚本
> HTML5为script标签定义了async属性，从改变脚本处理方式上看，async属性与defer类似，两者都是只适用于外部脚本文件，都会告诉浏览器立即开始下载，不过，与defer不同的是标记为async的脚本并不能保证按照他们出现的顺序来依次执行

### 动态加载脚本
> 通过向dom中动态添加script元素同样可以加载指定的脚本，默认情况下，以这种方式创建的script元素是以异步加载的，相当于添加了async属性，这样可能会导致的问题是，所有浏览器都支持createElement()方法，但不是所有浏览器都支持async属性，因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载。

```javascript
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js';
script.async = false;
document.head.appendChild(script);
```
> 以这种方式获取的资源对浏览器加载器是不可见的，这回严重影响他们在资源获取队列中的优先级；根据应用程序的工作方式以及怎么使用，赭红方式可能会暗中影响性能，要想让预加载器这些动态请求文件的存在，可以在文档头部显示声明它们：

```javascript
<link rel="preload" href="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
```
### XHTML中的变化
> XHTML: 可扩展超文本标记语言（Extentsible HyperText Markup Language）是将HTML作文XML的应用重新包装的结果；与HTML不同的是在XHTML中使用JavaScript必须指定type属性且值为text/javascript；HTML可没有这个属性。
> #### JavaScript在XHTML中的解析规则：
> - XHTML中嵌套的JavaScript代码，若有比较运算符（<）则会被解析为一个标签的开始，并且由于标签的开始的小于符号后面不能有空格，所以会导致语法错误；解决如上问题的方案有两个：

```javascript
<!--- 
  在xhtml中会报错的问题：
		1、没有type="text/javascript"属性值声明
    2、小于符号会被解析为一个标签的开始
-->
<script>
function compare () {
    if(a < b){
        console.log('a is less than b');
    }
    else if(a > b) {
        console.log('a is greater than b');
    }
    else {
        console.log('a is equal to b');
    }
}
</script>
```
>    - 将所有的小于符号都替换成对应的HTML实体形式(&lt;)
>    - 将所有的代码都包含在CDATA中；在XHTML中，CDATA块表示文档可以包含文档的区块，其内容不作为标签来解析，因此可以在其中包含任意字符，包括小于符号，并且不会引起语法错误；

```javascript
<script type="text/javascript">
    <![CDATA[
        function compare () {
            if(a < b){
                console.log('a is less than b');
            }
            else if(a > b) {
                console.log('a is greater than b');
            }
            else {
                console.log('a is equal to b');
            }
        }
    ]]>
</script>
```
> 在兼容XHTML的浏览器中，这样能解决问题，但在不支持CDATA块的非XHTML浏览器中则不行；为此CDATA必须使用JavaScript注释来抵消：

```javascript
<script type="text/javascript">
    //<![CDATA[
        function compare () {
            if(a < b){
                console.log('a is less than b');
            }
            else if(a > b) {
                console.log('a is greater than b');
            }
            else {
                console.log('a is equal to b');
            }
        }
    //]]
</script>
```
## 行内的代码与外部代码
> 虽然可以在html文件中嵌套JavaScript代码，但通常认为最佳实践是尽可能将JavaScript代码放在外部文件；不过这个最佳实践并不是明确的强制性规则，不过有一下好处：
> - 可维护
> - 缓存
> - 适应未来

## 文档模式：混杂模式、标准模式和准标准模式
> 使用doctype来切换文档模式；混杂模式可以让ie像ie5一样支持一些非标准的特性，标准模式可让ie具有兼容标准的行为；这两种模式的主要区别主要体现在css渲染内容方面，对JavaScript也有一些关联影响，或称为副作用。
> 混杂模式在所有浏览器中都以省略文档的开头doctype声明作为开关；准标准模式通过过渡性文档类型（Transitional）和框架集文档类型（Frameset）来触发。

## noscript元素
> 针对早期浏览器不支持JavaScript的问题的优雅降级的处理方案
> `noscript` 中可以包含body中的任何元素， <`script>` 除外，以下情况任意一点出现浏览器将显示其内容：
> - 浏览器不执行脚本
> - 浏览器对脚本的支持被关闭



