###  1.js数据类型

###### 基本数据类型  

string number boolean null undefined symbol（ES6）

Symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。

Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等。

let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); //false

Symbol 生成一个全局唯一的值。只是为了创造出个独一无二的值

基本数据类型是指存放在栈中的简单数据段，数据大小确定，内存空间大小可以分配，它们是直接按值存放的，所以可以直接按值访问

###### 引用数据类型

array object function

引用类型是存放在堆内存中的对象，变量其实是保存的在栈内存中的一个指针（保存的是堆内存中的引用地址），这个指针指向堆内存。

引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象

typeof "123" => "string"

typdof 123  => "number"

typeof true  => "boolean"

typeof null  => "object"

typeof undefined => "undefined"

typeof [1,2,3]  => "object"

typeof {name:'zs'}  => "object"

typeof 函数 => "function"

有些时候，typeof 操作符会返回一些令人迷惑但技术上却正确的值：

- 对于基本类型，除 null 以外，均可以返回正确的结果。
- 对于引用类型，除 function 以外，一律返回 object 类型。
- 对于 null ，返回 object 类型。
- 对于 function 返回  function 类型。

其中，null 有属于自己的数据类型 Null ， 引用类型中的 数组、日期、正则 也都有属于自己的具体类型，而 typeof 对于这些类型的处理，只返回了处于其原型链最顶端的 Object 类型，没有错，但不是我们想要的结果。

### 2.__proto__ 属性和prototype属性

__proto__ 属性和prototype属性的区别

prototype是function对象中专有的属性。

__proto__是普通对象的隐式属性，在new的时候，会指向prototype所指的对象；

__proto__实际上是某个实体对象的属性，而prototype则是属于构造函数的属性。

__proto__只能在学习或调试的环境下使用。

### 3.判断数组对象

###### Array.isArray()

###### instanceof

instanceof是通过返回一个布尔值来指出，这个对象是否是这个特定类或者是它的子类的一个实例。

console.log(arr instanceof Array);

###### constructor                 

console.log(arr.constructor === Array)

### 4.Array下的常用方法

Array.join()就是把数组转换成字符串，然后给他规定个连接字符，默认的是逗号( ，)，并没有改变原来的数组

```
var arr = [1,2,3];
console.log(arr.join()); 　　　　// 1,2,3
console.log(arr.join("-")); 　　// 1-2-3
console.log(arr); 　　　　　　　　// [1, 2, 3]（原数组不变）
```

Array.map()将数组中的每个元素调用一个提供的函数，结果作为一个新的数组返回，并没有改变原来的数组

```
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.map(function(item){
return item*item;
});
console.log(arr2); 　　　　　　　　//[1, 4, 9, 16, 25]
```

Array.forEach()将数组中的每个元素执行传进提供的函数，没有返回值，直接改变原数组

```
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(x, index, a){
console.log(x + '|' + index + '|' + (a === arr));
});
// 输出为：
// 1|0|true
// 2|1|true
// 3|2|true
// 4|3|true
// 5|4|true
```

