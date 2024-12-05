/**
 * UCHI Accordian JS.
 */
(function($) {
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
});
