const desc = document.getElementById("desc");
const date = document.getElementById("date");
const nome = document.getElementById("name");
const url = "http://localhost:3001/users";
const button = document.getElementById("button");

button.addEventListener("click", function(event) {
  event.preventDefault();
  const testeData = JSON.stringify( {
   email: email.value,
   senha: senha.value
  
})
fetch(url , {
  method: "POST",
  body: testeData,
  headers: { "Content-type": "application/json; charset=UTF-8" }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

})





 