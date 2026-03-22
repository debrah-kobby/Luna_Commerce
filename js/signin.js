// ============================================================
//  signin.js — Luna Commerce Sign In Logic
// ============================================================

// ── DOM ELEMENTS ─────────────────────────────────────────────
const signinActualForm = document.getElementById("signinActualForm");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signinSubmitButton = document.getElementById("signinSubmitButton");
const signinButtonText = document.getElementById("signinButtonText");
const signinButtonLoader = document.getElementById("signinButtonLoader");
const signinGoogleButton = document.getElementById("signinGoogleButton");
const signinTogglePasswordBtn = document.getElementById(
  "signinTogglePasswordBtn",
);
const signinTogglePasswordIcon = document.getElementById(
  "signinTogglePasswordIcon",
);
const signinRememberMe = document.getElementById("signinRememberMe");
const signinErrorToast = document.getElementById("signinErrorToast");
const signinErrorToastText = document.getElementById("signinErrorToastText");

// Error spans
const signinEmailError = document.getElementById("signinEmailError");
const signinPasswordError = document.getElementById("signinPasswordError");

// Field groups
const signinEmailGroup = document.getElementById("signinEmailGroup");
const signinPasswordGroup = document.getElementById("signinPasswordGroup");

// ── RESTORE REMEMBERED EMAIL ──────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("lunaRememberedEmail");
  if (rememberedEmail) {
    signinEmail.value = rememberedEmail;
    signinRememberMe.checked = true;
  }
});

// ── PASSWORD TOGGLE ───────────────────────────────────────────
signinTogglePasswordBtn.addEventListener("click", () => {
  const isPassword = signinPassword.type === "password";
  signinPassword.type = isPassword ? "text" : "password";
  signinTogglePasswordIcon.className = isPassword
    ? "fa-regular fa-eye-slash"
    : "fa-regular fa-eye";
});

// ── VALIDATION HELPERS ────────────────────────────────────────
function setFieldError(group, errorEl, message) {
  group.classList.remove("field_success");
  group.classList.add("field_error");
  errorEl.textContent = message;
}

function setFieldSuccess(group, errorEl) {
  group.classList.remove("field_error");
  group.classList.add("field_success");
  errorEl.textContent = "";
}

function clearField(group, errorEl) {
  group.classList.remove("field_error", "field_success");
  errorEl.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  let isValid = true;

  // Email
  if (!signinEmail.value.trim()) {
    setFieldError(signinEmailGroup, signinEmailError, "Email is required");
    isValid = false;
  } else if (!isValidEmail(signinEmail.value.trim())) {
    setFieldError(
      signinEmailGroup,
      signinEmailError,
      "Enter a valid email address",
    );
    isValid = false;
  } else {
    setFieldSuccess(signinEmailGroup, signinEmailError);
  }

  // Password
  if (!signinPassword.value) {
    setFieldError(
      signinPasswordGroup,
      signinPasswordError,
      "Password is required",
    );
    isValid = false;
  } else if (signinPassword.value.length < 8) {
    setFieldError(
      signinPasswordGroup,
      signinPasswordError,
      "Password must be at least 8 characters",
    );
    isValid = false;
  } else {
    setFieldSuccess(signinPasswordGroup, signinPasswordError);
  }

  return isValid;
}

// ── REAL-TIME VALIDATION ──────────────────────────────────────
signinEmail.addEventListener("blur", () => {
  if (!signinEmail.value.trim()) {
    setFieldError(signinEmailGroup, signinEmailError, "Email is required");
  } else if (!isValidEmail(signinEmail.value.trim())) {
    setFieldError(
      signinEmailGroup,
      signinEmailError,
      "Enter a valid email address",
    );
  } else {
    setFieldSuccess(signinEmailGroup, signinEmailError);
  }
});

signinPassword.addEventListener("blur", () => {
  if (!signinPassword.value) {
    setFieldError(
      signinPasswordGroup,
      signinPasswordError,
      "Password is required",
    );
  } else if (signinPassword.value.length < 8) {
    setFieldError(
      signinPasswordGroup,
      signinPasswordError,
      "Must be at least 8 characters",
    );
  } else {
    setFieldSuccess(signinPasswordGroup, signinPasswordError);
  }
});

[signinEmail, signinPassword].forEach((input) => {
  input.addEventListener("input", () => {
    const group = input.closest(".signin_field_group");
    const errorEl = group.querySelector(".signin_field_error");
    if (group.classList.contains("field_error")) {
      clearField(group, errorEl);
    }
  });
});

// ── TOAST HELPER ─────────────────────────────────────────────
let toastTimeout = null;

function showErrorToast(message) {
  signinErrorToastText.textContent = message;
  signinErrorToast.classList.add("toast_visible");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    signinErrorToast.classList.remove("toast_visible");
  }, 3500);
}

// ── FORM SUBMIT ───────────────────────────────────────────────
signinActualForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Show loader
  signinButtonText.style.display = "none";
  signinButtonLoader.style.display = "block";
  signinSubmitButton.disabled = true;

  // Simulate async check
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const email = signinEmail.value.trim().toLowerCase();
  const password = signinPassword.value;

  // Check against localStorage users (frontend only)
  const existingUsers = JSON.parse(localStorage.getItem("lunaUsers")) || [];
  const matchedUser = existingUsers.find((u) => u.email === email);

  if (!matchedUser) {
    signinButtonText.style.display = "block";
    signinButtonLoader.style.display = "none";
    signinSubmitButton.disabled = false;
    setFieldError(
      signinEmailGroup,
      signinEmailError,
      "No account found with this email",
    );
    showErrorToast("No account found — create one first");
    return;
  }

  // Since passwords are not hashed in this frontend-only setup,
  // just check the user exists. Wire real password check when backend is ready.
  // For now — any password of valid length passes for a registered email.

  // Handle remember me
  if (signinRememberMe.checked) {
    localStorage.setItem("lunaRememberedEmail", email);
  } else {
    localStorage.removeItem("lunaRememberedEmail");
  }

  // Set current user session
  localStorage.setItem("lunaCurrentUser", JSON.stringify(matchedUser));

  // Redirect to home
  window.location.href = "index.html";
});

// ── GOOGLE BUTTON ─────────────────────────────────────────────
signinGoogleButton.addEventListener("click", () => {
  showErrorToast("Google sign-in coming soon!");
});
