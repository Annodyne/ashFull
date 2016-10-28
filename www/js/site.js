//How frequently to check for session expiration in milliseconds
var sess_pollInterval = 1000;
//How many minutes the session is valid for
var sess_expirationSeconds = 180 //180; *CHANGE BACK

//How many minutes before the warning prompt

var sess_WarningSeconds = 150; //150 *CHANGE BACK
var sess_navNotifSeconds = 60; //60 *CHANGE BACK
var sess_intervalID;
var sess_lastActivity; 

function initSession()
{  
	sessClearInterval();
    $(".timer-warning").css("display", "none");
    sess_lastActivity = new Date();
    sessSetInterval();
    $(document).bind('keypress.session', function (ed, e)
    {
        sessKeyPressed(ed, e);
    });
}

function sessSetInterval()
{
    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}

 function sessClearInterval() {
	clearInterval(sess_intervalID);
}

function sessEnd()
{
	ClearPages();
	sessClearInterval();
	$(".timer-warning").css("display", "none");
}

function sessInterval()
{
	var now = new Date();
	//get milliseconds of differences
	var diff = now - sess_lastActivity;
	//console.log(diff);
	//get minutes between differences
	//console.log(diff);
	//var diffMins = (diff / 1000 / 60); 
	var diffSeconds = (diff / 1000);
	if (diffSeconds >= sess_WarningSeconds)
	{
		//warn before expiring
		$(".timer-count").html(diffSeconds);
		$(".timer-warning").css("display", "block");
		
		//stop the timer
		//sessClearInterval();
		//prompt for attention
		// var active = confirm('Your session will expire in ' + (sess_expirationSeconds - sess_WarningSeconds) +
			// ' seconds, press OK to remain on this page ' +
			// 'or press Cancel to return to the home screen.');
		
		if(diffSeconds >= sess_expirationSeconds)
		{
			sessEnd();
		}
	}
	
} 

function ClearPages () 
{
	(function(){
		$('.start-screen').show();
		$('.visible').removeClass('visible');
    	$('.popover-bg, .popover-close').hide();
		$('.modal-close').hide();
		$('.modal-close2').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
			//$(".home").load("page-snippets/study-design-a1.html", function(){
			$(".home").load("page-snippets/home.html", function(){
				$(".pg-discover").load("page-snippets/discover.html", function(){
					$(".pg-develop").load("page-snippets/develop.html", function(){
						$(".pg-develop-home").load("page-snippets/develop-home.html", function(){
							$(".pg-study-home-a").load("page-snippets/study-home-a.html", function(){
							$(".pg-study-home-b").load("page-snippets/study-home-b.html", function(){
								$(".pg-disease-state-a").load("page-snippets/disease-state-a.html", function(){
								$(".pg-rationale-a").load("page-snippets/rationale-a.html", function(){
								$(".pg-study-design-a1").load("page-snippets/study-design-a1.html", function(){



									$(".pg-portfolio").load("page-snippets/portfolio.html",function(){
									// $(".side-nav").load("page-snippets/navigation.html", function(){
									// 	$(".pg-abstract .side-nav .abstract, .pg-portfolio .side-nav .portfolio").addClass("active");
									// 	$(".pg-abstract .side-nav .abstract img").attr("src", "images/3fx_echo_video_kiosk_ui_v1.png");
									// 	$(".pg-portfolio .side-nav .portfolio img").attr("src", "images/incyte-nav-2-portfolio-active-symbol.png");
									// 	ThreeFXanalytics.Init();
									// 	ThreeFXanalytics.Tracking();
									// });
									});
								});

							});
							});
							});
							});
						});
					});
				});
			}).addClass('visible');
	})();
}


