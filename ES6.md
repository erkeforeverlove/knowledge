![img](https://upload-images.jianshu.io/upload_images/6522842-6e6b1cefa95688c9.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

### 1.let和var const区别

（1）不存在变量提升（在当前作用域的最上边定义了一个变量，没有赋值）

（2）不允许重复声明

let与const都是只在声明所在的块级作用域内有效。

let声明的变量可以改变，值和类型都可以改变，没有限制。

const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

对于复合类型的变量，如数组和对象，变量名不指向数据，而是指向数据所在的地址。const命令只是保证

变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

//let b = 20;

// let b = 30;

（3）有暂时性死区

let c = 10;

// function fn2(){

//   console.log(c);

//   let c = 30;

//   // console.log(c);

// }

// fn2();

（4）块级作用域

ES5只有全局作用域和函数作用域

### 2.箭头函数

箭头函数this指向父作用域的this (声明时的this) 普通函数中的this指向 调用时的this

(1)函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

(2)不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

(3)不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

注释：了解arguments这个对象之前先来认识一下javascript的一些功能：其实Javascript并没有重载函数的功能， 但是Arguments对象能够模拟重载Javascrip中每个函数都会有一个Arguments对象实例arguments，它引用着函数的实参，可以用数组下标的方式"[]"引用arguments的元素，arguments.length为函数实参个数，arguments.callee引用函数自身。

### 3.解构和扩展运算符

（1）解构

解构的作用是可以快速取得数组或对象当中的元素或属性，

而无需使用arr[x]或者obj[key]等传统方式进行赋值

```
var arr = ['this is a string', 2, 3];

//传统方式

var a = arr[0],

b = arr[1],

c = arr[2];

//解构赋值

var [a, b, c] = arr;
```

（2）扩展运算符

扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值

```
var foo = function(a, b, c) {

console.log(a);

console.log(b);

console.log(c);

}

var arr = [1, 2, 3];

//传统写法

foo(arr[0], arr[1], arr[2]);

//使用扩展运算符

foo(...arr);
```

### 4.promise

Promise 是异步编程的一种解决方案，将异步操作以同步

操作的流程表达出来，避免了层层嵌套的回调函数（俗称回调

地狱）

一个promise可能有三种状态：pending（进行中）、fulfilled（已成功）和

rejected（已失败）

一个promise的状态只可能从“等待”转到“成功”态或者“失败”态，不能逆

向转换，同时“成功”态和“失败”态不能相互转换

缺点：无法取消 Promise，错误需要通过回调函数捕获

成功调用resolve()，失败调用reject()

Promise.all() 都执行完 再执行, Promise.race() 最快的那个执行完了就执行 ；

//下面为扩展

详情链接:https://www.cnblogs.com/samve/p/10703953.html

#### (1) Promise.all(iterable)

- 参数
   ***iterable\*** 必须是一个可迭代对象，如 Array 或 String。
- 返回值
   一个新的`Promise`实例。

> `Promise.all 的使用`
>  如果传入的参数中存在不是`Promise`实例，则会先调用`Promise.resolve`，将其转为`Promise`实例，再进一步处理。



```jsx
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); 
});

//  [3, 1337, "foo"] 
```

> `Promise.all 的异步和同步`
>  如果传入的参数为空的可迭代对象，则同步返回一个**已完成（already resolved）**状态的 Promise；
>  非空时则返回一个**异步完成（asynchronously resolved）** Promise



```jsx
var iterable = [Promise.resolve(1), Promise.resolve(2)];

var p = Promise.all(iterable);

console.log(p);

setTimeout(function(){
    console.log(p);
});

// Promise {<pending>}
// Promise {<resolved>: Array(2)}
```

> `Promise.all 的快速返回失败行为`
>  传入的参数中任意一个`promise`返回失败时，那么整体立即返回失败，返回的错误信息是第一个失败的`promise`结果。



```tsx
var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, 'one'); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 2000, 'two'); 
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  reject('p4 reject!');
});
var p5 = new Promise((resolve, reject) => {
  reject('p5 reject!');
});

Promise.all([p1, p2, p3, p4, p5]).then(values => { 
  console.log(values);
}, reason => {
  console.log(reason)
});

// p4 reject!
```

#### (2) Promise. race(iterable)

- 参数
   ***iterable\*** 必须是一个可迭代对象，如 Array 或 String。
- 返回值
   一个新的`Promise`实例。

> `Promise.race 的使用`
>  `race`有赛跑之译，因此返回的新实例状态，是跟随参数中最先改变状态的那个实例；如果不是`Promise`实例，依旧先用`Promise.resolve`方法，转化后再进一步处理。
>  如果传的迭代为空，则返回的 `Promise` 永远等待



```jsx
var promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one-resolve-500');
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(reject, 400, 'two-reject-400');
});

Promise.race([promise1, promise2]).then(function(value) {
    console.log(value);
}, function(err) {
    console.log(err);
});

// two-reject-400
```

#### (3) Promise.resolve(value)

返回一个以给定的值解析后的`Promise`对象；
 参数 value 主要有以下几种情况：

- 一个`Promise`实例
   原封不动的返回该实例；

  

  ```jsx
  var original = Promise.resolve('我在第二行');
  var cast = Promise.resolve(original);
  cast.then(function(value) {
    console.log('value: ' + value);
  });
  console.log('original === cast ? ' + (original === cast));
  
  // "original === cast ? true"
  // "value: 我在第二行"
  ```

- 一个`thenable`对象：是指含有`then`方法的对象
   跟随这个`thenable`对象的，采用它的最终状态；

  

  ```jsx
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  }
  
  let p = Promise.resolve(thenable);
  
  p.then(function(value) {
    console.log(value);
  })
  
   // 42
  ```

- 普通数据：[String|Array|Object|Number]
   直接将传入参数当最终结果并返回一个新的`Promise`；

  

  ```jsx
  let p = Promsie.resolve(123);
  p.then(function(num) {
    console.log(num);
  })
  
  // 123
  ```

- 无参数
   直接返回一个`resolved`状态的`Promise`对象

  

  ```jsx
  let p = Promsie.resovle();
  p.then(function() {
    // do something here...
  })
  ```

#### (4) Promise.reject(reason)

- 参数：表示被拒绝的原因；

⚠️`传入的参数会原封不动的作为 reject 函数的理由，并不会因为传入的参数 Promise 或者是 thenable 对象而有所不同`

- 返回值：一个含有`reason`的状态为`rejected`的`Promise`

##### Promise原型

------

#### (1) Promise.prototype.then()

> Promise 的实例具有 `then` 方法，主要作用是为 Promise 实例发生状态改变时添加回调函数。
>  它接收两个回调函数作为参数，第一个参数是 `fulfilled`状态时的回调函数；第二个参数是`rejected`状态时的回调函数，可不传入。
>  并且该方法返回一个新的`Promise`对象。

- 语法：

  

  ```jsx
  p.then(onResolve, onReject);
  
  p.then(function(value) {
     // fulfillment
    }, function(reason) {
    // rejection
  });
  ```

#### (2) Promise.prototype. catch()

> 返回一个`Promise`，并且处理拒绝的情况。它的行为与调用`Promise.prototype.then(undefined, onRejected)`相同。

- 语法

  

  ```php
  p.catch(onReject)
  
   p.catch(function(reason) {
       // 拒绝
   });
  ```

- 推荐使用

  ```
  catch
  ```

  方法，不要在

  ```
  then
  ```

  方法中定义

  ```
  rejected
  ```

  状态的回调函数；这是因为使用

  ```
  catch
  ```

  还可以捕获在

  ```
  then
  ```

  方法执行中存在的错误。

  

  ```php
    // bad
  promise
    .then(function(data) {
      // success
    }, function(err) {
      // error
    });
  
  // good
  promise
    .then(function(data) { 
      // success
    })
    .catch(function(err) {
      // error
    });
  ```

#### (3) Promise.prototype. finally()

> 返回一个`Promsie`。是指，在上一轮 promise 运行结束后，无论`fulfilled`还是 `rejected`，都会执行指定的回调函数。
>  该方法适合，无论结果如何都要进行的操作，例如清除数据。

- 语法：该回调函数的不接受任何参数；

  

  ```php
    p.finally(onFinally);
  
    p.finally(function() {
     
    })
  ```

### 5.async/await

async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样，并且 await 只能配套 async 使用async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低

##### async function语法

- 自动将常规函数转换成Promise，返回值也是一个Promise对象
- 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
- 异步函数内部可以使用await

```jsx
async function name([param[, param[, ... param]]]) { statements }
name: 函数名称。
param:  要传递给函数的参数的名称
statements: 函数体语句。
返回值: 返回的Promise对象会以async function的返回值进行解析，或者以该函数抛出的异常进行回绝。
```

![img](https://upload-images.jianshu.io/upload_images/6522842-b2b6a9432cdd0996.png?imageMogr2/auto-orient/strip|imageView2/2/w/898/format/webp)

##### await语法

- await 放置在Promise调用之前，await 强制后面点代码等待，直到Promise对象resolve，得到resolve的值作为await表达式的运算结果
- await只能在async函数内部使用,用在普通函数里就会报错

```jsx
[return_value] = await expression;

expression:  一个 Promise  对象或者任何要等待的值。

返回值:返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
```

![img](https://upload-images.jianshu.io/upload_images/6522842-6e6b1cefa95688c9.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

### 6.迭代器iterator

iterator迭代器是ES6非常重要的概念，但是很多人对它了解的不多，但是它却是另外4个ES6常用特性的实现基础（解构赋值，剩余/扩展运算符，生成器，for of循环），了解迭代器的概念有助于了解另外4个核心语法的原理，另外ES6新增的Map,Set数据结构也有使用到它，所以我放到前面来讲

对于可迭代的数据解构，ES6在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回iterator对象（也叫迭代器对象），而生成iterator对象[Symbol.iterator]属性叫iterator接口,有这个接口的数据结构即被视为可迭代的

默认部署iterator接口的数据结构有以下几个，注意普通对象默认是没有iterator接口的（可以自己创建iterator接口让普通对象也可以迭代）

- Array
- Map
- Set
- String
- TypedArray（类数组）
- 函数的 arguments 对象
- NodeList 对象

iterator迭代器是一个对象，它具有一个next方法所以可以这么调用

```
let arr = [1,2,3];
let iterator = arr[Symbol.iterator]();
iterator.next();  //{value: 1, done: false}
iterator.next();  //{value: 2, done: false}
iterator.next();  //{value: 3, done: false}
```

next方法返回又会返回一个对象，有value和done两个属性，value即每次迭代之后返回的值，而done表示是否还需要再次循环，可以看到当value为undefined时，done为true表示循环终止

梳理一下

- 可迭代的数据结构会有一个[Symbol.iterator]方法
- [Symbol.iterator]执行后返回一个iterator对象
- iterator对象有一个next方法
- 执行一次next方法(消耗一次迭代器)会返回一个有value,done属性的对象

### 7.for ... of循环

for ... of是作为ES6新增的遍历方式,允许遍历一个含有iterator接口的数据结构并且返回各项的值,和ES3中的for ... in的区别如下

1. for ... of只能用在可迭代对象上,获取的是迭代器返回的value值,for ... in 可以获取所有对象的键名
2. for ... in会遍历对象的整个原型链,性能非常差不推荐使用,而for ... of只遍历当前对象不会遍历它的原型链
3. 对于数组的遍历,for ... in会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for ... of只返回数组的下标对应的属性值

for ... of循环的原理其实也是利用了可迭代对象内部部署的iterator接口,如果将for ... of循环分解成最原始的for循环,内部实现的机制可以这么理解

![img](https://user-gold-cdn.xitu.io/2019/2/12/168df9eba84cafbe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到只要满足第二个条件(iterator.next()存在且res.done为true)就可以一直循环下去,并且每次把迭代器的next方法生成的对象赋值给res,然后将res的value属性赋值给for ... of第一个条件中声明的变量即可,res的done属性控制是否继续遍历下去

for... of循环同时支持break,continue,return(在函数中调用的话)并且可以和对象解构赋值一起使用

![img](https://user-gold-cdn.xitu.io/2019/2/12/168df9ebb0fe5712?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

arr数组每次使用for ... of循环都返回一对象({a:1},{a:2},{a:3}),然后会经过对象解构,寻找属性为a的值,赋值给obj.a,所以在每轮循环的时候obj.a会分别赋值为1,2,3