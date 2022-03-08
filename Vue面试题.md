## 1.vuex的作用？

  vuex是一个专门为vue.js应用程序开发的状态管理模式
  vuex可以帮助我们管理共享状态，也就是管理全局变量
  vuex的几个核心概念：
  vuex使用一个store对象管理应用的状态，一个store包括：state,getter,mutation,action四个属性
  state:state意为'状态'，是vuex状态管理的数据源
  getter:getter的作用与filters有一些相似，可以将state进行过滤后输出
  mutation:mutation是vuex中改变state的唯一途径，并且只能同步操作
  action:一些对state的异步操作可以放在action中，并通过在action提交mutaion变更状态
  module:当store对象过于庞大时，可以根据具体的业务需求分为多个module

我们可以在组件中触发 Action，Action 则会提交 Mutation，Mutaion 会对 State 进行修改，组件再根据 State 、Getter 渲染页面

## 2.vue中的路由拦截器的作用？

   路由拦截，权限设置
   例如：当用户没有登录权限的时候就会跳转到登录页面，用到的字段requireAuth:true

## 3.axios的作用？

  vue中的ajax，用于向后台发起请求
   特点：
     从浏览器中创建XMLHttpRequests
     从node.js创建http请求
     支持Promise API
     拦截请求和响应
     转换请求数据和响应数据
     取消请求
     自动转换json数据
     客户端支持防御XSRF
   promise：
     一个对象用来传递异步操作的信息
     promise的出现主要是解决地狱回调的问题，无需多次嵌套
     本质：分离异步数据获取和业务
   拦截器分为请求拦截器和响应拦截器

```
   #请求拦截器
   axios.interceptors.request.use(function(config){
     return config;
   },function(error){
     return Promise.reject(error);
   });
   #响应拦截器
   axios.interceptors.response.use(function(response){
     return response;
   },function(error){
     return Promise.reject(error);
   });
```



## 4.列举vue的常见指令。

```
1.文本插值：{{}} Mustache        
<div id='app'>            
{{message}}        
</div>    
2.DOM属性绑定：v-bind        
<div id='app-2'>            
<span v-bind:title='message'>                
鼠标悬停几秒钟查看此处动态绑定的提示信息            
</span>        
</div>    
3.指令绑定一个事件监听器：v-on        
<div id='app-5'>            
<p>{{message}}</p>            
<button v-on:click='reverseMessage'>逆转消息</button>        
</div>    
4.实现表单输入和应用状态之间的双向绑定：v-model        
<div id='app-6'>            
<p>{{message}}</p>            
<input v-model='message'>        
</div>    
5.控制切换一个元素的显示：v-if和v-else        
<div id='app-3'>            
<p v-if='seen'>现在你看到我了</p>        
</div>    
6.列表渲染:v-for        
<div id='app-4'>            
<ol>                
<li v-for='todo in todos'>                    
{{todo.text}}                
</li>            
</ol>
```



## 5.列举Http请求中常见的请求方式？

  get
     向特定的路径资源发出请求，数据暴露在url中
   post
     向指定路径资源提交数据进行处理请求，数据包含在请求体中
   options
     返回服务器针对特定资源所支持的http请求方法，允许客户端查看，测试服务器性能
   head
     向服务器与get请求相一致的响应，响应体不会返回，可以不必传输整个响应内容
   put
     从客户端向服务器端传送的数据取代指定的文档的内容
   delete
     请求服务器删除指定的页面
   trace
     回显服务器收到的请求，主要用于测试或者诊断
   connect
     http/1.1协议中预留给能够将连接改为管道方式的代理服务

## 6.对于MVVM的理解

　　MVVM 是 Model-View-ViewModel 的缩写。

　　**Model**代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
　　**View** 代表UI 组件，它负责将数据模型转化成UI 展现出来。
　　**ViewModel** 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。

　　viewmodel和model实现双向数据绑定

## 7.Vue的生命周期

　　1.什么是vue生命周期？
　　　　答： Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。

　　2.vue生命周期的作用是什么？
　　　　答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

　　3.vue生命周期总共有几个阶段？
　　　　答：它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后。

