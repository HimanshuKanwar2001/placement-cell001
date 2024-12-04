const resultDiv = document.getElementById("result-info");
const resultBtnToShow = document.getElementById("add-interview-button");
const form = document.getElementById("add-result");
const submitForm = document.getElementById("interview-button");
const blurOverlay = document.getElementById("blur-overlay");

submitForm.addEventListener("click", function submitForm() {
  //Trigger form submission when the button is clicked
  form.submit();
   resultDiv.style.display = "none";
});



resultBtnToShow.addEventListener("click", function () {
  if (resultDiv.style.display === "none" || resultDiv.style.display === "") {
    resultDiv.style.display = "block";
    document.body.style.display = "blur";
    // Attach click event to the document body
    document.body.addEventListener("click", clickOutsideHandler);
  } else {
    resultDiv.style.display = "none";
    // Remove the click event listener
    document.body.removeEventListener("click", clickOutsideHandler);
  }
});

// resultBtnToShow.addEventListener("click", function clickOutsideHandler(event) {
//   // Check if the clicked element is not the div or a child of the div
//   if (!resultDiv.event.target) {
//     resultDiv.style.display = "none";
//     document.body.removeEventListener("click", clickOutsideHandler);
//   }
// });


resultBtnToShow.addEventListener("click", function toggleBlur() {
  

  // Toggle the display property between 'none' and 'block'
  blurOverlay.style.display =
    blurOverlay.style.display === "none" || blurOverlay.style.display === ""
      ? "block"
      : "none";
});

blurOverlay.addEventListener('click',function(){
  if(blurOverlay.style.display === "block"){
    blurOverlay.style.display="none";
    resultDiv.style.display="none";
  }
})