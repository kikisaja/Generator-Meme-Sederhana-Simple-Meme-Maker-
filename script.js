// --- 1. ELEMEN DOM & CANVAS ---
const memeCanvas = document.getElementById("meme-canvas");
const ctx = memeCanvas.getContext("2d");

const imageSourceSelect = document.getElementById("image-source-select");
const sampleInputGroup = document.getElementById("sample-input-group");
const urlInputGroup = document.getElementById("url-input-group");
const fileInputGroup = document.getElementById("file-input-group");

const sampleSelect = document.getElementById("sample-select");
const imageUrlInput = document.getElementById("image-url");
const imageFileInput = document.getElementById("image-file");

const topTextInput = document.getElementById("top-text");
const bottomTextInput = document.getElementById("bottom-text");
const fontSizeInput = document.getElementById("font-size");
const textColorInput = document.getElementById("text-color");

const btnDownload = document.getElementById("btn-download");
const btnReset = document.getElementById("btn-reset");

let currentImage = new Image();
currentImage.crossOrigin = "anonymous"; // Izkan pengunduhan canvas dengan gambar external

// --- 2. LOGIKA MENGGAMBAR MEME DI CANVAS ---
function drawMeme() {
    if (!currentImage.src) return;

    // Atur Ukuran Canvas Sesuai Gambar Asli
    memeCanvas.width = currentImage.width || 500;
    memeCanvas.height = currentImage.height || 500;

    // Bersihkan Canvas & Gambar Ulang Foto
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    ctx.drawImage(currentImage, 0, 0, memeCanvas.width, memeCanvas.height);

    // Pengaturan Font & Teks Meme Klasik (Impact Style)
    const fontSize = parseInt(fontSizeInput.value) || 40;
    ctx.font = `900 ${fontSize}px Impact, sans-serif`;
    ctx.fillStyle = textColorInput.value;
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.max(2, fontSize / 12);
    ctx.textAlign = "center";

    // Gambar Teks Atas
    const topText = topTextInput.value.toUpperCase();
    ctx.textBaseline = "top";
    ctx.strokeText(topText, memeCanvas.width / 2, 20);
    ctx.fillText(topText, memeCanvas.width / 2, 20);

    // Gambar Teks Bawah
    const bottomText = bottomTextInput.value.toUpperCase();
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, memeCanvas.width / 2, memeCanvas.height - 20);
    ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height - 20);
}

// --- 3. LOGIKA MEMUAT GAMBAR ---
function loadImage(src) {
    currentImage = new Image();
    currentImage.crossOrigin = "anonymous";
    currentImage.onload = () => drawMeme();
    currentImage.onerror = () => {
        alert("Gagal memuat gambar. Pastikan URL valid dan mendukung akses publik (CORS).");
    };
    currentImage.src = src;
}

// --- 4. EVENT HANDLERS ---

// Ganti Sumber Gambar (Dropdown Mode)
imageSourceSelect.addEventListener("change", () => {
    const value = imageSourceSelect.value;
    sampleInputGroup.classList.toggle("hidden", value !== "sample");
    urlInputGroup.classList.toggle("hidden", value !== "url");
    fileInputGroup.classList.toggle("hidden", value !== "file");

    if (value === "sample") {
        loadImage(sampleSelect.value);
    }
});

// Pilih Sampel Template
sampleSelect.addEventListener("change", () => {
    loadImage(sampleSelect.value);
});

// Input via URL
imageUrlInput.addEventListener("change", () => {
    if (imageUrlInput.value.trim()) {
        loadImage(imageUrlInput.value.trim());
    }
});

// Input via File Lokal
imageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            loadImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Live Update Teks & Styling
[topTextInput, bottomTextInput, fontSizeInput, textColorInput].forEach(element => {
    element.addEventListener("input", drawMeme);
});

// Unduh Gambar Meme
btnDownload.addEventListener("click", () => {
    if (!currentImage.src) {
        alert("Pilih atau muat gambar terlebih dahulu!");
        return;
    }
    
    const link = document.createElement("a");
    link.download = "meme-kustom.png";
    link.href = memeCanvas.toDataURL("image/png");
    link.click();
});

// Reset Teks & Pengaturan
btnReset.addEventListener("click", () => {
    topTextInput.value = "KETIKA KODINGAN";
    bottomTextInput.value = "LANGSUNG RUNNING TANPA ERROR";
    fontSizeInput.value = 40;
    textColorInput.value = "#ffffff";
    drawMeme();
});

// Inisialisasi awal dengan gambar sampel pertama
loadImage(sampleSelect.value);
