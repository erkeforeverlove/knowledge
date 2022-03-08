##### 什么是 AJAX ？

AJAX = 异步 JavaScript 和 XML。

AJAX 是一种用于创建快速动态网页的技术。

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。

##### 原生Ajax的使用：

```js
 function ajax(url){
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
        xhr.open("get",url,true);
        xhr.send();
        xhr.onreadystatechange = () =>{
            if(xhr.readystate == 4){
                if(xhr.status == 200){
                    var data = xhr.responseTEXT;
                    return data;
                }
            }
        }    
    }
```

##### get方式

<script type="text/javascript">
	function btnClick() {
		//创建核心对象
		xmlhttp = null;
		if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
			xmlhttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//编写回调函数
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				alert(xmlhttp.responseText)
			}
		}
		//open设置请求方式和请求路径
		xmlhttp.open("get", "/Ajax/ajax2?username=张三");//一个servlet，后面还可以写是否同步
		//send 发送
		xmlhttp.send();
     }
</script>        

##### post方式

<script type="text/javascript">
	function btnClick() {
		//创建核心对象
		xmlhttp = null;
		if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
			xmlhttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//编写回调函数
		xmlhttp.onreadystatechange = function() {
			/* 	alert(xmlhttp.readyState); */
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				alert(xmlhttp.responseText)
			}
			/* alert(123); */
		}
		//open设置请求方式和请求路径
		xmlhttp.open("post", "/Ajax/ajax2");//一个servlet，后面还可以写是否同步
		//设置请求头
		xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded")
		//send 发送
		xmlhttp.send("username=张三");
	}
</script>
##### 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

0: 请求未初始化

1: 服务器连接已建立

2: 请求已接收

3: 请求处理中

4: 请求已完成，且响应已就绪

##### status

200  (“OK”) 成功 一切正常

500  服务期方面的问题

503 （服务不可用）

404  找不到资源

301 永久重定向

302 临时重定向

304 缓存

##### 概括

1.创建xmlhttprequest对象

2.设置回调函数，并且在回调函数中针对不同的响应状态进行处理  onreadystatechange()

3.使用open方法设置请求方法和路径

**4.设置请求头  setRequestHeader   （get中没有  主要是post用）**

5.向服务器发送

