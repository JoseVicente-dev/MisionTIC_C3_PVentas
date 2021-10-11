<<<<<<< HEAD
$(".menu-lateral-dropdown > a").click(function () {
  $(".menu-lateral-submenu").slideUp(200);
  if ($(this).parent().hasClass("active")) {
    $(".menu-lateral-dropdown").removeClass("active");
    $(this).parent().removeClass("active");
  } else {
    $(".menu-lateral-dropdown").removeClass("active");
    $(this).next(".menu-lateral-submenu").slideDown(200);
    $(this).parent().addClass("active");
  }
});




$("#close-menu-lateral").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-menu-lateral").click(function () {
  $(".page-wrapper").addClass("toggled");
});


=======
$(".menu-lateral-dropdown > a").click(function () {
  $(".menu-lateral-submenu").slideUp(200);
  if ($(this).parent().hasClass("active")) {
    $(".menu-lateral-dropdown").removeClass("active");
    $(this).parent().removeClass("active");
  } else {
    $(".menu-lateral-dropdown").removeClass("active");
    $(this).next(".menu-lateral-submenu").slideDown(200);
    $(this).parent().addClass("active");
  }
});




$("#close-menu-lateral").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-menu-lateral").click(function () {
  $(".page-wrapper").addClass("toggled");
});




>>>>>>> 921388469438c2a71ce96b48cad2c0fb12e579c7
