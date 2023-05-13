class User {
  constructor( userName, password) {
    this.userName = userName;
    this.password = password;
  }
  get UserName() {
    return this.userName;
  }
  get Password() {
    return this.Password;
  }
  set UserName(userName) {
    this.userName = userName;
  }
  set Password(pwd) {
    this.password = pwd;
  }
}
let getResults = document.getElementById("getmyuser");
if (getResults) getResults.addEventListener("click", getAllUsers);

function getAllUsers() {
  fetch("http://localhost:3000/users/")
    .then((response) => response.json())
    .then((data) => console.log(data));
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
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const registerUser = new User(userName, password);
    console.log(registerUser);
    fetchData("/users/register", registerUser, "POST")
      .then((data) => {
        setCurrentUser(data);
        window.location.href = "post.html";
      })
      .catch((err) => {
        document.querySelector("#registration-form p.error").innerHTML = err.message;
        // document.getElementById("password").value = "";
      });
  });
}

let loginform = document.getElementById("login-form");
if (loginform) {
  loginform.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("Password").value;

    const LoginUser = new User("", "", userName, password);
    console.log(LoginUser);
    fetchData("/users/login", LoginUser, "POST")
      .then((data) => {
        setCurrentUser(data);
        window.location.href = "post.html";
      })
      .catch((err) => {
        document.querySelector("#login-form p.error").innerHTML = err.message;
        document.getElementById("userName").value = "";
        document.getElementById("Password").value = "";
      });
  });
}

let postform = document.getElementById("post-form");
if (postform) {
  postform.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentUser = getCurrentUser();
    const post = {
      postcontent: document.getElementById("post").value,
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
