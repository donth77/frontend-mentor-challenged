const submitBtn = document.getElementById("submit-btn");
const btns = document.querySelectorAll(".rating-btn");
const thanksMsg = document.getElementById("thanks-msg");
const selectedTxt = document.getElementById("selected-txt");
let selectedBtn;
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = () => {
    selectedBtn = btns[i].value;
    if (submitBtn.disabled) {
      submitBtn.disabled = false;
    }
    btns[i].className = btns[i].className.replace(
      "bg-darkBlue ",
      "bg-mediumGrey "
    );
    btns[i].children[0].className = btns[i].children[0].className.replace(
      "text-mediumGrey ",
      "text-white "
    );

    btns.forEach((btn) => {
      if (btn.value != selectedBtn) {
        btn.className = btn.className.replace("bg-mediumGrey", "bg-darkBlue");
        btn.children[0].className = btn.children[0].className.replace(
          "text-white ",
          "text-mediumGrey "
        );
      }
    });
  };
}

submitBtn.addEventListener("click", () => {
  selectedTxt.innerHTML = `You selected ${selectedBtn} out of 5`;
  thanksMsg.className = thanksMsg.className.replace("hidden", "visible");
});
