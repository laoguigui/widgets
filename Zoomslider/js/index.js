/**
 * Created by Administrator on 2017/7/9 0009.
 */
$(function(){
    $(".content .cloud-zoom").fancybox({
        'transitionIn'	:	'elastic',
        'transitionOut'	:	'none',
        'speedIn'		:	600,
        'speedOut'		:	200,
        'overlayShow'	:	true,
        'overlayColor'	:	'#000',
        'cyclic'		:	true,
        'easingIn'		:	'easeInOutExpo'
    });
    $(".content .mousetrap").live('click',function(){
        $(this).prev().trigger('click');
    });
    //¼ÓÔØÍ¼Æ¬
    var $content = $(".content");
    var $item_list = $content.find('.slider>ul');
    $item_list.each(function(){
        var $this_list = $(this),
        total_width = 0,
        loaded=0;
        var $images = $this_list.find('img'),
            total_img = $images.length;
        $images.each(function(){
            var $img = $(this);
            $('<img/>').load(function(){
                ++loaded;
                if(loaded==total_img){
                    $this_list.data('current',0).children().each(function(){
                        total_width+=$(this).width();
                    });
                    $this_list.css('width',total_width+"px");
                    //pre/next
                    $this_list.parent().siblings('.next').bind('click',function(e){
                        var current = $this_list.data('current');
                        var next = ++current;
                        if(current==$this_list.children().length-1) return false;
                        $this_list.data('current',next).stop()
                            .animate({
                                'marginLeft':-next*$this_list.children(':first').width()+'px'
                            },400);
                        e.preventDefault();
                    })
                        .end()
                        .siblings('.pre').bind('click',function(e){
                            var current = $this_list.data('current');
                            pre = --current;
                            if(current==0) return false;
                            $this_list.data('current',pre).stop()
                                .animate({
                                    'marginLeft':pre*$this_list.children(':first').width()+'px'
                                },400);
                            e.preventDefault();
                        })
                }
            }).attr('src',$img.attr('src'));
        })

    })

});
