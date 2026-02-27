const maxUploads = 5;
const unlockDate = new Date("2026-05-03T00:00:00");

let photos = JSON.parse(localStorage.getItem("photos")) || [];

// 🔥 AUTOMATISK REDIRECT
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    checkRedirect();
}

function checkRedirect() {
    const now = new Date();
    if (now >= unlockDate) {
        window.location.href = "galleri.html";
    }
}

// Hvis vi er på upload-siden
const photoInput = document.getElementById("photoInput");
const customUploadBtn = document.getElementById("customUploadBtn");
const countElement = document.getElementById("count");
const message = document.getElementById("message");

if (photoInput) {

    updateCounter();

    customUploadBtn.addEventListener("click", () => {
        photoInput.click();
    });

    photoInput.addEventListener("change", () => {

        const files = photoInput.files;
        if (!files.length) return;

        if (photos.length >= maxUploads) {
            message.textContent = "Du har nået grænsen på 5 billeder.";
            photoInput.value = "";
            return;
        }

        Array.from(files).forEach(file => {

            if (photos.length >= maxUploads) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                photos.push(e.target.result);
                localStorage.setItem("photos", JSON.stringify(photos));
                updateCounter();
            };

            reader.readAsDataURL(file);
        });

        message.textContent = "Billeder gemt.";
        photoInput.value = "";
    });
}

function updateCounter() {
    if (countElement) {
        countElement.textContent = photos.length;
    }
}

// Hvis vi er på galleri-siden
const gallery = document.getElementById("gallery");
const downloadAllBtn = document.getElementById("downloadAll");

if (gallery) {
    photos.forEach((photo, index) => {
        const img = document.createElement("img");
        img.src = photo;

        img.addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = photo;
            link.download = `billede-${index + 1}.jpg`;
            link.click();
        });

        gallery.appendChild(img);
    });
}

if (downloadAllBtn) {
    downloadAllBtn.addEventListener("click", () => {
        photos.forEach((photo, index) => {
            const link = document.createElement("a");
            link.href = photo;
            link.download = `billede-${index + 1}.jpg`;
            link.click();
        });
    });
}