document.addEventListener("DOMContentLoaded", () => {

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
  // "BANCO DE DADOS" SIMULADO
  // =====================================
  const usuariosValidos = {
    fixelfx: "7272",
    virtum_dev: "7272",
    gustavo: "1234"
  };

  // =====================================
  // MENSAGEM DE FEEDBACK
  // =====================================
  const mensagem = document.createElement("p");
  mensagem.id = "mensagem";
  loginBox.appendChild(mensagem);

  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
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
  // ANIMAÇÃO DE ERRO
  // =====================================
  function animarErro() {
    loginBox.classList.add("shake");
    setTimeout(() => loginBox.classList.remove("shake"), 400);
  }

  // =====================================
  // LOGIN
  // =====================================
  btnLogin.addEventListener("click", () => {
    const user = username.value.trim().toLowerCase();
    const pass = password.value.trim();

    if (!user || !pass) {
      mostrarMensagem("Preencha todos os campos", "error");
      animarErro();
      return;
    }

    if (!usuariosValidos[user] || usuariosValidos[user] !== pass) {
      mostrarMensagem("Usuário ou senha incorretos", "error");
      animarErro();
      return;
    }

    // LOGIN CORRETO
    mostrarMensagem("Conectando...", "success");
    btnLogin.disabled = true;
    btnLogin.textContent = "Entrando...";

    if (overlay) overlay.classList.remove("hidden");

    // LOGIN OFFLINE
    if (offlineCheckbox.checked) {
      localStorage.setItem("loginOffline", "true");
      localStorage.setItem("usuarioOffline", user);
    } else {
      localStorage.clear();
    }

    setTimeout(() => {
      window.location.href = "https://vtmcursos.netlify.app";
    }, 2000);
  });

  // =====================================
  // LOGIN OFFLINE AUTOMÁTICO
  // =====================================
  const offlineAtivo = localStorage.getItem("loginOffline");
  const usuarioOffline = localStorage.getItem("usuarioOffline");

  if (offlineAtivo === "true" && usuarioOffline) {
    username.value = usuarioOffline;
    mostrarMensagem(`Login offline ativo (${usuarioOffline})`, "success");

    if (overlay) overlay.classList.remove("hidden");

    setTimeout(() => {
      window.location.href = "https://vtmcursos.netlify.app";
    }, 1500);
  }

});