//page animation functions
var pageAnimating = false;
var abstractSwapping;
var toHome = function(){
	if(pageAnimating){
		return;
	}
	pageAnimating = true;
	$('.pg.visible').addClass('toHome').removeClass('visible');
	$('.home').addClass('visible');
	clear();
},
changePage = function(targetPage){
	if(pageAnimating){
		return;
	}
	pageAnimating = true;
	$('.visible').addClass('toSubpage').removeClass('visible');
	$('.pg[data-page="'+targetPage+'"]').addClass('visible');
	clear();
},
clear = function(){
	setTimeout(function(){
		pageAnimating=false;
		$('.toSubpage').removeClass('toSubpage');
		$('.toHome').removeClass('toHome');
	},500);
},
scroll = function(direction, target){

		var scrolldis = parseInt(target.scrollTop())
			childrenHeight = 0;
			target.children().each(function(){
				childrenHeight = childrenHeight + $(this).outerHeight(true);
			});
		if(direction=="up"){
			if(scrolldis-400 >=0){
				target.scrollTop(scrolldis - 400);
			}else{
				target.scrollTop(0);
			}
			
		}else if(direction=="down"){
			if(scrolldis+400 <= childrenHeight){
				target.scrollTop(scrolldis + 400);
			}else{
				target.scrollTop(childrenHeight);
			}
		}
		//setTimeout(function(){ scroll(direction, target); }, 100);
	
},
loadAbstract = function(abstractNum){
	if(abstractSwapping){
		return;
	}
	abstractSwapping = true;
	$('.abstract-wrapper').addClass('loadout');
	setTimeout(function(){
		$('.abstract-wrapper').load('page-snippets/abstracts/abstract-'+abstractNum+'.html', function(){
			$('.abstract-wrapper').removeClass('loadout').css('width', '1200px');
			$('.abstract-view .abstract-scroller').css('display', 'inline-block');
			abstractSwapping=false;
		});
		
	},300)
};

