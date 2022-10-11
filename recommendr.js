document.getElementById("submit").onclick = async function(){
  sessionStorage.setItem ("moviename", document.getElementById("fname").value);
  window.location.assign("result.html");
}
