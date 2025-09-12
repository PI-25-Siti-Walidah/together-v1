document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");

  if (container) {
    fetch("nav.html")
      .then(res => res.text())
      .then(data => {
        container.innerHTML = data;

        // side menu
        const menuBtn = document.getElementById("menu-btn");
        const closeBtn = document.getElementById("close-btn");
        const sideMenu = document.getElementById("side-menu");
        const overlay = document.getElementById("overlay");

        if (menuBtn && closeBtn && sideMenu && overlay) {
          menuBtn.addEventListener("click", () => {
            sideMenu.classList.add("open");
            overlay.style.display = "block";
          });

          closeBtn.addEventListener("click", () => {
            sideMenu.classList.remove("open");
            overlay.style.display = "none";
          });

          overlay.addEventListener("click", () => {
            sideMenu.classList.remove("open");
            overlay.style.display = "none";
          });
        }

        // highlight link
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "" || currentPage === "/") {
          currentPage = "index.html";
        }

        const links = document.querySelectorAll(".nav-link, .side-links a");

        links.forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      })
      .catch(err => console.error("Gagal load navbar:", err));
  }
});