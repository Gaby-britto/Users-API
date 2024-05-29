const email = document.getElementById("email");
const senha = document.getElementById("senha");
const url = "http://localhost:3001/user";
const button = document.getElementById("button");

button.addEventListener("click", function(event) {
  event.preventDefault();
  
  const testeData = JSON.stringify({
    email: email.value,
    senha: senha.value
  });

  fetch(url, {
    method: "POST",
    body: testeData,
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
