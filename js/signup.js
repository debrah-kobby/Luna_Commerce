// ============================================================
//  signup.js — Luna Commerce Sign Up Logic
// ============================================================

// ── DOM ELEMENTS ─────────────────────────────────────────────
const welcomeScreenWrapper = document.getElementById("welcomeScreenWrapper");
const signupFormWrapper = document.getElementById("signupFormWrapper");
const welcomeNextButton = document.getElementById("welcomeNextButton");

const signupActualForm = document.getElementById("signupActualForm");
const signupFirstName = document.getElementById("signupFirstName");
const signupLastName = document.getElementById("signupLastName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupSubmitButton = document.getElementById("signupSubmitButton");
const signupButtonText = document.getElementById("signupButtonText");
const signupButtonLoader = document.getElementById("signupButtonLoader");
const signupGoogleButton = document.getElementById("signupGoogleButton");

const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const togglePasswordIcon = document.getElementById("togglePasswordIcon");

const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthLabel = document.getElementById("passwordStrengthLabel");

const signupSuccessOverlay = document.getElementById("signupSuccessOverlay");

// Error spans
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Field groups
const firstNameGroup = document.getElementById("firstNameGroup");
const lastNameGroup = document.getElementById("lastNameGroup");
const emailGroup = document.getElementById("emailGroup");
const passwordGroup = document.getElementById("passwordGroup");

// ── SCREEN TRANSITION ─────────────────────────────────────────
welcomeNextButton.addEventListener("click", () => {
  welcomeScreenWrapper.style.opacity = "0";
  welcomeScreenWrapper.style.transform = "translateX(-40px)";
  welcomeScreenWrapper.style.transition =
    "opacity 0.4s ease, transform 0.4s ease";

  setTimeout(() => {
    welcomeScreenWrapper.style.display = "none";
    signupFormWrapper.classList.add("screen_visible");
    signupFormWrapper.style.opacity = "0";
    signupFormWrapper.style.transform = "translateX(40px)";
    signupFormWrapper.style.transition =
      "opacity 0.4s ease, transform 0.4s ease";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        signupFormWrapper.style.opacity = "1";
        signupFormWrapper.style.transform = "translateX(0)";
      });
    });
  }, 400);
});

// ── PASSWORD VISIBILITY TOGGLE ────────────────────────────────
togglePasswordBtn.addEventListener("click", () => {
  const isPassword = signupPassword.type === "password";
  signupPassword.type = isPassword ? "text" : "password";
  togglePasswordIcon.className = isPassword
    ? "fa-regular fa-eye-slash"
    : "fa-regular fa-eye";
});

// ── PASSWORD STRENGTH ─────────────────────────────────────────
signupPassword.addEventListener("input", () => {
  const val = signupPassword.value;
  const strength = getPasswordStrength(val);

  const strengthMap = {
    0: { width: "0%", color: "transparent", label: "" },
    1: { width: "25%", color: "#e53e3e", label: "Weak" },
    2: { width: "50%", color: "#f59e0b", label: "Fair" },
    3: { width: "75%", color: "#3b82f6", label: "Good" },
    4: { width: "100%", color: "#22c55e", label: "Strong" },
  };

  const s = strengthMap[strength];
  passwordStrengthBar.style.width = s.width;
  passwordStrengthBar.style.background = s.color;
  passwordStrengthLabel.textContent = s.label;
  passwordStrengthLabel.style.color = s.color;
});

