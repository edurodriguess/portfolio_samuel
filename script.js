// Helpers
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const $ = (sel, ctx = document) => ctx.querySelector(sel);

const sidebar = $(".sidebar-inner");
const toggleBtn = $("#toggleSidebar");
const content = $(".content");

let sidebarOpen = true;

toggleBtn.addEventListener("click", () => {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
        sidebar.classList.remove("collapsed");
        content.classList.remove("menu-collapsed");
    } else {
        sidebar.classList.add("collapsed");
        content.classList.add("menu-collapsed");
    }
});

// Troca de seções
function showSection(targetSelector) {
    $$(".content-section").forEach((sec) => {
        sec.classList.add("d-none");
        sec.classList.remove("active");
    });
    const target = $(targetSelector);
    if (target) {
        target.classList.remove("d-none");
        target.classList.add("active");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Menu navegação
$$("[data-section-target]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute("data-section-target");
        showSection(target);
    });
});

// Lightbox
let currentGallery = [];
let currentIndex = 0;
const lightboxModal = new bootstrap.Modal("#lightboxModal");
const lightboxImage = $("#lightboxImage");

function openLightbox(galleryEls, index) {
    currentGallery = galleryEls.map((img) => img.getAttribute("src"));
    currentIndex = index;
    updateLightbox();
    lightboxModal.show();
}
function updateLightbox() {
    lightboxImage.src = currentGallery[currentIndex];
}
$("#prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
});
$("#nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightbox();
});

// Clique nas imagens
$$(".masonry").forEach((gallery) => {
    const imgs = $$("img.masonry-item, .masonry-item", gallery);
    imgs.forEach((img, idx) => {
        img.addEventListener("click", () => openLightbox(imgs, idx));
    });
});

// Overflow extra
addEventListener("load", () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
});
