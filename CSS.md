# css

### 1.css选择器

##### 基本选择器

id选择器：\#id_name{    color:red; }

class选择器：.class_name{    color:red; }

元素/标签选择器：span{    color:red; }

通用选择器：*{    color:red; }

##### 组合选择器

后代选择器，空格隔开：div span{    color:red; }                                                     //选择div里的所有的span

子代选择器，>连接：div>span{    color:red; }                                                         //选择第一层内的所有span

毗邻选择器，也就是紧邻的兄弟选择器，+连接：div+span{    color:red; }           //选择div同级别的紧挨着的下面																																		  一个span，隔着一个都不行

弟弟选择器，~连接：div~span{    color:red; }                                                          //选择同级别下面的所有span

##### 属性选择器

属性选择器，以`[]`作为标志。

- 含有某个属性的标签

  ```css
  Copy[username]{  /*选择属性名含有username的标签*/
      color:red;
  }
  ```

- 含有某个属性且有某个值的标签，选择属性名为

  ```css
  Copy[username='xliu']{	/*选择属性名含有username且名字为'xliu'的标签*/
      color:red;
  }
  ```

- 含有某个属性且有某个值的某个标签

  ```css
  Copyinput[username='xliu']{	/*选择属性名含有username且名字为'xliu'的input标签*/
      color:red;
  }
  ```

##### 群组选择器

多个选择器可以同时设置样式，选择器之间用逗号隔开。

```css
Copydiv, p, span{
    color:red;
}

#name, .animal, span{
    color:red;
}
```

##### 伪类选择器

a:link{color:red;}   //a标签访问前的颜色

a:hover			       //鼠标悬浮在a标签上，显示的颜色

a:active		           //鼠标点击不松开时a标签的颜色，激活态

a:visited		          //访问之后a标签的颜色

input:focus		    //input框获取焦点(鼠标点了input框)时的颜色

##### 伪元素选择器

注意：before和after通常用来清除浮动带来的影响：**父标签塌陷问题**

```css
Copy/*设置段落首字符样式*/
p:first-letter {
            font-size: 48px;
            color: orange;
        }

/*在文本开头 同css添加内容*/
p:before { 
            content: '你说的对';
            color: blue;
        }

/*在文本结尾 同css添加内容*/
p:after{
    ...
} 
```

##### 选择器的优先级

- 选择器相同，就近原则。（三种引入方式，谁靠近标签谁有效）

- 选择器不同，精确度越高原则。

  ```css
  Copy顺序：行内 > id选择器 > class选择器 > 标签选择器
  权重：    1000    100         10           1 
  ```

### 2.css的优先级

!important

style 1000

id  100

class 10

标签  1

### 3.定位

##### absolute

绝对定位 定位后空间释放 相对于最近已定位的祖先元素

##### relative

相对定位 定位后空间不释放 相对于自己的初始位置

##### fixed

固定定位 定位后空间释放 相对于浏览器可视窗口

##### static

默认的定位

##### sticky

粘性定位 吸顶效果

position:sticky是css定位新增属性；可以说是相对定位relative和固定定位fixed的结合；它主要用在对scroll事件的监听上；简单来说，在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时(比如top：100px)；position:sticky这时的效果相当于fixed定位，固定到适当位

### 4.浮动

float:left right

浮动元素脱离文档流 空间释放,宽高是内容撑的

子元素浮动，父元素高度塌陷

##### 解决塌陷

###### 1. 添加一个新的div

在div3下面添加一个宽度为0，高度为0，并且设置clear: both属性的空div。

```
.div4 {
    clear: both;
}

<div class="div4"></div>
```

