#### 一、全局守卫

- **router.beforeEach** 路由改变前的钩子

  ```
  const router = new VueRouter({ ... })
  
  router.beforeEach((to, from, next) => {
      ... ...
  })
  ```

  其中：

  - to：将要访问的路径
  - from：代表从哪个路径跳转来的
  - next：是一个函数，表示放行。有如下几种调用方式
    - next()：如果一起正常，则调用该方法进入下一个钩子；
    - next(false)：中断当前导航，即路由地址不发生变化；
    - next('/xxx') 或 next({path: '/xxx'})：强制跳转到指定路径；
    - next(error)：如果传入的是一个Error实例，则导航会被中断且该错误会被传递给 router.onError() 注册过的回调。

  使用：

  - 使用该函数，一定要调用 next()，否则钩子函数不能 resolve；

  - 该方法比较常用于：验证用户访问权限。

    比如：一个系统需要先验证用户是否登录，如果登录了就可以访问，否则直接跳转到登录页面。具体实现如下：

  ```
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import { getToken } from '@Utils/session.utils' // 登录用户的token
  import Login from '../pages/Login.vue' //引入登录页
  const Home = () => import('../pages/Home.vue')  //引入首页
  
  Vue.use(VueRouter) // 全局注入router
  
  // 配置路由参数
  const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home }
  ]
  
  const router = new VueRouter({
    routes
  })
  
  // 全局挂载路由导航守卫：验证用户是否登录
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !getToken()) next('/login') // 如果用户不是访问登录页且没有登录，则强制跳转到登录页
    else next()
  })
  
  export default router
  ```

- **router.beforeResolve** 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，该钩子函数就被调用。

 该方法我在项目中暂时还未使用到，具体使用场景欢迎大家补充 :)

- **router.afterEach** 路由改变后的钩子

  ```
  router.afterEach((to, from) => {
      ... ...
  })
  ```

  该方法同全局前置守卫 router.beforeEach 不同的是少了 next() 函数，也不会改变导航本身。

  使用场景：

  - 切换路由，将页面的滚动位置返回到顶部。

    例如：一个页面比较长，当滚动到某个位置后切换路由，这时跳转的页面滚动条位置默认是前一个页面离开时停留的位置，可以通过该钩子函数将滚动条位置重置。

  ```
  // 切换路由，页面返回到顶部
  router.afterEach((to, from) => {
      window.scrollTo(0, 0)
  })
  ```

 

#### 二、路由独享的守卫

- **beforeEnter** 对某个路由的单独守卫

  ```
  const routes = [
      { path: '/login', name: 'login', component: Login },
      { 
          path: '/home', 
          name: 'home', 
          component: Home,
          beforeEnter: (to, from, next) => {
              ... ...
          }
        }
  ]
  
  const router = new VueRouter({
    routes
  })
  ```

  使用：

- - 该方法的参数使用同全局前置守卫 router.beforeEach 是一样的；
  - 在路由配置上直接定义；
  - 例如：根据登录用户的不同角色，展示不同的模块；或者给指定路由组件单独添加动画。

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserRole } from '@Utils/session.utils' // 登录用户的角色

const UserCenter = () => import('../pages/UserCenter.vue')

const routes = [
    ... ...
    { 
        path: '/usercenter', 
        name: 'usercenter', 
        component: UserCenter,
        beforeEnter: (to, from, next) => {
            if(getUserRole() === 'admin') next('/admincenter')
            else next()
        }
    }
]
```

 

#### 三、组件内的守卫

- **beforeRouteEnter(to, from, next)** 在进入当前组件对应的路由前调用

  ```
  export default {
      data() { ... },
      beforeRouteEnter(to, from, next) {
          ... ...
      }
  }
  ```

  注意：

  - 该函数内不能访问当前组件实例 this，因为函数在对应路由被 comfirm 前调用，此时将要渲染的组件实例还没被创建；

  - 可以通过给 next 传递一个回调来访问组件实例，即把组件实例 vm 作为回调方法的参数；该回调的执行在 mounted 后面；

    ```
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 vm 来访问组件实例
        })
    }
    ```

  - beforeRouteEnter 是支持给 next 传递回调的唯一守卫。

  使用场景：

  - 例如：从一个列表页进入到详情页，然后再返回到列表页，要求保留离开列表页之前访问的数据及滚动位置，从其他页面重新进入列表页，获取最新的数据。具体实现请点这里https://www.cnblogs.com/dhui/p/13589401.html

- **beforeRouteUpdate(to, from, next)** 在当前路由改变，但是该组件被复用时调用

  ```
  beforeRouteUpdate (to, from, next) {
      ... ...
  }
  ```

  注：

  - 该函数内可以访问当前组件实例 this
  - 例如：在一个带有动态参数的路径 `/detail/:id`，在 `/detail/aaa` 和 `/detail/bbb` 之间跳转的时候，因为两个路由渲染的是同个 Detail 组件，因此原来的组件实例会被复用（比起销毁再创建，复用则会更加高效），在这种情况下这个钩子会被调用，而组件的生命周期钩子不会再被调用。

- **beforeRouteLeave(to, from, next)** 在离开当前组件对应的路由前调用

  ```
  beforeRouteLeave (to, from, next) {
      ... ...
  }
  ```

  注：

  - 该函数内可以访问当前组件实例 this
  - 比如：用户在当前页面有还未保存的内容时突然离开，阻止页面跳转并给出提示，或者在用户离开时清除或存储一些信息等。

 

#### 四、完整的导航解析流程

1. 导航被触发；
2. 在失活的组件里调用 `beforeRouteLeave` 守卫；
3. 调用全局的 `beforeEach` 守卫；
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)；
5. 在路由配置里调用 `beforeEnter`；
6. 解析异步路由组件；
7. 在被激活的组件里调用 `beforeRouteEnter`；
8. 调用全局的 `beforeResolve` 守卫 (2.5+)；
9. 导航被确认；
10. 调用全局的 `afterEach` 钩子；
11. 触发 DOM 更新；
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

其实常用的也就那么几个，理解了其用法，路由导航的解析流程也就明了了。

 

#### 五、附：使用 watch 监测路由变化

除了使用钩子函数外，我们也可以使用 **watch** 来监听 **$route** 对象，然后根据路由参数的变化来进行响应。

```
<template>
    <div id=``"app"``>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App',
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
            }
        }
    }
</script>
```