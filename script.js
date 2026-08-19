// ===== SCREW HUB WEBSITE SETTINGS =====
// Replace these three values before publishing.
const BUSINESS_PHONE = "+919999951859";
const WHATSAPP_NUMBER = "+919999951859"; // Example: 919999999999
const BUSINESS_EMAIL = "screwhub26@gmail.com";

document.getElementById("year").textContent = new Date().getFullYear();

const phoneText = document.getElementById("phoneText");
const emailText = document.getElementById("emailText");
const waBtn = document.getElementById("waBtn");

if (BUSINESS_PHONE !== "YOUR_PHONE_NUMBER") phoneText.textContent = BUSINESS_PHONE;
if (BUSINESS_EMAIL !== "YOUR_EMAIL@example.com") emailText.textContent = BUSINESS_EMAIL;

if (WHATSAPP_NUMBER !== "YOUR_WHATSAPP_NUMBER_WITH_COUNTRY_CODE") {
  waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Screw Hub, I want to enquire about your products.")}`;
} else {
  waBtn.href = "#contact";
}

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".site-header").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(a => {
  a.addEventListener("click", () => document.querySelector(".site-header").classList.remove("open"));
});

document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const requirement = document.getElementById("requirement").value.trim();
  const msg = `Hello Screw Hub,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ARequirement: ${encodeURIComponent(requirement)}`;

  if (WHATSAPP_NUMBER !== "YOUR_WHATSAPP_NUMBER_WITH_COUNTRY_CODE") {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  } else {
    alert("Please add your WhatsApp number in script.js before publishing.");
  }
});
