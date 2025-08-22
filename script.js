// Helpers
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

let currentGallery = [];
let currentIndex = 0;

// SIDEBAR
const sidebar = $("#sidebar");
$("#toggleSidebar").addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// NAVEGAÇÃO ENTRE SEÇÕES COM FADE-IN
$$("[data-section-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-section-target");
        $$(".content-section").forEach((sec) => {
            sec.classList.remove("active");
            setTimeout(() => sec.classList.add("d-none"), 350); // espera fade-out
        });
        const section = $(target);
        section.classList.remove("d-none");
        setTimeout(() => section.classList.add("active"), 10);
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// LIGHTBOX
const lightboxModal = $("#lightboxModal");
const lightboxImg = $("#lightboxImage");
const bsModal = new bootstrap.Modal(lightboxModal);

function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    updateLightbox();
    bsModal.show();
}

function updateLightbox() {
    lightboxImg.src = currentGallery[currentIndex].src;
}

$("#prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
});

$("#nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightbox();
});

// Clique nas imagens abre lightbox
$$(".masonry").forEach((gallery) => {
    const imgs = $$("img.masonry-item", gallery);
    imgs.forEach((img, idx) => {
        img.addEventListener("click", () => openLightbox(imgs, idx));
    });
});

// Fecha ao clicar fora da imagem
lightboxModal.addEventListener("click", (e) => {
    if (
        e.target === lightboxModal.querySelector(".modal-content") ||
        e.target === lightboxModal.querySelector(".modal-body")
    ) {
        bsModal.hide();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const homeWrapper = document.querySelector(".home-wrapper");
    homeWrapper.classList.add("visible");

    const nameEl = document.getElementById("intro-name");
    const nameText = "Samuel Sarmento";
    const typingSpeed = 150;
    const pauseTime = 1000; // pausa após digitar

    let idx = 0;
    let deleting = false;

    function typeLoop() {
        if (!deleting) {
            // Digita letra a letra
            nameEl.textContent += nameText[idx];
            idx++;
            if (idx === nameText.length) {
                // Pausa quando terminar
                setTimeout(() => {
                    deleting = true;
                    typeLoop();
                }, pauseTime);
            } else {
                setTimeout(typeLoop, typingSpeed);
            }
        } else {
            // Apaga letra a letra
            nameEl.textContent = nameText.slice(0, idx - 1);
            idx--;
            if (idx === 0) {
                deleting = false;
                setTimeout(typeLoop, typingSpeed);
            } else {
                setTimeout(typeLoop, typingSpeed / 2); // apagar mais rápido
            }
        }
    }

    typeLoop();
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggle-submenu");
    const submenu = document.querySelector(".submenu");

    toggleBtn.addEventListener("click", function () {
        submenu.classList.toggle("active");
        toggleBtn.classList.toggle("active"); // seta gira
    });
});