$(function () {

	$(document).on('click', initSession);

	//load the content
	(function(){
		ClearPages();
	})();
	
	//load up animation click handlers
	(function(){
		$(document).on(
			"click",
			'.nav-button.loads-page',
			function(){
			var intentPage = $(this).attr('data-pagelink'),
				activePage = $('.visible').attr('data-page');
				if(intentPage!=activePage)
				changePage(intentPage);
				
				if(intentPage == "portfolio"){
					setTimeout(function(){
						/* PORTFOLIO ANIMATIONS */
						$('div.progress-bar').css('width', '57%');
						$('div.progress-bar.width34').css('width', '34%');
						$('div.progress-bar.width42-2').css('width', '42%');
						$('div.progress-bar.width42').css('width', '47%');
						$('div.progress-bar.width54').css('width', '54%');
						$('div.progress-bar.width66').css('width', '66%');
						$('div.progress-bar.width69').css('width', '69%');
						$('div.progress-bar.width72').css('width', '72%');
						$('div.progress-bar.width81').css('width', '81%');
						$('div.progress-bar.width97').css('width', '97%');
						setTimeout(function () {
							$('div.progress-bar').addClass('on');
						}, 800);
					},550);
				}else{
					/* PORTFOLIO ANIMATIONS */
					$('div.progress-bar').css('width', '0%');
					$('div.progress-bar.width34').css('width', '0%');
					$('div.progress-bar.width42-2').css('width', '0%');
					$('div.progress-bar.width42').css('width', '0%');
					$('div.progress-bar.width54').css('width', '0%');
					$('div.progress-bar.width66').css('width', '0%');
					$('div.progress-bar.width69').css('width', '0%');
					$('div.progress-bar.width72').css('width', '0%');
					$('div.progress-bar.width81').css('width', '0%');
					$('div.progress-bar.width97').css('width', '0%');
					$('div.progress-bar').removeClass('on');
				}
			}
		);
			
		$(document).on(
			"click",
			".logo, .home-btn",
			toHome
		);
	})();
	
	// hidden reset button
	$('.pages').on('click', '.hidden-reset-btn', function () {
		sessEnd();
		window.location.reload(true);
	});

	//load up animation click handlers
	(function(){
		$(document).on(
			"click",
			'.abstract-nav .btn',
			function(){
				if($(this).hasClass('active')||abstractSwapping){
					return;
				}
				$(".abstract-nav .btn.active").removeClass('active');
				$(this).addClass('active');
				loadAbstract($(this).attr("data-abstract"));
				$('.abstract-wrapper').hide().animate({ scrollTop: 0 }, 1).show();
			}
		);
	})();
	
	(function(){
	$(document).on('mousedown', '.abstract-view .scrollup, .abstract-view .scrolldown', function(){
				var dir = $(this).attr('data-scrolldir'),
					tar = $('.abstract-wrapper');
					scroll(dir, tar);
			});
	})();

	// Time-out continue button
	$(".continue-button").click(function () {
		$(".timer-warning").css("display", "none");
		sessClearInterval();
		initSession();		
	});
	
	/* FADE OUT START SCREEN */
	$('.start-screen').on('click', function() {
		$(this).fadeOut('slow');
	});

    /* MODAL POP-UP */
    $('.pages').on('click', '.modal-show', function () {
        $('#modal-frame').attr('src', $(this).attr('href'));
    	$('.modal-close').show();
		$('#modal-dialog').dialog({
            width: 1324,
            height: 915,
            modal: true,
            show: {
	            effect: 'fade',
	            duration: 1000
	        },
	        hide: {
	            effect: 'fade',
	            duration: 100
	        },
            close: function () {
                $('#modal-frame').attr('src', 'about:blank');
                $('#modal-dialog').fadeOut();
            }
        });
        return false;
    });

	// click x to trigger click on modal-website popup
	$('.modal-close').on('mousedown touchstart', function () {
        $('.modal-close').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
		return false;
	});

	$('.modal-close2').on('mousedown touchstart', function () {
        $('.modal-close2').hide();
		$('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close').trigger('click');
		return false;
	});

	$('.pages').on('click', '.trigger-close', function() {
		$('.popover-close').trigger('click');
	});

    //$(".pages").on('click', '.video', function () {
    $(".pages").on('click', '.video', function () {
    	//alert(1);
        var url = this.href,
			name = $(this).find('p').text();

		$(this).find('span').children('img').addClass('on');
		setTimeout(function() {
        	$("#video_pop").html('<div><img class="video-pop" style="background-color: #464646;" src="images/incyte-home-btn.png" alt="HOME" title="HOME"><img class="play-pause-btn" src="images/pause-btn.png"><img class="replay-btn" src="images/replay-btn.png"></div><video autoplay id="the_Video" data-videoname="'+ name +'" width="100%" height="100%"><source src="' + url + '" type="video/mp4" /></video>').css('display', 'block');
			ThreeFXanalytics.VideoTracking();
		}, 1000);

		// Video controls
  		$('.pages').on('click', '.play-pause-btn', function() {
				$('video#the_Video').get(0).pause();
				$('.play-pause-btn').attr('src', 'images/play-btn.png').addClass('paused');	

	  			$('.pages').on('click', '.play-pause-btn.paused', function() {
					$('video#the_Video').get(0).play();
					$('.play-pause-btn').attr('src', 'images/pause-btn.png').removeClass('paused');
		  		});
  		});

  		setTimeout(function() {
			$('video#the_Video').on('ended', function() {
				$('.home-btn').trigger('click');
			});
		}, 5000);

  		// force restart if replay button in top nav clicked
  		$('.pages').on('click', '.replay-btn', function() {
				//$('.playpause').fadeOut();
  				$('video#the_Video').load();
				$('.play-pause-btn').attr('src', 'images/pause-btn.png');	
				$('.play-pause-btn').show();
  		});
		
		ThreeFXanalytics.VideoTracking();
        return false;
    });

    /* FADE OUT VIDEO PLAYER HOME BTN */
    $('.pages').on('click', ' .video-pop', function () {
    	$('.carousel').carousel(0); 
    	$('#video_pop').fadeOut();
    	if ( $('#carousel-home div.carousel-caption > div span img').hasClass('on') ) {
    		$('#carousel-home div.carousel-caption > div span img').removeClass('on');
    	}
    });

    // Abstract More details
    $('.pages').on('click', '.abstract-more-details-toggle', function () {
    	$('.abstract-more-details ol').slideToggle();
    	$('.abstract-more-details-toggle span').toggleClass('on');
    });

    // Portfolio page pop-up
    $('.pages').on('click', '.progress-bar', function () {
			var content = $(this).attr('data-content');
			//alert(content);
			$('.data-content-html').html(content);
			$('.popover-bg, .popover-close').fadeIn();
		});
    $('.pages').on('click', '.popover-close', function () {
    	$('.popover-bg, .popover-close').fadeOut();
    });



/**********************
***** ASHE ************
**********************/
/* DISCOVER SCREEN */

	// trigger click on Ham and PlayPauseBtn
	function triggerClickHamAndPlayPauseBtn() {
			$('#nav-toggle, .discover-play-pause-btn').trigger('click');
				$('video#discover-screen-video').get(0).play();
	}

	function resetVideo() {
		var video = $('video#discover-screen-video').get(0);
			video.pause();
			video.currentTime = 0;
	}

		/* NAV */
	    $(".pages").on("click", '#nav-toggle', function() {

    		$(this).toggleClass( "active" );

    		if ( $(this).hasClass('active') ) {
    			// this opens nav; stops video
				
				$('#carousel-home').animate({height:'374px'}, 1000).css('background', 'none');
				$('.carousel-indicators, .white-overlay, .embed-responsive img').fadeIn();
				$('.video-on').fadeOut(1000);
				$('.discover-text').delay(200).fadeIn();
				console.log('opened ham');
				resetVideo();
			} else {
				// closes nav; starts video
				$('#carousel-home').animate({height:'85px'}, 1000).css('background', 'rgba(255, 255, 255, .75');
				$('.embed-responsive img ').fadeOut();
				$('.discover-text, .carousel-indicators, .white-overlay').fadeOut();
				$('.video-on').fadeIn(1000);
				$('.discover-play-pause-btn').trigger('click');
				//$('#nav-toggle').addClass('active');
			}

	  	});

	    /* VIDEO */
		$('.pages').on('click', '.discover-play-pause-btn', function() {

			//alert('yes');
			$('video#discover-screen-video').get(0).pause();
			$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');	

	  			$('.pages').on('click', '.discover-play-pause-btn.paused', function() {
					$('video#discover-screen-video').get(0).play();
					$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
		  		});



			  	$('.pages').on('click', '.discover-rewind-btn', function() {
				//console.log('yes');
				//console.log(video);
					
					video.pause();
					//console.log(video.currentTime);
					if (video.currentTime > 0) {
						console.log('high');
						console.log("before" + video.currentTime);
						video.currentTime = (video.currentTime - 30);
						console.log("after" + video.currentTime);
					} 
						setTimeout(function() {
							video.play();
						}, 250);
					// if (video.currentTime <= 4) {
					// 	console.log('low');
					// 	video.currentTime = 0;
					// 	setTimeout(function() {
					// 		video.play();
					// 	}, 250);
					// } 
					return false;	
				});

  			var video = document.getElementById('discover-screen-video');
			var pBar = document.getElementById('progressbar');
			video.addEventListener('timeupdate', function() {
			var percent = Math.floor((100 / video.duration) * video.currentTime);

			  	pBar.value = percent;
			  	pBar.getElementsByTagName('span')[0].innerHTML = percent;
			}, false);

			// $('.pages').on('click', '.discover-rewind-btn', function() {
			// 	console.log('yes');
			// 	var video = document.getElementById('discover-screen-video');
			// 	var pBar = document.getElementById('progressbar');
			// 	video.addEventListener('timeupdate', function() {
					
			// 		if (video.currentTime >= 30) {
			// 			video.pause();
			// 			video.currentTime = 0;
			// 			video.play();
			// 		} else {
			// 			video.pause();
			// 			video.currentTime = currentTime - 30;
			// 			video.play();
			// 		}
			// 	  	var percent = Math.floor((100 / video.duration) * video.currentTime);
			// 	  	pBar.value = percent;
			// 	  	pBar.getElementsByTagName('span')[0].innerHTML = percent;
	  // 				//video.play();
			// 	}, false);
			// });

  		});



/*

  		$('.pages').on('click', '.play-pause-btn', function() {
				$('video#the_Video').get(0).pause();
				$('.play-pause-btn').attr('src', 'images/play-btn.png').addClass('paused');	

	  			$('.pages').on('click', '.play-pause-btn.paused', function() {
					$('video#the_Video').get(0).play();
					$('.play-pause-btn').attr('src', 'images/pause-btn.png').removeClass('paused');
		  		});
  		});

*/
		// whe tap screen to start clicked, trigger clicks on hamburger and play button to close nav and start video
  		$('.pages').on('click', '.discover-text', function() {
  			triggerClickHamAndPlayPauseBtn();
  		});




  		/* popup for more information book thing */
  		$('.pages').on('click', '.popup-btn', function() {
  			$('.pop-up-div').fadeIn();
  			$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn-x.png').addClass('on');
  		});
  		$('.pages').on('click', '.popup-btn.on', function() {
  			$('.pop-up-div').fadeOut();
  			$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn.png').removeClass('on');
  		});


  		// get height of nav on study-design page and set box nex to it the same height
  		// setTimeout(function() {
	  	// 	var getHeight = $('.study-design-a1-bg .sd-main div.col-xs-3').outerHeight();
	  	// 	console.log(getHeight);
	  	// 	$('.study-design-a1-bg .sd-main div.col-xs-9').css('height', getHeight);
	  	// }, 200);


function navColorChange(navItem) {
	$('.sd-main .col-xs-12').addClass('bg-blue').not(navItem).removeClass('bg-blue');
}

function scrollTo(id) {
	$('.sd-main-content').animate( {scrollTop: $(id).offset().top}, 2000 );	
}

	  	$('.pages').on('click', '.primary-objectives-nav', function() {
			navColorChange('.primary-objectives-nav');
			scrollTo('#po');
	  	});

	  	$('.pages').on('click', '.study-design-nav', function() {
			navColorChange('.study-design-nav');
			scrollTo('#sd');
		});

	  	$('.pages').on('click', '.criteria-nav', function() {
			navColorChange('.criteria-nav');
			scrollTo('#kiec');
	  	});

}); 