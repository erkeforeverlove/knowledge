iframe的优缺点？

1.<iframe>优点：

（1）解决加载缓慢的第三方内容如图标和广告等的加载问题

（2）Security sandbox

iframe sandbox="value"

| 值                   | 描述                                           |
| :------------------- | :--------------------------------------------- |
| ""                   | 应用以下所有的限制。                           |
| allow-same-origin    | 允许 iframe 内容被视为与包含文档有相同的来源。 |
| allow-top-navigation | 允许 iframe 内容从包含文档导航（加载）内容。   |
| allow-forms          | 允许表单提交。                                 |
| allow-scripts        | 允许脚本执行。                                 |

（3）并行加载脚本

2.<iframe>缺点：

（1）iframe会阻塞主页面的Onload事件；

及时触发 window 的 onload 事件是非常重要的。onload 事件触发使浏览器的 “忙” 指示器停止，告诉用户当前网页已经加载完毕。当 onload 事件加载延迟后，它给用户的感觉就是这个网页非常慢。window 的 onload 事件需要在所有 iframe 加载完毕后(包含里面的元素)才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。

（2）即时内容为空，加载也需要时间

（3）没有语意

