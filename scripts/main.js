window.addEventListener("load", () => {
  const loader = document.querySelector(".loading-screen");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }
});
