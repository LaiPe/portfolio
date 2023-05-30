function moveToSelected(element) {

  if (element == "next") {
    var selected = $(".selected").next();
  } else if (element == "prev") {
    var selected = $(".selected").prev();
  } else {
    var selected = element;
  }

  var next = $(selected).next();
  var prev = $(selected).prev();
  var prevSecond = $(prev).prev();
  var nextSecond = $(next).next();

  $(selected).removeClass("next prev selected nextRightSecond prevLeftSecond").addClass("selected");

  $(prev).removeClass("next prev selected nextRightSecond prevLeftSecond").addClass("prev");
  $(next).removeClass("next prev selected nextRightSecond prevLeftSecond").addClass("next");

  $(nextSecond).removeClass("next prev selected nextRightSecond prevLeftSecond").addClass("nextRightSecond");
  $(prevSecond).removeClass("next prev selected nextRightSecond prevLeftSecond").addClass("prevLeftSecond");
}

// Inputs clavier
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        moveToSelected('prev');
        break;

        case 39: // right
        moveToSelected('next');
        break;

        default: return;
    }
    e.preventDefault();
});

//Click sur tuille
$('#carousel .tuille').click(function() {
  moveToSelected($(this));
});

//Boutons
$('#prev').click(function() {
  moveToSelected('prev');
});
$('#next').click(function() {
  moveToSelected('next');
});
