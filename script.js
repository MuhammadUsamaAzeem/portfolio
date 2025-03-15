document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            projects.forEach(project => {
                if (category === "all" || project.classList.contains(category)) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
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

        // Close button
        const closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("lightbox-close");
        closeButton.onclick = closeLightbox;

        lightbox.appendChild(closeButton);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
    } else {
        document.getElementById("lightbox-img").src = imageSrc;
        lightbox.classList.add("active");
    }

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; 
}

function closeLightbox() {
    var lightbox = document.getElementById("lightbox");

    if (lightbox) {
        lightbox.style.display = "none"; 
    }

    document.body.style.overflow = "auto"; 
}


document.addEventListener("DOMContentLoaded", function () {
    let lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".animated-section");

    function revealOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.85) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on page load
});
