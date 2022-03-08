### 前言

在学习命令之前先学习我们该如何去学习linux 命令。

几乎每一个命令都有参数，每个参数的含义是什么，我们一般也不是全部都能记住，所以我们必须有一个可以知道每一个命令下各个参数的含义的方法。

命令 --help 这个就是查询每一个命令的使用方式和各个参数的使用说明。

举例：mkdir --help

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505203020529-1479971610.png)

我们可以看到显示的信息对mkdir 做了说明，对-p -m -v -z 这几个参数也一一做了说明。

### 1. 文件和目录

cd 打开文件夹的命令，通过cd命令我们可以自由的操作文件的切换。

cd /home         打开home文件夹

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505195947434-2007551927.png)

cd ..             打开上级目录

cd ../..           打开上上级目录

cd ~             打开自己的主目录

cd -             打开上次访问的目录

 

ls 是查看当前目录下的文件夹和文件的情况。

ls               查看当前目录下的文件夹和文件  

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505201045363-748951447.png)

ls -l (ll)           查看当前目录下的文件夹和文件的详细信息。 ll 是ls -l 的简写

ls -a             查看当前目录下的文件夹和文件包含隐藏文件

ls -lh             查看当前目录下的文件夹和文件并且带上文件的大小信息

ls *[j]*            查看当前目录下的带j的文件夹及文件夹里面的内容

 

pwd 显示当前目录的全路径。

 

du -sh *    显示当前目录下的各个文件和文件夹的大小

![img](https://img2020.cnblogs.com/blog/1671444/202009/1671444-20200914090225096-1733267493.png)

 

mkdir 创建文件夹。

mkdir xxx         创建一个叫xxx的文件夹

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505203318181-553567084.png)

 

mkdir -p xxx/xxx    创建xxx文件和xxx文件里面的xxx文件

mkdir bbb ccc      创建bbb和ccc两个文件夹

 

touch 用于创建文件。

touch bbb.txt       创建一个bbb.txt文件

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505204928825-2013339121.png)

 

vi 用于编辑文件内容，vi 等同于 vim.

vi bbb.txt          进入文件bbb.txt,默认不能修改。 修改需要按下键盘“i”字母

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505205215992-698343422.png)

文件底部会出现INSERT, 这个时候就表示可以输入内容了。

i               在vi下表示进入编辑状态。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505205330515-1961575505.png)

输入信息后，先按Esc推出编辑模式，然后输入“:wq” 表示保存并退出。

:wq            表示保存并退出

:q              表示直接退出

:q!             表示强行退出

:set fileencoding=utf-8   设置文件编码为utf-8(文件内容不会变化)

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505205514285-1924331106.png)

这个时候再使用vi查看，就可以看到我们输入的信息了。vi命令是我们最常用的命令，vi 下还包含大量快速操作文本的命令，有需要的自学。^-^！

 

rm 用于删除文件和文件夹。

rm aaa.txt        表述删除文件aaa.txt。 这个命令会给出一个提示是否需要删除，选择y就是删除，选择n 就是不删除

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505210136763-2100681310.png)

rm -f bbb.txt       -f 参数表示删除文件的意思，这个时候删除就不会有提示，直接删除

rm -rf aaa        -rf参数表示删除文件夹及文件夹里面的全部内容

rmdir bbb         表示删除文件夹，文件里面不能包含内容。

rm -rf *           删除当前目录下的全部文件和文件夹

 

mv 移动文件或文件夹，还有修改文件名的功能。

mv aaa.txt aaa     表示移动文件aaa.txt 到目录aaa下面。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505212406525-2023642705.png)

mv bbbb aaa     表示将bbbb文件夹移动到aaa下面。

mv aaa.txt bbb.txt    表示将文件aaa.txt改名成bbb.txt

 

cp 复制文件夹或者文件信息

cp aaa.txt bbb.txt  复制文件aaa.txt 的内容到bbb.txt,当bbb.txt 不存在的时候的会创建一个。存在会覆盖，覆盖会有提示。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505212010297-117882291.png)

cp -a /home/bbbb /home/aaa/    复制文件夹到另外一个文件夹

 

cat 命令用于连接文件并打印到标准输出设备上。

cat aaa.txt         查询aaa.txt 文件内容，打印到输出设备上

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505214751403-1785952126.png)

cat -n aaa.txt       给输出信息编上行号。

 

