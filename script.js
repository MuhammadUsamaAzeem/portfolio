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


document.getElementById("cvDownloadLink").addEventListener("click", function (event) {
    event.preventDefault();

    // Check if the file exists in the system before downloading
    checkIfFileExists("cv.pdf", function (exists) {
        if (exists) {
            if (localStorage.getItem('cvDownloaded') === 'true') {
                showSnackbar("⚠️ CV already exists in your gallery.", "warning");
                return;
            }
        } else {
            // Reset localStorage if file is deleted
            localStorage.removeItem('cvDownloaded');
        }

        // Mark as downloaded
        localStorage.setItem('cvDownloaded', 'true');

        // Create a hidden download link
        const link = document.createElement("a");
        link.href = "cv.pdf";
        link.download = "cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showSnackbar("✅ CV downloaded successfully!", "success");
    });
});

// Function to check if file exists
function checkIfFileExists(url, callback) {
    fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                callback(true);
            } else {
                callback(false);
            }
        })
        .catch(() => callback(false));
}

// Snackbar function
function showSnackbar(message, type) {
    let snackbar = document.getElementById("snackbar");

    if (!snackbar) {
        snackbar = document.createElement("div");
        snackbar.id = "snackbar";
        document.body.appendChild(snackbar);

        // Add styles dynamically
        const style = document.createElement("style");
        style.textContent = `
            #snackbar {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                padding: 14px 28px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 6px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                opacity: 0;
                transform: translate(-50%, 30px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }

            #snackbar.show {
                opacity: 1;
                transform: translate(-50%, 0);
            }

            #snackbar.success {
                background-color: #4CAF50; /* Green */
            }

            #snackbar.warning {
                background-color: #FF9800; /* Orange */
            }
        `;
        document.head.appendChild(style);
    }

    snackbar.textContent = message;
    snackbar.className = "show " + type;

    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}
