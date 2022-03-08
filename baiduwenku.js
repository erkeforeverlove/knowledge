// ==UserScript==
// @name         全网VIP视频免费破解去广告；【百度文库破解】内容复制|文档下载；知乎视频下载；YouTube油管播放助手
// @namespace    fengdiansanren_video_text_helper
// @version      2.0.8
// @description  常用功能专属集合: 一、百度文库文档内容自由复制，文档免费下载；二、一键破解：爱奇艺|腾讯视频|优酷|芒果TV等VIP特权或会员视频，普通视频去广告高速播放，解析接口贵在稳定够用。支持：Tampermonkey|Violentmonkey|Greasymonkey，版本4.0+以上最佳（每个网站解析按钮位置可自定义，避免遮挡）；三、爱奇艺、优酷、腾讯视频原网站广告过滤； 四、为知乎的视频播放器添加下载功能；五、YouTube油管自动跳广告，自动打开翻译字幕，如果打开失败，请手动点击一下字幕按钮。;六、服务器活动集锦 
// @author       人鬼情未了、王超、crud-boy
// @copyright    人鬼情未了, 王超 、crud-boy
// @include      *://wenku.baidu.com/*
// @include      https://*.youku.com/v_*
// @include      https://*.youku.com/alipay_*
// @include      https://*.iqiyi.com/v_*
// @include      https://*.iqiyi.com/w_*
// @include      https://*.iqiyi.com/a_*
// @include      https://*.le.com/ptv/vplay/*
// @include      https://v.qq.com/x/cover/*
// @include      https://v.qq.com/x/page/*
// @include      https://*.tudou.com/listplay/*
// @include      https://*.tudou.com/albumplay/*
// @include      https://*.tudou.com/programs/view/*
// @include      https://*.mgtv.com/b/*
// @include      https://film.sohu.com/album/*
// @include      https://tv.sohu.com/v/*
// @include      https://*.baofeng.com/play/*
// @include      https://vip.pptv.com/show/*
// @include      https://v.pptv.com/show/*
// @include      *://www.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *://video.zhihu.com/video/*
// @include      *://www.youtube.com/watch?v=*
// @include      *://www.aliyun.com**
// @include      *://cloud.tencent.com** 
// @include      *://www.hostwinds.com**
// @include      *://www.west.cn**
// @include      *://bandwagonhost.com**
// @include      *://www.vultr.com**
// @connect      zhihu.com
// @connect      vzuu.com
// @require      https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.2.1/jquery.min.js
// @grant        GM_info
// @grant        GM_download
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @run-at       document-end
// @license      GPL License
// ==/UserScript==