Array.filter()将所有元素进行判断，将满足条件的元素作为一个新的数组返回，不改变原数组

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter(function(x, index) {
return index % 3 === 0 || x >= 8;
}); 
console.log(arr2); 　　　　　　　　//[1, 4, 7, 8, 9, 10]
```

Array.push()在数组的后面添加新加元素，此方法改变了数组的长度

Array.pop()删除数组最后一个元素，并返回数组，此方法改变了数组的长度

```
var arr = ["Lily","lucy","Tom"];
var count = arr.push("Jack","Sean");
console.log(count); 　　　　　　　　　　// 5
console.log(arr); 　　　　　　　　　　　// ["Lily", "lucy", "Tom", "Jack", "Sean"]
var item = arr.pop();
console.log(item); 　　　　　　　　　　 // Sean
console.log(arr); 　　　　　　　　　　  // ["Lily", "lucy", "Tom", "Jack"]
```

Array.shift()在数组后面删除第一个元素，并返回被删除的元素，此方法改变了数组的长度

Array.unshift()将一个或多个元素添加到数组的开头，并返回新数组的长度

```
var arr = ["Lily","lucy","Tom"];
var count = arr.unshift("Jack","Sean");
console.log(count); 　　　　　　　　　　　　　　// 5
console.log(arr); 　　　　　　　　　　　　　　　//["Jack", "Sean", "Lily", "lucy", "Tom"]
var item = arr.shift();
console.log(item); 　　　　　　　　　　　　　　// Jack
console.log(arr); 　　　　　　　　　　　　　　 // ["Sean", "Lily", "lucy", "Tom"]
```

Array.isArray()判断一个对象是不是数组，返回的是布尔值

Array.concat()可以将多个数组拼接成一个数组，原数组不变

```
var arr = [1,3,5,7];
var arrCopy = arr.concat(9,[11,13]);
console.log(arrCopy); 　　　　　　　　　　　　//[1, 3, 5, 7, 9, 11, 13]
console.log(arr); 　　　　　　　　　　　　　　// [1, 3, 5, 7](原数组未被修改)
```

Array.toString()将数组转化为字符串

Array.splice(开始位置,删除的个数,此位置后添加的元素);万能方法，可以实现增删改，改变原数组

```
var arr = [1,3,5,7,9,11];
var arrRemoved = arr.splice(0,2);
console.log(arr); 　　　　　　　　　　　　　　　//[5, 7, 9, 11]
console.log(arrRemoved); 　　　　　　　　　　　//[1, 3]
var arrRemoved2 = arr.splice(2,0,4,6);
console.log(arr); 　　　　　　　　　　　　　　　// [5, 7, 4, 6, 9, 11]
console.log(arrRemoved2); 　　　　　　　　　　// []
var arrRemoved3 = arr.splice(1,1,2,4);
console.log(arr); 　　　　　　　　　　　　　　　// [5, 2, 4, 4, 6, 9, 11]
console.log(arrRemoved3); 　　　　　　　　　　//[7]
//这个arr是可以被改变的 不要一直看最初的arr
```

Array.slice()：返回从原数组中指定开始下标到结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。

不改变原数组

```
var arr = [1,3,5,7,9,11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);
console.log(arr); 　　　　　　　　　　　　　　//[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy); 　　　　　　　　　　　 //[3, 5, 7, 9, 11]
console.log(arrCopy2); 　　　　　　　　　　　//[3, 5, 7]
console.log(arrCopy3); 　　　　　　　　　　　//[3, 5, 7]
console.log(arrCopy4); 　　　　　　　　　　　//[5, 7, 9]
```

### 5.String下的常用方法

String下的常用方法

String.charCodeAt()方法返回一个整数，代表指定位置字符的Unicode编码

String.fromCharCode()方法从一些Unicode字符串中返回一个字符串

  例:String.fromCharCode(65,66,112);

  结果：ABp

String.charAt()方法返回指定索引位置处的字符。如果超出有效范围的索引值返回空字符串。

  例如：

  var str = "ABC";

  str.charAt(1);

  结果：B

String.slice()方法返回字符串的片段。

  例如：

  012345

  var str = "ABCDEF";

  str.slice(2,4);

  结果：CD

String.substring()方法返回位于String对象中指定位置的子字符串。

  例如：

  012345

  var str = "ABCDEF";

  str.substr(2,4);

  结果：CDEF

String.indexOf()方法放回String对象内第一次出现子字符串位置。如果没有找到子字符串，则返回-1。

  例如：

  01234567

  var str = "ABCDECDF";

  str.indexOf("CD"，1); // 由1位置从左向右查找 123...

  结果：2

String.split()将一个字符串分割为子字符串，然后将结果作为字符串数组返回。

  例如：

  var str = "AA BB CC DD EE FF";

  alert(str.split(" "，3));

  结果：

  AA,BB,CC

### 6.JS类的写法

1. ###### 普通写法

   创建一个obj对象，赋予该对象属性值和方法

   ```js
   var person = new Object();
   person.name = "cxk";
   person.sex = "女";
   person.like = "唱、跳、rap和篮球";
   person.show = function(){
       console.log("大家好，我是"+this.name+",喜欢"+this.like);
   }
   ```

2. ###### 工厂模式

   顾名思义，工厂模式就好比一个加工厂，下面这段代码就是创建一个人的工厂，工厂创建一个对象，赋予这个对象属性和方法，最后返回对象，一个人就出来了。

   ```js
   function CreatePerson(name,sex,like){
       //创建对象
       var obj = new Object();
       //赋值
       obj.name = name;
       obj.sex = sex;
       obj.like = like;
       //方法
       obj.show = function(){
   	    console.log("大家好，我是"+this.name+",喜欢"+this.like);
       }
       //返回对象
       return obj;
   }
   ```

3. ###### 构造函数模式

   构造函数就是初始化类的函数，new后面就是构造函数，构造函数中的this指向当前对象，一般首字母大写

   ```js
   function CreatePerson(name,sex,like){
       this.name = name;
       this.sex = sex;
       this.like = like;
       this.show = function(){
   	    console.log("大家好，我是"+this.name+",喜欢"+this.like);
       }
   }
   //实例化对象
   var js = new CreatePerson("cxk","man","basketball");
   console.log(js);
   ```

   ```
   缺点很明显，类的属性和方法，很容易被外部修改
   ```

4. ###### 原型模式

   原型用于存放公用的方法或属性，让公用的方法或属性在内存中存在一份，提升性能

   ```js
   function Person(name,sex,like){
       Person.prototype.name = name;
       Person.prototype.sex = sex;
       Person.prototype.like = like;
       Person.prototype.show = function(){
   	    console.log("大家好，我是"+this.name+",喜欢"+this.like);
       }
   }
   ```

   

5. ###### 混合模式

   ```js
   function CreatePerson(name,sex,like){
       this.name = name;
       this.sex = sex;
       this.like = like;
   }
   CreatePerson.prototype.show = function(){
       console.log("大家好，我是"+this.name+",喜欢"+this.like);
   }
   ```

### 7.JS原型和原型链

构造函数创建对象：

```jsx
function Person() {

}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin
```

Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person

##### prototype

每个函数都有一个 prototype 属性
 每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

```jsx
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

