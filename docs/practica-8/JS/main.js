const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");

// Función de Validación del Formulario (base que ya tenías)
function validateForm(e) {
  e.preventDefault();
  
  $errorsMessages.forEach((el) => {
    el.textContent = "";
  });

  let isValid = true;

  // RETO 2: Validación mejorada del nombre
const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

if ($nameInput.value.trim() === "") {
  $nameError.textContent = "El nombre es obligatorio";
  $nameInput.focus();
  isValid = false;
} else if (!namePattern.test($nameInput.value.trim())) {
  $nameError.textContent = "Solo se permiten letras y espacios";
  $nameInput.focus();
  isValid = false;
}

  // Validación email (se mantiene igual)
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.textContent = "El correo es obligatorio";
    $emailInput.focus();
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.textContent = "El formato del correo es inválido";
    $emailInput.focus();
    isValid = false;
  }

  // RETO 3: Validación fuerte de contraseña
const passwordValue = $passwordInput.value.trim();
const passwordErrors = [];

if (passwordValue === "") {
  $passwordError.textContent = "La Contraseña es obligatoria";
  $passwordInput.focus();
  isValid = false;
} else {
  if (passwordValue.length < 8) passwordErrors.push("mínimo 8 caracteres");
  if (!/[A-Z]/.test(passwordValue)) passwordErrors.push("una mayúscula");
  if (!/[a-z]/.test(passwordValue)) passwordErrors.push("una minúscula");
  if (!/[0-9]/.test(passwordValue)) passwordErrors.push("un número");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) passwordErrors.push("un carácter especial");
  
  if (passwordErrors.length > 0) {
    $passwordError.textContent = `Requiere: ${passwordErrors.join(', ')}`;
    $passwordInput.focus();
    isValid = false;
  }
}

  // RETO 1: Loader
function showLoader() {
  const loader = document.createElement('div');
  loader.id = 'form-loader';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
    <p>Procesando registro...</p>
  `;
  document.body.appendChild(loader);
  return loader;
}

function hideLoader(loader) {
  loader.remove();
}

// Modificamos el bloque de envío válido:
if (isValid) {
  const loader = showLoader();
  
  setTimeout(() => {
    hideLoader(loader);
    $successMessage.textContent = "Formulario enviado exitosamente";
    $form.reset();
    setTimeout(() => {
      $successMessage.textContent = "";
    }, 3000);
  }, 5000); // 5 segundos
}
}

$form.addEventListener("submit", validateForm);