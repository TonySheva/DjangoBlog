      //底部戳我微信号
      $('.pull-right').mouseenter(function(){
        $(this).find('.my_weixin').show();
      });
      $('.pull-right').mouseleave(function(){
        $(this).find('.my_weixin').hide();
      });
      //顶部导航下移显示
      $(window).scroll(function() {
         if($(window).scrollTop()>=1000){
          //console.log($(window).scrollTop());
          $('#menu').css('background-color','black');
          $('#menu').css('border-color','1px solid black');
         }
         if($(window).scrollTop()<1000){
          $('#menu').css('background-color','rgba(248, 248, 248, 0)');
          $('#menu').css('border-color','rgba(231, 231, 231, 0)');
         }
      });
      //点击标题显示全文
      $('.show_all').click(function(){
          $(this).parent().parent().parent().siblings().css('display','none');
          $(this).parent().parent().parent().removeClass('col-lg-3 col-md-4 col-sm-6 col-xs-12').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 showdetail').siblings().addClass('hidedetail');
          $('.list_nav').fadeOut();
          $('.tcdPageCode').fadeOut();
          $('.btn_nav').fadeIn("slow");
          $(this).parent().parent().css('overflow','inherit');
          $('.article_topic').css('max-height','none');
      });
      //退出全文后恢复
      $('.back_btn').click(function(){
         $('.list_nav').fadeIn("slow");
         $('.tcdPageCode').fadeIn("slow");
         $('.btn_nav').fadeOut();
         $('.sort_div >div').css('display','block').siblings().css('display','block');
         $('.showdetail').removeClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 showdetail').addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12');
         $('.hidedetail').removeClass('hidedetail');
         $('.article_topic').css('overflow','hidden');
         $('.article_topic').css('max-height','194');
      });

      //筛选导航开始
      $('.select_nav a').click(function(){
        $(this).addClass('active_nav').siblings().removeClass('active_nav');
        var name=$(this).data('name');
        var count =$('.article_topic').length;
        if(name =="all"){
          var arr =Array();
          for(i=0;i<count;i++){
            arr[i] =$('.article_topic').parent().eq(i).data('time');
            $('.sort_div').find('.col-xs-12').eq(i).fadeIn("slow");
          }
          //冒泡排序
          var len =count;
          for(i=0;i<len;i++){
            for(j=0;j<len;j++){
              if(arr[i]<arr[j]){
                d=arr[j];
                arr[j]=arr[i];
                arr[i]=d;
              }
            }
          }
          for(i=0;i<len;i++){
            $('.sort_div').append($('.col-xs-12[data-time="'+arr[i]+'"]'));
          }
        }
        //按照时间排序
        if(name =="time"){
          var arr =Array();
          for(i=0;i<count;i++){
            arr[i] =$('.article_topic').parent().eq(i).data('time');
          }
          //冒泡排序
          var len =count;
          for(i=0;i<len;i++){
            for(j=0;j<len;j++){
              if(arr[i]<arr[j]){
                d=arr[j];
                arr[j]=arr[i];
                arr[i]=d;
              }
            }
          }
          arr=arr.reverse();
          console.log(arr);
          for(i=0;i<len;i++){
            $('.sort_div').append($('.col-xs-12[data-time="'+arr[i]+'"]'));
          }
        }
    });
      //搜索筛选开始
      $('.search_btn').click(function(){
        $('.select_nav a').removeClass('active_nav');
        var count =$('.article_topic').length;
        var keyword =$('.search_keyword').val();
        //console.log(keyword);
          var arr =Array();
          for(i=0;i<count;i++){
          arr[i] =$('.show_all').eq(i).find('strong').text();
          $('.sort_div').find('.col-xs-12').eq(i).fadeOut("slow");
          }
          //console.log(arr);
          var len =count;
          for(i=0;i<len;i++){
             if(arr[i].indexOf(keyword)>-1){
               $('.sort_div').find('.col-xs-12').eq(i).fadeIn("slow");
             }
          }
      });
      //分页
      var page = $('.article_topic').length;
      var page = Math.ceil(page / 12);
    for (i = 12; i < page * 12; i++) {
        $('.article_topic').parent().eq(i).hide();
    }
    $(".tcdPageCode").createPage({
        pageCount: page,
        current: 1,
        backFn: function (p) {
            //console.log(p);
            for (i = 12; i < page * 12; i++) {
                $('.article_topic').parent().eq(i).hide();
            }
            for (i = 0; i < p * 12; i++) {
                $('.article_topic').parent().eq(i).hide();
            }
            for (i = p * 12 - 12; i < p * 12; i++) {
               $('.article_topic').parent().eq(i).show();
            }
        }
    });