![img](https://upload-images.jianshu.io/upload_images/1490251-48851bf37a08259d.png?imageMogr2/auto-orient/strip|imageView2/2/w/556/format/webp)

##### **proto**

每一个JavaScript对象(除了 null )都具有的一个属性，叫**proto**，这个属性会指向该对象的原型

```jsx
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

![img](https://upload-images.jianshu.io/upload_images/1490251-e7476a8697e97aab.png?imageMogr2/auto-orient/strip|imageView2/2/w/567/format/webp)

##### constructor

每个原型都有一个 constructor 属性指向关联的构造函数 实例原型指向构造函数

```tsx
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```

![img](https://upload-images.jianshu.io/upload_images/1490251-0cac772635e8a128.png?imageMogr2/auto-orient/strip|imageView2/2/w/518/format/webp)

```jsx
function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

实例与原型

```jsx
function Person() {

}

Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.**proto** ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

##### 原型与原型

```jsx
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```

![img](https://upload-images.jianshu.io/upload_images/1490251-293b8fe01cf2ef5f.png?imageMogr2/auto-orient/strip|imageView2/2/w/609/format/webp)

##### 原型链

```
console.log(Object.prototype.__proto__ === null) // true
```

![img](https://upload-images.jianshu.io/upload_images/1490251-3089c135df71c956.png?imageMogr2/auto-orient/strip|imageView2/2/w/604/format/webp)

JavaScript 默认并不会**复制**对象的属性，相反，JavaScript 只是在两个对象之间创建一个**关联**，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，**委托**的说法反而更准确些

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190911104630471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5dF9hbmd1bGFyanM=,size_16,color_FFFFFF,t_70)

### 8.JS的继承

1. ###### 原型链式继承

   ```jsx
   // 原型链继承
   function Person(){
       this.name = 'xiaopao';
   }
   
   Person.prototype.getName = function(){
       console.log(this.name);
   }
   
   function Child(){
       
   }
   
   Child.prototype = new Person();
   var child1 = new Child();
   child1.getName(); // xiaopao
   ```

   缺点：

   1. 引用类型的属性被所有实例共享
   2. 在创建Child 的实例时， 不能向Person传参

   ```jsx
   		function Person(){
               this.name = 'xiaopao';
               this.colors = ['red', 'blue', 'green'];
           }
   
           Person.prototype.getName = function(){
               console.log(this.name);
           }
   
           function Child(){
   
           }
   
           Child.prototype = new Person();
           var child1 = new Child();
           var child2 = new Child();
           child1.colors.push('yellow');
           console.log(child1.colors);// ["red", "blue", "green", "yellow"]
           console.log(child2.colors);// ["red", "blue", "green", "yellow"]
   ```

2. ###### 借用构造函数（经典继承）

   ```jsx
   // 借用构造函数继承（经典继承）
           function Person(){
               this.name = 'xiaopao';
               this.colors = ['red', 'blue', 'green'];
           }
   
           Person.prototype.getName = function(){
               console.log(this.name);
           }
   
           function Child(){
               Person.call(this);
           }
   
           var child1 = new Child();
           var child2 = new Child();
           child1.colors.push('yellow');
           console.log(child1.colors); // ["red", "blue", "green", "yellow"]
           console.log(child2.colors); // ["red", "blue", "green"]
   ```
   

优点：
   1.避免了引用类型的属性被所有实例共享
   2.可以在Child中向Parent传参
   缺点：
   1.只是子类的实例，不是父类的实例
   2.方法都在构造函数中定义，每次创建实例都会创建一遍方法

```jsx
   // 借用构造函数继承， 向Parent传参
     		function Person(name){
               this.name = name;
           }
   
           Person.prototype.getName = function(){
               console.log(this.name);
           }
   
           function Child(name){
               Person.call(this,name);
           }
   
           var child1 = new Child('xiaopao');
           var child2 = new Child('lulu');
           console.log(child1.name); // xiaopao
           console.log(child2.name); // lulu
           console.log(child1 instanceof Person); // false   不能识别是Person的实例
```

3. ###### 组合式继承

   组合 原型链继承 和 借用构造函数继承
   背后的思路是：使用原型链实现对原型方法的继承，而通过借用构造函数来实现对实例属性的继承。

   ```jsx
   		function Parent(name){
               this.name = name;
               this.colors = ['red', 'blue', 'green'];
           }
   
           Parent.prototype.getName = function(){
               console.log(this.name);
           }
   
           function Child(name,age){
               Parent.call(this,name);// 第二次调用 Parent()
               this.age = age;
           }
   
           Child.prototype = new Parent(); // 第一次调用 Parent()
   
           var child1 = new Child('xiaopao',18);
           var child2 = new Child('lulu',19);
           child1.getName(); // xiaopao
           child2.getName(); // lulu
           console.log(child1.age); // 18
           console.log(child2.age); // 19
           child1.colors.push('yellow');
           console.log(child1.colors);  // ["red", "blue", "green", "yellow"]
           console.log(child2.colors); // ["red", "blue", "green"]
           console.log(child1 instanceof Child); // true
           console.log(child1 instanceof Parent); // true
   ```

   优点：融合原型链继承和构造函数的优点，是JavaScript中最常用的继承模式
   缺点：调用了两次父类构造函数
    （组合继承最大的问题是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部）

4. ###### 原型式继承

   ```js
           // 原型式继承
   		function CreateObj(o){
               function F(){}
               F.prototype = o;
               return new F();
           }
   
           var person = {
               name: 'xiaopao',
               friend: ['daisy','kelly']
           }
   
           var person1 = CreateObj(person);
           // var person2 = CreateObj(person);
   
           person1.name = 'person1';
           // console.log(person2.name); // xiaopao
           person1.friend.push('taylor');
           // console.log(person2.friend); // ["daisy", "kelly", "taylor"]
           // console.log(person); // {name: "xiaopao", friend: Array(3)}
           person1.friend = ['lulu'];
           // console.log(person1.friend); // ["lulu"]
           // console.log(person.friend); //  ["daisy", "kelly", "taylor"]
   ```
   
   缺点： 包含引用类型的属性值始终都会共享相应的值， 这点跟原型链继承一样
    注意： 这里修改了person1.name的值，person2.name的值并未改变，并不是因为person1和person2有独立的name值，而是person1.name='person1'是给person1添加了name值，并非修改了原型上的name值。因为我们找对象上的属性时，总是先找实例上对象，没有找到的话再去原型对象上的属性。实例对象和原型对象上如果有同名属性，总是先取实例对象上的值

**因为我们找对象上的属性时，总是先找实例上对象，没有找到的话再去原型对象上的属性。实例对象和原型对象上如果有同名属性，总是先取实例对象上的值**

   ![img](https://upload-images.jianshu.io/upload_images/15216392-e770e4842ea8ab08.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

5. ###### 寄生式继承

   创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
   可以理解为在原型式继承的基础上新增一些函数或属性

   ```jsx
           // 寄生式继承  可以理解为在原型式继承的基础上增加一些函数或属性
           var ob = {
               name: 'xiaopao',
               friends: ['lulu','huahua']
           }
   
           function CreateObj(o){
               function F(){};  // 创建一个构造函数F
               F.prototype = o;
               return new F();
           }
   
           // 上面CreateObj函数 在ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的 , 看下面代码
           var ob1 = CreateObj(ob);
           var ob2 = Object.create(ob);
           console.log(ob1.name); // xiaopao
           console.log(ob2.name); // xiaopao
   
           function CreateOb(o){
               var newob = CreateObj(o); // 创建对象 或者用 var newob = Object.create(ob)
               newob.sayName = function(){ // 增强对象
                   console.log(this.name);
               }
               return newob; // 指定对象
           }
   
           var p1 = CreateOb(ob);
           p1.sayName(); // xiaopao 
   ```

   缺点：跟借用构造函数一样，每次创建对象都会创建一遍方法

6. ###### 寄生组合式继承

   子类构造函数复制父类的自身属性和方法，子类原型只接收父类的原型属性和方法

   所谓寄生组合继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
    其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型的原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给予类型的原型。

   ```jsx
   // 寄生组合式继承
   		function Parent(name){
               this.name = name;
               this.colors = ['red', 'blue', 'green'];
           }
   
           Parent.prototype.sayName = function(){
               console.log(this.name);
           }
   
           function Child(name,age){
               Parent.call(this,name); 
               this.age = age;
           }
   
           function CreateObj(o){
               function F(){};
               F.prototype = o;
               return new F();
           }
   
           // Child.prototype = new Parent(); // 这里换成下面
           function prototype(child,parent){
               var prototype = CreateObj(parent.prototype);
               prototype.constructor = child;
               child.prototype = prototype;
           }
           prototype(Child,Parent);
   
           var child1 = new Child('xiaopao', 18);
           console.log(child1); 
   ```

   ![img](https://upload-images.jianshu.io/upload_images/15216392-0d60dfce7d7aa99a.png?imageMogr2/auto-orient/strip|imageView2/2/w/816/format/webp)

   优点： 这种方式的高效率体现它只调用了一次Parent构造函数，并且因此避免了再Parent.prototype上面创建不必要的，多余的属性。普遍认为寄生组合式继承是引用类型最理想的继承方式

   例题：已知如下类Animal，要求设计一个Cat类继承自Animal，并实现如下功能：
   
   ```jsx
   Animal:
   function Animal(){
       this.name = "Animal";
       this.showName = function(){
           console.log(this.name);
       }
   }
   
   Cat:
   
   function Cat(){
   
       this.name = "Cat";
   
       this.showName1 = function(){
           console.log(this.name); 
       }
       
       this.showName2 = function(){
           console.log(this.name); 
       } 
    
       this.showName3 = function(){
           console.log(this.__super.name + "=>" + this.name); 
       }
}
   ```
   

代码运行：
   // 请完善Cat部分相关代码，得到如下结果：

   ```jsx
   var cat = new Cat();
   console.log(cat instanceof Animal ); // 得到：true
   cat.showName1();     // 得到："Cat" (需要读到Cat中的name属性) 
   cat.showName2();    //  得到：”Animal" (需要读到Animal中的name属性) 
cat.showName3();    //得到：”Animal" => "Cat" (需要同时读到Cat中的name和Animal中的name)
   ```

   答案解析：

   ```jsx
   function Animal() {
       this.name = "Animal";
       this.showName = function() {
           console.log(this.name);
       };
   }
   
   function Cat() {
   
       this.name = "Cat";
       this._super = Cat.prototype;
   
       this.showName1 = function() {
           console.log(this.name);
       };
   
       this.showName2 = function() {
           console.log(this.name);
       };
   
       this.showName3 = function() {
           console.log(this._super.name + "=>" + this.name);
       };
   }
   Cat.prototype = new Animal();
   var cat = new Cat();
   console.log(cat instanceof Animal);   //true
   cat.showName1();     //"Cat"
   cat.showName2.call(Cat.prototype);   //"Animal"
   cat.showName3();    //"Animal" => "Cat"
   ```

### 9.JS的call、apply和bind方法

bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

##### apply、call作用

在 javascript 中，`call` 和 `apply` 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 `this` 的指向。
JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

```
function fruits() {}
 
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
 
var apple = new fruits;
apple.say();    //My color is red
```

但是如果我们有一个对象`banana= {color : "yellow"}` ,我们不想对它重新定义 `say` 方法，那么我们可以通过 `call` 或 `apply` 用 `apple` 的 `say` 方法：

```
banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

所以，可以看出 `call` 和 `apply` 是为了动态改变 `this` 而出现的，当一个 `object` 没有某个方法（本栗子中`banana`没有`say`方法），但是其他的有（本栗子中`apple`有`say`方法），我们可以借助`call`或`apply`用其它对象的方法来操作。

##### apply、call 区别

对于 `apply`、`call` 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```
var func = function(arg1, arg2) {
     
};
```

就可以通过如下方式来调用：

```
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

其中 `this` 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，`call` 需要把参数按顺序传递进去，而 `apply` 则是把参数放在数组里。　　
为了巩固加深记忆，下面列举一些常用用法：

##### apply、call实例

**数组之间追加**

```
var array1 = [12 , "foo" , {name:"Joe"} , -2458]; 
var array2 = ["Doe" , 555 , 100]; 
Array.prototype.push.apply(array1, array2); 
// array1 值为  [12 , "foo" , {name:"Joe"} , -2458 , "Doe" , 555 , 100] 
```

**获取数组中的最大值和最小值**

```
var  numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers),   //458
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
```

number 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。

**验证是否是数组（前提是`toString()`方法没有被重写过）**

```
functionisArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

