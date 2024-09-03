document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables for sidebar scenes and control logic
  const scenes = document.querySelectorAll(".sidebar-scene");
  let currentScene = 0;
  let isPlaying = true;

  // Create and configure the replay button
  const playButton = document.createElement("button");
  playButton.id = "playButton";
  playButton.textContent = "Replay";
  document.getElementById("sidebar").appendChild(playButton);

  // Create and configure the student info display
  const studentInfo = document.createElement("p");
  studentInfo.className = "sidebar-student-info";
  studentInfo.textContent = "1572184 Dongju Kim";
  document.getElementById("sidebar").appendChild(studentInfo);

  // Function to display the next scene in the sidebar
  function showNextScene() {
    if (isPlaying) {
      scenes[currentScene].classList.remove("active");
      currentScene = (currentScene + 1) % scenes.length;
      scenes[currentScene].classList.add("active");

      // If the last scene is reached, stop playback and show the replay button and student info
      if (currentScene === scenes.length - 1) {
        setTimeout(() => {
          isPlaying = false;
          playButton.style.display = "block";
          studentInfo.style.display = "block";
        }, 3000); // Show the button and info 3 seconds after the last scene finishes
      }
    }
  }

  // Start by displaying the first scene
  scenes[currentScene].classList.add("active");
  let sceneInterval = setInterval(showNextScene, 3000); // Automatically advance scenes every 3 seconds

  // Handle the replay button click event
  playButton.addEventListener("click", function () {
    isPlaying = true; // Resume playback
    currentScene = 0; // Reset to the first scene
    scenes.forEach((scene) => scene.classList.remove("active"));
    scenes[currentScene].classList.add("active");
    playButton.style.display = "none"; // Hide the replay button
    studentInfo.style.display = "none"; // Hide the student info
    clearInterval(sceneInterval); // Clear the existing interval
    sceneInterval = setInterval(showNextScene, 3000); // Restart the scene loop
  });

  // Initialize the datepicker for selecting a date
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    onSelect: function (dateText) {
      $("#date").val(dateText); // Update the date input field with the selected date
    },
  });

  // Variables to manage the booking form steps
  const steps = document.querySelectorAll(".booking-form");
  const indicators = document.querySelectorAll("#progress .step");

  let currentStep = 0;

  // Function to show the appropriate form step based on the step index
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = index === stepIndex ? "block" : "none"; // Display the current step and hide others
    });
    updateProgress(stepIndex); // Update the progress indicators
  }

  // Function to update the progress indicators based on the current step
  function updateProgress(stepIndex) {
    indicators.forEach((indicator, index) => {
      if (index <= stepIndex) {
        indicator.classList.add("active"); // Mark the current and previous steps as active
      } else {
        indicator.classList.remove("active"); // Deactivate future steps
      }
    });
  }

  showStep(currentStep); // Display the first step initially

  // Event listeners for the "Next" buttons to move to the next step
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

  // Event listeners for the "Previous" buttons to move to the previous step
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

  // Handle form submission to gather input data and display the summary
  document
    .getElementById("submitBooking")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Gather input values from the form fields
      const date = document.getElementById("date").value;
      const adults = document.getElementById("adults").value;
      const children = document.getElementById("children").value;

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const middleName = document.getElementById("middleName").value;
      const email = document.getElementById("email").value;

      const color = document.querySelector(
        'input[name="ticketColor"]:checked'
      ).value;
      const locker = document.querySelector(
        'input[name="locker"]:checked'
      ).value;

      // Create a summary of the booking information
      const summaryContent = `
      <p><strong>Date of Attendance:</strong> ${date}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Name:</strong> ${firstName} ${middleName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Ticket Color:</strong> ${color}</p>
      <p><strong>Optional Storage Locker:</strong> ${locker}</p>
    `;

      // Display the booking summary and hide the form
      document.getElementById("summaryContent").innerHTML = summaryContent;
      document
        .querySelectorAll(".booking-form")
        .forEach((form) => (form.style.display = "none"));
      document.getElementById("summary").style.display = "block";
    });

  // Event listener for the "Edit Booking" button to return to the last step
  document.getElementById("editBooking").addEventListener("click", function () {
    document.getElementById("summary").style.display = "none"; // Hide the summary
    showStep(currentStep); // Show the last step of the form
  });
});
