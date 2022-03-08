### Promise

Promise是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then和catch等同样的方法。

Promise的构造函数需要接收一个参数：函数，并且这个函数需要传入两个参数：

resolve：异步操作执行成功的回调函数

reject：异步操作执行失败的回调函数

从表面来看Promise能简化层层回调的方法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，比传callback函数要简单、灵活。

### reject的用法 :

把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。看下面的代码。

```
    let p = new Promise((resolve, reject) => {
        //做一些异步操作
      setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
      }, 2000);
    });
    p.then((data) => {
            console.log('resolved',data);
        },(err) => {
            console.log('rejected',err);
        }
    ); 
复制代码
```

then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果：

![img](https://user-gold-cdn.xitu.io/2018/5/19/16377e1df3ec16ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)或者![img](https://user-gold-cdn.xitu.io/2018/5/19/16377e4fd8619228?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### catch的用法

我们知道Promise对象除了then方法，还有一个catch方法，它是做什么用的呢？其实它和then的第二个参数一样，用来指定reject的回调。用法是这样：

```
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});复制代码
```

效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码：

```
p.then((data) => {
    console.log('resolved',data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) => {
    console.log('rejected',err);
});复制代码
```

在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果：

![img](https://user-gold-cdn.xitu.io/2018/5/19/1637880bdb32bee3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能

### all的用法：

谁跑的慢，以谁为准执行回调。all接收一个数组参数，里面的值最终都算返回Promise对象

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。看下面的例子：

```
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功  
}, function(){
  // 只要有失败，则失败 
})
复制代码
```

 

有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据，是不是很酷？

有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。

### race的用法：

谁跑的快，以谁为准执行回调

race的使用场景：比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作，代码如下：

```
 //请求某个图片资源
    function requestImg(){
        var p = new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = function(){
                resolve(img);
            }
            img.src = '图片的路径';
        });
        return p;
    }
    //延时函数，用于给请求计时
    function timeout(){
        var p = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('图片请求超时');
            }, 5000);
        });
        return p;
    }
    Promise.race([requestImg(), timeout()]).then((data) =>{
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
```

### 手写Promise

### 步骤一：实现成功和失败的回调方法

要实现上面代码中的功能，也是promise最基本的功能。首先，需要创建一个构造函数promise，创建一个promise类，在使用的时候传入了一个执行器executor，executor会传入两个参数：成功(resolve)和失败(reject)。之前说过，只要成功，就不会失败，只要失败就不会成功。所以，默认状态下，在调用成功时，就返回成功态，调用失败时，返回失败态。代码如下：

```
	class Promise {
        constructor(executor) {
            //默认状态是等待状态
            this.status = 'panding';
            this.value = undefined;
            this.reason = undefined;
            //存放成功的回调
            this.onResolvedCallbacks = [];
            //存放失败的回调
            this.onRejectedCallbacks = [];
            let resolve = (data) => {//this指的是实例
                if (this.status === 'pending') {
                    this.value = data;
                    this.status = "resolved";
                    this.onResolvedCallbacks.forEach(fn => fn());
                }

            }
            let reject = (reason) => {
                if (this.status === 'pending') {
                    this.reason = reason;
                    this.status = 'rejected';
                    this.onRejectedCallbacks.forEach(fn => fn());
                }
            }
            try {//执行时可能会发生异常
                executor(resolve, reject);
            } catch (e) {
                reject(e);//promise失败了
            }

        }
    }
```

### 步骤二：then方法链式调用

then方法是promise的最基本的方法，返回的是两个回调，一个成功的回调，一个失败的回调，实现过程如下：

    	then(onFulFilled, onRejected) {
            if (this.status === 'resolved') { //成功状态的回调
                onFulFilled(this.value);
            }
            if (this.status === 'rejected') {//失败状态的回调
                onRejected(this.reason);
            }
        }
```
let p = new Promise(function(){
    resolve('我是成功');
})
p.then((data) => {console.log(data);},(err) => {});
p.then((data) => {console.log(data);},(err) => {});
p.then((data) => {console.log(data);},(err) => {}); 
```

返回的结果是：

```
我是成功
我是成功
我是成功
```

为了实现这样的效果，则上一次的代码将要重新写过，我们可以把每次调用resolve的结果存入一个数组中，每次调用reject的结果存入一个数组。这就是**为何会在上面定义两个数组,且分别在resolve()和reject()遍历两个数组的原因**。因此，在调用resolve()或者reject()之前，我们在pending状态时，会把多次then中的结果存入数组中，则上面的代码会改变为：

```
  then(onFulFilled, onRejected) {
    if (this.status === 'resolved') {
      onFulFilled(this.value);
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
    // 当前既没有完成 也没有失败
    if (this.status === 'pending') {
      // 存放成功的回调
      this.onResolvedCallbacks.push(() => {
        onFulFilled(this.value);
      });
      // 存放失败的回调
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
```

在promise中，要实现链式调用返回的结果是返回一个新的promise，第一次then中返回的结果，无论是成功或失败，都将返回到下一次then中的成功态中，但在第一次then中如果抛出异常错误，则将返回到下一次then中的失败态中

**链式调用成功时**

链式调用成功会返回值，有多种情况，根据举的例子，大致列出可能会发生的结果。因此将链式调用返回的值单独写一个方法。方法中传入四个参数，分别是p2,x,resolve,reject,p2指的是上一次返回的promise，x表示运行promise返回的结果，resolve和reject是p2的方法。则代码写为：

```
function resolvePromise(p2,x,resolve,reject){
    ....
}
```

- 返回结果不能是自己

```
var p = new Promise((resovle,reject) => {
    return p;     //返回的结果不能是自己，
})
```

当返回结果是自己时，永远也不会成功或失败，因此当返回自己时，应抛出一个错误

```
function resolvePromise(p2,x,resolve,reject){
    if(px===x){
        return reject(new TypeError('自己引用自己了'));
    }
    ....
}
```

- 返回结果可能是promise

```
function resolvePromise(promise2,x,resolve,reject){
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    if(promise2 === x){//不能自己等待自己完成
        return reject(new TypeError('循环引用'));
    };
    // x是除了null以外的对象或者函数
    if(x !=null && (typeof x === 'object' || typeof x === 'function')){
        let called;//防止成功后调用失败
        try{//防止取then是出现异常  object.defineProperty
            let then = x.then;//取x的then方法 {then:{}}
            if(typeof then === 'function'){//如果then是函数就认为他是promise
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x,y => {//如果Y是promise就继续递归promise
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)
                },r => { //只要失败了就失败了
                    if(called) return;
                    called = true;
                    reject(r);  
                });
            }else{//then是一个普通对象，就直接成功即可
                resolve(x);
            }
        }catch (e){
            if(called) return;
            called = true;
            reject(e)
        }
    }else{//x = 123 x就是一个普通值 作为下个then成功的参数
        resolve(x)
    }

}
```

- 返回结果可能为一个普通值，则直接  resolve(x);

- Promise一次只能调用成功或者失败

也就是当调用成功就不能再调用失败了，如果两个都调用的时候，哪个先调用就执行哪一个。代码部分还是上面那部分

个人认为，这个地方比较绕，需要慢慢的一步一步的理清楚。

根据promise A+规范原理，promise在自己的框架中，封装了一系列的内置的方法。

- 捕获错误的方法 **catch()**
- 解析全部方法 **all()**
- 竞赛 **race()**
- 生成一个成功的promise **resolve()**
- 生成一个失败的promise **reject()**

最后给大家附上全部源码，供大家仔细品读。

```
function resolvePromise(promise2,x,resolve,reject){
    //判断x是不是promise
    //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    if(promise2 === x){//不能自己等待自己完成
        return reject(new TypeError('循环引用'));
    };
    // x是除了null以外的对象或者函数
    if(x !=null && (typeof x === 'object' || typeof x === 'function')){
        let called;//防止成功后调用失败
        try{//防止取then是出现异常  object.defineProperty
            let then = x.then;//取x的then方法 {then:{}}
            if(typeof then === 'function'){//如果then是函数就认为他是promise
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(x,y => {//如果Y是promise就继续递归promise
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)
                },r => { //只要失败了就失败了
                    if(called) return;
                    called = true;
                    reject(r);  
                });
            }else{//then是一个普通对象，就直接成功即可
                resolve(x);
            }
        }catch (e){
            if(called) return;
            called = true;
            reject(e)
        }
    }else{//x = 123 x就是一个普通值 作为下个then成功的参数
        resolve(x)
    }

}

class Promise {
    constructor (executor){
        //默认状态是等待状态
        this.status = 'panding';
        this.value = undefined;
        this.reason = undefined;
        //存放成功的回调
        this.onResolvedCallbacks = [];
        //存放失败的回调
        this.onRejectedCallbacks = [];
        let resolve = (data) => {//this指的是实例
            if(this.status === 'pending'){
                this.value = data;
                this.status = "resolved";
                this.onResolvedCallbacks.forEach(fn => fn());
            }
 
        }
        let reject = (reason) => {
            if(this.status === 'pending'){
                this.reason = reason;
                this.status = 'rejected';
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try{//执行时可能会发生异常
            executor(resolve,reject);
        }catch (e){
            reject(e);//promise失败了
        }
       
    }
    then(onFuiFilled,onRejected){ 
        //防止值得穿透 
        onFuiFilled = typeof onFuiFilled === 'function' ? onFuiFilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected :err => {throw err;}        
        let promise2;//作为下一次then方法的promise
       if(this.status === 'resolved'){
           promise2 = new Promise((resolve,reject) => {
               setTimeout(() => {
                  try{
                        //成功的逻辑 失败的逻辑
                        let x = onFuiFilled(this.value);
                        //看x是不是promise 如果是promise取他的结果 作为promise2成功的的结果
                        //如果返回一个普通值，作为promise2成功的结果
                        //resolvePromise可以解析x和promise2之间的关系
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2,x,resolve,reject)
                  }catch(e){
                        reject(e);
                  } 
               },0)
           }); 
       } 
       if(this.status === 'rejected'){
            promise2 = new Promise((resolve,reject) => {
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                },0)

            });
       }
       //当前既没有完成也没有失败
       if(this.status === 'pending'){
           promise2 = new Promise((resolve,reject) => {
               //把成功的函数一个个存放到成功回调函数数组中
                this.onResolvedCallbacks.push( () =>{
                    setTimeout(() => {
                        try{
                            let x = onFuiFilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                });
                //把失败的函数一个个存放到失败回调函数数组中
                this.onRejectedCallbacks.push( ()=>{
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                })
           })
       }
       return promise2;//调用then后返回一个新的promise
    }
    catch (onRejected) {
        // catch 方法就是then方法没有成功的简写
        return this.then(null, onRejected);
    }
}
Promise.all = function (promises) {
    //promises是一个promise的数组
    return new Promise(function (resolve, reject) {
        let arr = []; //arr是最终返回值的结果
        let i = 0; // 表示成功了多少次
        function processData(index, data) {
            arr[index] = data;
            if (++i === promises.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (data) {
                processData(i, data)
            }, reject)
        }
    })
}
// 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolve,reject)
        }
    })
}
// 生成一个成功的promise
Promise.resolve = function(value){
    return new Promise((resolve,reject) => resolve(value);
}
// 生成一个失败的promise
Promise.reject = function(reason){
    return new Promise((resolve,reject) => reject(reason));
}
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise( (resolve, reject) =>  {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd
}
module.exports = Promise;
```

关于这篇promise A+规范的总结，肯定会存在很多不足的地方，欢迎各位提出宝贵的意见或建议，也希望能帮助到你从中获得一些知识！

# Promise 必知必会（十道题）

Promise 想必大家都十分熟悉，想想就那么几个 api，可是你真的了解 Promise 吗？本文根据 Promise 的一些知识点总结了十道题，看看你能做对几道。

以下 promise 均指代 Promise 实例，环境是 Node.js。

## 题目一

```
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
```

运行结果：

```
1
2
4
3
```

解释：Promise 构造函数是同步执行的，`promise.then` 中的函数是异步执行的。

## 题目二

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

运行结果：

```
promise1 Promise { <pending> }
promise2 Promise { <pending> }
(node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
(node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
promise1 Promise { 'success' }
promise2 Promise {
  <rejected> Error: error!!!
    at promise.then (...)
    at <anonymous> }
```

解释：promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。

## 题目三

```
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

运行结果：

```
then: success1
```

解释：构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。

## 题目四

```
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
```

运行结果：

```
1
2
```

解释：promise 可以链式调用。提起链式调用我们通常会想到通过 `return this` 实现，不过 Promise 并不是这样实现的。promise 每次调用 `.then` 或者 `.catch` 都会返回一个新的 promise，从而实现了链式调用。

## 题目五

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
```

运行结果：

```
once
success 1005
success 1007
```

解释：promise 的 `.then` 或者 `.catch` 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 `.then` 或者 `.catch` 都会直接拿到该值。

## 题目六

```
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

运行结果：

```
then: Error: error!!!
    at Promise.resolve.then (...)
    at ...
```

解释：`.then` 或者 `.catch` 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获，需要改成其中一种：

```
return Promise.reject(new Error('error!!!'))
throw new Error('error!!!')
```

因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 `return new Error('error!!!')` 等价于 `return Promise.resolve(new Error('error!!!'))`。

## 题目七

```
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```

运行结果：

```
TypeError: Chaining cycle detected for promise #<Promise>
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
    at Function.Module.runMain (module.js:667:11)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:607:3
```

解释：`.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。类似于：

```
process.nextTick(function tick () {
  console.log('tick')
  process.nextTick(tick)
})
```

## 题目八

```
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

运行结果：

```
1
```

解释：`.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值穿透。

## 题目九

```
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })
```

运行结果：

```
fail2: Error: error
    at success (...)
    at ...
```

解释：`.then` 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。`.catch` 是 `.then` 第二个参数的简便写法，但是它们用法上有一点需要注意：`.then` 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 `.catch` 可以捕获之前的错误。当然以下代码也可以：

```
Promise.resolve()
  .then(function success1 (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .then(function success2 (res) {
  }, function fail2 (e) {
    console.error('fail2: ', e)
  })
```

## 题目十

```
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
```

运行结果：

```
end
nextTick
then
setImmediate
```

解释：`process.nextTick` 和 `promise.then` 都属于 microtask，而 `setImmediate` 属于 macrotask，在事件循环的 check 阶段执行。事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。

# 总结

1. promise构造函数是同步执行的，promise.then()中函数是异步执行的

2. promise有三种状态：pending、fulfilled、rejected。状态一旦改变之后就不能再变。

3. promise中resolve和reject只有第一次执行有效，多次调用没有任何作用。

4. promise每次调用then和catch都会返回一个新的promise，从而实现了链式调用

5. promise内部一旦改变，并且有了一个值，那么后续每次调用then和catch都会直接拿到该值

6. 在then或者catch中return一个error对象不会抛出新的错误，是因为返回任意一个非promise值都会被包裹成promise对象。

   例如：

   ```
   return new Error("error!")
   等价于
   return Promise.resolve(new Error("error!"))
   ```

7. .then和.catch返回值不能是promise本身，否则会造成死循环

8. .then和.catch参数传入非函数值会发生值穿透

9. promise.then可以接收两个参数，一个是处理成功的函数，一个是处理失败的函数。.catch是第二个参数（处理失败的函数）的简单写法。.then中第二处理失败的函数不可以捕获第一个处理成功的函数抛出来的错误，而.catch可以捕获之前的错误。

10. 同步任务>微任务(microtask)>宏任务(macrotask)