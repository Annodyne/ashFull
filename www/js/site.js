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
			$(".home").load("page-snippets/home.html", function(){
			//$(".home").load("page-snippets/discover.html", function(){
			//$(".home").load("page-snippets/portfolio.html", function(){
			//$(".home").load("page-snippets/develop.html", function(){
				
				$(".pg-discover").load("page-snippets/discover.html", function(){
					$(".pg-portfolio").load("page-snippets/portfolio.html",function(){
						$(".pg-develop").load("page-snippets/develop.html", function(){
							$(".pg-study-design-a1").load("page-snippets/study-design-a1.html", function(){
							$(".pg-study-design-a2").load("page-snippets/study-design-a2.html", function(){
							$(".pg-study-design-a3").load("page-snippets/study-design-a3.html", function(){
							$(".pg-study-design-a4").load("page-snippets/study-design-a4.html", function(){
							$(".pg-study-design-a5").load("page-snippets/study-design-a5.html", function(){
							$(".pg-study-design-a6").load("page-snippets/study-design-a6.html", function(){
							$(".pg-study-design-a7").load("page-snippets/study-design-a7.html", function(){
							$(".pg-study-design-a8").load("page-snippets/study-design-a8.html", function(){
							$(".pg-echo").load("page-snippets/echo.html", function(){
							});});});});});});});});});
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
	
}

/**********************
***** ASHE ************
**********************/
/* DISCOVER SCREEN */
	function resetVideo() {
		var video = $('video#discover-screen-video').get(0);
			video.pause();
			video.currentTime = 0;
	}

/* BASIC VIDEO CONTROLS */
function basicVidControl(vid, vidBtn) {
	$('.pages').on('click', vidBtn, function() {

		if ( $(vidBtn).hasClass('paused') ) {
			$(vid).get(0).play();
			$(vidBtn).attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
		} else {
			$(vid).get(0).pause();
			$(vidBtn).attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');	
		}

		videoBarProgress('rationale-b-video', 'progressbar5');
	});
}

/* VIDEO progress */
function videoBarProgress(videoID, progressBarId) {
	setTimeout(function() {
	  	var video = document.getElementById(videoID);
		var pBar = document.getElementById(progressBarId);

		if (video) {
		video.addEventListener('timeupdate', function() {
			var percent = Math.floor((100 / video.duration) * video.currentTime);
		  	pBar.value = percent;
		  	pBar.getElementsByTagName('span')[0].innerHTML = percent;

		}, false);

		$('.pages').on('click', 
				'.discover-rewind-btn, .disease-state-rewind-btn, .disease-state-rewind-btn, .rewind-btn, .discover-pu-rewind-btn', 
				function() {
				if ( video.currentTime <= 30 ) {
					video.currentTime = 0;
				} else {
					video.currentTime -= 30;
				}
			});
		}
	}, 250);
}

/* video end function */
	function vidEnded(vid, vidBtn) {
		$(vid).on('ended',function(){
	     	//console.log('Video has ended!');
			$(vidBtn).attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
			resetVideo();
	    });
	}


// functionality on study-design pages
function navColorChange(navItem) {
	$('.sd-main .col-xs-12').addClass('bg-blue').not(navItem).removeClass('bg-blue');
}


function scrollToF(number, id) {
	$('.sd-main-content' + number).animate( {scrollTop: $(id).position().top }, 500 );	
	console.log('.sd-main-content' + number);
	//var currentPos = $(id).position().top;
	//console.log(currentPos);
}

/* scroll into view function for develop */
function scrollInView() {
	$.fn.inView = function(){
	    if(!this.length) return false;
	    var rect = this.get(0).getBoundingClientRect();

	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	};
}

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
						$('div.progress-bar').css('width', '62%');
						$('div.progress-bar.width34').css('width', '38%');
						$('div.progress-bar.width48').css('width', '48%');
						$('div.progress-bar.width52').css('width', '52%');
						$('div.progress-bar.width56').css('width', '56%');
						$('div.progress-bar.width58').css('width', '58%');
						$('div.progress-bar.width72').css('width', '72%');
						$('div.progress-bar.width74').css('width', '74%');
						$('div.progress-bar.width76').css('width', '76%');
						$('div.progress-bar.width77').css('width', '77%');
						$('div.progress-bar.width79').css('width', '79%');
						$('div.progress-bar.width85').css('width', '85%');
						$('div.progress-bar.width97').css('width', '97%');
						setTimeout(function () {
							$('div.progress-bar').addClass('on');
						}, 800);
					},550);
				}else{
					/* PORTFOLIO ANIMATIONS */
					$('div.progress-bar').css('width', '0%');
					$('div.progress-bar.width34').css('width', '0%');
					$('div.progress-bar.width48').css('width', '0%');
					$('div.progress-bar.width52').css('width', '0%');
					$('div.progress-bar.width56').css('width', '0%');
					$('div.progress-bar.width58').css('width', '0%');
					$('div.progress-bar.width72').css('width', '0%');
					$('div.progress-bar.width74').css('width', '0%');
					$('div.progress-bar.width76').css('width', '0%');
					$('div.progress-bar.width77').css('width', '0%');
					$('div.progress-bar.width79').css('width', '0%');
					$('div.progress-bar.width85').css('width', '0%');
					$('div.progress-bar.width97').css('width', '0%');
					$('div.progress-bar').removeClass('on');
				}
				if (intentPage == "study-design-a2") {
					$('.primary-objectives-nav1').addClass('bg-blue');
					$('.sd-main-content1').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav1', function() {
							scrollToF('1', '#po1');
					  	});
					  	$('.pages').on('click', '.study-design-nav1', function() {
							scrollToF('1', '#sd1');
						});
					  	$('.pages').on('click', '.criteria-nav1', function() {
							scrollToF('1', '#kiec1');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top1', function() {
						  $(".sd-main-content1").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm1', function() {
						  $(".sd-main-content1").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content1').on('scroll', function(){ 
							    if( $('#po1').inView() ) {
									navColorChange('.primary-objectives-nav1');
							    }
							    //if( $('#sd1').inView() && !$('#po1').inView() ) {
							    if( $('#sd1').inView() ) {
									navColorChange('.study-design-nav1');
							    }
							    //if( $('#kiec1').inView() && !$('#sd1').inView() ) {
							    if( !$('#sd1').inView() && !$('#po1').inView() ) {
							        navColorChange('.criteria-nav1');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a1") {
					$('.primary-objectives-nav2').addClass('bg-blue');
					$('.sd-main-content2').animate( {scrollTop: 0 });					  	
					$('.pages').on('click', '.primary-objectives-nav2', function() {
							scrollToF('2', '#po2');
					  	});
					  	$('.pages').on('click', '.study-design-nav2', function() {
							scrollToF('2', '#sd2');
						});
					  	$('.pages').on('click', '.criteria-nav2', function() {
							scrollToF('2', '#kiec2');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top2', function() {
						  $(".sd-main-content2").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm2', function() {
						  $(".sd-main-content2").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content2').on('scroll', function(){ 
							    if( $('#po2').inView() ) {
									navColorChange('.primary-objectives-nav2');
							    }
							    if( $('#sd2').inView() ) {
									navColorChange('.study-design-nav2');
							    }
							    if( !$('#po2').inView() && !$('#sd2').inView() ) {
							        navColorChange('.criteria-nav2');
							    }
							});
						}, 500);
				} 
				if (intentPage == "study-design-a3") {
					$('.primary-objectives-nav3').addClass('bg-blue');
					$('.sd-main-content3').animate( {scrollTop: 0 });					  	
					$('.pages').on('click', '.primary-objectives-nav3', function() {
							scrollToF('3', '#po3');
					  	});
					  	$('.pages').on('click', '.study-design-nav3', function() {
							scrollToF('3', '#sd3');
						});
					  	$('.pages').on('click', '.criteria-nav3', function() {
							scrollToF('3', '#kiec3');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top3', function() {
						  $(".sd-main-content3").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm3', function() {
						  $(".sd-main-content3").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content3').on('scroll', function(){ 
							    if( $('#po3').inView() ) {
									navColorChange('.primary-objectives-nav3');
							    }
							    if( $('#sd3').inView() ) {
									navColorChange('.study-design-nav3');
							    }
							    if( !$('#po3').inView() && !$('#sd3').inView() ) {
							        navColorChange('.criteria-nav3');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a4") {
						$('.primary-objectives-nav4').addClass('bg-blue');
						$('.sd-main-content4').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav4', function() {
							scrollToF('4', '#po4');
					  	});
					  	$('.pages').on('click', '.study-design-nav4', function() {
							scrollToF('4', '#sd4');
						});
					  	$('.pages').on('click', '.criteria-nav4', function() {
							scrollToF('4', '#kiec4');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top4', function() {
						  $(".sd-main-content4").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm4', function() {
						  $(".sd-main-content4").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content4').on('scroll', function(){ 
							    if( $('#po4').inView() ) {
									navColorChange('.primary-objectives-nav4');
							    }
							    if( $('#sd4').inView() ) {
									navColorChange('.study-design-nav4');
							    }
							    if( !$('#po4').inView() && !$('#sd4').inView() ) {
							        navColorChange('.criteria-nav4');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a5") {
					$('.primary-objectives-nav5').addClass('bg-blue');
					$('.sd-main-content5').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav5', function() {
							scrollToF('5', '#po5');
					  	});
					  	$('.pages').on('click', '.study-design-nav5', function() {
							scrollToF('5', '#sd5');
						});
					  	$('.pages').on('click', '.criteria-nav5', function() {
							scrollToF('5', '#kiec5');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top5', function() {
						  $(".sd-main-content5").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm5', function() {
						  $(".sd-main-content5").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content5').on('scroll', function(){ 
							    if( $('#po5').inView() ) {
									navColorChange('.primary-objectives-nav5');
							    }
							    if( $('#sd5').inView() ) {
									navColorChange('.study-design-nav5');
							    }
							    if( !$('#po5').inView() && !$('#sd5').inView() ) {
							        navColorChange('.criteria-nav5');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a6") {
					$('.primary-objectives-nav6').addClass('bg-blue');
					$('.sd-main-content6').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav6', function() {
							scrollToF('6', '#po6');
					  	});
					  	$('.pages').on('click', '.study-design-nav6', function() {
							scrollToF('6', '#sd6');
						});
					  	$('.pages').on('click', '.criteria-nav6', function() {
							scrollToF('6', '#kiec6');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top6', function() {
						  $(".sd-main-content6").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm6', function() {
						  $(".sd-main-content6").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content6').on('scroll', function(){ 
							    if( $('#po6').inView() ) {
									navColorChange('.primary-objectives-nav6');
							    }
							    if( $('#sd6').inView() ) {
									navColorChange('.study-design-nav6');
							    }
							    if( !$('#po6').inView() && !$('#sd6').inView() ) {
							        navColorChange('.criteria-nav6');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a7") {
					$('.primary-objectives-nav7').addClass('bg-blue');
					$('.sd-main-content7').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav7', function() {
							scrollToF('7', '#po7');
					  	});
					  	$('.pages').on('click', '.study-design-nav7', function() {
							scrollToF('7', '#sd7');
						});
					  	$('.pages').on('click', '.criteria-nav7', function() {
							scrollToF('7', '#kiec7');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top7', function() {
						  $(".sd-main-content7").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm7', function() {
						  $(".sd-main-content7").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content7').on('scroll', function(){ 
							    if( $('#po7').inView() ) {
									navColorChange('.primary-objectives-nav7');
							    }
							    if( $('#sd7').inView() ) {
									navColorChange('.study-design-nav7');
							    }
							    if( !$('#po7').inView() && !$('#sd7').inView() ) {
							        navColorChange('.criteria-nav7');
							    }
							});
						}, 500);
				}
				if (intentPage == "study-design-a8") {
					$('.primary-objectives-nav8').addClass('bg-blue');
					$('.sd-main-content8').animate( {scrollTop: 0 });
					  	$('.pages').on('click', '.primary-objectives-nav8', function() {
							scrollToF('8', '#po8');
					  	});
					  	$('.pages').on('click', '.study-design-nav8', function() {
							scrollToF('8', '#sd8');
						});
					  	$('.pages').on('click', '.criteria-nav8', function() {
							scrollToF('8', '#kiec8');
					  	});
					 //  	/* scroll within box via chevrons*/
					  	$('.pages').on('click', '.chevron-top8', function() {
						  $(".sd-main-content8").animate({ scrollTop: '-=100px' }, 600);
						});
						$('.pages').on('click', '.chevron-btm8', function() {
						  $(".sd-main-content8").animate({ scrollTop: '+=100px' }, 600);
						});

						setTimeout(function() {
							scrollInView();
							$('.sd-main-content8').on('scroll', function(){ 
							    if( $('#po8').inView() ) {
									navColorChange('.primary-objectives-nav8');
							    }
							    if( $('#sd8').inView() ) {
									navColorChange('.study-design-nav8');
							    }
							    if( !$('#po8').inView() && !$('#sd8').inView() ) {
							        navColorChange('.criteria-nav8');
							    }
							});
						}, 500);
				}
				// if (intentPage == "study-design-b1") {
				// 		setTimeout(function() {

				// 	  	$('.pages').on('click', '.primary-objectives-nav', function() {
				// 			//navColorChange('.primary-objectives-nav');
				// 			scrollToF('#poB');
				// 	  	});

				// 	  	$('.pages').on('click', '.study-design-nav', function() {
				// 			//navColorChange('.study-design-nav');
				// 			scrollToF('#sdB');
				// 		});

				// 	  	$('.pages').on('click', '.criteria-nav', function() {
				// 			//navColorChange('.criteria-nav');
				// 			scrollToF('#kiecB');
				// 	  	});


				// 	 //  	/* scroll within box via chevrons*/
				// 	  	$('.pages').on('click', '.chevron-top', function() {
				// 		  $(".sd-main-content").animate({ scrollTop: '-=100px' }, 600);
				// 		});
				// 		$('.pages').on('click', '.chevron-btm', function() {
				// 		  $(".sd-main-content").animate({ scrollTop: '+=100px' }, 600);
				// 		});
 

				// 			scrollInView();
				// 			$('.sd-main-content').on('scroll', function(){ 
				// 				if( $('#poB').inView() ) {
				// 					navColorChange('.primary-objectives-nav');
				// 			    }
				// 			    if( $('#sdB').inView() && !$('#poB').inView() ) {
				// 					navColorChange('.study-design-nav');
				// 			    }
				// 			    if( !$('#sdB').inView() && !$('#poB').inView() ) {
				// 			        navColorChange('.criteria-nav.b');
				// 			    }	
				// 			});
				// 		}, 500);
				// }
				if (intentPage !== "home") {
					setTimeout(function() {
						$('.pop-up-div').hide();
  						$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn.png').removeClass('on');
					});
				}
				if (intentPage == 'discover') {
					$('.timer-warning').css('display', 'none !important');
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
	$('.pages').on('click', '.home-btn', function () {
		sessEnd();
		setTimeout(function() {
			window.location.reload(true);
		}, 500);
	});

	// Time-out continue button
	$(".continue-button").click(function () {
		$(".timer-warning").css("display", "none");
		sessClearInterval();
		initSession();		
	});
	
	/* FADE OUT START SCREEN */
	// $('.start-screen').on('click', function() {
	// 	$(this).fadeOut('slow');
	// });

    /* MODAL POP-UP */
    $('.pages').on('click', '.modal-show', function () {
    	var winW = $(window).width();
		var winH = $(window).height();

        $('#modal-frame').attr('src', $(this).attr('href'));
    	$('.modal-close').show();
		$('#modal-dialog').dialog({
            width: winW,
            height: winH,
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

    $('.pages').on('click', '.modal-show2', function () {
		var winW = $(window).width();
		var winH = $(window).height();
		

		
		$('#static-dialog img').attr('src', $(this).attr('href'));

		$('.modal-close').show();
		$('#static-dialog').dialog({
            width: winW,
            height: winH,
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
               $('#static-dialog img').attr('src', '');
               $('#static-dialog').fadeOut();
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


    $(".pages").on('click', '.video', function () {
    	//alert(1);
        var url = this.href,
			name = $(this).find('p').text();

		$(this).find('span').children('img').addClass('on');
		setTimeout(function() {
        	$("#video_pop").html(

        	'<div><img class="vp-close-btn" src="images/ashe-incyte-popup-btn-x.png" style="padding: 50px;" alt="Close" title="Close"></div>' +
    		'<video autoplay id="the_Video" data-videoname="'+ name +'" width="100%" height="100%"><source src="' + url + '" type="video/mp4" /></video>' +

			'<div class="video-on-discover col-xs-12">' +
				'<div class="col-xs-1 text-right"><img class="discover-pu-play-pause-btn paused" src="images/ashe-incyte-pause-btn.png"></div>' +

				'<div class="col-xs-1 text-center"><img class="discover-pu-rewind-btn" src="images/ashe-incyte-rewind-btn.png"></div>' +
				'<div class="col-xs-10"><progress id="progressbar6" max="100" value="0">' +
					'<div class="progressbar2">' +
				        '<span style="width: 100%;"></span>' +
				    '</div>' +
			    '</progress></div>' +
		    '</div>').css('display', 'block');

					/* discover pop-up controls */
					setTimeout(function() {
						videoBarProgress('the_Video', 'progressbar6');
					}, 500);

					// setTimeout(function() {
					// 	basicVidControl('video#the_Video', '.discover-pu-play-pause-btn');
					// }, 500);
					setTimeout(function() {
							$('.pages').on('click', '.discover-pu-play-pause-btn', function() {

								if ( $('.discover-pu-play-pause-btn').hasClass('paused') ) {
									$('video#the_Video').get(0).play();
									$('.discover-pu-play-pause-btn').attr('src', 'images/ashe-incyte-pause-btn.png');
								} else {
									$('video#the_Video').get(0).pause();
									$('.discover-pu-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png');	
								}

								videoBarProgress('the_Video', 'progressbar6');
							});
					}, 250);

					setTimeout(function() {
			  			vidEnded('video#the_Video', '.discover-pu-play-pause-btn');
						$('video#the_Video').on('ended', function() {
							$('.vp-close-btn').trigger('click');
						});
			  		}, 500);
			//ThreeFXanalytics.VideoTracking();
		}, 1000);


		$('.pages').on('click', '#video_pop img.vp-close-btn', function() {
			$('#the_Video').get(0).pause();
			$('#the_Video').get(0).currentTime = 0;
			$('#video_pop').fadeOut();
		});

		// Video controls
  		$('.pages').on('click', '.play-pause-btn', function() {
				$('video#the_Video').get(0).pause();
				$('.play-pause-btn').attr('src', 'images/play-btn.png').addClass('paused');	

	  			$('.pages').on('click', '.play-pause-btn.paused', function() {
					$('video#the_Video').get(0).play();
					$('.play-pause-btn').attr('src', 'images/pause-btn.png').removeClass('paused');
		  		});
  		});

  // 		setTimeout(function() {
		// 	$('video#the_Video').on('ended', function() {
		// 		$('.home-btn').trigger('click');
		// 	});
		// }, 5000);

  		// force restart if replay button in top nav clicked
  		$('.pages').on('click', '.replay-btn', function() {
  				$('video#the_Video').load();
				$('.play-pause-btn').attr('src', 'images/pause-btn.png');	
				$('.play-pause-btn').show();
  		});
		
		ThreeFXanalytics.VideoTracking();
        return false;
    });

    /* FADE OUT VIDEO PLAYER HOME BTN */
    // $('.pages').on('click', '.video-pop', function () {
    // 	$('.carousel').carousel(0); 
    // 	//$('#video_pop').fadeOut();
    // 	if ( $('#carousel-home div.carousel-caption > div span img').hasClass('on') ) {
    // 		$('#carousel-home div.carousel-caption > div span img').removeClass('on');
    // 	}
    // });


    // Portfolio page pop-up
    $('.pages').on('click', '.progress-bar', function () {
			var content = $(this).attr('data-content');
			//alert(content);
			$('.data-content-html').html(content);
				var disclaimerCopy = 'The efficacy and safety of the investigational compounds discussed have not been established. There is no guarantee that these compounds will become commercially available for the use(s) under investigation.'
				$('.disclaimer-copy').text(disclaimerCopy);
			if ( !$(this).hasClass('stopClick') ) {
				$('.popover-bg, .popover-close').fadeIn();
			}
		});
    $('.pages').on('click', '.popover-close', function () {
    	$('video').attr('src', '');
    	$('.popover-bg, .popover-close').fadeOut();
    });

 	// img over video to play port videos
	$('.pages').on('click', '.data-video-wrapper img', function() {
	   $('.data-video-wrapper .data-video-overlay').fadeOut();
	   $('.data-video-wrapper video').get(0).play();
	   $('.data-video-wrapper video').attr('controls', 'true');
	});



		/* NAV */
	    $(".pages").on("click", '#nav-toggle', function() {
    		//$(this).toggleClass( "active" );
    		if ( $('#nav-toggle').hasClass('active') ) {
    			// this opens nav; play
				$('#carousel-home').animate({height:'85px'}, 1000).css('background', 'rgba(255, 255, 255, .75');
				$('.carousel-control, .white-overlay').fadeOut();
				$('.video-on').fadeIn(1000);
				$('.discover-text').delay(200).fadeOut();
				$('.discover-play-pause-btn').click().attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
				$('video#discover-screen-video').get(0).play();
				$('#nav-toggle').removeClass('active').css('visibility', 'visible');
				$('.embed-responsive.embed-responsive-16by9.ss').fadeOut();
			} else {
				resetVideo();
				$('#carousel-home').animate({height:'314px'}, 1000).css('background', 'none');
				$('.discover-text, .carousel-control, .white-overlay,.embed-responsive.embed-responsive-16by9.ss').fadeIn();
				$('.video-on').fadeOut(500);
				$('#nav-toggle').addClass('active').css('visibility', 'hidden');;
				$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
			}
	  	});

		// whe tap screen to start clicked, trigger clicks on hamburger and play button to close nav and start video
  		$('.pages').on('click', '.discover-text', function() {
  			$('#nav-toggle').click();
  		});


/* discover video */
		$('.pages').on('click', '.discover-play-pause-btn', function() {
			$('video#discover-screen-video').get(0).pause();
			$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');	
 		});
		$('.pages').on('click', '.discover-play-pause-btn.paused', function() {
			$('video#discover-screen-video').get(0).play();
			$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-pause-btn.png').removeClass('paused');
		});

		videoBarProgress('discover-screen-video', 'progressbar');

		setInterval(function() {
  			if ( $('#progressbar').val() >= 99 ) {
  				$('.discover-play-pause-btn').attr('src', 'images/ashe-incyte-play-btn.png').addClass('paused');
				$('#nav-toggle').trigger('click');
  			}
  		}, 2000);


/* disease-state-a video */
		setTimeout(function() {
			videoBarProgress('disease-state-video', 'progressbar2');
		}, 500);
		basicVidControl('video#disease-state-video', '.disease-state-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#disease-state-video', '.disease-state-play-pause-btn');
  		}, 500);
/* rational-a-video controls */
		setTimeout(function() {
			videoBarProgress('rationale-a-video', 'progressbar3');
		}, 500);
		basicVidControl('video#rationale-a-video', '.rationale-a-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#rationale-a-video', '.rationale-a-play-pause-btn');
  		}, 500);
/* disease-state-b */
		setTimeout(function() {
			videoBarProgress('disease-state-b-video', 'progressbar4');
		}, 500);
		basicVidControl('video#disease-state-b-video', '.disease-state-b-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#disease-state-b-video', '.disease-state-b-play-pause-btn');
  		}, 500);
/* rational-b-video controls */
		setTimeout(function() {
			videoBarProgress('rationale-b-video', 'progressbar5');
		}, 500);
		basicVidControl('video#rationale-b-video', '.rationale-b-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#rationale-b-video', '.rationale-b-play-pause-btn');
  		}, 500);


/* discover pop-up controls */
		setTimeout(function() {
			videoBarProgress('the_Video', 'progressbar6');
		}, 500);
		basicVidControl('video#the_Video', '.discover-pu-play-pause-btn');
		setTimeout(function() {
  			vidEnded('video#the_Video', '.discover-pu-play-pause-btn');
  		}, 500);





/* popup for more information book thing */
$('.pages').on('click', '.popup-btn', function() {
	$('.pop-up-div').fadeIn();
	$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn-x.png').addClass('on');
});
$('.pages').on('click', '.popup-btn.on', function() {
	$('.pop-up-div').fadeOut();
	$('.popup-btn').attr('src', 'images/ashe-incyte-popup-btn.png').removeClass('on');
});

/**********
ECHO TRIAL
**********/
function resetEcho() {
	// reset icons and text
	for (var i = 1; i < 15; i++) {
		$('.icon' + i).attr('src', 'images/echo-icons/'+ i + '.png');
		$('.text' + i).css('opacity', '.4');
	}
	// rest echo # buttons
	for (var i = 1; i < 5; i++) {
		$('#echo-display .box' + i).html('');
	}
	// reset icon BG
	$('.echo').removeClass('changeButtonBG');
}
function btnOneBG() { $('.btnone').addClass('changeButtonBG'); }
function btnTwoBG() { $('.btntwo').addClass('changeButtonBG'); }
function btnThreeBG() { $('.btnthree').addClass('changeButtonBG'); }
function btnFourBG() { $('.btnfour').addClass('changeButtonBG'); }
function btnFiveBG() { $('.btnfive').addClass('changeButtonBG'); }
function btnSixBG() { $('.btnsix').addClass('changeButtonBG'); }

function imgSwap(number) {
	$('.icon' + number).attr('src', 'images/echo-icons/' + number + 'b.png');
}
function textSwap(number) {
	$('.text' + number).css('opacity', '1');
}

function echoAside(study) { 
	$('#echo-display .box1').append(study); 
}
function swapBG() {
	$('#echo-display img').attr('src', 'images/echo-bg-logo-bw.png');
}

$('.echo-view').on('click', function() {
	swapBG();
});

var echo202 = '<span class="display-content">' +
                '<h3 class="echo202Head">ECHO-202/KEYNOTE-037</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Merck Sharp &amp; Dohme Corp.)</span>' +
                    '<br>NCT02178722' +
                    '<br><strong>Epacadostat &#43; pembrolizumab</strong>' +
                    '<br>Phase: <b>1/2</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/show/NCT02178722" class="modal-show">VIEW TRIAL &rarr;</a>' +
            '</span>'

var echo202v2 = '<span class="display-content">' +
                '<h3 class="echo202Head">ECHO-202/KEYNOTE-037*</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Merck Sharp &amp; Dohme Corp.)</span>' +
                    '<br>NCT02178722' +
                    '<br><strong>Epacadostat &#43; pembrolizumab</strong>' +
                    '<br>Phase: <b>1/2' + 
					'<br>*Microsatellite-instability (MSI) high colorectal cancer only.</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/show/NCT02178722" class="modal-show">VIEW TRIAL &rarr;</a>' +
            '</span>'

var echo202v3 = '<span class="display-content">' +
                '<h3 class="echo202Head">ECHO-202/KEYNOTE-037*</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Merck Sharp & Dohme Corp.)</span>' +
                    '<br>NCT02178722' +
                    '<br><strong>Epacadostat &#43; pembrolizumab</strong>' +
                    '<br>Phase: <b>1/2' +
					'<br>*Diffuse large B-cell lymphoma only.</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/show/NCT02178722" class="modal-show">VIEW TRIAL &rarr;</a>' +
            '</span>'

var echo203 = '<span class="display-content">' +
                '<h3 class="echo203Head">ECHO-203</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with MedImmune, LLC)</span>' +
                    '<br>NCT02318277' +
                    '<br><strong>Epacadostat &#43; durvalumab</strong>' +
                    '<br>Phase: <b>1/2</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/show/NCT02318277" class="modal-show">VIEW TRIAL &rarr;</a>' +
              '</span>'

var echo110 = '<span class="display-content">' +
                '<h3 class="echo110Head">ECHO-110</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Hoffmann-La Roche/Genentech, Inc.)</span>' +
                    '<br>NCT02298153' +
                    '<br><strong>Epacadostat &#43; atezolizumab</strong>' +
                    '<br>Phase: <b>1</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/ct2/show/NCT02298153" class="modal-show">VIEW TRIAL &rarr;</a>' +
              '</span>'

var echo204 = '<span class="display-content">' +
                '<h3 class="echo204Head">ECHO-204</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Bristol-Myers Squibb)</span>' +
                    '<br>NCT02327078' +
                    '<br><strong>Epacadostat &#43; nivolumab</strong>' +
                    '<br>Phase: <b>1/2</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/show/NCT02327078" class="modal-show">VIEW TRIAL &rarr;</a>' +
              '</span>'

var echo206 = '<span class="display-content">' +
                '<h3 class="echo206Head">ECHO-206</h3>' +
                '<p>' +
                    '<br>NCT02959437' +
                    '<br><strong>Epacadostat+pembrolizumab+azacitidine</strong>' +
                    '<br>Phase: <b>1/2</b>' +
                '</p>' +
                '<a href="https://clinicaltrials.gov/ct2/show/NCT02959437?term=NCT02959437&rank=1" class="modal-show">VIEW TRIAL &rarr;</a>' +
              '</span>'


var echo301 = '<span class="display-content">' +
                '<h3 class="echo301Head">ECHO 301/KEYNOTE&ndash;252</h3>' +
                '<p>' +
                    '<span class="font20">(collaboration with Merck Sharp &amp; Dohme Corp.)</span>' +
                    '<br>NCT02752074' +
                    '<br><strong>Epacadostat &#43; pembrolizumab</strong>' +
                    '<br>Phase: <b>3</b>' +
                '</p>' +
                '<a href="images/Final PDF_ECHO 301.png" class="modal-show">VIEW TRIAL &rarr;</a>' +
              '</span>'




/* ECHO TRIAL STATES */
	// INDIVIDUAL ICONS
	$('.pages').on('mousedown touchstart', '.icon1', function() {
		resetEcho();
		swapBG();
		// btnOneBG();
		btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('1');
		textSwap('1');
		echoAside(echo202);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon2', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();	
		btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('2');
		textSwap('2');
		echoAside(echo202);echoAside(echo203);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon3', function() {
		resetEcho();
		// btnFiveBG();	
		swapBG();
		btnTwoBG();btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('3');
		textSwap('3');
		echoAside(echo202v2);echoAside(echo204);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon4', function() {
		resetEcho();
		swapBG();
		// btnTwoBG();	
		btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('4');
		textSwap('4');
		echoAside(echo202);echoAside(echo203);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon5', function() {
		resetEcho();
		swapBG();
		// btnFiveBG();		
		btnOneBG();btnTwoBG();btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('5');
		textSwap('5');
		echoAside(echo204);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon6', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();btnFiveBG();	
		btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('6');
		textSwap('6');
		echoAside(echo202);echoAside(echo203);echoAside(echo204);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon7', function() {
		resetEcho();
		swapBG();
		// btnOneBG();
		btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('7');
		textSwap('7');
		echoAside(echo202);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon8', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();btnFourBG();btnFiveBG();
		btnThreeBG();btnSixBG();
		imgSwap('8');
		textSwap('8');
		echoAside(echo202);echoAside(echo203);echoAside(echo204);echoAside(echo301);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon9', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnFiveBG();	
		btnTwoBG();btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('9');
		textSwap('9');
		echoAside(echo202v3);echoAside(echo204);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon10', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();btnThreeBG();btnFiveBG();	
		btnFourBG();btnSixBG();
		imgSwap('10');
		textSwap('10');
		echoAside(echo110);echoAside(echo202);echoAside(echo203);echoAside(echo204);		
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon11', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnFiveBG();	
		btnTwoBG();btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('11');
		textSwap('11');
		echoAside(echo202);echoAside(echo204);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon12', function() {
		resetEcho();
		swapBG();
		// btnOneBG();
		btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('12');
		textSwap('12');
		echoAside(echo202);
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon13', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();	
		btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('13');
		textSwap('13');
		echoAside(echo110);echoAside(echo202);echoAside(echo203);		
		return false;
	});
	$('.pages').on('mousedown touchstart', '.icon14', function() {
		resetEcho();
		swapBG();
		// btnOneBG();btnTwoBG();	
		btnOneBG();btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();
		imgSwap('14');
		textSwap('14');
		echoAside(echo206);		
		return false;
	});
	// ECHO #ICONS
	// 202
	$('.pages').on('mousedown touchstart', '.btnone', function() {
		resetEcho();
		// btnOneBG();	
		btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('1');imgSwap('2');imgSwap('3');imgSwap('4');imgSwap('6');imgSwap('7');imgSwap('8');imgSwap('9');imgSwap('10');imgSwap('11');imgSwap('12');imgSwap('13');
		textSwap('1');textSwap('2');textSwap('3');textSwap('4');textSwap('6');textSwap('7');textSwap('8');textSwap('9');textSwap('10');textSwap('11');textSwap('12');textSwap('13');
		echoAside(echo202);
		swapBG();
		return false;
	});
	// 203
	$('.pages').on('mousedown touchstart', '.btntwo', function() {
		resetEcho();
		// btnTwoBG();	
		btnOneBG();btnThreeBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('2');imgSwap('4');imgSwap('6');imgSwap('8');imgSwap('10');imgSwap('13');		
		textSwap('2');textSwap('4');textSwap('6');textSwap('8');textSwap('10');textSwap('13');
		echoAside(echo203);
		swapBG();
		return false;
	});
	// 110
	$('.pages').on('mousedown touchstart', '.btnthree', function() {
		resetEcho();
		// btnThreeBG();		
		btnOneBG();btnTwoBG();btnFourBG();btnFiveBG();btnSixBG();
		imgSwap('10');imgSwap('13');
		textSwap('10');textSwap('13');
		echoAside(echo110);
		swapBG();
		return false;
	});
	// 301
	$('.pages').on('mousedown touchstart', '.btnfour', function() {
		resetEcho();
		// btnFourBG();
		btnOneBG();btnTwoBG();btnThreeBG();btnFiveBG();btnSixBG();
		imgSwap('8');
		textSwap('8');
		echoAside(echo301);
		swapBG();
		return false;
	});
	// 204
	$('.pages').on('mousedown touchstart', '.btnfive', function() {
		resetEcho();
		// btnFiveBG();	
		btnOneBG();btnTwoBG();btnThreeBG();btnFourBG();btnSixBG();
		imgSwap('3');imgSwap('5');imgSwap('6');imgSwap('7');imgSwap('8');imgSwap('9');imgSwap('10');imgSwap('11');
		textSwap('3');textSwap('5');textSwap('6');textSwap('7');textSwap('8');textSwap('9');textSwap('10');textSwap('11');
		echoAside(echo204);
		swapBG();
		return false;
	});
	// 206
	$('.pages').on('mousedown touchstart', '.btnsix', function() {
		resetEcho();
		// btnSixBG();	
		btnOneBG();btnTwoBG();btnThreeBG();btnFourBG();btnFiveBG();	
		imgSwap('14');
		textSwap('14');
		echoAside(echo206);
		swapBG();
		return false;
	});
}); 