tail 命令可用于查看文件的内容，有一个常用的参数 -f 常用于查阅正在改变的日志文件。

tail aaa.txt         显示文件尾部10行信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505215946579-516873461.png)

tail -f aaa.txt       显示文件尾部10行信息，并且不断更新信息，适合查询程序运行中日志的打印情况，Ctrl + c 退出文件显示

tail -f -n20 aaa.txt   显示文件尾部20行信息，并且不断更新信息，适合查询程序运行中日志的打印情况，Ctrl + c 退出文件显示

 

find 命令用来在指定目录下查找文件。

find . -name "*.txt"    将目前目录及其子目录下所有扩展名是 txt 的文件列出来

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200505220311924-1819091528.png)

find . -name "aaa.txt"  将目前目录及其子目录下所有aaa.txt的文件列出

find /home/aaa/ -name "aaa.txt"  将指定目录及其子目录下所有aaa.txt的文件列出

find / -user jar       将根目录下属于用户jar的文件全部列出

find . -ctime -20      将目前目录及其子目录下所有最近 20 天内更新过的文件列出

 

file 该命令用于辨识文件类型 

file aaa.txt         查看aaa.txt的文件的编码，文件类型。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508161136532-1930299159.png)

 

iconv 该命令用于转换指定文件的编码,默认输出到标准输出设备,亦可指定输出文件。

iconv -f utf-8 -t gb2312 aaa.txt >bbb.txt      将aaa.txt文件内容复制到bbb.txt中并且将编码从utf-8改成gb2312

 

### 2. 用户、组

/etc/group　　存储当前系统中的用户组信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506211621010-1270393496.png)

注意：　　

　　　　1.当该组内只有一个用户，并且用户名和组名相同时，在组列表中，包含用户一列可以为空

　　　　2.系统中root分组的组编号一定为0

　　　　3.组号1~499为系统预留的组编号，一般是预留给系统安装的软件或者服务的编号，越早安装的软件或者服务的组编号约早。用户手动创建的用户组编号从500开始

　　　　4.组密码占位符，无一例外，全部用x表示

 

/etc/gshadow　　存储当前系统中用户组的密码信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506211756929-739083548.png)

注意：

　　　　1.如果组密码处为“*” “！”或者为空时候，则该组没有密码

　　　　2.如果组管理者为空，则表示该组内所有成员都可以管理该组

 

/etc/passwd　　存储当前系统中所有的用户信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506211913296-519499513.png)

 

/etc/shadow　　存储当前系统中所有用户的密码信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506212317769-2111194316.png)

 

useradd 创建用户。

useradd hu         创建一个名叫hu的用户

​       在下面两个地方可以看到我们的创建信息

​       1.会在/etc/passwd文件中添加xxx用户的信息

　　　　2.会在/etc/group文件中添加一个名为xxx的用户组信息

useradd -d /home/helloworld hu   创建用户和用户的home目录

useradd -m hello    创建用户和home文件夹，文件夹在当前路径下新建

useradd -g root hello 创建用户hello，并为其分配已经存在的组

 

usermod 修改用户信息。

usermod -l huu hu     将hu用户的名字修改成huu

usermod -u 888 huu    修改huu用户的id

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506203116680-1018822414.png)

usermod -d aaa huu    修改用户huu的home目录

usermod -g root huu    修改用户的主用户组

 

userdel 删除用户信息。

userdel hu1           删除用户信息

​                    在/etc/passwd文件中就看不到hu1用户的信息

userdel -r huu         删除用户信息及用户的home目录信息

 

groupadd 创建一个用户组。

groupadd hu          创建一个用户组hu

 

groupmod 修改用户组信息。

groupmod -n hu4 hu   修改用户组hu3成hu4

​    

groupdel 删除用户组信息。

groupdel hu4         删除用户组hu4

 

chgrp 修改所属用户组信息。

chgrp hello hu        将文件夹hu的所属用户组改成hello

 

chown 修改文件或者文件夹的所属用户和用户组信息

chown hu2:hu2 hu     将文件夹hu的所属用户和用户组改成hu2

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506210229836-2144061848.png)

chown hello hu       将文件夹hu的所属用户改成hello

 

su 切换用户

su hu               切换成hu用户

 

### 3. 权限

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506211344727-2029589069.png)

如图所示：

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506211423207-1584248422.png)

文档类型说明：

