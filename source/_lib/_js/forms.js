///////////////////////////////////////////////////
// Email form
// ( name + email + email subject + email message )
///////////////////////////////////////////////////

(function() {
  if (document.querySelector('.form')) {
    var form = document.querySelector('.form'),
        senderName = form.querySelector('[name=sender-name]'),
        senderEmail = form.querySelector('[name=sender-email]'),
        emailSubject = form.querySelector('[name=email-subject]'),
        nameStorage = localStorage.getItem('name'),
        emailStorage = localStorage.getItem('email');

    if (nameStorage && emailStorage) {
      senderName.value = nameStorage;
      senderEmail.value = emailStorage;
      emailSubject.focus();
    } else {
      senderName.focus();
    };

    form.addEventListener('submit', function(event) {
      localStorage.setItem('name', senderName.value);
      localStorage.setItem('email', senderEmail.value);
    });
  };
})();
