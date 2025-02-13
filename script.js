const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const forms = document.querySelectorAll(".form");

let currentStep = 1;

next.addEventListener("click", function () {
  if (currentStep < circles.length && validateForm(currentStep - 1)) {
    currentStep++;
    update();
  }
});

prev.addEventListener("click", function () {
  if (currentStep > 1) {
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

  return isValid;
}
