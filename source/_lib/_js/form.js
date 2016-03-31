////////////////////////////////////////////////////////////////////////////////
//  C O N T A C T    F O R M
////////////////////////////////////////////////////////////////////////////////

(function() {
  if (!document.querySelector(".form") && !("FormData" in window)) {
    return;
  }

  //////////////////////////////////////////////////
  // Появление, события, сокрытие формы
  //////////////////////////////////////////////////

  var form = document.querySelector(".form"),
      link = document.querySelector(".main-nav__link--form"),
      name = form.querySelector("[name=name]"),
      email = form.querySelector("[name=email]"),
      subject = form.querySelector("[name=subject]"),
      message = form.querySelector("[name=message]"),
      btnCloseForm = form.querySelector(".btn--close-form"),
      btnSend = form.querySelector("[type=submit]"),
      savedName = localStorage.getItem("name"),
      savedEmail = localStorage.getItem("email"),
      savedSubject = localStorage.getItem("subject"),
      savedMessage = localStorage.getItem("message");

  link.addEventListener("click", function(event) {
    event.preventDefault();
    form.classList.toggle("form--show");
    removeErrorState();
    if (savedName && savedEmail && savedSubject && savedMessage) {
      putSavedData();
      message.focus();
    } else {
      name.focus();
    }
  });

  watchClick(btnCloseForm, function() {
    removeErrorState();
  });

  watchEscPressing();

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (name.value && email.value && subject.value && message.value) {
      saveValues();
      var data = new FormData(form);
      request(data);
    } else if (!name.value || !email.value || !subject.value || !message.value) {
      shakeForm();
      checkFormFilling();
      watchFilling();
    }
  });

  //////////////////////////////////////////////////
  // Сообщения об отправке
  //////////////////////////////////////////////////

  var alertSuccess = document.querySelector(".alert--success"),
      alertFailure = document.querySelector(".alert--failure"),
      btnCloseAlertSuccess = document.querySelector(".btn--success"),
      btnCloseAlertFailure = document.querySelector(".btn--failure");

  watchClick(btnCloseAlertSuccess);
  watchClick(btnCloseAlertFailure);

  //////////////////////////////////////////////////
  // Functions
  //////////////////////////////////////////////////

  // Ajax собственной персоной
  function request(data) {
    var xhr = new XMLHttpRequest(),
        time = (new Date()).getTime();
    xhr.open("post", "//formspree.io/ridea@bk.ru?" + time, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState < 4) {
        btnSend.classList.add("btn--sending");
        btnSend.innerHTML = "Sending...";
      } else if (xhr.readyState == 4) {
        btnSend.classList.remove("btn--sending");
        btnSend.innerHTML = "Send";
        form.classList.remove("form--show");
        if (xhr.status == 200) {
          alertSuccess.classList.add("alert--show");
          console.log("Success! Message has been sent. Status: " + xhr.status + ", " + xhr.statusText);
        } else {
          alertFailure.classList.add("alert--show");
          console.log("Failure! Message has not been sent. Status: " + xhr.status + ", " + xhr.statusText);
        }
      }
    });
  }

  /**
   * Закрывает попап и выполняет переданную функцию
   * (или не выполняет, если она не передана).
   */
  function watchClick(btn, fn) {
    btn.addEventListener("click", function(event) {
      event.preventDefault();
      var firstClass = btn.parentElement.classList[0],
          removedClass = firstClass + "--show";
      btn.parentElement.classList.remove(removedClass);
      // Если функция передана - выполнить.
      if (fn !== undefined) {
        fn();
      }
    });
  }

  // Убирает все попапы, если была нажата клавиша Esc.
  function watchEscPressing() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        form.classList.remove("form--show");
        removeErrorState();
        alertSuccess.classList.remove("alert--show");
        alertFailure.classList.remove("alert--show");
      }
    });
  }

  // Потрясти форму.
  function shakeForm() {
    form.classList.remove("form--error");
    /**
     * TODO: разобраться, почему анимация shake
     * срабатывает только в 1-й раз.
     * setTimeout() не помогла.
     */
    form.classList.add("form--error");
  }

  // Сохранить значения из формы в хранилище браузера.
  function saveValues() {
    localStorage.setItem("name", name.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("subject", subject.value);
    localStorage.setItem("message", message.value);
  }

  // Взять значения из хранилища браузера и подставить в форму.
  function putSavedData() {
    name.value = savedName;
    email.value = savedEmail;
    subject.value = savedSubject;
    message.value = savedMessage;
  }

  // Проверяет заполненность формы.
  function checkFormFilling() {
    checkInputFilling(name);
    checkInputFilling(email);
    checkInputFilling(subject);
    checkInputFilling(message);
  }

  /**
   * Если поле не заполнено, делает его обводку красной.
   */
  function checkInputFilling(input) {
    if (!input.value) {
      var firstClass = input.classList[0],
          embedClass = firstClass + "--empty";
      input.classList.add(embedClass);
    }
  }

  /**
   * Следит за заполнением полей
   * и убирает у них красную обводку.
   */
  function watchFilling() {
    watchInputFilling(name);
    watchInputFilling(email);
    watchInputFilling(subject);
    watchInputFilling(message);
  }

  /**
   * Убирает у пустого поля красную обводку,
   * если его начинают заполнять.
   */
  function watchInputFilling(input) {
    input.addEventListener("focus", function() {
      var errorClass = input.classList[0] + "--empty";
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass);
      }
    });
  }

  /**
   * Форма больше не будет трястись.
   * Поля ввода больше не обведены красным.
   */
  function removeErrorState() {
    form.classList.remove("form--error");
    name.classList.remove("form__input--empty");
    email.classList.remove("form__input--empty");
    subject.classList.remove("form__input--empty");
    message.classList.remove("form__message--empty");
  }
})();