　　4.第一次页面加载会触发哪几个钩子？
　　　　答：会触发 下面这几个beforeCreate, created, beforeMount, mounted 。

　　5.DOM 渲染在 哪个周期中就已经完成？
　　　　答：DOM 渲染在 mounted 中就已经完成了。

## 8.Vue实现数据双向绑定的原理：Object.defineProperty（）

　　采**用数据劫持结合发布者-订阅者模式**的方式，通过**Object.defineProperty（）**来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

## 9.Vue组件间的参数传递

　　**1.父组件与子组件传值**
　　　　父组件传给子组件：子组件通过props方法接受数据;
　　　　子组件传给父组件：$emit方法传递参数
　　**2.非父子组件间的数据传递，兄弟组件传值**
　　　　eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。）

## 10.Vue的路由实现：hash模式 和 history模式

　　**hash模式：**在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；
　　　　特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。
hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 [http://www.xxx.com](http://www.xxx.com/)，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

　　**history模式：**history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。**Vue-Router 官网里如此描述：**“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

## 11.vue路由的钩子函数　

　　首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。

　　**beforeEach**主要有3个参数to，from，next：

　　**to**：route即将进入的目标路由对象，

　　**from**：route当前导航正要离开的路由

　　**next**：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。

## 12.vue-cli如何新增自定义指令？

```
1.创建局部指令

var app = new Vue({
    el: '#app',
    data: {    
    },
    // 创建指令(可以多个)
    directives: {
        // 指令名称
        dir1: {
            inserted(el) {
                // 指令中第一个参数是当前使用指令的DOM
                console.log(el);
                console.log(arguments);
                // 对DOM进行操作
                el.style.width = '200px';
                el.style.height = '200px';
                el.style.background = '#000';
            }
        }
    }
})

2.全局指令

Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})

3.指令的使用

<div id="app">
    <div v-dir1></div>
    <div v-dir2></div>
</div>
```

## 13.vue如何自定义一个过滤器？

```
html代码：

<div id="app">
     <input type="text" v-model="msg" />
     {{msg| capitalize }}
</div>

JS代码：

var vm=new Vue({
    el:"#app",
    data:{
        msg:''
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
})

全局定义过滤器

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

过滤器接收表达式的值 (msg) 作为第一个参数。capitalize 过滤器将会收到 msg的值作为第一个参数。
```

## 14.对keep-alive 的了解？

```
keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
在vue 2.1.0 版本之后，keep-alive新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 。

使用方法

<keep-alive include='include_components' exclude='exclude_components'>
  <component>
    <!-- 该组件是否缓存取决于include和exclude属性 -->
  </component>
</keep-alive>

参数解释
include - 字符串或正则表达式，只有名称匹配的组件会被缓存
exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存
include 和 exclude 的属性允许组件有条件地缓存。二者都可以用“，”分隔字符串、正则表达式、数组。当使用正则或者是数组时，要记得使用v-bind 。

使用示例

<!-- 逗号分隔字符串，只有组件a与b被缓存。 -->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
<keep-alive :include="/a|b/">
  <component></component>
</keep-alive>

<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
<keep-alive :include="['a', 'b']">
  <component></component>
</keep-alive>
```

## 15.**v-if 和 v-show 区别**


　　答：v-if按照条件是否渲染，v-show是display的block或none；

## 16.**vue几种常用的指令**


　　答：v-for 、 v-if 、v-bind、v-on、v-show、v-else

## 17.**怎么定义 vue-router 的动态路由? 怎么获取传过来的值**

　　答：在 router 目录下的 index.js 文件中，对 path 属性加上 /:id，使用 router 对象的 params.id 获取。

## 18.**vue常用的修饰符？**

　　答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

## 19.**vue.js的两个核心是什么？**

　　答：数据驱动、组件系统

## 20.**vue中 key 值的作用？**

　　答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

## 21.vue中data为什么是函数

Object是引用数据类型,如果不用function 返回,每个组件的data 都是内存的同一个地址,一个数据改变了其他也改变了

## 22.v-model原理

## 23.computed，watch和method区别

## 24.父子组件生命周期顺序

## 25.slot插槽

## 26.vue检测数组或者对象的变化

## 27.虚拟DOM

## 28.nextTick原理

