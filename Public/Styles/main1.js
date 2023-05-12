let getBtn = document.getElementById("getUsers");
if (getBtn) getBtn.addEventListener("click", getAllUsers);

function getAllUsers() {
  fetch("http://localhost:3000/users/")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
let registerform = document.getElementById("registration-form");
if (registerform) {
  registerform.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstnameInput = document.getElementById("name-input");

    const passwordInput = document.getElementById("password-input");

    const registerUser = new User(firstnameInput.value, passwordInput.value);
    console.log(registerUser);
    fetchData("/users/register", registerUser, "POST")
      .then((data) => {
        setCurrentUser(data);
        window.location.href = "post.html";
      })
      .catch((err) => {
        document.querySelector("#registerform p.error").innerHTML = err.message;
        document.getElementById("pwd").value = "";
      });
  });
}
/*
document.addEventListener('DOMContentLoaded', () => {
  
  const registrationForm = document.getElementById('registration-form');
  if(registrationForm){
   registrationForm.addEventListener('submit', (event) => {
    
    event.preventDefault();

    
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    
    const registerUser = new User(nameInput.value, emailInput.value, passwordInput.value);

    // Print the User object to check if everything was done correctly
    console.log(registerUser);
   });
  }
});
*/
let loginForm = document.getElementById("login-form");
if (loginForm) loginForm.addEventListener("submit", login);
function login(e) {
  e.preventDefault();

  let userName = document.getElementById("Ussername").value;
  let password = document.getElementById("password-input").value;

  let user = new User(userName, password);
  const LoginUser = new User("", "", userName, password);
  console.log(LoginUser);
  fetchData("/users/login", LoginUser, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "post.html";
    })
    .catch((err) => {
      document.querySelector("#loginform p.error").innerHTML = err.message;
      document.getElementById("userName").value = "";
      document.getElementById("pswd").value = "";
    });
}

//post form
let postform = document.getElementById("post-form");
if (postform) {
  postform.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentUser = getCurrentUser();
    const post = {
      postcontent: document.getElementById("post-input").value,
      userID: currentUser.userID,
    };
    fetchData("/posts/add", post, "POST")
      .then((data) => {
        window.location.href = "post.html";
      })
      .catch((err) => {
        document.querySelector("#post-form p.error").innerHTML = err.message;
      });

    console.log(post);
  });
}

async function fetchData(route = "", data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