​       d - 目录，例如上表档名为『.gconf』的那一行；
　　　　- - 文档，例如上表档名为『install.log』那一行；
　　　　l  - 连结档(link file)；
　　　　b - 装置文件里面的可供储存的接口设备(可随机存取装置)；
　　　　c - 装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。

　　权限由rwx三个字幕表示，分别表示为可读、可写、可执行，如果没有该权限，则用“ - ”表示，**对于目录来说，必须有x权限，否则无法读取目录内容**

　　如果文件名前面有“ . ”,则表示这个文档或目录是隐藏的

 

chmod 修改文件或者文件夹权限。

chmod 777 hello       修改文件夹hello的权限，改成最大权限

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506212511219-84022181.png)

rwxst   r 读权限； w 写权限； x 可执行权限； s 执行文件时，拥有该文件所有者的权限； t 临时拥有权限可读可写，但是都只能操作自己的文件，不能操作别人的文件。

-rw------- (600) -- 只有属主有读写权限。

-rw-r--r-- (644) -- 只有属主有读写权限；而属组用户和其他用户只有读权限。

-rwx------ (700) -- 只有属主有读、写、执行权限。

-rwxr-xr-x (755) -- 属主有读、写、执行权限；而属组用户和其他用户只有读、执行权限。

-rwx--x--x (711) -- 属主有读、写、执行权限；而属组用户和其他用户只有执行权限。

-rw-rw-rw- (666) -- 所有用户都有文件读、写权限。这种做法不可取。

-rwxrwxrwx (777) -- 所有用户都有读、写、执行权限。更不可取的做法。

操作权限的另外一种方式：

chmod u+w hello        给文件或者文件夹所属用户加上w权限

chmod g-r hello         给文件或者文件夹所属用户组去掉r权限

chmod a+x hello        给用户，组，其他都加上x权限

 

root 用户之所以可以再任何地方执行任何文件，就是/etc/sudoers 文件配置的。

/etc/sudoers

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200506221436071-1398059319.png)

上图可以看到有好几种设置权限的地方。

 



### 4. 进程、端口

执行 top 命令会显示下图信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200507203812351-485754676.png)

PID          进程号

USER        进程所属用户信息

PR           piriority，优先级，数字越小越优先被执行

NI           nice，与priority相关，也是数字越小越先被执行

VIRT         占用虚拟内存的总量

RES         进程占用的物理内存

SHR         共享内存大小

S            进程状态 R 运行状态、S 睡眠状态、D 不可中断的睡眠状态、T 暂停状态、Z 退出状态，僵死进程、X 退出状态，进程即将被销毁

%CPU        CUP使用占比

%MEM       内存使用占比

TIME+        进程累计使用cpu进行运算的时间

COMMAND    进程名称

 

ps 命令用于显示当前进程 (process) 的状态。

ps -ef                 查看全部进程情况（信息全）

ps -aux                与ps -ef 效果差不多

ps -axjfc               查看全部进程情况，进程名显示简称

ps aux | grep tomcat     查询用户tomcat使用的全部进程情况

 

top 展示系统的当前状态以及进程信息，并且定时刷新.

top -p 21481           查询PID 等于 21481的进程详情

top -H -p 21481         查询PID 等于 21481的全部线程程详情

top -u jar              查询用户为jar的进程详情

因为top命令显示的是动态结果：我们就会存在如下需求，能不能显示结果按照内存大小排序，按照CUP使用情况排序等。

以下是交互命令：

按“h”或者“？”,会显示帮助，如下

 ![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200507225430107-268686219.png)

Z:改变颜色；B：加粗

t:显示和隐藏任务/cpu信息；m:内存信息

1：监控每个逻辑CPU的状况；

f:进入字段显示配置模式，可增加或者移除显示字段，按相应的字母新增或去除；o:进入字段顺序设置模式，可配置显示位置顺序，按相应的字母往下移动，按“shift+相应的字母”往上移动     ---------常用

F：进入字段排序配置模式，可设置排序的字段；

R:正常排序/反向排序；

s：设置刷新的时间--------常用

u：输入用户，显示用户的任务

i：忽略闲置和僵死进程。这是一个开关式命令。

r:重新安排一个进程的优先级别。系统提示用户输入需要改变的进程PID以及需要设置的进程优先级值。输入一个正值将使优先级降低，反之则可以使该进程拥有更高的优先权。默认值是10。

