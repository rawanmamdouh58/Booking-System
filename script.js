const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const forms = document.querySelectorAll(".form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password1 = document.getElementById("pass1");
const password2 = document.getElementById("pass2");
const phone = document.getElementById("phone");

let currentStep = 1;

next.addEventListener("click", function () {
  if (currentStep < circles.length && validateForm(currentStep - 1)) {
    currentStep++;
    update();
  } else if (currentStep === circles.length) {
    save();
  }
});

prev.addEventListener("click", function () {
  if (currentStep > 1) {
    validateForm(currentStep - 1);

    currentStep--;
    update();
  }
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  progress.style.width = ((currentStep - 1) / (circles.length - 1)) * 100 + "%";

  if (currentStep === 1) {
    prev.setAttribute("disabled", "true");
  } else if (currentStep === circles.length) {
    next.innerHTML = "LogIn";
  } else {
    prev.removeAttribute("disabled");
    next.removeAttribute("disabled");
    next.innerHTML = "Next";
  }

  forms.forEach((form, idx) => {
    if (idx === currentStep - 1) {
      form.classList.add("active");
    } else {
      form.classList.remove("active");
    }
  });
}

function validateForm(stepIndex) {
  const currentForm = forms[stepIndex];
  const inputs = currentForm.querySelectorAll("input");
  let isValid = true;

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;

    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("invalid");
      if (!errorMessage || !errorMessage.classList.contains("error-message")) {
        const errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.textContent = "This field is required";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "0.875rem";
        input.insertAdjacentElement("afterend", errorElement);
      }
    } else {
      input.classList.remove("invalid");
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.remove();
      }
    }
  });

  if (password1 && password2) {
    if (password1.value !== password2.value) {
      isValid = false;
      const confirmPasswordErrorMessage = password2.nextElementSibling;

      if (
        !confirmPasswordErrorMessage ||
        !confirmPasswordErrorMessage.classList.contains("error-message")
      ) {
        const errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.textContent = "Passwords do not match";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "0.875rem";
        password2.insertAdjacentElement("afterend", errorElement);
        password1.value = "";
        password2.value = "";
      }

      password2.classList.add("invalid");
    } else {
      const confirmPasswordErrorMessage = password2.nextElementSibling;

      if (
        confirmPasswordErrorMessage &&
        confirmPasswordErrorMessage.classList.contains("error-message")
      ) {
        confirmPasswordErrorMessage.remove();
      }

      password2.classList.remove("invalid");
    }
  }

  return isValid;
}

// Local Storage

let dataProd = [];

if (localStorage.accounts != null) {
  dataProd = JSON.parse(localStorage.getItem("accounts"));
}

function save() {
  let newAccount = {
    firstname: fname.value.trim().toLowerCase(),
    lastname: lname.value.trim().toLowerCase(),
    email: email.value.trim().toLowerCase(),
    password1: password1.value,
    password2: password2.value,
    phone: phone.value.trim(),
  };

  const emailExists = dataProd.some(
    (account) => account.email === newAccount.email
  );
  if (emailExists) {
    alert("Email already registered!");
    return;
  }

  dataProd.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(dataProd));

  clearData();

  alert("Account created successfully!");
}

function clearData() {
  fname.value = "";
  lname.value = "";
  phone.value = "";
  email.value = "";
  password1.value = "";
  password2.value = "";
}
// toggle function
function toggle1() {
  let eye1 = document.getElementById("eye1");
  if (password1.type === "password") {
    password1.type = "text";
    eye1.innerHTML =
      '<i class="far fa-eye-slash" style="color: rgb(80, 75, 75);;" ></i>';
  } else {
    password1.type = "password";
    eye1.innerHTML =
      '<i class="far fa-eye" style="color: rgb(80, 75, 75);;" ></i>';
  }
}
function toggle2() {
  let eye2 = document.getElementById("eye2");
  if (password2.type === "password") {
    password2.type = "text";
    eye2.innerHTML =
      '<i class="far fa-eye-slash" style="color: rgb(80, 75, 75);" ></i>';
  } else {
    password2.type = "password";
    eye2.innerHTML =
      '<i class="far fa-eye" style="color: rgb(80, 75, 75);" ></i>';
  }
}