**类（伪）数组使用数组方法**

```
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```

Javascript中存在一种名为伪数组的对象结构。比较特别的是 `arguments` 对象，还有像调用 `getElementsByTagName` , `document.childNodes` 之类的，它们返回`NodeList`对象都属于伪数组。不能应用 Array下的 `push` , `pop` 等方法。
但是我们能通过 `Array.prototype.slice.call` 转换为真正的数组的带有 `length` 属性的对象，这样 `domNodes` 就可以应用 Array 下的所有方法了。

##### **面试题**

定义一个 `log` 方法，让它可以代理 `console.log` 方法，常见的解决方法是：

```
function log(msg)　{
  console.log(msg);
}
log(1);    //1
log(1,2);    //1
```

上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 `apply` 或者 `call`，注意这里传入多少个参数是不确定的，所以使用`apply`是最好的，方法如下：

```
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```

接下来的要求是给每一个 `log` 消息添加一个"(app)"的前辍，比如：

```
log("hello world"); //(app)hello world
```

该怎么做比较优雅呢?这个时候需要想到`arguments`参数是个伪数组，通过 `Array.prototype.slice.call` 转化为标准数组，再使用数组方法`unshift`，像这样：

```
function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');
 
  console.log.apply(console, args);
};
```

##### bind

在讨论`bind()`方法之前我们先来看一道题目：

