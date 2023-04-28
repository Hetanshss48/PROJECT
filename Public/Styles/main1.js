let getBtn = document.getElementById("getUsers")
if(getBtn) getBtn.addEventListener('click', getAllUsers);

function getAllUsers() {
  fetch('http://localhost:3000/users/')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
}
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
let registerform = document.getElementById("registration-form");
  if(registerform){
      registerform.addEventListener("submit", (event) =>{
        event.preventDefault();
        const firstnameInput = document.getElementById("name-input");
        const lastnameInput = document.getElementById("email-input");
        const passwordInput = document.getElementById("password-input");

        const registerUser=new User(firstnameInput.value,lastnameInput.value,passwordInput.value);
        console.log(registerUser);
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

//login form
document.addEventListener("DOMContentLoaded", () => {
  
  const loginForm = document.getElementById("login-form");
  if(loginForm){
    loginForm.addEventListener("submit", (event) => {
      
      event.preventDefault();

      
      const emailInput = document.getElementById("email-input");
      const passwordInput = document.getElementById("password-input");

      
      const loginUser = new User("", emailInput.value, passwordInput.value);

      
      console.log(loginUser);
    });
  }  
}); 
//post form
document.addEventListener('DOMContentLoaded', () => {
 
  const postForm = document.getElementById('post-form');
  if(postForm){
    postForm.addEventListener('submit', (event) => {
    
      event.preventDefault();

      
      const postInput = document.getElementById("post-input");

    
      console.log(postInput.value);
    });
  }
});
