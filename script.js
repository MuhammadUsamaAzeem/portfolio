document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            projects.forEach(project => {
                project.style.display = (category === "all" || project.classList.contains(category)) ? "block" : "none";
            });
        });
    });

    const sections = document.querySelectorAll(".animated-section");
    function revealOnScroll() {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
                section.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});

// ✅ Lightbox Functionality with Navbar Hide
function openLightbox(imageSrc) {
    if (!imageSrc) return;

    let lightbox = document.getElementById("lightbox");
    let navbar = document.querySelector(".navbar"); // ✅ Select Navbar

    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.classList.add("lightbox");

        const img = document.createElement("img");
        img.id = "lightbox-img";
        img.src = imageSrc;
        img.alt = "Full Screen Image";

        const closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("lightbox-close");
        closeButton.onclick = closeLightbox;

        lightbox.append(closeButton, img);
        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeLightbox();
        });
    } else {
        document.getElementById("lightbox-img").src = imageSrc;
    }

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";

    // ✅ Hide Navbar
    if (navbar) {
        navbar.style.display = "none";
    }
}

function closeLightbox() {
    let lightbox = document.getElementById("lightbox");
    let navbar = document.querySelector(".navbar"); // ✅ Select Navbar

    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // ✅ Show Navbar Back
    if (navbar) {
        navbar.style.display = "flex"; // "block" ya "flex" rakhna, jo layout match kare
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lightbox-trigger").forEach(image => {
        image.addEventListener("click", function () {
            openLightbox(this.src);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const projects = container.innerHTML;
    container.innerHTML += projects; 

    let scrollAmount = 0;
    const scrollSpeed = 3;
    let isHovering = false;

    function autoScroll() {
        if (!isHovering) {
            if (scrollAmount >= container.scrollWidth / 2) {
                scrollAmount = 0;
                container.style.transform = `translateX(0px)`;
            } else {
                scrollAmount += scrollSpeed;
                container.style.transform = `translateX(-${scrollAmount}px)`;
            }
        }
    }

    setInterval(autoScroll, 30);

    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            isHovering = true;
        });
        item.addEventListener("mouseleave", () => {
            isHovering = false;
        });
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
document.addEventListener("DOMContentLoaded", updateActiveLink);

window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {  
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function highlightNav() {
        let scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            let top = section.offsetTop;
            let height = section.offsetHeight;
            let id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                let activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", highlightNav);

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let img = document.querySelector(".hero img");
    let scale = 1.01; 
    let growing = true;

    function animateImage() {
        if (growing) {
            scale += 0.0002; 
            if (scale >= 1.03) growing = false; 
        } else {
            scale -= 0.0002; 
            if (scale <= 1.01) growing = true;
        }

        img.style.transform = `scale(${scale})`;
        requestAnimationFrame(animateImage); 
    }

    animateImage();
});

window.onload = function () {
    setTimeout(() => {
        let heroSection = document.getElementById("home");
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: "smooth" });
        }
    }, 100); 
};

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("Muhammad Usama Azeem"); // Apna EmailJS User ID yahan paste karein

    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Form submit hone se rokne ke liye

        emailjs.send("service_jjbknv4", "template_y55bior", {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
        .then(function (response) {
            document.getElementById("status").innerHTML = "✅ Email Sent Successfully!";
        }, function (error) {
            document.getElementById("status").innerHTML = "❌ Failed to send email.";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollToTop";
    scrollBtn.innerHTML = "↑";
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


document.getElementById("downloadBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Default download rokna

    // Check if file already exists
    if (localStorage.getItem("cvDownloaded")) {
        alert("CV already exists in your gallery.");
    } else {
        // Download file & mark it as downloaded
        let link = document.createElement("a");
        link.href = "cv.pdf";
        link.download = "cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        localStorage.setItem("cvDownloaded", "true"); // Store status
    }
});