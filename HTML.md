# HTML

### 1.行内元素和块级元素

##### 行内元素：水平分布多个占一行  不可以设置宽高

例如：a  span  i  strong  em

##### 块级元素：垂直分布 独占一行 可以设置宽高

例如：div p ul li h1-h6 table 

##### 块级元素和行内元素的相互转换：

我们可以通过display属性将块级元素(比如div)和行内元素进行相互转换。

　　display：inline;

　　那么这个标签将变为行内元素，即：

　　　　1，此时这个div将不能设置宽度和高度了。

　　　　2，此时这个div可以和其他行内元素并排了。

　　同样的到了我们也可以用display将行内元素(比如span)转行成块级元素。

　　display：block；

　　那么这个span标签将变为块级标签，即：

　　　　1，此时这个span能够设置宽度，高度。

　　　　2，此时这个span必须独占一行，其他元素无法与之并排。

　　　　3，如果不设置宽度，将占满父级。

##### em和rem

em是相对于父元素的的font-size

rem是相对于根元素的html的font-size

### 2.HTML语义化理解

html中自带了一些标签，这些标签有特定含义，比如H1-H6代表标题、p代表段落、img代表图片

html5里也推出了一些新的标签：header、footer、nav这些标签都有特定的含义，使用的时候应该尽量按照它的语义来使用

好处：

（1）别人阅读你的代码的时候能够根据标签才出来你的用意，有利于程序员阅读，便于团队开发和维护

（2）浏览器读取方便

（3）有利于搜索引擎优化（SEO：Search Engine Optimization）（比如说会根据标签来搜索，可能重点会搜索h1）

（4）有一些标签默认会有一些样式，如果浏览器禁止了CSS样式还可以达到突出样式的效果，比如h1

### 3.H5新特性

1. 语义化标签：header、footer、section、nav、aside、article

2. 增强型表单：input 的多个 type

   HTML5 拥有多个新的表单 Input 输入类型。这些新特性提供了更好的输入控制和验证

   | input 的 type | 描述                         |
   | :------------ | :--------------------------- |
   | color         | 主要用于选取颜色             |
   | date          | 从一个日期选择器选择一个日期 |
   | datetime      | 选择一个日期（UTC 时间）     |
   | email         | 包含 e-mail 地址的输入域     |
   | month         | 选择一个月份                 |
   | number        | 数值的输入域                 |
   | range         | 一定范围内数字值的输入域     |
   | search        | 用于搜索域                   |
   | tel           | 定义输入电话号码字段         |
   | time          | 选择一个时间                 |
   | url           | URL 地址的输入域             |
   | week          | 选择周和年                   |

3. 新增表单元素：datalist、keygen、output

   | 表单元素 | 描述                                                         |
   | -------- | ------------------------------------------------------------ |
   | datalist | 元素规定输入域的选项列表，使用 input 元素的 list 属性与 datalist 元素的 id 绑定 |
   | keygen   | 提供一种验证用户的可靠方法，标签规定用于表单的密钥对生成器字段 |
   | output   | 用于不同类型的输出，比如计算或脚本输出                       |

4. 新增表单属性：placehoder、required、min 和 max

   | 表单属性        | 描述                                                         |
   | --------------- | ------------------------------------------------------------ |
   | placehoder      | 简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失 |
   | required        | 是一个 boolean 属性。要求填写的输入域不能为空                |
   | pattern         | 描述了一个正则表达式用于验证 input 元素的值                  |
   | min 和 max      | 设置元素最小值与最大值                                       |
   | step            | 为输入域规定合法的数字间隔                                   |
   | height 和 width | 用于 image 类型的 input 标签的图像高度和宽度                 |
   | autofocus       | 是一个 boolean 属性。规定在页面加载时，域自动地获得焦点      |
   | multiple        | 是一个 boolean 属性。规定 input 元素中可选择多个值           |

5. 音频视频：audio、video

6. canvas

7. 地理定位

8. 拖拽 

    Drag 与Drop 拖放

   https://www.w3school.com.cn/html5/html_5_draganddrop.asp

9. 本地存储：

   localStorage - 没有时间限制的数据存储；

   sessionStorage - 针对一个 session 的数据存储，当用户关闭浏览器窗口后，数据会被删除

10. 新事件：onresize、ondrag、onscroll、onmousewheel、onerror、onplay、onpause

    | 事件         | 描述                                 |
    | ------------ | ------------------------------------ |
    | onresize     | 当调整窗口大小时运行脚本             |
    | ondrag       | 当拖动元素时运行脚本                 |
    | onscroll     | 当滚动元素滚动元素的滚动条时运行脚本 |
    | onmousewheel | 当转动鼠标滚轮时运行脚本             |
    | onerror      | 当错误发生时运行脚本                 |
    | onplay       | 当媒介数据将要开始播放时运行脚本     |
    | onpause      | 当媒介数据暂停时运行脚本             |

11. WebSocket：单个 TCP 连接上进行全双工通讯的协议