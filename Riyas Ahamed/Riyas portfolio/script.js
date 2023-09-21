// JavaScript to handle the sticky navbar
window.addEventListener("scroll", () => {
    const navbar = document.querySelector("header");
    if (window.scrollY > 60) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
});

    
