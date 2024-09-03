document.addEventListener("DOMContentLoaded", function () {
  // Sidebar scene change logic
  const scenes = document.querySelectorAll(".sidebar-scene");
  let currentScene = 0;

  function showNextScene() {
    scenes[currentScene].classList.remove("active");
    currentScene = (currentScene + 1) % scenes.length;
    scenes[currentScene].classList.add("active");
  }

  scenes[currentScene].classList.add("active");
  setInterval(showNextScene, 3000);

  // Datepicker 초기화
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    onSelect: function (dateText) {
      $("#date").val(dateText);
    },
  });

  const steps = document.querySelectorAll(".booking-form");
  const indicators = document.querySelectorAll("#progress .step");

  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = index === stepIndex ? "block" : "none";
    });
    updateProgress(stepIndex);
  }

  function updateProgress(stepIndex) {
    indicators.forEach((indicator, index) => {
      if (index <= stepIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  showStep(currentStep);

  // Next buttons
  document.getElementById("next1").addEventListener("click", function () {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(currentStep);
    }
  });

  document.getElementById("next2").addEventListener("click", function () {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(currentStep);
    }
  });

  document.getElementById("next3").addEventListener("click", function () {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(currentStep);
    }
  });

  // Previous buttons
  document.getElementById("prev2").addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  document.getElementById("prev3").addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  document.getElementById("prev4").addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // Submit 버튼 클릭 시 데이터 수집 및 요약 표시
  document
    .getElementById("submitBooking")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const date = document.getElementById("date").value;
      const adults = document.getElementById("adults").value;
      const children = document.getElementById("children").value;

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const middleName = document.getElementById("middleName").value;
      const email = document.getElementById("email").value;

      const color = document.getElementById("color").value;
      const locker = document.querySelector(
        'input[name="locker"]:checked'
      ).value;

      const summaryContent = `
      <p><strong>Date of Attendance:</strong> ${date}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Name:</strong> ${firstName} ${middleName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Ticket Color:</strong> ${color}</p>
      <p><strong>Optional Storage Locker:</strong> ${locker}</p>
    `;

      document.getElementById("summaryContent").innerHTML = summaryContent;
      document
        .querySelectorAll(".booking-form")
        .forEach((form) => (form.style.display = "none"));
      document.getElementById("summary").style.display = "block";
    });

  document.getElementById("editBooking").addEventListener("click", function () {
    document.getElementById("summary").style.display = "none";
    showStep(currentStep);
  });
});
