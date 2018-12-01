$(document).ready(function(){
  $('html').on('keydown', function (e) {
    if (e.which == 55) {
      var leave = document.querySelector('.drag-leavePeople');
      document.querySelector('.columnLeft').appendChild(leave);
      leavePeopleFun(data, 'index');
      $('.drag-tree').show()
    } else if (e.which == 56) {
      $('.header__ncdr').css('right', '30px')

    } else if (e.which == 57) {
      var leave = document.querySelector('.drag-leavePeople');
      document.querySelector('.columnRight').insertBefore(leave, document.querySelector('.drag-tree'));
      $('.svgMap').slideDown('3000')
    } else if (e.which == 48) {
      $('.drag-hurt').slideDown('3000')

    }
  })
})