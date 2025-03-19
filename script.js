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

function openLightbox(imageSrc) {
    if (!imageSrc) return;

    let lightbox = document.getElementById("lightbox");

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
}

function closeLightbox() {
    let lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", function () {
    let lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const projects = container.innerHTML;
    container.innerHTML += projects; 

    let scrollAmount = 0;
    const scrollSpeed = 3; // Increase this value for faster scrolling
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