```
var altwrite = document.write;
altwrite("hello");
```

结果：`Uncaught TypeError: Illegal invocation`
`altwrite()`函数改变`this`的指向`global`或`window`对象，导致执行时提示非法调用异常，正确的方案就是使用`bind()`方法：

```
altwrite.bind(document)("hello")
```

当然也可以使用`call()`方法：

```
altwrite.call(document, "hello")
```

**绑定函数**

`bind()`最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值。常见的错误就像上面的例子一样，将方法从对象中拿出来，然后调用，并且希望`this`指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。使用`bind()`方法能够很漂亮的解决这个问题：

```
this.num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { 
    console.log(this.num);
  }
};

mymodule.getNum(); // 81

var getNum = mymodule.getNum;
getNum(); // 9, 因为在这个例子中，"this"指向全局对象

var boundGetNum = getNum.bind(mymodule);
boundGetNum(); // 81
```

`bind()` 方法与 `apply` 和 `call` 很相似，也是可以改变函数体内 `this` 的指向。

再总结一下：

`apply` 、 `call` 、`bind` 三者都是用来改变函数的this对象的指向的；
`apply` 、 `call` 、`bind` 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
`apply` 、 `call` 、`bind` 三者都可以利用后续参数传参；
`bind` 是返回对应函数，便于稍后调用；`apply` 、`call` 则是立即调用 。

