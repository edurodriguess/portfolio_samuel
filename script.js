// Helpers
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const $ = (sel, ctx = document) => ctx.querySelector(sel);

// Troca de seções (um ativo por vez)
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
    // rola para o topo do conteúdo após troca
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Bind menu (apenas navegação, sem colapsar subitens)
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

// Clique nas imagens (por galeria/seção)
$$(".masonry").forEach((gallery) => {
    const imgs = $$("img.masonry-item, .masonry-item", gallery);
    imgs.forEach((img, idx) => {
        img.addEventListener("click", () => openLightbox(imgs, idx));
    });
});

// Defesa extra contra qualquer overflow acidental
addEventListener("load", () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
});