(function() {
	'use strict';	

    var window_url = window.location.href;
    var website_host = window.location.host;
	if(window.top != window.self){
    	return;
    }
	
	/****
	视频解析部分代码借鉴自：
		脚本：https://greasyfork.org/zh-CN/scripts/418804
		作者：爱画画的猫
		
		脚本：https://greasyfork.org/zh-CN/scripts/390952
		作者：橘子爱哭
	
		已经分别联系过原作者，并获得了原作者的同意，代码版权归原作者所有
	**/
	const fengdiansanren_object={};
	fengdiansanren_object.defaultSourceArray=[
		{"name":"纯净/B站","category":"1","url":"https://z1.m1907.cn/?jx="},
		{"name":"综合/B站1","category":"1","url":"https://vip.parwix.com:4433/player/?url="},
		{"name":"高速接口","category":"1","url":"https://jsap.attakids.com/?url="},
		{"name":"OK解析","category":"1","url":"https://okjx.cc/?url="},
		{"name":"乐多资源","category":"1","url":"https://api.leduotv.com/wp-api/ifr.php?isDp=1&vid="},
		{"name":"诺诺","category":"1","url":"https://www.ckmov.com/?url="},
		{"name":"虾米","category":"1","url":"https://jx.xmflv.com/?url="},
		{"name":"全民","category":"1","url":"https://jx.quanmingjiexi.com/?url="},
		{"name":"M3U8.TV","category":"1","url":"https://jx.m3u8.tv/jiexi/?url="},
		{"name":"人人迷","category":"1","url":"https://jx.blbo.cc:4433/?url="},
		{"name":"七哥","category":"1","url":"https://jx.mmkv.cn/tv.php?url="},
		{"name":"冰豆","category":"1","url":"https://api.qianqi.net/vip/?url="},
		{"name":"迪奥","category":"1","url":"https://123.1dior.cn/?url="},
		{"name":"CK","category":"1","url":"https://www.ckplayer.vip/jiexi/?url="},
		{"name":"LE","category":"1","url":"https://lecurl.cn/?url="},
		{"name":"ckmov","category":"1","url":"https://www.ckmov.vip/api.php?url="},
		{"name":"ccyjjd","category":"1","url":"https://ckmov.ccyjjd.com/ckmov/?url="},
		{"name":"RDHK","category":"1","url":"https://jx.rdhk.net/?v="},
		{"name":"爱豆","category":"1","url":"https://jx.aidouer.net/?url="},
		{"name":"H8","category":"1","url":"https://www.h8jx.com/jiexi.php?url="},
		{"name":"BL","category":"1","url":"https://vip.bljiex.com/?v="},
		{"name":"解析la","category":"1","url":"https://api.jiexi.la/?url="},
		{"name":"MUTV","category":"1","url":"https://jiexi.janan.net/jiexi/?url="},
		{"name":"MAO","category":"1","url":"https://www.mtosz.com/m3u8.php?url="},
		{"name":"老板","category":"1","url":"https://vip.laobandq.com/jiexi.php?url="},
		{"name":"盘古","category":"1","url":"https://www.pangujiexi.cc/jiexi.php?url="},
		{"name":"盖世","category":"1","url":"https://www.gai4.com/?url="},
		{"name":"小蒋","category":"1","url":"https://www.kpezp.cn/jlexi.php?url="},
		{"name":"YiTV","category":"1","url":"https://jiexi.us/?url="},
		{"name":"星空","category":"1","url":"http://60jx.com/?url="},
		{"name":"0523","category":"1","url":"https://go.yh0523.cn/y.cy?url="},
		{"name":"17云","category":"1","url":"https://www.1717yun.com/jx/ty.php?url="},
		{"name":"4K","category":"1","url":"https://jx.4kdv.com/?url="},
		{"name":"云析","category":"1","url":"https://jx.yparse.com/index.php?url="},
		{"name":"8090","category":"1","url":"https://www.8090g.cn/?url="},
		{"name":"江湖","category":"1","url":"https://api.jhdyw.vip/?url="},
		{"name":"诺讯","category":"1","url":"https://www.nxflv.com/?url="},
		{"name":"PM","category":"1","url":"https://www.playm3u8.cn/jiexi.php?url="},
		{"name":"奇米","category":"1","url":"https://qimihe.com/?url="},
		{"name":"思云","category":"1","url":"https://jx.ap2p.cn/?url="},
		{"name":"听乐","category":"1","url":"https://jx.dj6u.com/?url="},
		{"name":"aijx","category":"1","url":"https://jiexi.t7g.cn/?url="},
		{"name":"夜幕","category":"1","url":"https://www.yemu.xyz/?url="},
		{"name":"52","category":"1","url":"https://vip.52jiexi.top/?url="},
		{"name":"黑米","category":"1","url":"https://www.myxin.top/jx/api/?url="},
		{"name":"豪华啦","category":"1","url":"https://api.lhh.la/vip/?url="},
		{"name":"凉城","category":"1","url":"https://jx.mw0.cc/?url="},
		{"name":"33t","category":"1","url":"https://www.33tn.cn/?url="},
		{"name":"180","category":"1","url":"https://jx.000180.top/jx/?url="},
		{"name":"无名","category":"1","url":"https://www.administratorw.com/video.php?url="},
		{"name":"黑云","category":"1","url":"https://jiexi.380k.com/?url="},
		{"name":"九八","category":"1","url":"https://jx.youyitv.com/?url="},
	];
	fengdiansanren_object.iframePlayerNodes = [
		{ url:"v.qq.com", node:"#mod_player"},
		{ url:"www.iqiyi.com", node:"#flashbox"},
		{ url:"v.youku.com", node:"#player"},
		{ url:"w.mgtv.com", node:"#mgtv-player-wrap"},
		{ url:"www.mgtv.com", node:"#mgtv-player-wrap"},
		{ url:"tv.sohu.com", node:"#player"},
		{ url:"film.sohu.com", node:"#playerWrap"},
		{ url:"www.le.com", node:"#le_playbox"},
		{ url:"video.tudou.com", node:".td-playbox"},
		{ url:"v.pptv.com", node:"#pptv_playpage_box"},
		{ url:"vip.pptv.com", node:".w-video"},
		{ url:"www.wasu.cn", node:"#flashContent"},
		{ url:"www.acfun.cn", node:"#ACPlayer"},
		{ url:"vip.1905.com", node:"#player"},
		{url:"play.tudou.com",node:"#player"},
		{url:"www.bilibili.com/video",node:"#bilibiliPlayer"},
		{url:"www.bilibili.com/bangumi",node:"#player_module"},
	];
	fengdiansanren_object.isRun=function(){
		var host = window.location.host;
		var videoWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com","acfun.cn","baofeng.com","pptv.com"];
		for(var b=0; b<videoWebsites.length; b++){
			if(host.indexOf(videoWebsites[b]) != -1){
				return true;
			}
		}
		return false;
	};
	fengdiansanren_object.getWebsiteName=function(){
		var name="other";
		if(website_host.indexOf("iqiyi.com")!=-1){
			name="iqiyi";
		}else if(website_host.indexOf("qq.com")!=-1){
			name="qq";
		}else if(website_host.indexOf("youku.com")!=-1){
			name="youku";
		}else if(website_host.indexOf("mgtv.com")!=-1){
			name="mgtv";
		}else if(website_host.indexOf("tudou.com")!=-1){
			name="tudou";
		}else if(website_host.indexOf("sohu.com")!=-1){
			name="sohu";
		}
		return name;
	};
	fengdiansanren_object.generateHtmlAndEvent = function(){
		var left=0;
		var top=300;
		//初始化位置信息
		var playerBoxPosition = GM_getValue("playerBoxPosition_"+this.getWebsiteName());
		if(!!playerBoxPosition){
			left=playerBoxPosition.left;
			top=playerBoxPosition.top;
		}
		var css = "#fengdiansanren_objectvideo_player_box{position:fixed; top:"+top+"px; left:"+left+"px; z-index:999; width:25px;background-color:red;};"
			css += "#fengdiansanren_objectvideo_player_box>div{width:100%; height:20px;}";
			css += "#fengdiansanren_objectvideo_player_box>div>img{width:90%;}";
			css += "#fengdiansanren_objectvideo_player_jump{cursor:pointer;text-align:center;padding-top:5px;}";
			css += "#fengdiansanren_objectvideo_player_box_move{cursor:move;margin-top:5px;text-align:center;padding:5px 0px;}";
			
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box_outer{display:none;position:absolute;top:-60px;left:25px;padding:5px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box{width:300px;height:350px;background-color:rgba(241,241,241,0.8);overflow-y:auto;border-radius:4px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar{width:5px; height:1px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar-thumb{border-radius: 4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#A8A8A8;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar-track{border-radius: 4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#F1F1F1;}";
			
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span{border-radius:3px;border-top:3px solid red; border-bottom:3px solid red;display:inline-block;width:calc(25% - 6px);width:-moz-calc(25% - 6px);width: -webkit-calc(25% - 6px);height:20px;line-height:20px;background-color:red;color:#FFF;cursor:pointer;margin:3px;text-align:center;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow:ellipsis;font-size:12px!important;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span:hover{border-top:3px solid #FFF; border-bottom:3px solid #FFF;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span.hover-mark{border-top:3px solid #FFF; border-bottom:3px solid #FFF;}";
		$("head").append("<style>"+css+"</style>")
		
		
		var interfaceHtml = "";
		for(var i=0; i<this.defaultSourceArray.length; i++){
			var obj = this.defaultSourceArray[i];
			interfaceHtml += "<span data-url='"+obj.url+"'>"+obj.name+"</span>";
		}
		
		var moveImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADjUlEQVRoQ+2YTYiVVRjHf38ESQXXVhsHl4IIJRpumsGFWo2jtZnGtrqSMTC36SYQg/ADomiVXxs/SvyghTqroahAW7QbdJNKmyAwR0QfeeC5cubl3vuemXve5A73rO573/Oe8/+d85zn44g+b+pz/QwAXvUODnZg0e6AmU0CXwLPgQ2S/mgCthETMrONwC1gWYh+BGyR9HNpiOIAZjYMnAFer4h9CExIulkSoiiAmb0HnAVWdhD5b0BcKQVRDMDMtgOXgSUh7j9gefx+nJjTM+AjST+UgCgJ4Db/boiaBc4Du+P5tIsGXovnKUluaj23kgATgAu9B3wKrAc+D4WHgTvASeANB5Pk56TnVgzAlZjZakkO4L8PpQCS/HlOn57VQ3O5UCeAEqLTMYruQDrwYgD4BPg+oIYlTZVefR+vsR0Ie98G/C3p9ybEzwsg/PxnwHelPEgVysz2AOPAUUnXcqCzdiAi7I9JkBpqeZucSXL6uAcD7kZfD3Y7JF2t+7YWIHIbj5qt9OCepKG6gRfy3swcwEG8edoxJskDZMfWFSCyyktJYuYRdjwnDTCzncCB2LVJSb/UQZnZGHAuidgPgJ3dvu0IYGbrgGlgRUzsuc1FYKYixNOCOR7GzPYBxyv91kr6s+Jq3eY9MqdtDbAryaN83gOSvm63AN0AngBL61Yt3r+dehoz87zfa4K0/SRpa+sPMxsF/FzltKeS2mopBbBd0vVEXDuAaUmbkz6e+HW174RsVlKrOJoD3A1gP/BFkgZ7SnyhjQnNSDpVMY2DwJHK0u6S5OfpZTOzt4AP2pjQh8m8bkLvdCpJ6w7xJsAnXRWT+CH+uCqkagNm5qv7foj7xys0SSfqbCUOvhdErbTbqzg/xB1L0Rw3OhIQLTd6X9KbdWIW8t7M/koOtbtRF9+1BK0FcCFm5qvpsaBVbf0fgcxjQG3pmQUQEO6j/arknKRvF7LCdd8kqcSxnFjj42UD1E3e7n2chZWSvFZupDUGEB7mt1C9t6ldaxKgbUlZehsGAJXA1L9FfXiQb7pcq9wGvop0udiZKGZCZtb3F1vdrhbTa0avtkZzS8a6Q19sByLY5Vzuei5VWyrWCW+9LwoQEJ2u17268uv13BQ6i6E4QEB4MXOjUs2N5JSVWaqTTo0ABISXpL9GuuI1cduScL6Cq/0bA+hVWO73A4DclWqq32AHmlrZ3HH7fgdeAL7GSUBqsOkSAAAAAElFTkSuQmCC";
		var playerImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABtklEQVRoQ+2YTytFQRjGn+czKBtbK7u79jl8CFtLK3auhYWFJEmS5EY3KQtlIZIotyRJkhQLIUWRbkdT79RZUHf+n1Nz1jPz/n7vM9OZc4iaP6w5P7JA6gRzAjkBxw7kLeTYQOfpxgkURTECYBzAAIB1AFMkH51JLBewEbgBMFiqdycSC5YMTtNsBIp/Km6LyLETkeFknwKqdFdJiMiHIYvVcN8CGqIDoElSnZGgTygBDb0qaVyGsggtoLjfRGI6hEQMAc19ICK7PkViCmjuORF58CGSQkBx34vEvKtEKgHNvSMiR7YiqQUUt3oxNkXk3VSkCgKa+UIk1kwkqiSguSdJTvQqUUWBV5J9dRbokGzUVeAFwCjJVh0FVuQQX/UKr8ZV4QycC/iGCbgem1LgR74d1LX70wY+ZQJt6fqJLXiqBG4FfNEVPIXArMA/+YKPtYX2BXzPJ3iMBJ4FfCYEeGiBZYG/DgkfYgudCfhmaHDfCXyX/gd9xYK3TeAQwHAJcku6fhoT3CWBIQBjAPoBtEkupQC3FkgJ+1dt47tQFvDcgZyA54YaL5cTMG6Z5wk5Ac8NNV7uF+15tDGwBHN+AAAAAElFTkSuQmCC";
		var html = "<div id='fengdiansanren_objectvideo_player_box'>"+
					"<div id='fengdiansanren_objectvideo_player_jump' name='跳转到解析'><img src='"+playerImage+"'></div>"+
					"<div id='fengdiansanren_objectvideo_player_box_move' name='移动按钮'><img src='"+moveImage+"'></div>"+
					"<div class='select_interface_box_outer'>"+
					"<div class='select_interface_box'>"+
							interfaceHtml+
						"</div>"+
					"</div>"+
				"</div>";
		$("body").append(html);
		
		//接口显示
		const $playerBox = $("#fengdiansanren_objectvideo_player_box");
		const $playBoxOuter = $("#fengdiansanren_objectvideo_player_box .select_interface_box_outer");
		$playerBox.on("mouseover", () => {$playBoxOuter.show();});
		$playerBox.on("mouseout", () => {$playBoxOuter.hide();});
		
		$("#fengdiansanren_objectvideo_player_jump").on("click", function(){
			var playbackWebsite="https://www.shuoaini.xyz/v/m/s/?sv=7&url="+window_url;
			GM_openInTab(playbackWebsite, {active: true});
		});
		
		//点击接口播放
		const self = this;
		const playIframeId = "play-iframe-8dsdsdsd988771iix1kmd";
		$("body").on("click", "#fengdiansanren_objectvideo_player_box .select_interface_box>span", function(){
			var node = "";
			var iframePlayerNodes = self.iframePlayerNodes;
			for(var m in iframePlayerNodes) {
				var playUrl = window.location.href;
				if(playUrl.indexOf(iframePlayerNodes[m].url)!= -1){
					node = iframePlayerNodes[m].node;
				}
			}
			$("#fengdiansanren_objectvideo_player_box .select_interface_box>span").removeClass("hover-mark");
			$(this).addClass("hover-mark");
			
			$("#"+playIframeId).remove();
			var playUrl = window.location.href;
			var playHtml = "<div id='"+playIframeId+"' style='width:100%;height:100%;'><iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='"+playIframeId+"_iframe'></iframe></div>";
			$(node).html(playHtml);
			var iframeSrc= $(this).attr("data-url")+playUrl;
			$("#"+playIframeId+"_iframe").attr("src", iframeSrc);
		});
		
		this.listenerMouse();
	};
	fengdiansanren_object.point={"x":0,"y":0,"l":0,"t":0};
	fengdiansanren_object.isDown=false;
	fengdiansanren_object.$box=null;
	fengdiansanren_object.listenerMouse = function(){
		var that = this;
		
		this.$box = document.getElementById('fengdiansanren_objectvideo_player_box_move');
		this.$box.onmousedown = function(e) {
			//阻止默认事件
			e.preventDefault();
		    e.stopPropagation();
		    //获取x坐标和y坐标
		    that.point.x = e.clientX;
		    that.point.y = e.clientY;
		    //获取左部和顶部的偏移量
		    that.point.l = that.$box.parentNode.offsetLeft;
		    that.point.t = that.$box.parentNode.offsetTop;
		    //开关打开
		    that.isDown = true;
		    //设置样式  
		    that.$box.style.cursor = 'move';
		};
		window.onmousemove = function(e) {
			//阻止默认事件
			e.preventDefault();
			e.stopPropagation();
			if (that.isDown == false) {
				return;
			}
			//获取x和y
			var nx = e.clientX;
			var ny = e.clientY;
			//计算移动后的左偏移量和顶部的偏移量
			var nl = nx - (that.point.x - that.point.l);
			var nt = ny - (that.point.y - that.point.t);
			//更新位置
			that.$box.parentNode.style.left = nl + 'px';
			that.$box.parentNode.style.top = nt + 'px';
			GM_setValue("playerBoxPosition_"+that.getWebsiteName(),{"left":nl, "top":nt})
		}
		fengdiansanren_object.$box.onmouseup = function() {
			//开关关闭
			that.isDown = false;
			that.$box.style.cursor = 'move';
		}
	};
	fengdiansanren_object.removeAD = function(){
		var videoWebsiteADRemove_={};
		videoWebsiteADRemove_.youku=function(){
			
		};
		videoWebsiteADRemove_.iqiyi=function(){
		   
		};
		videoWebsiteADRemove_.qq=function(){

		};
		videoWebsiteADRemove_.start=function(){
			switch (website_host) {
		        case 'v.youku.com':
		            this.youku();
		            break
		        case 'v.qq.com' :
		            this.qq()
		            break
		        case 'www.iqiyi.com' :
		            this.iqiyi()
		            break
		        default :
		            break
		    }
		};
		videoWebsiteADRemove_.start();
	};
	fengdiansanren_object.start=function(){
		if(this.isRun()){
			this.generateHtmlAndEvent();
			this.removeAD();
		}
	};
	fengdiansanren_object.start();
	
	
	/**
	 * 百度文库开始
	 */
	const baiduwenkuHelper_={};
	baiduwenkuHelper_.wenkudownloadUrl = "http://www.tool77.com/tampermonkey/doc/download?docs=10?wenku_url=";
	baiduwenkuHelper_.isRun = function(){
		if(website_host.indexOf("wenku.baidu.com") != -1){
			return true;
		}
		return false;
	};
	baiduwenkuHelper_.removeAD=function(){
		if(website_host.indexOf("wenku.baidu.com") != -1){
		    setInterval(function(){
		    	$(".banner-ad").hide();
		    	$(".union-ad-bottom").hide();
		    	$("iframe").hide();
		    	
		    	//VIP去广告小按钮
		    	$(".ggbtm-vip-close").hide();
		    	$(".ad-vip-close-bottom").hide();
		    	$(".ad-vip-close").hide();
		    	
		    	//搜索页面
		    	$("#fengchaoad").hide();
		    	$(".search-aside-adWrap").hide();
		    },300);
	    }
	};
	baiduwenkuHelper_.generateHtml=function(){
		var $that = this;
		if((window_url.indexOf("wenku.baidu.com/view")==-1 && window_url.indexOf("wenku.baidu.com/link")==-1) 
			|| website_host!="wenku.baidu.com"){
			return;
		}
		var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:150px;left:0px;'>"+
						"<div id='baiduwenku_helper_download_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
				 	 "</div>";
		$("body").append(topBox);
		//解析下载
		$("body").on("click","#baiduwenku_helper_download_btn",function(){
			var wenkuUrl = $that.wenkudownloadUrl+encodeURIComponent(window_url);
			GM_openInTab(wenkuUrl, {active: true });
		});		
	};
	baiduwenkuHelper_.start=function(){
		if(this.isRun()){			
			this.generateHtml();
			this.removeAD();
		}
	};
	baiduwenkuHelper_.start();
	
	var serverNavigation_={};
	serverNavigation_.generateHtml = function(){
		const host = window.location.host
			, randomElementId = "a"+Math.ceil(Math.random()*100000000)+"jjlk";
		var backgroundColor = null;
		var serverPlatform = [
			{"host":"aliyun.com","color":"#ff6a00"},
			{"host":"cloud.tencent.com","color":"#00a4ff"},
			{"host":"huaweicloud.com","color":"#D64A52"},
			{"host":"hostwinds.com","color":"#1ea237"},
			{"host":"west.cn","color":"#ff6000"},
			{"host":"bandwagonhost.com","color":"#C18100"},
			{"host":"www.vultr.com","color":"#007bfc"}
		];
		for(var i=0;i<serverPlatform.length;i++){
			if(host.indexOf(serverPlatform[i].host)!=-1){
				backgroundColor = serverPlatform[i].color;
				break;
			}
		}
		if(backgroundColor==null) return;
		var innnerCss = `
			#`+randomElementId+`{				
				display: block;
				width: 30px;
				border-radius: 24px;
				font-size: 14px;
				color: #fff;
				text-align: center;
				letter-spacing: 4px;
				position:fixed;
				top:150px;
				left:15px;
				height: auto;
				text-decoration: none;
				writing-mode: vertical-rl;
				line-height: 2.2;
				cursor: pointer;
				z-index:9999999999999;
				padding: 10px 0px;
				background-color: `+backgroundColor+`;
			}
		`;
		var innerHTML = "<div target='_blank' id='"+randomElementId+"'>热门服务器厂商活动</div>";
		$("body").prepend("<style>"+innnerCss+"</style>");
		$("body").append(innerHTML);
		$("body").on("click", "#"+randomElementId+"", function(){
			GM_openInTab("https://www.bookmarkearth.com/activity/detail/server", {active:true});
		});
	};
	serverNavigation_.start = function(){
		this.generateHtml();
	};
	serverNavigation_.start();
})();

/**
 * 作者备注：
 * 王超先生的知乎视频下载脚本代码非常精炼，我认为此功能不需要再二次编写了
 * 此部分代码已获得原作者授权同意，并符合MIT协议，请知悉！
 * 
 * 下载知乎视频，作者：王超， 脚本链接：https://greasyfork.org/zh-CN/scripts/39206
 * 版本：1.30
 * 版权归原作者所有
 */
(async () => {
  if (window.location.host == 'www.zhihu.com') return;
 
  const playlistBaseUrl = 'https://lens.zhihu.com/api/v4/videos/';
  // const videoBaseUrl = 'https://video.zhihu.com/video/';
  const videoId = window.location.pathname.split('/').pop(); // 视频id
  const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
  const playerId = 'player';
  const coverSelector = '#' + playerId + ' > div:first-child > div:first-child > div:nth-of-type(2)';
  const controlBarSelector = '#' + playerId + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
  const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
  const player = document.getElementById(playerId);
  // const resolutions = {'普清': 'ld', '标清': 'sd', '高清': 'hd', '超清': 'fhd'};
  const resolutions = [
    {ename: 'ld', cname: '普清'},
    {ename: 'sd', cname: '标清'},
    {ename: 'hd', cname: '高清'},
    {ename: 'fhd', cname: '超清'}
  ];
  let videos = []; // 存储各分辨率的视频信息
 
  function fetchRetry (url, options = {}, times = 1, delay = 1000, checkStatus = true) {
    return new Promise((resolve, reject) => {
      // fetch 成功处理函数
      function success (res) {
        if (checkStatus && !res.ok) {
          failure(res);
        }
        else {
          resolve(res);
        }
      }
 
      // 单次失败处理函数
      function failure (error) {
        if (--times) {
          setTimeout(fetchUrl, delay);
        }
        else {
          reject(error);
        }
      }
 
      // 总体失败处理函数
      function finalHandler (error) {
        throw error;
      }
 
      function fetchUrl () {
        return fetch(url, options)
          .then(success)
          .catch(failure)
          .catch(finalHandler);
      }
 
      fetchUrl();
    });
  }
 
  // 下载指定url的资源
  async function downloadUrl (url, name = (new Date()).valueOf() + '.mp4') {
    // Greasemonkey 需要把 url 转为 blobUrl
    if (GM_info.scriptHandler === 'Greasemonkey') {
      const res = await fetchRetry(url);
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
    }
 
    // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
    if (window.GM_download) {
      GM_download({url, name});
    }
    else {
      // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.style.display = 'none';
      // a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
 
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }
 
  // 格式化文件大小
  function humanSize (size) {
    let n = Math.log(size) / Math.log(1024) | 0;
    return (size / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
  }
 
  if (!player) return;
 
  // 获取视频信息
  const res = await fetchRetry(playlistBaseUrl + videoId, {
    headers: {
      'referer': 'refererBaseUrl + videoId',
      'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
    }
  }, 3);
  const videoInfo = await res.json();
 
  // 获取不同分辨率视频的信息
  for (const [key, video] of Object.entries(videoInfo.playlist)) {
    video.name = key.toLowerCase();
    video.cname = resolutions.find(v => v.ename === video.name)?.cname
    if (!videos.find(v => v.size === video.size)) {
      videos.push(video);
    }
  }
 
  // 按格式大小排序
  videos = videos.sort(function (v1, v2) {
    const v1Index = resolutions.findIndex(v => v.ename === v1.name);
    const v2Index = resolutions.findIndex(v => v.ename === v2.name);
 
    return v1Index === v2Index ? 0 : (v1Index > v2Index ? 1 : -1);
    // return v1.size === v2.size ? 0 : (v1.size > v2.size ? 1 : -1);
  }).reverse();
 
  document.addEventListener('DOMNodeInserted', (evt) => {
    const domControlBar = evt.relatedNode.querySelector(':scope > div:last-child > div:first-child > div:nth-of-type(2)');
    if (!domControlBar || domControlBar.querySelector('.download')) return;
 
    const domButtonsBar = domControlBar.querySelector(':scope > div:last-child');
    const domFullScreenBtn = domButtonsBar.querySelector(':scope > div:nth-last-of-type(2)');
    const domResolutionBtn = Array.from(domButtonsBar.querySelectorAll(':scope > div')).filter(el => el.innerText.substr(1, 1) === '清')[0];
    let domDownloadBtn, defaultResolution, buttons;
    if (!domFullScreenBtn || !domFullScreenBtn.querySelector('button')) return;
 
    // 克隆分辨率菜单或全屏按钮为下载按钮
    domDownloadBtn = (domResolutionBtn && (domResolutionBtn.className === domFullScreenBtn.className))
      ? domResolutionBtn.cloneNode(true)
      : domFullScreenBtn.cloneNode(true);
 
    defaultResolution = domDownloadBtn.querySelector('button').innerText;
 
    // 生成下载按钮图标
    domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
    domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
    domDownloadBtn.className = domDownloadBtn.className + ' download';
 
    buttons = domDownloadBtn.querySelectorAll('button');
 
    // button 元素添加对应的下载地址属性
    buttons.forEach(dom => {
      const video = videos.find(v => v.cname === dom.innerText) || videos[videos.length - 1];
 
      dom.dataset.video = video.play_url;
      if (dom.innerText) {
        (dom.innerText = `${dom.innerText} (${humanSize(video.size)})`);
      }
      else if (buttons.length == 1) {
        dom.nextSibling.querySelector('div').innerText = humanSize(video.size);
      }
    });
 
    // 鼠标事件 - 显示菜单
    domDownloadBtn.addEventListener('pointerenter', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle + 'opacity:1 !important; visibility:visible !important';
      }
    });
 
    // 鼠标事件 - 隐藏菜单
    domDownloadBtn.addEventListener('pointerleave', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle;
      }
    });
 
    // 鼠标事件 - 选择菜单项
    domDownloadBtn.addEventListener('pointerup', event => {
      let e = event.srcElement || event.target;
 
      while (e.tagName !== 'BUTTON') {
        e = e.parentNode;
      }
 
      downloadUrl(e.dataset.video);
    });
 
    // 显示下载按钮
    domButtonsBar.appendChild(domDownloadBtn);
  });
})();

//https://greasyfork.org/zh-CN/scripts/382426
//youtube自动切换中文字幕
(function() {
    'use strict';
    
    var window_url = window.location.href;
    var website_host = window.location.host;
    
    if(website_host.indexOf("youtube.com")==-1){  //不是youtube就不执行
    	return;
    }
    var lang = null;
    function i8nInit(){
        try{
            lang = document.querySelector('html').getAttribute('lang').trim();
        }catch(err){

        };
    }

    function tr(text) {
        switch(lang) {
            case 'zh-CN':
            case 'zh':
                return i8nZhHans(text);
            case 'zh-TW':
            case 'zh-HK':
                return i8nZhHant(text);
            case 'en-US':
            case 'en':
            case 'en-GB':
                return i8nEnUS(text);
            default:
                return text;
        }
    }

    function i8nZhHans(text) {
        switch(text){
            case '开启翻译字幕':
            case '关闭翻译字幕':
            case '字幕':
            case '添加字幕':
            case '关闭':
            case '中文':
            case '简体':
            case '繁体':
            case '台湾':
            case '香港':
            case '自动翻译':
            case '自动生成':
            default:
                break;
        }
        return text;
    }

    function i8nZhHant(text) {
        switch(text){
            case '开启翻译字幕':
                return '開啟翻譯字幕';
            case '关闭翻译字幕':
                return '關閉翻譯字幕';
            case '字幕':
                return '字幕';
            case '添加字幕':
                return '新增字幕';
            case '关闭':
                return '關閉';
            case '中文':
                return '中文';
            case '简体':
                return '簡體';
            case '繁体':
                return '繁體';
            case '台湾':
                return '台灣';
            case '香港':
                return '香港';
            case '自动翻译':
                return '自動翻譯';
            case '自动生成':
                return '自動產生'
            default:
                break;
        }
        return text;
    }

    function i8nEnUS(text) {
        switch(text){
            case '开启翻译字幕':
                return 'Turn on subtitles';
            case '关闭翻译字幕':
                return 'Turn off subtitles';
            case '字幕':
                return 'Subtitles/CC';
            case '添加字幕':
                return 'add subtitles/CC';
            case '关闭':
                return 'off';
            case '中文':
                return 'Chinese (Simplified)';
            case '简体':
                return 'Chinese (Simplified)';
            case '繁体':
                return 'Chinese (Traditional)';
            case '台湾':
                return 'Chinese (Taiwan)';
            case '香港':
                return 'Chinese (Hong Kong)';
            case '自动翻译':
                return 'Auto-translate';
            case '自动生成':
                return 'auto-generated'
            default:
                break;
        }
        return text;
    }
    
    function getAbsPosition(el){
        var el2 = el;
        var curtop = 0;
        var curleft = 0;
        if (document.getElementById || document.all) {
            do  {
                curleft += el.offsetLeft-el.scrollLeft;
                curtop += el.offsetTop-el.scrollTop;
                el = el.offsetParent;
                el2 = el2.parentNode;
                while (el2 != el) {
                    curleft -= el2.scrollLeft;
                    curtop -= el2.scrollTop;
                    el2 = el2.parentNode;
                }
            } while (el.offsetParent);

        } else if (document.layers) {
            curtop += el.y;
            curleft += el.x;
        }
        return [curtop, curleft];
    };

    function getPlayer() {
        var player = document.querySelector('#ytd-player') || document.querySelector('#player');
        // 如果播放器的设置不在可视区域，就停止自动开启翻译
        var [x, y] = [0, 0]
        try {
            [x, y] = getAbsPosition(player);
        } catch(e) {
            return;
        }

        var visible_area = y + player.clientHeight - 250;
        if (document.scrollingElement.scrollTop > visible_area) {
            return null;
        }

        return player;
    }

    // 添加开关
    function InitTranslateButton(){
        var coltrol_place = document.querySelector('.ytp-chrome-controls .ytp-right-controls');
        if(coltrol_place && coltrol_place.querySelector('.plugins-trans-btn') == null) {
            var trans_coltrol_btn = document.createElement('button');
            trans_coltrol_btn.className = 'plugins-trans-btn';
            trans_coltrol_btn.style = 'position: relative;top: -36%; margin-right:10px; border-radius: 25px;border: none; opacity: 0.95; background-color: #fff; outline:none;';

            trans_coltrol_btn.onclick = function(){
                var trans_coltrol_state = window.localStorage.getItem('plugins-trans-state');
                if(trans_coltrol_state == 'on') {
                    window.localStorage.setItem('plugins-trans-state', 'off');
                    trans_coltrol_btn.innerText = tr('开启翻译字幕');
                    removeSubtitlesTrans();
                } else {
                    window.localStorage.setItem('plugins-trans-state', 'on');
                    trans_coltrol_btn.innerText = tr('关闭翻译字幕');
                }
            }

            if(isEnableTranslate()){
                trans_coltrol_btn.innerText = tr('关闭翻译字幕');
            } else {
                trans_coltrol_btn.innerText = tr('开启翻译字幕');
            }
            // 屏蔽youtube强行添加的事件
            trans_coltrol_btn.addEventListener = function() {};
            coltrol_place.prepend(trans_coltrol_btn);
        }
    }

    function isEnableTranslate(){
        var transState = window.localStorage.getItem('plugins-trans-state');
        return transState == 'on';
    }

    function hasOpenVideoSettings(){
        var menu = document.querySelector('.ytp-popup.ytp-settings-menu');
        return menu && menu.style.display != 'none';
    }

    function closeVideoSettingsPlace(){
        var menuPlace = document.querySelector('.ytp-settings-menu');
        var menuPlaceBtn = document.querySelector('.ytp-settings-button');
        if(menuPlace && menuPlace.style.display != 'none') {
            menuPlaceBtn.click();
        }
    }

    function openVideoSettingsPlace(callback){
        if(!hasOpenVideoSettings()) {
            var menuPlaceBtn = document.querySelector('.ytp-settings-button');
            if(menuPlaceBtn) {
                menuPlaceBtn.click();
                callback();
            }
        } else {
            callback();
        }
    }

    function hasVideoSubtitles(){
        var dom = document.querySelector('.ytp-subtitles-button.ytp-button');
        return  dom != null && dom.style.display != 'none';
    }

    // 需要修改
    function openVideoSubtitles(){
        var settingsPlaceItems = document.querySelectorAll('.ytp-popup.ytp-settings-menu .ytp-menuitem');
        settingsPlaceItems.forEach(function(item) {
            if(item.innerText && item.innerText.indexOf(tr('字幕')) > -1 && item.innerText.indexOf(tr('添加字幕')) == -1) {
                item.click();
                return;
            }
        });

        // 内置简体字幕
        settingsPlaceItems.forEach(function(item) {
            if(item.innerText && item.innerText.indexOf(tr('简体')) > -1) {
                item.click();
                // 防止无限点击菜单
                setSubtitlesTrans('zh-Hans');
                closeVideoSettingsPlace();
                return;
            }
        });
        
        var curLnag = getSubtitlesTrans();
        if(curLnag == 'inner-Substitle') {
            // 如果没有简体字，就打开自动翻译
            settingsPlaceItems.forEach(function(item) {
                if(item.innerText && item.innerText.indexOf(tr('自动翻译')) > -1) {
                    item.click();
                    setSubtitlesTrans('inner-Substitle');
                    return;
                }
            });

        } else if(curLnag != 'zh-Hans') {
            // 如果没有就打开繁体字
            settingsPlaceItems.forEach(function(item) {
                if(item.innerText) {
                    ['繁体', '台湾', '香港', '中文'].forEach(function(langText) {
                        langText = tr(langText)
                        if(item.innerText.indexOf(langText) > -1) {
                            item.click();
                            setSubtitlesTrans('inner-Substitle');
                            closeVideoSettingsPlace();
                            return;
                        }
                    });
                }
            });

            var title = document.querySelector('.ytp-button.ytp-panel-title').innerText.trim();
            if(title.indexOf(tr('字幕')) >= -1) {
                // 没有中文相关字幕，就随便选一个字幕,然后才自动翻译
                settingsPlaceItems.forEach(function(item) {
                    if(item.innerText) {
                        var langText = item.innerText.trim();
                        if(langText.indexOf(tr('添加字幕')) == -1 && langText.indexOf(tr('关闭')) == -1) {
                            setSubtitlesTrans('inner-Substitle');
                            closeVideoSettingsPlace();
                            return;
                        }
                    }
                });

                settingsPlaceItems.forEach(function(item) {
                    if(item.innerText && item.innerText.indexOf(tr('自动生成')) > -1) {
                        item.click();
                        setSubtitlesTrans('inner-Substitle');
                        closeVideoSettingsPlace();
                        return;
                    }
                });
            }
        }
    }

    function displaySubtitles() {
        var subtitle = document.querySelector('.ytp-subtitles-button.ytp-button[aria-pressed="false"]');
        if(subtitle) {
            subtitle.click();
        }
    }

    function isSubtitlesTrans(){
        // curLang == 'zh-Hant'
        // 统一所有语言设置翻译为简体中文
        // en-UK: en-gb
        // en-US:  en
        // zh-CN zh-Hans zh-Hant
        return getSubtitlesTrans() == 'zh-Hans';
    }

    function removeSubtitlesTrans() {
        try {
            document.querySelector('.ytp-player-content').removeAttribute('translate-zh-hans');
        }catch(err) {

        }
    }

    function getSubtitlesTrans(){
        try {
            return document.querySelector('.ytp-player-content').getAttribute('translate-zh-hans');
        }catch(err) {
            return lang;
        }
    }

    function setSubtitlesTrans(lang) {
        document.querySelector('.ytp-player-content').setAttribute('translate-zh-hans', lang);
    }

    function openSubtitles(){
        
        if(hasVideoSubtitles()) {
            displaySubtitles();

            var isTrans = isSubtitlesTrans();
            console.log(isTrans);
            if(isTrans == false) {
                // 采用callback方式打开和关闭，防止settimeout导致的问题
                openVideoSettingsPlace(function() {
                    // 切换字幕
                    openVideoSubtitles();
                });
            }
        } else {
            try {
                // 防止切换视频过程，打开字幕，不关闭
                var title = document.querySelector('.ytp-button.ytp-panel-title').innerText.trim();
                if(title.indexOf(tr('字幕')) >= -1) {
                    closeVideoSettingsPlace();
                }
            }catch(err) {

            }
        }
    }

    function updateColtrolButtonState() {
        var transState = window.localStorage.getItem('plugins-trans-state');
        var transBtn = document.querySelector('.plugins-trans-btn')
        if(transBtn) {
            if(transState == 'on' && transBtn.innerText != tr('关闭翻译字幕')) {
                transBtn.innerText = tr('关闭翻译字幕');
            } else if(transState == 'off' && transBtn.innerText != tr('开启翻译字幕')) {
                transBtn.innerText = tr('开启翻译字幕');
            }
        }
    }

    function hidePageAds()
    {
        ['.video-ads', '#player-ads'].forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(elment){
                elment.style.display = 'none';
            });
        });
    }

    function isVideoAdsTime(){
        var ad = document.querySelector('.ad-showing');
        var skipAdButton = document.querySelector('.ytp-ad-skip-button');

        var volumeOpenState = document.querySelector("#ytp-svg-volume-animation-mask");
        var volumeButton = document.querySelector('.ytp-mute-button');
        // 判断有没有广告
        if(ad){
            // 关闭音量
            if(volumeOpenState && volumeButton)
            {
                volumeButton.click();
            }
        } else {
            // 正常视频，打开音量
            if(volumeOpenState == null && volumeButton){
                volumeButton.click();
            }
        }
        
        // 跳过广告
        if(skipAdButton)
        {
            skipAdButton.click();
        }
        return ad != null;
    }

    function main() {
        i8nInit();
        setInterval(
            function() {
                // 不显示错误信息
                try{
                    getPlayer() && (function(){
                        InitTranslateButton();
                        updateColtrolButtonState();
                        if(isEnableTranslate()){
                            hidePageAds();
                            if(!isVideoAdsTime()) {
                                openSubtitles();
                            }
                        }
                    })();
                }catch(err) {
    
                }
            },
            500
        )
    };
    main();
})();