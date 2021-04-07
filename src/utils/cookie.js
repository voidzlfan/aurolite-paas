function setCookie(projectId, value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toGMTString();
  document.cookie = projectId + '=' + value + '; ' + expires;
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function removeCookie(projectId) {
  document.cookie = projectId+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

function checkCookie() {
  var user = getCookie('username');
  if (user != '') {
    alert('欢迎 ' + user + ' 再次访问');
  } else {
    user = prompt('请输入你的名字:', '');
    if (user != '' && user != null) {
      setCookie('username', user, 30);
    }
  }
}

export { setCookie, getCookie, removeCookie, checkCookie };