function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

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

  // First name
  if (!signupFirstName.value.trim()) {
    setFieldError(firstNameGroup, firstNameError, "First name is required");
    isValid = false;
  } else if (signupFirstName.value.trim().length < 2) {
    setFieldError(
      firstNameGroup,
      firstNameError,
      "Must be at least 2 characters",
    );
    isValid = false;
  } else {
    setFieldSuccess(firstNameGroup, firstNameError);
  }

  // Last name
  if (!signupLastName.value.trim()) {
    setFieldError(lastNameGroup, lastNameError, "Last name is required");
    isValid = false;
  } else if (signupLastName.value.trim().length < 2) {
    setFieldError(
      lastNameGroup,
      lastNameError,
      "Must be at least 2 characters",
    );
    isValid = false;
  } else {
    setFieldSuccess(lastNameGroup, lastNameError);
  }

  // Email
  if (!signupEmail.value.trim()) {
    setFieldError(emailGroup, emailError, "Email is required");
    isValid = false;
  } else if (!isValidEmail(signupEmail.value.trim())) {
    setFieldError(emailGroup, emailError, "Enter a valid email address");
    isValid = false;
  } else {
    setFieldSuccess(emailGroup, emailError);
  }

  // Password
  if (!signupPassword.value) {
    setFieldError(passwordGroup, passwordError, "Password is required");
    isValid = false;
  } else if (signupPassword.value.length < 8) {
    setFieldError(
      passwordGroup,
      passwordError,
      "Password must be at least 8 characters",
    );
    isValid = false;
  } else if (getPasswordStrength(signupPassword.value) < 2) {
    setFieldError(passwordGroup, passwordError, "Password is too weak");
    isValid = false;
  } else {
    setFieldSuccess(passwordGroup, passwordError);
  }

  return isValid;
}

// ── REAL-TIME VALIDATION ──────────────────────────────────────
signupFirstName.addEventListener("blur", () => {
  if (!signupFirstName.value.trim()) {
    setFieldError(firstNameGroup, firstNameError, "First name is required");
  } else {
    setFieldSuccess(firstNameGroup, firstNameError);
  }
});

signupLastName.addEventListener("blur", () => {
  if (!signupLastName.value.trim()) {
    setFieldError(lastNameGroup, lastNameError, "Last name is required");
  } else {
    setFieldSuccess(lastNameGroup, lastNameError);
  }
});

signupEmail.addEventListener("blur", () => {
  if (!signupEmail.value.trim()) {
    setFieldError(emailGroup, emailError, "Email is required");
  } else if (!isValidEmail(signupEmail.value.trim())) {
    setFieldError(emailGroup, emailError, "Enter a valid email address");
  } else {
    setFieldSuccess(emailGroup, emailError);
  }
});

signupPassword.addEventListener("blur", () => {
  if (!signupPassword.value) {
    setFieldError(passwordGroup, passwordError, "Password is required");
  } else if (signupPassword.value.length < 8) {
    setFieldError(
      passwordGroup,
      passwordError,
      "Must be at least 8 characters",
    );
  } else {
    setFieldSuccess(passwordGroup, passwordError);
  }
});

// ── FORM SUBMIT ───────────────────────────────────────────────
signupActualForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Show loader
  signupButtonText.style.display = "none";
  signupButtonLoader.style.display = "block";
  signupSubmitButton.disabled = true;

  // Simulate async registration — replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // Save user to localStorage (frontend only — no real backend)
  const newUser = {
    firstName: signupFirstName.value.trim(),
    lastName: signupLastName.value.trim(),
    email: signupEmail.value.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  // Check if email already registered
  const existingUsers = JSON.parse(localStorage.getItem("lunaUsers")) || [];
  const alreadyExists = existingUsers.some((u) => u.email === newUser.email);

  if (alreadyExists) {
    signupButtonText.style.display = "block";
    signupButtonLoader.style.display = "none";
    signupSubmitButton.disabled = false;
    setFieldError(
      emailGroup,
      emailError,
      "An account with this email already exists",
    );
    return;
  }

  existingUsers.push(newUser);
  localStorage.setItem("lunaUsers", JSON.stringify(existingUsers));
  localStorage.setItem("lunaCurrentUser", JSON.stringify(newUser));

  // Show success overlay
  signupSuccessOverlay.classList.add("overlay_visible");
});

// ── GOOGLE BUTTON ─────────────────────────────────────────────
signupGoogleButton.addEventListener("click", () => {
  // Placeholder — wire to real Google OAuth when backend is ready
  alert("Google sign-in coming soon!");
});

// ── CLEAR ERRORS ON INPUT ─────────────────────────────────────
[signupFirstName, signupLastName, signupEmail, signupPassword].forEach(
  (input) => {
    input.addEventListener("input", () => {
      const group = input.closest(".signup_field_group");
      const errorEl = group.querySelector(".signup_field_error");
      if (group.classList.contains("field_error")) {
        clearField(group, errorEl);
      }
    });
  },
);