### 10.Arguments

##### 什么是arguments?

它是JS的一个内置对象，常被人们所忽略，但实际上确很重要，JS不像JAVA是显示传递参数，JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，该如何拿到参数呢，答案就是arguments了，在一些插件里通常这样使用。

每一个函数都有一个arguments对象，它包括了函数所要调的参数，通常我们把它当作数组使用，用它的length得到参数数量，但它却不是数组，使用instanceof查看下，若使用push添加数据将报错，代码如下：



```jsx
(function(){
    console.log([] instanceof Array)
    console.log(arguments instanceof Array)
    if(arguments.push) arguments.push('test')
})()
```

##### 创建一个灵活的格式化函数

上面说了arguments可以使用函数使用数量不定的参数，下面看看它的一个实际应用：



```jsx
function format(string) {
  var args = arguments;
  var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
  return String(string).replace(pattern, function(match, index) {
    return args[index];
  });   
};
format("And the %1 want to know whose %2 you %3", "papers", "shirt", "wear");
```

这里我借用了别人的一个例子，一个模板字符串，可以使用%1到%9等9个占位符，然后提供9个参数给这些占位符，最后替换生成真正的字符串。
 上面的代码返回：“And the papers want to know whose shirt you wear”

##### 通过arguments对象封装format函数

format填充字符串函数

arguments允许我们去执行所有类型的js方法，下面通过一个makeFunc函数，展示了函数允许我们去提供一个函数引用和这个函数的所有参数，它将返回一个匿名函数去调用你规定的函数(就是闭包)，也提供了匿名函数调用时所附带的参数。



```jsx
function makeFunc() {
  var args = Array.prototype.slice.call(arguments);
  var func = args.shift();
  return function() {
    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  };
}
```

第一个arguments给makeFunc提供了你调用的函数的引用，它将第一个参数从arguments数组里移除，然后makeFunc返回了一个匿名函数去运行规定的方法。
 apply的第一个参数是函数调用的范围，主要是函数内部关联部分所指向的，这里设为null，它的arguments是一个数组，即匿名函数调用时传入的参数，匿名函数将传入的参数串联到原参数对象args里组成完整的匿名函数所需要参数。

你需要输出一个模板，总是相同位置的字符发生改变，这样就可以使用makeFunc去生成一个模板函数，传入不同的参数多次调用生成不同的内容了。



```swift
var func = makeFunc(format, "I like %1 not %2.");
func("js", "java");   
func("java", "python");
```

每一次调用func，它会同时调用format函数和第一个arguments，然后填充已有的模板。
 执行结果如下：

> "I like js not java."
>  "I like java not python."

##### 创建引用自身的函数

arguments.callee包括了一个函数的引用去创建一个arguments对象，它能让一个匿名函数很方便的指向本身。
 下面的Repeat是一个承载了一个函数引用和两个数字的函数，第一个数字是调用次数，第二个是间隔时间，单位毫秒。



```jsx
function repeat(fn, times, delay) {
  return function() {
    if(times-- > 0) {
      fn.apply(null, arguments);
      var args = Array.prototype.slice.call(arguments);
      var self = arguments.callee;
      setTimeout(function(){self.apply(null,args)}, delay);
    }
  };
}
```

Repeat函数使用了arguments.callee方法从变量self获取一个引用，指向运行原始指令的函数。这样，匿名函数就可以再次调用自身，看看下面的调用：



```jsx
var somethingWrong = repeat(function(s){console.log(s)}, 3, 2000);
somethingWrong("Can you hear me, major tom?");
```

可以看到somethingWrong函数的结果被打印了3次，每隔2秒。

### 11.setInterval与setTimeout

setTimeout()方法只运行一次，也就是说当达到设定的时间后就出发运行指定的代码，运行完后就结束了，

如果还想再次执行同样的函数，可以在函数体内再次调用setTimeout()，可以达到循环调用的效果。

setInterval()是循环执行的，即每达到指定的时间间隔就执行相应的函数或者表达式，是真正的定时器。

用setTimeout实现setInterval:

```js
function ff(fun,delay){
  setTimeout(function(){
     fun();
     ff(fun,delay);
  },delay);
}
```

### 12.事件

1. 概念

   事件：怎么触发这个事情 （一般是动词，触发事件，比如点击开关）

   事件处理函数：怎么触发这个事情 （一般是动词，触发事件，比如点击开关）

   事件源：要触发的对象 （一般是名词，事件发起者，比如开关按钮）

