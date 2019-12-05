# validform demo

## 官网 `http://validform.club/`


## 1、引入css
请查看下载文件中的style.css，把里面Validform必须部分复制到你的css中（文件里这个注释 "/*==========以下部分是Validform必须的===========*/" 之后的部分是必须的）。之前发现有部分网友把整个style.css都引用在了页面里，然后发现样式冲突了。

## 2、引入js （jquery 1.4.3 以上版本都可以）
```
<script type="text/javascript" src="./js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="./Validform/v5.1/Validform_v5.1_min.js"></script>
```
## 3、给需要验证的表单元素绑定附加属性
```
<form class="demoform">
<input type="text" value="" name="name" datatype="s5-16" errormsg="昵称至少5个字符,最多16个字符！" />
</form>
```
## 4、初始化，就这么简单
```
$(".demoform").Validform();
```


```
$(".demoform").Validform({
	btnSubmit:"#btn_sub", 
	btnReset:".btn_reset",
	tiptype:1, 
	ignoreHidden:false,
	dragonfly:false,
	tipSweep:true,
	label:".label",
	showAllError:false,
	postonce:true,
	ajaxPost:true,
	datatype:{
		"*6-20": /^[^\s]{6,20}$/,
		"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
		"username":function(gets,obj,curform,regxp){
			//参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
			var reg1=/^[\w\.]{4,16}$/,
				reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;
 
			if(reg1.test(gets)){return true;}
			if(reg2.test(gets)){return true;}
			return false;
 
			//注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
		},
		"phone":function(){
			// 5.0 版本之后，要实现二选一的验证效果，datatype 的名称 不 需要以 "option_" 开头;	
		}
	},
	usePlugin:{
		swfupload:{},
		datepicker:{},
		passwordstrength:{},
		jqtransform:{
			selector:"select,input"
		}
	},
	beforeCheck:function(curform){
		//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话将不会继续执行验证操作;	
	},
	beforeSubmit:function(curform){
		//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话表单将不会提交;	
	},
	callback:function(data){
		//返回数据data是json对象，{"info":"demo info","status":"y"}
		//info: 输出提示信息;
		//status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
		//你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
		//ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；
 
		//这里执行回调操作;
		//注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
	}
});
```