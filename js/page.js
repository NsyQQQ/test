		window.onload=function(){
			//自适应字体大小
			/* document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px'; */
			/* document.body.style.fontSize = '16px'; */
			//页面加载后一秒自动播放第一个视频
			setTimeout(function(){
				var video_1=document.getElementById("f_video");
				video_1.play();
			},1000);
		}
		
		// 第一个页面跳转到第二个页面
		function divSW1() {
			var dv1 = document.getElementById( "first" );
			var dv2 = document.getElementById( "second" );
			var hide = true;
		    if( hide ) {
		       dv1.style.display = "none"; 
			   dv2.style.display = "block";
		       hide = false;
		    } else {
		        dv1.style.display = "block";
				dv2.style.display = "none"; 
		        hide = true;
		    }
			//播放闪屏动画
			dv2.style.animationName="name1";
			
			setTimeout(function(){
				var currentTime = v.video.currentTime;
				var duration = v.video.duration;
				var percent = currentTime / duration * 100;
				v.video.play();
				if(percent=0.5){
					v.video.pause();
				}
			},500);
			
			
			//过5秒钟之后视频自动播放
			setTimeout(function(){
				//手指消失
				var shou=document.getElementById("shou");
				shou.style.display = "none";
				//播放视频
				v.video.play();
				//视频播放完之后跳转到下一个页面
				v.video.addEventListener("ended",function(){
					var dv2 = document.getElementById( "second" );
					var dv3 = document.getElementById( "third" );
					var hide = true;
					if( hide ) {
					   dv2.style.display = "none"; 
					   dv3.style.display = "block";
					   hide = false;
					} else {
					    dv2.style.display = "block";
						dv3.style.display = "none"; 
					    hide = true;
					}
					//播放第三个视频
					var video_3=document.getElementById("t_video");
					video_3.play();
				});
			},6000);
		}
		//第二个页面返回第一个页面
		function divSW2() {
			var dv1 = document.getElementById( "first" );
			var dv2 = document.getElementById( "second" );
			var hide = true;
		    if( hide ) {
		       dv1.style.display = "block"; 
			   dv2.style.display = "none";
		       hide = false;
		    } else {
		        dv1.style.display = "none";
				dv2.style.display = "block"; 
		        hide = true;
		    }
		}
		//第三个页面返回第二个页面
		function divSW3() {
			var dv2 = document.getElementById( "second" );
			var dv3 = document.getElementById( "third" );
			var hide = true;
		    if( hide ) {
		       dv2.style.display = "block"; 
			   dv3.style.display = "none";
		       hide = false;
		    } else {
		        dv2.style.display = "none";
				dv3.style.display = "block"; 
		        hide = true;
		    }
		}
			
		/* 进度条控制视频播放 自定义进度条 进度条可拖拽 */
		
		var v={
			video: document.getElementById("video"), //容器框
			progress: document.getElementsByClassName("progress")[0], //进度条容器
			timrBar: document.getElementsByClassName("timrBar")[0], //进度条
			warp: document.getElementById("video-warp") //视频区域距左边的距离
		};
		
		v.video.onloadedmetadata = function(){
			//进度条跟随
			v.video.ontimeupdate = function() {
				//获取视频当前播放时间
			    var currentTime = v.video.currentTime;
				//获取视频总时间
			    var duration = v.video.duration;
				//视频当前播放时间的百分比
			    var percent = currentTime / duration * 100;
			    /* v.timrBar.style.width = percent + "%" ; */
				//通过百分比调整进度条位置
				v.timrBar.style.transform = "translateX("+ percent*3.55 + "%"+")";
			}
			//进度条获取坐标 调用触摸事件 实现拖拽
			var enableProgressDrag = function(e) {
				//进度条可拖放状态
			    var progressDrag = false;
				//手指触摸  按下手指时
			    v.progress.ontouchstart = function(e) {
			        progressDrag = true;
			        updateprogress(e.touches[0].pageX);
			    }
				//手指触摸  松开手指时
			    document.ontouchend = function(e) {
			        /* if(progressDrag) {
			            progressDrag = false;
			            updateprogress(e.touches[0].pageX - v.warp.offsetLeft);
			        } */
					if(progressDrag){
						progressDrag=false;
						if(v.timrBar.style.transform=="translateX(355%)"){
							var dv2 = document.getElementById( "second" );
							var dv3 = document.getElementById( "third" );
							var hide = true;
							if( hide ) {
							   dv2.style.display = "none"; 
							   dv3.style.display = "block";
							   hide = false;
							} else {
							    dv2.style.display = "block";
								dv3.style.display = "none"; 
							    hide = true;
							}
							//播放第三个视频
							var video_3=document.getElementById("t_video");
							video_3.play();
						}else{
							v.timrBar.style.transform="translateX(0%)";
							v.video.currentTime=0;
						}
					}
			    }
				//手指触摸  移动手指时
			    v.progress.ontouchmove = function(e) {
			        if(progressDrag) {
			            updateprogress(e.touches[0].pageX);
			        }
			    }
			};
		
			enableProgressDrag();
			
			//进度条可拖拽
			function updateprogress(x) {
			    var percent = 100 * (x - v.progress.offsetLeft) / v.progress.offsetWidth;
			    if(percent > 100) {
			        percent = 100;
			    }
			    if(percent < 0) {
			        percent = 0;
			    }
			    /* v.timrBar.style.width = percent + "%" ; */
				v.timrBar.style.transform = "translateX("+ percent*3.55 + "%"+")";
			    v.video.currentTime = v.video.duration * percent / 100;
			}
		}