页面如图所示
![图片描述](https://segmentfault.com/img/bV8Dos?w=1920&h=887)

父元素的高度可以显示了。

###### 2. 设置父元素属性

对父元素设置属性overflow: hidden或overflow: auto，

```
.div-outer {
    border: solid 2px #223344;
    overflow: hidden;
}
```

设置overflow: hidden的意思是，overflow规定当内容溢出元素框时发生的事情，
![图片描述](https://segmentfault.com/img/bV8I4S?w=1095&h=336)
因为父元素没有指定高度，默认是auto，所以需要计算父元素包含的内容的高度，这样子元素浮动的高度就被计算进去，解决了浮动塌陷。

页面如图所示，
![图片描述](https://segmentfault.com/img/bV8Dos?w=1920&h=887)

或者对父元素设置属性display: table，

```
.div-outer {
    border: solid 2px #223344;
    display: table;
```

设置display: table的意思是，使父元素形成了BFC(Block Form Content)，
BFC有三个特性：

1. 防止上下margin重叠
2. 防止浮动元素重叠
3. 防止浮动塌陷

overflow: hidden也形成了BFC，BFC会将子元素的浮动高度计算进去，解决浮动塌陷。

页面如图所示，
![图片描述](https://segmentfault.com/img/bV8ISF?w=1920&h=886)

不同之处在于设置属性overflow: hidden，父元素宽度会是100%，而设置属性display: table，父元素的宽度会随子元素变化，。

###### 3. 内墙法

在父元素后面使用伪元素:after，

```
.div-outer:after{
    display: block;
    content: "";
    height: 0;
    clear: both;
}
```

这种方法的作用和第一种方法是相同的，只不过没有在div3后面再添加一个空的div，因为添加div会影响性能。

```
display: block;
content: "";
height: 0;
```

这就类似添加了一个空的div，然后设置属性clear: both。

### 5.盒模型

css盒模型 内容 content + padding +border+margin

###### W3C标准盒模型

width = content 宽即内容

###### 怪异盒模型 

ie6以及ie6以下的浏览器 不写doctype 会表现成怪异

width = border + padding + content  内边距+边框+内容=宽

###### 标准盒模型和怪异盒模型的转化

box-sizing : content-box(标准盒模型) border-box (怪异盒模型);

### 6.父子外边距合并

1.父元素加上overflow：hidden；

2.父元素加上边框

3.父元素或者子元素进行浮动或者定位

### 7.BFC

BFC 块级格式化上下文 （Box、Formatting Context）

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

###### 触发BFC条件 

1.html

2.float属性不为none

3.position为absolute或fixed

4.display为inline-block, table-cell, table-caption, flex, inline-flex

5.overflow不为visible

###### 布局规则

内部的Box会在垂直方向，一个接一个地放置。

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

BFC的区域不会与float box重叠。

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

计算BFC的高度时，浮动元素也参与计算

### 8.CSS3

##### 新特性

###### border-radius 圆角

###### box-shadow 阴影

box-shadow: *h-shadow v-shadow blur spread color* inset;

| 值         | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                             |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                             |
| *blur*     | 可选。模糊距离                                               |
| *spread*   | 可选。阴影的大小                                             |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx)寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                 |

###### transform  形状转换 

rotate(30deg);  translate(30px,30px);  scale(.8);    skew(10deg,10deg);    rotateX(180deg);   rotateY(180deg);    rotate3d(10,10,10,90deg);

| 值                                                           | 描述                                    |
| :----------------------------------------------------------- | :-------------------------------------- |
| none                                                         | 定义不进行转换。                        |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*)                              | 定义 2D 转换，使用六个值的矩阵。        |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。 |
| translate(*x*,*y*)                                           | 定义 2D 转换。                          |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转换。                          |
| translateX(*x*)                                              | 定义转换，只是用 X 轴的值。             |
| translateY(*y*)                                              | 定义转换，只是用 Y 轴的值。             |
| translateZ(*z*)                                              | 定义 3D 转换，只是用 Z 轴的值。         |
| scale(*x*,*y*)                                               | 定义 2D 缩放转换。                      |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                      |
| scaleX(*x*)                                                  | 通过设置 X 轴的值来定义缩放转换。       |
| scaleY(*y*)                                                  | 通过设置 Y 轴的值来定义缩放转换。       |
| scaleZ(*z*)                                                  | 通过设置 Z 轴的值来定义 3D 缩放转换。   |
| rotate(*angle*)                                              | 定义 2D 旋转，在参数中规定角度。        |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                          |
| rotateX(*angle*)                                             | 定义沿着 X 轴的 3D 旋转。               |
| rotateY(*angle*)                                             | 定义沿着 Y 轴的 3D 旋转。               |
| rotateZ(*angle*)                                             | 定义沿着 Z 轴的 3D 旋转。               |
| skew(*x-angle*,*y-angle*)                                    | 定义沿着 X 和 Y 轴的 2D 倾斜转换。      |
| skewX(*angle*)                                               | 定义沿着 X 轴的 2D 倾斜转换。           |
| skewY(*angle*)                                               | 定义沿着 Y 轴的 2D 倾斜转换。           |
| perspective(*n*)                                             | 为 3D 转换元素定义透视视图。            |

###### animation 动画

| 值                                                           | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| *[animation-name](https://www.w3school.com.cn/cssref/pr_animation-name.asp)* | 规定需要绑定到选择器的 keyframe 名称。。 |
| *[animation-duration](https://www.w3school.com.cn/cssref/pr_animation-duration.asp)* | 规定完成动画所花费的时间，以秒或毫秒计。 |
| *[animation-timing-function](https://www.w3school.com.cn/cssref/pr_animation-timing-function.asp)* | 规定动画的速度曲线。                     |
| *[animation-delay](https://www.w3school.com.cn/cssref/pr_animation-delay.asp)* | 规定在动画开始之前的延迟。               |
| *[animation-iteration-count](https://www.w3school.com.cn/cssref/pr_animation-iteration-count.asp)* | 规定动画应该播放的次数。                 |
| *[animation-direction](https://www.w3school.com.cn/cssref/pr_animation-direction.asp)* | 规定是否应该轮流反向播放动画。           |

###### flex弹性布局

一、Flex布局是什么？

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

.box{display:flex;}

行内元素也可以使用Flex布局。

.box{display:inline-flex;}

Webkit内核的浏览器，必须加上-webkit前缀。

.box{display:-webkit-flex;/* Safari */display:flex;}

注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

二、基本概念

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![img](https:////upload-images.jianshu.io/upload_images/13944531-b1144007e4830a72.png?imageMogr2/auto-orient/strip|imageView2/2/w/563/format/webp)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

三、容器的属性

以下6个属性设置在容器上。

flex-direction

flex-wrap

flex-flow

justify-content

align-items

align-content

3.1 flex-direction属性

flex-direction属性决定主轴的方向（即项目的排列方向）。

.box{flex-direction:row|row-reverse|column|column-reverse;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-c2f97bb8a47d139c.png?imageMogr2/auto-orient/strip|imageView2/2/w/796/format/webp)

它可能有4个值。

row（默认值）：主轴为水平方向，起点在左端。

row-reverse：主轴为水平方向，起点在右端。

column：主轴为垂直方向，起点在上沿。

column-reverse：主轴为垂直方向，起点在下沿。

3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

![img](https:////upload-images.jianshu.io/upload_images/13944531-262f5854ece5b1fd.png?imageMogr2/auto-orient/strip|imageView2/2/w/798/format/webp)

.box{flex-wrap:nowrap|wrap|wrap-reverse;}

它可能取三个值。

（1）nowrap（默认）：不换行。

![img](https:////upload-images.jianshu.io/upload_images/13944531-ce8c6f815b5bfc0a.png?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

（2）wrap：换行，第一行在上方。

![img](https:////upload-images.jianshu.io/upload_images/13944531-0701b857c3588b37.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

（3）wrap-reverse：换行，第一行在下方。

![img](https:////upload-images.jianshu.io/upload_images/13944531-0ae21f2bd8af65f8.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

3.3 flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

.box{flex-flow:||;}

3.4 justify-content属性

justify-content属性定义了项目在主轴上的对齐方式。

.box{justify-content:flex-start|flex-end|center|space-between|space-around;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-3e78d500eb78a34b.png?imageMogr2/auto-orient/strip|imageView2/2/w/637/format/webp)

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

flex-start（默认值）：左对齐

flex-end：右对齐

center： 居中

space-between：两端对齐，项目之间的间隔都相等。

space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

3.5 align-items属性

align-items属性定义项目在交叉轴上如何对齐。

.box{align-items:flex-start|flex-end|center|baseline|stretch;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-96b4662bd1da272a.png?imageMogr2/auto-orient/strip|imageView2/2/w/617/format/webp)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

flex-start：交叉轴的起点对齐。

flex-end：交叉轴的终点对齐。

center：交叉轴的中点对齐。

baseline: 项目的第一行文字的基线对齐。

stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

3.6 align-content属性

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

.box{align-content:flex-start|flex-end|center|space-between|space-around|stretch;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-1ca06439bf8f102c.png?imageMogr2/auto-orient/strip|imageView2/2/w/620/format/webp)

该属性可能取6个值。

flex-start：与交叉轴的起点对齐。

flex-end：与交叉轴的终点对齐。

center：与交叉轴的中点对齐。

space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

stretch（默认值）：轴线占满整个交叉轴。

四、项目的属性

以下6个属性设置在项目上。

order

flex-grow

flex-shrink

flex-basis

flex

align-self

4.1 order属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

.item{order:;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-034cbd418547ec54.png?imageMogr2/auto-orient/strip|imageView2/2/w/751/format/webp)

4.2 flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

.item{flex-grow:;/* default 0 */}

![img](https:////upload-images.jianshu.io/upload_images/13944531-af1be60c6e332220.png?imageMogr2/auto-orient/strip|imageView2/2/w/802/format/webp)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

4.3 flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

.item{flex-shrink:;/* default 1 */}

![img](https:////upload-images.jianshu.io/upload_images/13944531-782c37762df70627.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

4.4 flex-basis属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

.item{flex-basis:|auto;/* default auto */}

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

4.5 flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

.item{flex:none|[<'flex-grow'><'flex-shrink'>?||<'flex-basis'>]}

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

4.6 align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

.item{align-self:auto|flex-start|flex-end|center|baseline|stretch;}

![img](https:////upload-images.jianshu.io/upload_images/13944531-8bc809b9bbb4d3ef.png?imageMogr2/auto-orient/strip|imageView2/2/w/743/format/webp)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

###### 多媒体查询@media

语法

@media mediatype and/not/only (media feature) { 

CSS-Code 

}

使用媒体查询必须是以 @media 开头；

然后指定设备类型（媒体类型mediatype）；

接着是括号()里的规定媒体/设备特征（media feature），媒体特征的书写格式与css样式类似，都是属性名：属性值（例如min-width：200px）；

最后跟着的大括号{ css-code }，里面放置的是要设置的css样式。

逻辑运算符：

　　**not**：用来排除某种设备。比如，排除打印设备 @media not print；

　　**only**：用以指定某特定媒体设备。//对于支持 Media Queries 的移动设备来说，如果存在 only 关键字，移动设备的 Web 浏览器会忽略 only关键字并直接根据后面的表达式应用样式文件。对于不支持 Media Queries 的设备但能够读取 Media Type 类型的 Web浏览器，遇到 only 关键字时会忽略这个样式文件。

　　**all：**适用于所有的设备类型；

　　**and：**媒体查询中使用来连接多种媒体特性,一个媒体查询中可以包含0或多个表达式，表达式可以是0或多个关键字，以及一种媒体类型。

MediaType

- all 适用于所有类型
- print 适用于打印机和打印预览
- screen 适用于电脑屏幕、平板电脑、智能手机等
- speech 适用于屏幕阅读器

Media Feature

| 值                      | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                 |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0 |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0 |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                     |
| device-height           | 定义输出设备的屏幕可见高度。                                 |
| device-width            | 定义输出设备的屏幕可见宽度。                                 |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                         |
| height                  | 定义输出设备中的页面可见区域高度。                           |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                       |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                   |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                           |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                             |
| max-height              | 定义输出设备中的页面最大可见区域高度。                       |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。     |
| max-resolution          | 定义设备的最大分辨率。                                       |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                       |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。           |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                       |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                   |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                 |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                             |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                           |
| min-height              | 定义输出设备中的页面最小可见区域高度。                       |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数       |
| min-resolution          | 定义设备的最小分辨率。                                       |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                       |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0 |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。         |
| resolution              | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                 |
| scan                    | 定义电视类设备的扫描工序。                                   |
| width                   | 定义输出设备中的页面可见区域宽度。                           |

如：@media screen and (max-width:800px) and (min-width:400px)

###### 颜色  rgba（rgb为颜色值，a为透明度）

###### 背景 

background-clip 制定背景绘制（显示）区域 background-origin  background-size

1.（background-clip: border-box;）默认情况（从边框开始绘制）                               

2.（background-clip: padding-box;）从padding开始绘制（显示），不算border,相当于把border那里的背景给裁剪掉！                                                                       

3.（background-clip: content-box;）只在内容区绘制（显示），不算padding和border，相当于把padding和border那里的背景给裁剪掉！

小例子：

\#div1{

width: 200px;

height: 200px;

background: #ff0000;

/* 属性 执行时间 运动方式 延迟时间 */

/* transition: width 2s ease 2s ; */

/* 动画名 执行时间 运动方式 延迟时间 执行次数 */

animation: run 3s linear 2s 2 ;

}

@keyframes run {

50%{

width:800px;

}

100%{

width:500px;

}

}

\#div1:hover{

width:800px;

}

##### 选择器

:last-child /* 选择元素最后一个孩子 */

:first-child /* 选择元素第一个孩子 */

:nth-child(1) /* 按照第几个孩子给它设置样式 */

:nth-child(even) /* 按照偶数 */

:nth-child(odd) /* 按照奇数 */

:disabled /* 选择每个禁用的E元素 */

:checked /* 选择每个被选中的E元素 */

:not(selector) /* 选择非 selector 元素的每个元素 */

::selection /* 选择被用户选取的元素部分 */

##### 伪元素

::before {} /* 选择器在被选元素的前面插入内容和定义css，使用 content 属性来指定要插入的内容。 */

::after {} /* 选择器在被选元素的后面插入内容和定义css，使用 content 属性来指定要插入的内容。 */

:first-letter /* 选择该元素内容的首字母 */

:first-line /* 选择该元素内容的首行 */

::selection /* 选择被用户选取的元素部分 */

background-image: url("../img/2.png");

background-repeat: no-repeat;

/*background-position: 100px 10px;*/

/*background-size: contain;*/

/*background-color: #000;*/

word-wrap: break-word 设置或检索当当前行超过指定容器的边界时是否断开转行

/*text-overflow: clip;*/不是省略标记，溢出隐藏

/*text-overflow: ellipsis;*/当对象内文本溢出时显示...

### 9.元素隐藏

1、利用opacity透明度来隐藏，opacity设置为0，它只是一种视觉隐藏，元素本身依旧占用它的位置并对网页的布局起到作用，它也同样影响用户交互。在读屏软件中会被识别。

2、visibility：规定元素 是否可见，一般设置为hidden，它可以很好的隐藏，不会影响用户的交互，在读屏软件中不会被识别。（visibility可能的值）

3、display：当display设置为none，任何对该元素直接打用户交互操作都不可能生效，被隐藏的元素完全不会占用空间，仿佛元素完全不存在一样。（display可能的值）

4、position：元素的定位。把position：absolutely；top：-4555px；left：-45545px；top和left设置成足够大的负数，相当于把元素放到可视区域外，它不会影响布局，能够让元素保持可操作性，在读屏软件上可以被识别。(position可能的值）

### 10.link和@import

(1) link属于HTML标签，而@import是CSS提供的;

(2) 页面被加载的时，link会同时被加载， 而@import引用的CSS会等到页面被加载完再加载;

(3) import只在IE5以上才能识别，而link是HTML标签，无兼容问题;

(4) link方式的样式的权重 高于@import的权重.

```html
<style type="text/css">
    @import url(css/main.css); //导入css目录下的main.css文件
</style>
```

<link rel="stylesheet" href="wcss.css" type="text/css" />