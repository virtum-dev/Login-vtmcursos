// =====================================
// PEGANDO ELEMENTOS DO HTML
// =====================================
const username = document.getElementById("username");
const password = document.getElementById("password-box");
const btnLogin = document.getElementById("login-button");
const togglePassword = document.getElementById("toggle-password");
const offlineCheckbox = document.getElementById("log-offline-checkbox");
const loginBox = document.getElementById("login-box");
const overlay = document.getElementById("overlay");

// =====================================
// USUÁRIOS VÁLIDOS (SIMULA BANCO DE DADOS)
// =====================================
const usuariosValidos = {
  fixelfx: "1234",
  virtum_dev: "7272"
};

// =====================================
// CRIANDO MENSAGEM DE FEEDBACK
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
  if (password.type === "password") {
    password.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    password.type = "password";
    togglePassword.textContent = "👁️";
  }
});

// =====================================
// ANIMAÇÃO DE ERRO (SHAKE)
// =====================================
function animarErro() {
  loginBox.classList.add("shake");
  setTimeout(() => {
    loginBox.classList.remove("shake");
  }, 400);
}

// =====================================
// LOGIN COM USUÁRIOS DEFINIDOS
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

  // ❌ USUÁRIO NÃO EXISTE OU SENHA ERRADA
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
  }, 1000);

  setTimeout(() => {
    mostrarMensagem(`Bem-vindo, ${user}!`, "success");

    // 💾 LOGIN OFFLINE
    if (offlineCheckbox.checked) {
      localStorage.setItem("loginOffline", "true");
      localStorage.setItem("userSalvo", user);
    }

    overlay.classList.add("hidden");

    // 🔁 REDIRECIONAMENTO
    window.location.href = "https://vtmcursos.netlify.app";
  }, 2500);
});

// =====================================
// LOGIN OFFLINE AUTOMÁTICO
// =====================================
if (localStorage.getItem("loginOffline") === "true") {
  const userSalvo = localStorage.getItem("userSalvo");
  if (userSalvo) {
    username.value = userSalvo;
    mostrarMensagem("Login offline ativado", "success");
  }








