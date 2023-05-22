const links = document.querySelectorAll(".social");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = () => {
    document.activeElement.blur();
  };
}