2. 事件流   事件的冒泡和捕获

   1. 事件冒泡：从触发的对象开始，事件不断往上传递。    （自底向上）触发顺序一样

   2. 事件捕获：从dom树一直向下传递事件直到捕获为止。（自顶向下）触发顺序一样

   3. 同时有冒泡和捕获的时候 先捕获 再冒泡 （先从外到里，再从里往外）

   4. 阻止事件冒泡:

      e.stopPropagation();

      e.cancelBubble = true;//ie

   5. 阻止默认行为:

      return false;

      e.preventDefault();

      e.returnValue = false;

   6. 捕获true 或 冒泡false

      ```
      oDiv1.addEventListener('click',function(){
      
         console.log('div1 click2');
      
      },false);
      ```

3. 事件委托

   事件委托利用了`事件冒泡`与`event.target`

   事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能

   event.currentTarget   //当前所绑定的事件对象。在事件委托中，指的是【父元素】。

   event.target  //当前被点击的元素。在事件委托中，指的是【子元素】。

   ##### 事件委托实例

   ##### 1.多个元素共用一个监听器时

   创建一个ul,并包含两个li,其中一个li中包含一个span

   

   ```javascript
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>事件委托</title>
   
       <style>
           ul, li {
               list-style: none;
               border: 1px solid;
               padding: 5px;
               background: darkgrey;
           }
   
           li {
               text-align: center;
               margin: 10px;
               background: #fff
           }
       </style>
   </head>
   <body>
   <ul>
       <li><span>点击<span></li>
       <li>点击</li>
   </ul>
   
   </body>
   </html>l
   ```

   赋予ul点击事件,并监听

   

   ```javascript
   var elementUl = document.querySelector('ul');
   function fn(event) {
       var el = event.target;
       while (el.tagName !== 'LI') {
           if (el === elementUl){
               el =null;
               break;
           }
           el = el.parentNode;//返回當前元素的父节点
       }
   
       if (el) {
           console.log(el)
       }
   }
   elementUl.addEventListener('click', fn);
   ```

   分别点击第一个span的li

   

   ![img](https:////upload-images.jianshu.io/upload_images/4722096-e88e7a5b41f93fab.png?imageMogr2/auto-orient/strip|imageView2/2/w/331/format/webp)

   

   这例子实现了点击li的范围内,不论li本身还是li旗下的所有元素,都会返回得到li的本身.

   ##### 2.实现动态内容的监控

   

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <title>JS Bin</title>
     
   <style>
   li{
     border: 1px solid;
   }
   </style>
   </head>
   <body>
   <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
   </ul>
     
     <button id=addButton>+</button>
   </body>
   </html>
   ```

   

   ```javascript
   addButton.onclick = function(){
     
     var li = document.createElement('li')
     li.textContent = 'new'
     
     document.querySelector('ul').appendChild(li)
   }
   
   document.querySelector('ul').onclick = function(e){
     console.log(e.target)
   }
   ```

   ![img](https:////upload-images.jianshu.io/upload_images/4722096-8de7dd46d3693e4b.png?imageMogr2/auto-orient/strip|imageView2/2/w/467/format/webp)

   ##### 总结

   事件委托的特点
    1.可以大量节省内存占用，减少事件注册
    2.实现当新增子对象时无需再次对其绑定事件,实现动态内容很方便

### 13.闭包

优点

1.可以读取函数内部的变量

2.可以让这些局部变量保存在内存中，实现变量数据共享。

缺点

1.由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2.闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

![img](https://img-blog.csdn.net/2018072315295498?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhdWNoeTYzMTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在上面的代码中，闭包指的就是function () {return counter += 1;}这个函数。首先解释一下这段代码，在变量add被赋值之前，第一个function执行了一次（执行且仅会执行一次），因为这是一个函数表达式声明方式并且声明后加上了()，所以会自动执行一次。执行后add被赋值（匿名函数）了，add= function () {return counter += 1;} 。然后每次调用add()函数时，返回的都是这个函数，因为这个函数在第一个函数的内部，所以即使第一个函数执行完了，第二个函数依然能访问counter（JS设计的作用域链，当前作用域能访问上级的作用域）。 

### 14.var和let

let和var的区别体现在作用域上。var的作用域被规定为一个函数作用域，而let则被规定为块作用域，块作用域要比函数作用域小一些，但是如果两者既没在函数中，也没在块作用域中定义，那么两者都属于全局作用域。

##### 全局作用域

var 和 let 声明的变量在全局作用域中被定义时，两者非常相似

```csharp
let bar = 'hehe';
var baz = 'lala'; 
```

但是，被let声明的变量不会作为全局对象window的属性，而被var声明的变量却可以

```jsx
console.log(window.bar);  //undefined
console.log(window.baz); // 'able'
```

##### 函数作用域

var 和 let 在函数作用域中声明一个变量，两个变量的意义是相同的。

```jsx
function  aFun(){
    let bar = 'hehe'; // 函数作用域中的变量
    var baz = 'lala'; // 函数作用域中的变量
}
```

##### 块作用域

在块作用域中两者的区别较为明显， let只在for()循环中可用，而 var是对于包围for循环的整个函数可用

```jsx
function  aFun1(){
    // i 对于for循环外的范围是不可见的(i is not defined)
    for(let i = 1; i<5; i++){
        //  i只有在这里是可见的
    }
    // i 对于for循环外的范围是不可见的(i is not defined)
}
function aFun2(){
    // i 对于for循环外的范围是可见的
    for(var i = 1;i<5; i++){
        // i 在for 在整个函数体内都是可见的
    }
    // i 对于for循环外的范围是可见的
}
```

##### let 和var 重新声明

var允许在同一作用域中声明同名的变量，而let不可以

```csharp
let me  = 'foo';
let me  = 'bar'; //SyntaxError: Identifier 'me' has already been declared

var me = 'foo';
var me = 'bar'; //这里me被替代了，是可以重复声明的
```

es6中还有一个声明变量的命令const，const和let都是在声明的块作用域中有效，但是let声明的变量可变，值和类型都可以改变，没有限制。const声明额变量不能改变，所以，const一旦声明一个变量，就必须马上初始化，不能留到以后赋值

```cpp
const hehe; //报错，Missing initializer in const declaration

const a = 3;
a = 5; //报错，Uncaught TypeError: Assignment to constant variable.
```

以上就是let和var在不同作用域下的区别

### 15.函数的节流和防抖

在日常的开发过程中，会有这样的场景，事件被频繁的触发，比如说我们的在输入的时候监控keypress事件，在页面滚动的时候监控页面的滚动事件。比如我们监控页面的resize事件，拉动窗口改变大小的时候，resize事件被频繁的执行

![img](https://images2015.cnblogs.com/blog/746387/201702/746387-20170221154145866-1897976550.png)

事件处理函数简单的话还好，但是如果是复杂的dom操作，可能会导致整个UI卡顿设置浏览器奔溃，而我们往往的结果就是事件结束后处理函数执行一次就行了。于是我们可以通过函数的去抖来处理

**防抖（debounce）**

函数调用n秒后才会执行，如果函数在n秒内被调用的话则函数不执行，重新计算执行时间

 

实现代码

```
  /**函数的去抖动**/
 function debounce(method,delay){
      var timer=null;
       return function(){
            var context=this, args=arguments;
            clearTimeout(timer);
            timer=setTimeout(function(){
                method.apply(context,args);
            },delay);
        }
}
```

 测试：

```
function resizehandler(){
      console.log(++n);
}
 window.onresize=debounce(resizehandler,500);
```

 

测试结果：

 ![img](https://images2015.cnblogs.com/blog/746387/201702/746387-20170221153021273-685556347.png)

函数去抖是在我们事件结束后的一段时间内才会执行，会有一个延迟性。现在我们有一个需求，有一个输入框要求输入联想，在用户输入的过程中，需要按照一定的时间像后台发送ajax请求，获取数据。对于这样的需求，我们可以通过函数节流来实现

 

**函数节流（throttle）**

函数预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期

实现代码

```
/**函数节流**/

function throttle(method,duration){
        var  begin=new Date();
        return function(){
            var context=this, args=arguments, current=new Date();
            if(current-begin>=duration){
                 method.apply(context,args);
                 begin=current;
            }
        }
}
```

测试：

```
function resizehandler(){
    console.log(++n);
}
window.onresize=throttle(resizehandler,500);
```

 

结果：

 ![img](https://images2015.cnblogs.com/blog/746387/201702/746387-20170221153042929-871658057.png)

需要注意的一点：**函数的节流和函数的去抖都是通过减少实际逻辑处理过程的执行来提高事件处理函数运行性能的手段，并没有实质上减少事件的触发次数**。

##### 节流和防抖的区别
debounce: 当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
throttle：预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
**debounce使用场景**
1. scroll事件（资源的加载）
2. mousemove事件（拖拽）
3. resize事件（响应式布局样式）
4. keyup事件（输入框文字停止打字后才进行校验）
debounce电梯：
假设你正在准备乘坐电梯,并且电梯门准备关上然后上升的时候,你的同事来了,出于礼貌,我们需要停止电梯的关闭,让同事进入.假设源源不断的有同事进来的话,电梯就需要处于一种待机的状态,一直等待人员的进入,直到没有新的同事进入或者说电梯满了,这个时候,电梯才能运行.另外,同事的进入需要在电梯门的关闭之前,否则的话,就只能等下一趟了。
**throttle使用场景**
1. click事件（不停快速点击按钮，减少触发频次）
2. scroll事件（返回顶部按钮出现\隐藏事件触发）
3. keyup事件（输入框文字与显示栏内容复制同步）
4. 减少发送ajax请求，降低请求频率
throttle电梯：
throttle电梯不想debounce电梯一样会无限的等待,而是我们设定一个时间,例如10s,那么10s内,其他的人可以不断的进入电梯,但是,一旦10s过去了,那么无论如何,电梯都会进入运行的状态。