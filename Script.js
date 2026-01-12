
// =====================================
// ELEMENTOS DO HTML
// =====================================
const username = document.getElementById("username");
const password = document.getElementById("password-box");
const btnLogin = document.getElementById("login-button");
const togglePassword = document.getElementById("toggle-password");
const offlineCheckbox = document.getElementById("log-offline-checkbox");
const loginBox = document.getElementById("login-box");
const overlay = document.getElementById("overlay");

// =====================================
// USUÁRIOS VÁLIDOS
// =====================================
const usuariosValidos = {
  fixelfx: "1234",
  virtumsites: "7272",
  sophiamordavidadoadrian: "9999"
};

// =====================================
// MENSAGEM DE FEEDBACK
// =====================================
const mensagem = document.createElement("p");
mensagem.id = "mensagem";
loginBox.appendChild(mensagem);

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo; // success | error
}

// =====================================
// 👁️ MOSTRAR / ESCONDER SENHA
// =====================================
togglePassword.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  togglePassword.textContent =
    password.type === "text" ? "🙈" : "👁️";
});

// =====================================
// ANIMAÇÃO DE ERRO
// =====================================
function animarErro() {
  loginBox.classList.add("shake");
  setTimeout(() => {
    loginBox.classList.remove("shake");
  }, 400);
}

// =====================================
// LOGIN COM LOADING + REDIRECIONAMENTO
// =====================================
btnLogin.addEventListener("click", () => {
  const user = username.value.trim().toLowerCase();
  const pass = password.value.trim();

  // ❌ CAMPOS VAZIOS
  if (user === "" || pass === "") {
    mostrarMensagem("Preencha todos os campos", "error");
    animarErro();
    return;
  }

  // ❌ USUÁRIO OU SENHA INVÁLIDOS
  if (!usuariosValidos[user] || usuariosValidos[user] !== pass) {
    mostrarMensagem("Usuário ou senha incorretos", "error");
    animarErro();
    return;
  }

  // ✅ LOGIN VÁLIDO
  btnLogin.disabled = true;
  btnLogin.textContent = "Conectando...";
  overlay.classList.remove("hidden");

  mostrarMensagem("Conectando ao servidor...", "success");

  setTimeout(() => {
    mostrarMensagem("Autenticando usuário...", "success");
  }, 1200);

  setTimeout(() => {
    // 💾 SALVA LOGIN
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuario", user);

    if (offlineCheckbox.checked) {
      localStorage.setItem("loginOffline", "true");
    }

    // 🔁 REDIRECIONAMENTO FINAL
    window.location.href = "https://vtmcursos.netlify.app/";
  }, 2600);
});





