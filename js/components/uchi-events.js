/**
 * UCHI Events JS.
 */
(function($) {
  // Tabbed Event controls. Hide elements in events.css. Also used in Alumni Club pages.
  $('.tabbed-nav.events a').on('click', function(e){
    e.preventDefault();
    var display = $(this).data('display');
    if (!$(this).hasClass('active')) {
      $('.tabbed-nav.events a').removeClass('active');
      $(this).addClass('active');
      $('.event-block.tab-target').hide();
      $('.event-block.' + display).show();
      if ($(this).hasClass('logged-in')) {
        $('.event-block.event-cards').hide();
        $('.event-block.' + display).show();
        $('.event-block').addClass('logged-in');
      } else {
        $('.event-block').removeClass('logged-in');
      }
    }
  });

  // Make sure there's a focus state for our fancy switch.
  $('.switch input').focus(function(){
    $(this).parent().addClass('active');
  }).blur(function(){
    $(this).parent().removeClass('active');
  });

  // Diff / Fave tooltips.
  $('.diss').hover(function(){
    $(this).next('.miss').show();
  }, function() {
    $(this).next('.miss').hide();
  });
  // Diff / Fave tooltips.
  $('.fave').hover(function(){
    $(this).next('.save').show();
  }, function() {
    $(this).next('.save').hide();
  });

  // Note: this may need to be removed on implementation.
  $('.pager a').click(function(e){
    e.preventDefault();
    $(this).blur();
  });

  // Listbox multiselect, AKA side-by-side select.
  $(".btn-left, .btn-up").click(function() {
    var el = $(this).parent().parent(),
        selectedItem = el.find(".right-values option:selected");
    $(this).parent().parent().find(".left-values").append(selectedItem);
  });
  $(".btn-right, .btn-down").click(function() {
    var el = $(this).parent().parent(),
        selectedItem = el.find(".left-values option:selected");
    $(this).parent().parent().find(".right-values").append(selectedItem);
  });
  $(".btn-up-sort").click(function() {
    var el = $(this).parent().parent(),
        selectedItem = el.find(".right-values option:selected");
    selectedItem.prev().insertAfter(selectedItem);
  });
  $(".btn-down-sort").click(function() {
    var el = $(this).parent().parent(),
        selectedItem = el.find(".right-values option:selected");
    selectedItem.insertAfter(selectedItem.next());
  });


  // Tooltips!
  $(".tooltip").on({
    "mouseenter focus": function(){
      var tipPos = parseInt($(this).position().left,10) + 7;
      $(this).find('.tooltip-text .pointer').css({
        'left': tipPos + 'px',
        })
      $(this).find('.tooltip-text').css({
        'left':'-' + tipPos + 'px',
        }).fadeIn('fast');
    }, "mouseleave blur": function(){
      $(this).find('.tooltip-text').hide();
    }
  });

  // Hidden info columns.
  $(".js-info-column-additional-btn").click(function() {
    $(this).parents('.info-column')
      .toggleClass('open')
      .siblings('.payments-row.pending')
      .toggleClass('visible');
  });

  // Sub-checkboxes.
  $(".privacy-settings input").change(function() {
    var el = $(this),
        elSub = $(".privacy-sub-settings input");
    if (el.prop('checked')) {
      elSub.prop("disabled", false);
    } else {
      elSub.prop("checked", false).prop("disabled", true);
    }
  });

  // Toggles
  $("#external-job-toggle").change(function() {
      $("#external-job-link").slideToggle();
  })

  // Event Registration toggle
  $('.ticket-selection input[type="checkbox"]').on('click', function () {
    $(this).siblings('.additional-row-info').find('.additional-ticket-quantity').toggleClass('visible');
  });

  // event submission location info
  var $location_infos = $(".location-type-info");
  if ($location_infos.length > 0) {
    $("input[name='location']").change(function() {
      var show = $(this).val();
      checkLocation(show);
    });
    var current_location_val = $("input[name='location']:checked").val();
    checkLocation(current_location_val);
  }

  function checkLocation(show) {
    $location_infos.hide();
    if (show == 'location') {
      $('#location-event-loc').show();
    } else {
      $('#location-online').show();
    }
  }

  // event submission registration info
  var $reg_infos = $(".registration-type-info");
  if ($reg_infos.length > 0) {
    $("input[name='registration']").change(function() {
      var show = $(this).val();
      checkRegistration(show);
    });
    var current_reg_val = $("input[name='registration']:checked").val();
    checkRegistration(current_reg_val);
  }

  function checkRegistration(show) {
    $reg_infos.hide();
    if (show == 'uchicago') {
      $('#registration-uchicago').show();
    } else {
      $('#registration-self').show();
    }
  }

  $('.message-bar .close').on('click', function(e){
    e.preventDefault();
    $(this).parent().parent().hide();
  });

  // Remove confirmation
  $('.user-registration button.remove').hover(function(){
    $(this).next('.confirm').fadeIn('fast');
  }, function() {
    $(this).next('.confirm').fadeOut('fast');
  });

  if ($('.alumni-fullsearch .search-term .value').length > 0) {
    $('.alumni-fullsearch .search-term .value .diss').on('click', function(e){
      e.preventDefault();
      $(this).parent().find('.search-term-boxes').val("");
    });
    $('.alumni-fullsearch .clear-term-search').on('click', function(e){
      e.preventDefault();
      $(this).parent().find('.term-search').val("");
    });
  };

  if ($('.search-container').length > 0) {
    $('.search-container .clear-term-search').on('click', function(e){
      e.preventDefault();
      $(this).parent().find('.search').val("");
    });
  };

  $('.modal-wrapper .button.close').on('click', function(e){
    e.preventDefault();
    $('.modal-wrapper').fadeOut('fast');
  });

  $('.button.join-waitlist').on('click', function(e){
    e.preventDefault();
    $('.modal-wrapper.hidden').fadeIn('fast');
  });

});
