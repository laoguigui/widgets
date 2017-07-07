/**
 * Created by Administrator on 2017/7/3 0003.
 */
$(function () {
    var $ac_background = $('#ac_background');
    var $ac_bgimg = $ac_background.find('.ac_bgimage');
    var $ac_loading = $ac_background.find('.ac_loading');
    var $ac_content = $('#ac_content');
    var $title = $ac_content.find('h1');
    var $ac_menu = $ac_content.find('.ac_menu');
    var $menu_nav = $ac_menu.find('ul:first');
    var $sub_menu = $menu_nav.children('li');
    var total_item = $sub_menu.length;
    var $Itemimage = new Array();
    //把背景图放到数组中
    $sub_menu.each(function(i){
        $Itemimage.push($(this).children('a:first').attr('href'));
    });
    $Itemimage.push($ac_bgimg.attr('src'));
    var Menu = (function(){
        var init = function(){
                Loadpage();
                initwindows();
            },
            Loadpage = function(){
                $ac_loading.show();
                $.when(loadimage()).done(function(){
                    $.when(showBgimage()).done(function(){
                        $ac_loading.hide();
                        $.when(slideout()).done(function(){
                            $.when(toggleMenuItem('up')).done(function(){
                                initEventsSubMenu();
                            });
                        });
                    });
                });
            },
            showBgimage = function(){
                return $.Deferred(function(dfd){
                    adjustImage($ac_bgimg);
                    $ac_bgimg.fadeIn(1000,dfd.resolve);
                }).promise();
            },
            slideout = function(){
                var new_w = $(window).width()-$title.outerWidth(true);
                return $.Deferred(
                    function(dfd){
                        $ac_menu.stop()
                            .animate({
                                width : new_w + 'px'
                            },700,dfd.resolve);
                    }).promise();
            },

            toggleMenuItem = function(dir){
                return $.Deferred(
                    function(dfd){
                        $sub_menu.each(function(i){
                            var $el_title = $(this).children('a:first'),
                                marginTop,opacity,easing;
                            if(dir==='up'){
                                marginTop = '0px';
                                opacity = 1;
                                easing = 'easeOutBack';
                            }
                            else if(dir==='down'){
                                marginTop = '60px';
                                opacity = 0;
                                easing = 'easeInBack';
                            }
                            $el_title.stop()
                                .animate({
                                    marginTop:marginTop,
                                    opacity:opacity
                                },200+200*i,easing,function(){
                                    if(i ===total_item-1)
                                        dfd.resolve();

                                });
                        });
                    }).promise();
            },
            initEventsSubMenu = function(){
                $sub_menu.each(function(i){
                    var $item = $(this);
                    var $item_title = $item.children('a:first');
                    var el_image = $item_title.attr('href');
                    var $ac_subitem = $item.find('.ac_subitem');
                    var $ac_close = $ac_subitem.find('.ac_close');
                    $item_title.bind('click.Menu',function(e){
                        $.when(toggleMenuItem('down')).done(function(){
                            openitem($item,$ac_subitem,el_image);
                        });
                        return false;
                    });
                    $ac_close.bind('click.Menu',function(e){
                        closeitem($ac_subitem);
                        return false;
                    });
                });
            },

            openitem = function($item,$ac_subitem,el_image){
                $ac_subitem.stop()
                    .animate({
                    height:'400px',
                    marginTop:'-200px'
                },400,function(){
                    showItemImage(el_image);
                });
            },
            showItemImage = function(source){
                if(source===$ac_bgimg.attr('src')){
                    return false;
                }
                var $itemimage = $('<img src="'+source+'" alt="Background" class="ac_bgimage">');
                $itemimage.insertBefore($ac_bgimg);
                adjustImage($itemimage);
                $ac_bgimg.fadeOut(1500,function(){
                    $(this).remove();
                    $ac_bgimg = $itemimage;
                });
                $itemimage.fadeIn(1500);

            },
            closeitem = function($ac_subitem){
                $ac_subitem.stop()
                    .animate({
                    height           :'0px',
                    marginTop       :'0px'
                },400,function(){
                    toggleMenuItem('up');
                });
            },
            initwindows = function(){
                $(window).bind('resize.Menu',function(){
                    adjustImage($ac_bgimg);
                    var new_w = $(window).width()-$title.outerWidth(true);
                    $ac_menu.css('width',new_w+'px');
                });
            },
            adjustImage =  function($img) {
                var w_w	= $(window).width(),
                    w_h	= $(window).height(),
                    r_w	= w_h / w_w,
                    i_w	= $img.width(),
                    i_h	= $img.height(),
                    r_i	= i_h / i_w,
                    new_w,new_h,
                    new_left,new_top;

                if(r_w > r_i){
                    new_h	= w_h;
                    new_w	= w_h / r_i;
                }
                else{
                    new_h	= w_w * r_i;
                    new_w	= w_w;
                }

                $img.css({
                    width	: new_w + 'px',
                    height	: new_h + 'px',
                    left	: (w_w - new_w) / 2 + 'px',
                    top		: (w_h - new_h) / 2 + 'px'
                });
            },
            loadimage = function(){
                return $.Deferred(
                    function(dfd){
                        var image_num = $Itemimage.length;
                        var loaded = 0;
                        for(var i = 0;i<image_num;++i){
                            $('<img/>').load(function(){
                                ++loaded;
                                if(loaded===image_num){
                                    dfd.resolve();
                                }
                            }).attr('src',$Itemimage[i]);
                        }
                    }).promise();
            };
        return {
            init:init
        };
    })();
    Menu.init();
});