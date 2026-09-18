document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filtbtn");
  const productCards = document.querySelectorAll(".grid-3 .mcard");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const selected = (button.dataset.f || "all").toLowerCase().trim();
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      productCards.forEach((card) => {
        const category = (card.querySelector(".mcat")?.textContent || "").toLowerCase().trim();
        const show = selected === "all" || selected === "fastener" || category === selected;
        card.style.display = show ? "block" : "none";
        card.style.opacity = show ? "1" : "0";
        card.style.transform = show ? "scale(1)" : "scale(.98)";
      });
    });
  });

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.innerHTML = open ? '<i class="fa fa-times"></i>' : '<i class="fa fa-bars"></i>';
    });
    navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<i class="fa fa-bars"></i>';
    }));
  }

  const searchBtn = document.getElementById("navSearchBtn");
  if (searchBtn) {
    searchBtn.setAttribute("aria-label", "Go to product search");
    searchBtn.addEventListener("click", () => {
      document.getElementById("category")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  document.getElementById("contactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const text = `Hello Screw Hub,\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/919999051859?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  document.getElementById("newsletterBtn")?.addEventListener("click", () => {
    const input = document.getElementById("newsletterEmail");
    const email = input?.value.trim();
    if (!email || !input.checkValidity()) {
      input?.reportValidity();
      return;
    }
    const text = `Hello Screw Hub, please add ${email} to your product updates list.`;
    window.open(`https://wa.me/919999051859?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
});
