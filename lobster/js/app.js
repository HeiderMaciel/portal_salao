$(window).load(function(){
  call_grid();
  call_scroll();
  call_slider_sequence();    
  call_datatables();
  call_tab();
  call_full_calendar();
  call_functional_reservations();
  call_lightbox();
  call_control_color_theme();
  call_lazy_load_images();
  call_form_validation();
});

function call_form_validation(){
  if ($('.lobstrer_form_validation').length > 0){
    $('.lobstrer_form_validation').validate(); 
  }
}



function call_lazy_load_images(){
  //$("#content img").unveil(300)
  $("#content img").unveil(300);
}

function call_control_color_theme(){
  if ($.cookie('color_theme')){
    $('body').removeClass().addClass($.cookie('color_theme'));
  }
  $('.control_color a').click(function(e){
    e.preventDefault();
    $.cookie('color_theme', $(this).data('color'), {
      expires: 7
    });
    $('body').removeClass().addClass($(this).data('color'));
  });
}

function call_functional_reservations(){
  $('.select_room .item_grid').click(function(e){
    e.preventDefault();
    $('.select_room').find('.item_grid').removeClass('selected');
    $(this).addClass('selected');
    $('#form_select_room').val($(this).data('date'));
  });
    
  $('.checkbox_extras').click(function(e){
    call_grid();
    if ($(this).is(':checked')) {
      $(this).parents('.panel').find('select').show();
    } else {
      $(this).parents('.panel').find('select').hide();
    } 
  });
}

function call_tab(){
  $('.lobster_tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
}

function call_full_calendar(){
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
    
  var selector = $('#calendar');
  if($(selector).length > 0){
    $('#calendar').fullCalendar({
      editable: false,
      events: [
      {
        title: 'Full',
        start: new Date(y, m, 1)
      },{
        title: 'Full',
        start: new Date()
      }],
      dayClick: function() {
        $('#calendar').find('td').removeClass('selected');
        $(this).addClass('selected');
        $('#form_date').val($(this).data('date'));
      }
    });   
    $('#calendar2').fullCalendar({
      editable: false,
      events: [
      {
        title: 'Full',
        start: new Date(y, m, 1)
      },{
        title: 'Full',
        start: new Date()
      }],
      dayClick: function() {
        $('#calendar2').find('td').removeClass('selected');
        $(this).addClass('selected');
        $('#form_date2').val($(this).data('date'));
      }
    });  
  }
}

function call_datatables(){
  if ($('.datatables_group').length > 0){
    var oTable = $('.datatables_group').dataTable({
      "fnDrawCallback": function ( oSettings ) {
        if ( oSettings.aiDisplay.length == 0 )
        {
          return;
        }
        var nTrs = $('.datatables_group tbody tr');
        var iColspan = nTrs[0].getElementsByTagName('td').length;
        var sLastGroup = "";
        for ( var i=0 ; i<nTrs.length ; i++ )
        {
          var iDisplayIndex = oSettings._iDisplayStart + i;
          var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
          if ( sGroup != sLastGroup )
          {
            var nGroup = document.createElement( 'tr' );
            var nCell = document.createElement( 'td' );
            nCell.colSpan = iColspan;
            nCell.className = "group";
            nCell.innerHTML = sGroup;
            nGroup.appendChild( nCell );
            nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
            sLastGroup = sGroup;
          }
        }
      },
      "aoColumnDefs": [
      {
        "bVisible": false, 
        "aTargets": [ 0 ]
      }
      ],
      "aaSortingFixed": [[ 0, 'asc' ]],
      "aaSorting": [[ 1, 'asc' ]],
      "sDom": 'lfr<"giveHeight"t>ip',
      "sPaginationType": "full_numbers",
      "aoColumns": [
      {
        "sWidth": "10%"
      }, {
        "sWidth": "45%"
      }, {
        "sWidth": "45%"
      },]
    });   
  }
}

function call_slider_sequence(){
  if($('#sequence').length > 0){
    var options = {
      autoPlay: true,
      autoPlayDelay: 6000,
      pauseOnHover: false,
      hidePreloaderDelay: 1000,
      nextButton: true,
      prevButton: true,
      pauseButton: true,
      preloader: true,
      hidePreloaderUsingCSS: false,                   
      animateStartingFrameIn: true,    
      navigationSkipThreshold: 1700,
      preventDelayWhenReversingAnimations: true,
      customKeyEvents: {
        80: "pause"
      }
    };
    

    var sequence = $("#sequence").sequence(options).data("sequence");
  }
}


function call_grid(){
  setTimeout(function() {
    var selector = $('.gridmasonry');
    if($(selector).length > 0){
      $(selector).fadeIn();
      var $container = $('.gridmasonry');
      // trigger masonry
      $container.masonry({
        itemSelector: '.item_grid'
      });
      
    }
  }, 500);
    
}

function call_scroll(){
  /*Show back to top*/    
  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $('#top_header').addClass('mini_menu');
      $('#back_to_top').fadeIn();
    } else {
      $('#top_header').removeClass('mini_menu');
      $('#back_to_top').fadeOut('fast');
    }
  });
  $("#back_to_top").localScroll({
    target:'body'   
  });
}

function call_lightbox(){
  if($('.image_link').length > 0){
    $('.image_link').magnificPopup({
      type:'image'
    
    });  
  }
  
  if($('.galeries_footer').length > 0){
    $('.galeries_footer').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: 'The image could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title') + '<small>by Your name</small>';
        }
      }
    }); 
  }
}