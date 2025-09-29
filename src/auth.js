import { register, login, logout } from "./index.js";

// Example: Hook these functions to your UI
document.getElementById("btnRegister").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  register(email, pass);
});

document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  login(email, pass);
});

document.getElementById("btnLogout").addEventListener("click", () => {
  logout();
});
