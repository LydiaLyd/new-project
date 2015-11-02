// My shitcode
// Doesn't work in ie8 :(

(function() {
  if (document.querySelector('.slider')) {
    var controls = document.querySelectorAll(".slider__control");
    var slides = document.querySelectorAll(".slider__slide");

    for (var i = 0; i < controls.length; i++) {
      toggleControl(controls[i]);
    };

    function toggleControl(control) {
      control.addEventListener('click', function() {
        // убрать у всех переключателей класс slider__control--checked
        for (i = 0; i < controls.length; i++) {
          controls[i].classList.remove('slider__control--checked');
        };

        // добавить к "кликнутому" переключателю класс slider__control--checked
        control.classList.add('slider__control--checked');
        toggleSlide(slides);
      })
    };

    function toggleSlide(slide) {
      for (i = 0; i < controls.length; i++) {
        if (controls[i].classList.contains('slider__control--checked')) {
          for (j = 0; j < slides.length; j++) {
            slides[j].classList.remove('slider__slide--show');
          };
          slides[i].classList.add('slider__slide--show');

          break;
        };
      };
    }
  }
})();
