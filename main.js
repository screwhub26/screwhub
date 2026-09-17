/**
 * Screw Hub - Main JavaScript File
 * Optimized for High Performance & Mobile Speed
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. DYNAMIC CATEGORY FILTER (PRODUCT TABS)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filtbtn");
    const productCards = document.querySelectorAll(".mcard");

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Active class ko manage karein
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.textContent.trim().toLowerCase();

                // Cards ko filter karein (Animation ke sath)
                productCards.forEach(card => {
                    // CSS category ko card ke element se read karne ke liye aap ya to h3 ka text check kar sakte hain ya card body ka text
                    const cardContent = card.innerText.toLowerCase();
                    
                    // Agar 'all' select hai ya category match karti hai
                    if (filterValue === "all" || filterValue === "all threaded rods" || cardContent.includes(filterValue.replace("all ", "").replace("s", ""))) {
                        card.style.display = "flex";
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    } else {
                        card.style.display = "none";
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.8)";
                    }
                });
            });
        });
    }

    // ==========================================
    // 2. CONTACT FORM HANDLING (SUBMIT ACTION)
    // ==========================================
    const contactForm = document.querySelector(".ctform-box-luxury form, form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Default reload rokein
            
            const submitBtn = contactForm.querySelector(".btn-ctsubmit-luxury");
            const originalText = submitBtn ? submitBtn.innerText : "Send Message";
            
            if (submitBtn) {
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
            }

            // Inputs read karein
            const name = contactForm.querySelector('input[placeholder="Full Name"]')?.value;
            const email = contactForm.querySelector('input[placeholder="Email Address"]')?.value;
            const message = contactForm.querySelector('textarea')?.value;

            // Form Validation Check
            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                if (submitBtn) {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
                return;
            }

            // Yahan aap apna email integration (jaise EmailJS ya Formspree) laga sakte hain
            // Abhi ke liye success feedback trigger karte hain:
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been sent successfully. We will connect shortly.`);
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            }, 1200);
        });
    }

    // ==========================================
    // 3. NAVBAR STICKY & SCROLL OPTIMIZATION
    // ==========================================
    const navbar = document.getElementById("nav");
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.paddingTop = "8px";
            navbar.style.paddingBottom = "8px";
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
        } else {
            navbar.style.paddingTop = "15px";
            navbar.style.paddingBottom = "15px";
            navbar.style.background = "#fff";
        }
        lastScrollTop = scrollTop;
    }, { passive: true }); // Passive tag se mobile scroll performance bohot smooth ho jati hai
});