c:切换显示命令名称和完整命令行。

M:根据驻留内存大小进行排序。-------------常用

P:根据CPU使用百分比大小进行排序。-----------常用

H:显示线程

 

kill 该命令用于删除执行中的程序或工作.

kill 123456             杀死PID为123456的进程

kill -KILL 123456        强制杀死PID为123456的进程

kill -9 123456           彻底杀死PID为123456的进程      

 

ss 该命令可以用来获取socket统计信息。

ss -napt | grep 18910     通过进程号，查询使用的端口号

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508170655355-1096488579.png)

 

图中8080就是进程18910使用的端口号。

ss -lntpd | grep :8080    通过端口号查询进程号信息

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508171022224-745104662.png)

图中18910就是端口8080使用的进程号。

 

netstat 因为已经全面被ss 命令替代，故这里直接跳过。

 

grep 命令用于查找文件里符合条件的字符串，经过配合其他命令一起使用，单独使用较少。

grep jj *txt                        查询后缀为txt文件中出现jj的行信息并且打印到控制台。

grep -n '2019-10-24 00:01:11' *.log    查询后缀为log文件中出现'2019-10-24 00:01:11' 的行信息，带行号并且打印到控制台。

grep -e '^j' *.txt                    -e 是正则表达式查询信息，^j  是首字母为j的意思。

 



### 5. 在线软件下载安装和删除

yum（ Yellow dog Updater, Modified）是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。

yum list | grep zip                 查询当前系统是否已经安装zip

yum install zip                    安装zip,执行完该命令侯，zip命令就可以使用了，我们可以通过zip压缩文件

yum update zip                   更新软件包

yum remove zip                   卸载zip

 

### 6. 打包、解包

tar 该命令用于备份文件。

tar cvf aaa.tar aaa.txt              将aaa.txt 打包进aaa.tar 中

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200509170837648-619861564.png)

tar cvf aaa.tar bbb.txt aaa.txt        将多个文件打包进aaa.tar 中

tar tvf aaa.tar                   列出aaa.tar包中的文件信息

tar xvf aaa.tar                   解压aaa.tar包中文件到当前目录下

tar xvf aaa.tar -C dddd            解压到指定目录dddd下

 

文件后缀为.tar.gz，在linux 中更加常见。

tar zcvf aaa.tar.gz aaa.txt          将aaa.txt 打包进aaa.tar.gz 中

tar zcvf aaa.tar.gz bbb.txt aaa.txt       将多个文件打包进aaa.tar 中

tar ztvf aaa.tar.gz                    列出aaa.tar包中的文件信息

tar zxvf aaa.tar.gz                    解压aaa.tar包中文件到当前目录下

tar zxvf aaa.tar.gz -C dddd            解压到指定目录dddd下

 

zip 该命令用于压缩文件。

zip -q -r dddd.zip /home/dddd/         压缩dddd文件夹到dddd.zip中

zip -q -r dddd.zip *                  压缩当前文件夹的全部内容到dddd.zip中

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200509213212470-583523354.png)

 

unzip 命令用于解压缩zip文件。

unzip dddd.zip                    解压dddd.zip将文件放到当前目录

unzip -l dddd.zip                  查看压缩包里面的文件列表

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200509213738355-2104793875.png)

unzip dddd.zip -d ee              解压文件到指定目录ee下面，这个路径也可以是绝对路径

 



### 7. 远程协议登录

ssh 远程登录协议。

ssh -l root 149.225.47.23            linux服务中远程连接ip为149.225.47.23 服务器，root是用户，后面还会让你输入密码，输入正确密码即可，退出通过exit 命令即可

免密登录设置：

ssh-keygen -t rsa                  生成秘钥，按多次回车直到秘钥生成

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200510205544568-1673750479.png)

ssh-copy-id 149.225.47.23          连接远程机器，第一次需要输入密码， 再次使用命令（ssh -l root 149.225.47.23） 就可以直接登录，不需要密码了

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200510205816940-305203419.png)

进入“.ssh”会生成以下几个文件

　　![img](https://images2017.cnblogs.com/blog/1297156/201712/1297156-20171221145533365-2034795118.png)

　　authorized_keys:存放远程免密登录的公钥,主要通过这个文件记录多台机器的公钥

　　　　id_rsa : 生成的私钥文件

　　　　id_rsa.pub ： 生成的公钥文件

　　　　know_hosts : 已知的主机公钥清单

　　　　如果希望ssh公钥生效需满足至少下面两个条件：

　　　　　　1) .ssh目录的权限必须是700 

