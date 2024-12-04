// JavaScript code for interactive features
document.addEventListener("DOMContentLoaded", function () {
  const interviewDetails = document.querySelectorAll(".interview-details");

  interviewDetails.forEach((details) => {
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("btn", "btn-secondary", "toggle-button");
    toggleButton.textContent = "Toggle Interview Details";

    const interviewData = details.querySelector(".Interview-data");
    interviewData.style.display = "none";

    toggleButton.addEventListener("click", function () {
      interviewData.style.display =
        interviewData.style.display === "none" ? "block" : "none";
    });

    details.insertBefore(toggleButton, interviewData);
  });
});
