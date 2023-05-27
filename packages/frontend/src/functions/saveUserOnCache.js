// Esta es una funcion destinada a guardar en Cache el
//  usuario para la utilizacion del mismo en la llamada al Api

function saveUserOnCache(user, email) {
  // Guardamos el usuario en Cache
  alert("test");
  localStorage.setItem("user", user);
  localStorage.setItem("email", email);
}
