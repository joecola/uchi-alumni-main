/**
 * Global JS - site-wide javascript.
 *
 * Uses jQuery for backwards compatability.
 */

(function($) {
  $(document).ready(function() {

    // Sticky Nav
    if ($(window).width() < 1170) {
      var triggerPoint = 57;
    } else {
      var triggerPoint = 67;
    }
    $(window).scroll(function() {
      if ($(document).scrollTop() > triggerPoint) {
        $('header').addClass('sticky');
      } else {
        $('header').removeClass('sticky');
      }
    });
    if ($(document).scrollTop() > triggerPoint) {
      $('header').addClass('sticky');
    };

    // Tablet / Desktop Search.
    $('.search a').on('click', function(e){
      e.preventDefault();
      $('.search form')
        .addClass('open')
        .css('opacity', '1')
        .find('input')
        .focus();
      $('body').on('click', function(e){
        if ( e.target.name === 'search-input' || e.target.name === 'search-trigger' ) {
          return;
        } else {
        $('.search form').animate({
            'opacity': '0'
          }, 300, function() {
            $(this).removeClass('open');
          })
        }
      })
    });

    // Subnav show/hide, close button, ESC key.
    $('nav.primary a').each(function(){
      var el = $(this);
      el.on('click', function(e){
        e.preventDefault();
        if (!$(this).hasClass('active')) {
          $('nav.primary a.active').removeClass('active');
          $('.subnav').fadeOut('slow');
          $('#' + el.data('subnav')).fadeIn('fast').focus();
          el.addClass('active');
        } else {
          $('nav.primary a.active').removeClass('active');
          $('.subnav').fadeOut('fast');
        }
      });
    });

    $('.subnav .close').on('click', function(e){
      $('.subnav').fadeOut('fast');
      $('nav.primary a.active').focus().removeClass('active').css({'color':'#333333'});
    });

    // Make sure the ESC key closes everything.
    $(document).keyup(function(f) {
      if (f.which === 27) {
        $('.subnav').fadeOut('fast');
        $('nav.primary a.active').focus().removeClass('active');
        $('.search form').animate({
          'opacity': '0'
        }, 300, function() {
          $(this).removeClass('open');
        });
        $('body').removeClass('noscroll');
        $('.nav-item-mobile > a')
          .removeClass('open')
          .parent()
          .find('.menu-level1')
          .fadeOut('fast');
        $('.search-mobile > a')
          .removeClass('open')
          .parent()
          .find('.search-form-mobile')
          .fadeOut('fast');
         $('.logout').hide();
      }
    });

    // Ensure we remove the tablet/desktop subnavs for mobile.
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
    var debouncedMobileCheck = debounce(function() {
      if ($(window).width() < 768) {
        $('.subnav .close').trigger('click');
      }
      if ($(window).width() < 1170) {
        triggerPoint = 57;
      } else {
        triggerPoint = 67;
      }
    }, 250);
    window.addEventListener('resize', debouncedMobileCheck);

    // Mobile menus.
    $('.nav-item-mobile > a').on('click', function(e){
      e.preventDefault();
      $('.search-mobile > a')
        .removeClass('open')
        .parent()
        .find('.search-form-mobile')
        .fadeOut('fast');
      $(this)
        .toggleClass('open')
        .parent()
        .find('.menu-level1')
        .slideToggle('slow');
      if (
        $('.search-mobile > a').hasClass('open') ||
        $('.nav-item-mobile > a').hasClass('open'))
      {
        $('body').addClass('noscroll');
      } else {
        $('body').removeClass('noscroll');
      }
    });
    $('.menu-level1 > div button.menu').each(function(){
      var uchiMenuText = $(this).prev().text();
      $(this).text('Open ' + uchiMenuText + ' submenu');
    });
    $('.menu-level1 > div button.menu').on('click', function(e){
      e.preventDefault();
       var uchiMenuText = $(this).prev().text();
      $(this)
        .text('Close ' + uchiMenuText + ' submenu')
        .parent()
        .siblings()
        .removeClass('open')
        .find('.menu-level2')
        .slideUp();
      $(this)
        .parent()
        .toggleClass('open')
        .find('.menu-level2')
        .slideToggle('slow');
    });
    $('.menu-level2 > div button.submenu').on('click', function(e){
      e.preventDefault();
      if (!$(this).parent().hasClass('open')) {
        $(this)
          .parent()
          .parent()
          .find('.has-menu.open')
          .removeClass('open')
          .next('.menu-level3')
          .slideUp();
      }
      $(this)
        .parent()
        .toggleClass('open')
        .next('.menu-level3')
        .slideToggle('slow');
    });
    $('.search-mobile > a').on('click', function(e){
      e.preventDefault();
      $('.nav-item-mobile > a')
        .removeClass('open')
        .parent()
        .find('.menu-level1')
        .fadeOut('fast');
      $(this)
        .toggleClass('open')
        .parent()
        .find('.search-form-mobile')
        .slideToggle('slow');
      if (
        $('.search-mobile > a').hasClass('open') ||
        $('.nav-item-mobile > a').hasClass('open')
      ) {
        $('body').addClass('noscroll');
      } else {
        $('body').removeClass('noscroll');
      }
    });
    $('.filter-label button.show-filter').each(function(){
      $(this).text('Open filter submenu');
    });
    $('.filter-label button.show-filter').on('click', function(e){
      e.preventDefault();
      $(this)
        .parent()
        .toggleClass('open')
        .parent()
        .find('.filter-tags')
        .slideToggle('slow');
    });


    // Accordian Widget
    $('.accordian .toggle').on('click', function(e){
      $('h3.toggle.active').removeClass('active');
      $(this).parent().find('.toggle a span').text('+').end()
        .find('.block').slideUp();
      if ($(this).next('.block').css('display') == 'none') {
        $(this).addClass('active').find('span').text('-').end()
          .next('.block').slideDown();
      }
    });
    $('.accordian .toggle a').on('click', function(e){
      e.preventDefault();
    });
    // Allow one to be open by default.
    setTimeout(function(){
      $('.accordian .toggle.active').trigger('click');
    }, 100);


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

    // Calendar/Datepicker dropdown - prolly not needed, as SF has this already.
    // Not doing the year update part for the same reason.
    $('#input-14').on('click', function(){
      $(this).parent().find('.dropdown').toggleClass('show');
    });
    $('.calendar-header.pager .dropdown').on('click', function(){
      $('#input-14').trigger('click');
    });
    $('#input-15,#input-16,#input-17').on('click', function(){
      $(this).parent().find('.dropdown').toggleClass('show');
    });
    $('.dropdown span').on('click', function(){
      var selectedText = $(this).text();
      $(this).parent().removeClass('show');
      $(this).parent().parent().find('input').attr('value', selectedText);
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

    if ($.fn.slick) {
      $('.gallery-slideshow .slides').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.gallery-slideshow .slides',
        responsive: [
          {
            breakpoint: 1170,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    };

    if ($.fn.slick) {
      $('.slideshow .slides').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1170,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    };

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
    });

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

    // Registration Pie Chart - note, replace with a SF native chart.
    if ($('.user-registration').length > 0) {
      var userReg    = $('.user-registration'),
          eventGraph = userReg.find('.graph'),
          eventReg   = userReg.find('.registered strong').text(),
          eventAtt   = userReg.find('.attended strong').text(),
          eventRatio = (parseInt(eventAtt,10) / parseInt(eventReg,10)) * 360;
      eventGraph.css('background-image','conic-gradient(#FFFFFF ' + eventRatio +'deg, #0070E0 0deg)');
    }

    // Remove confirmation
    $('.user-registration button.remove').hover(function(){
      $(this).next('.confirm').fadeIn('fast');
    }, function() {
      $(this).next('.confirm').fadeOut('fast');
    });

    if ($('.logout-trigger').length > 0) {
      $('span.user').click(function(e){
        e.preventDefault();
        $(this).find('.logout').fadeToggle('fast');
      });
    };

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

    $('.mobile-search-wrapper .clear-search').on('click', function(e){
      e.preventDefault();
      $(this).parent().find('input').val("");
    });

    $('.modal-wrapper .button.close').on('click', function(e){
      e.preventDefault();
      $('.modal-wrapper').fadeOut('fast');
    });

    $('.button.join-waitlist').on('click', function(e){
      e.preventDefault();
      $('.modal-wrapper.hidden').fadeIn('fast');
    });

    // newsletter background color checkbox
    $(".content-section-bg").change(function() {
      var $this_section = $(this).parents('.info-column').next('.newsletter-section');

      if (this.checked) {
        $this_section.addClass('gray-bg');
      } else {
        $this_section.removeClass('gray-bg');
      }
    })

  }); // $(document).ready
})(jQuery);
