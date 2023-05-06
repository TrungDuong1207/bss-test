$(function() {
    $('.login-form').submit(function(event) {
      event.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
      if (username === 'john' && password === '1234') {
        let user = {
          username: username
        }
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = 'dashboard.html';
      } else {
        $('.alert').show();
        $('#username').val("");
        $('#password').val("");
      }
      
    });
  });
  