　　　　　　2) .ssh/authorized_keys文件权限必须是600

 

scp 命令用于 Linux 之间复制文件和目录。

scp id_rsa.pub root@149.225.47.23:/root/.ssh/authorized_keys        将本系统文件id_rsa.pub，复制到 root@149.225.47.23:/root/.ssh/authorized_keys下面

scp id_rsa.pub 49.235.147.233:/root/.ssh/authorized_keys            复制文件还可以简单的使用这个命令

scp -r .ssh 49.235.147.233:/root/                                 加-r 复制整个文件夹。

 



### 8. 其他常用命令

\> test.log         清空文件内容

 

sh 是shell命令语言解释器，执行命令从标准输入读取或从一个文件中读取. （简单的说是执行可执行文件使用）。

sh d.sh                   执行d.sh 文件

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508190620104-1376395150.png)

文件里面就写了一句：

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508190706888-1998409122.png)

重点说明：当文件没有执行权限我们才用sh。 有执行权限我们可以通过./ 来执行

./d.sh                   执行d.sh 文件

 

date 用于显示和修改时间的命令

date                  显示系统日期

date '+%Y-%m-%d %H:%M:%S'    显示我们习惯的日期显示方式

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508192116439-1758606343.png)

date '+%Y-%m-%d %H:%M:%S %A'    显示我们习惯的日期显示方式加上星期的显示

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508192600508-216332902.png)

date '+%Y-%m-%d %X %A %Z'       也可以显示时间

date -s 05/08/20                    修改系统年月日

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200508194643442-168241210.png)

date -s '2020-05-07 09:09:09'         修改系统年月日时分秒

 

ntpdate 同步时间命令。

ntpdate -u ntp.ntsc.ac.cn             同步时间与国家授时中心时间对齐（对齐时间之前需要先确认你的时区设置是否有问题） 

 

hostname 显示主机名。

hostname myzjm                  修改主机名，重启无效

 

set 查看当前进程中的变量。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200512203617787-461606970.png)

 

clear 该命令用于清除屏幕。

 

locale  查询linux系统编码

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200529174732009-1053810205.png)

export LANG=en_US.UTF-8    修改linux系统编码

 

rz 上传命令 一般默认没有，需要下载安装（yum install -y lrzsz）

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200527111752744-1836812571.png)

选择文件上传即可。

rz -y              上传的文件覆盖已有文件

rz -b               使用二进制传输

 

sz 下载命令 一般默认没有，需要下载安装（yum install -y lrzsz）

sz 新建文本文档.txt      下载新建文本文档.txt 到你的电脑。

![img](https://img2020.cnblogs.com/blog/1671444/202005/1671444-20200527113841615-1745689658.png)

sz -b 新建文本文档.txt      使用二进制传输下载。

 

ping 网络主机发送ICMP回传请求

ping baidu.com           一直请求和接收反馈信息。

![img](https://img2020.cnblogs.com/blog/1671444/202006/1671444-20200615172805627-1282729829.png)

ping -c 5 baidu.com        5次请求和接收反馈信息。

 

which 在环境变量$PATH设置的目录里查找符合条件的文件

which mysqld             在环境变量$PATH设置的目录里查找mysqld 文件。

![img](https://img2020.cnblogs.com/blog/1671444/202006/1671444-20200625113943089-1263007013.png)

 

ifconfig -a    查询linux ip地址。

![img](https://img2020.cnblogs.com/blog/1671444/202008/1671444-20200820152526412-1925467493.png)

 

scp -P 55255 root@10.23.185.16:/usr/local/xxx.jar /usr/local/xxx.jar   -- 55255 表示端口，如果是22端口可以不写，root是用户。

![img](https://img2020.cnblogs.com/blog/1671444/202009/1671444-20200901215850307-2103806182.png)

输入密码即可。

 

ln -s /usr/local/mysql/mysql-5.7.22-linux-glibc2.12-x86_64/bin/mysql /usr/bin   -- 建立软链接，就相当于windows 的创建快捷方式

 

passwd 用户名  -- 登入root用户，修改其他用户的密码。

![img](https://img2020.cnblogs.com/blog/1671444/202009/1671444-20200909092846348-340150410.png)