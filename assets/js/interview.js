

function toggleDiv(divId) {
  // Hide all divs
  document.querySelectorAll(".visible").forEach(function (div) {
    div.classList.remove("visible");
    div.classList.add("hidden");
  });

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  if (selectedDiv) {
    selectedDiv.classList.remove("hidden");
    selectedDiv.classList.add("visible");
  }
}
function hideDiv() {
  // Hide all divs when the submit button is clicked
  document.querySelectorAll(".visible").forEach(function (div) {
    div.classList.remove("visible");
    div.classList.add("hidden");
  });
}
