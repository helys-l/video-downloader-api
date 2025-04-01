
const catIMg1= document.getElementById('cat1');
const catIMg2 = document.getElementById('cat2');
const loading= document.getElementById('loading');
const body=document.getElementById('body');
const petunjuk= document.getElementById('petunjuk');

async function getFormats() {
    catIMg1.src="/static/oiia-cat.gif";
    catIMg2.src="/static/oiia-cat.gif";

    loading.style.display = "flex";

    let url = document.getElementById('videoUrl').value;
    if (!url) {
        catIMg1.src= "/static/banana-cat.gif";
        catIMg2.src= "/static/banana-cat.gif";
        return alert("Masukkan URL terlebih dahulu!");
    } 

    let response = await fetch(`https://meowtube-video-downloader.up.railway.app/formats?url=${encodeURIComponent(url)}`);
    ;
    let data = await response.json();

    if (data.error) {
        alert("Error: " + data.error);
        catIMg1.src="/static/banana-cat.gif";
        catIMg2.src="/static/banana-cat.gif";
        return;
    }

    document.getElementById('thumbnail').src = data.thumbnail;
    document.getElementById('title').textContent = data.title;

    let formatSelect = document.getElementById('formatSelect');
    formatSelect.innerHTML = "";
    data.formats.forEach(f => {
        let option = document.createElement('option');
        option.value = f.url;
        option.textContent = `${f.resolution} (${f.ext})`;
        formatSelect.appendChild(option);
    });

    document.getElementById('videoDetails').style.display = "block";
    if (document.getElementById('videoDetails').style.display === "block") {
        loading.style.display = "none";
        catIMg1.src="/static/happy-happy-happy-cat.gif";
        catIMg2.src="/static/happy-happy-happy-cat.gif";


    } else {
        loading.style.display = "flex";
    }
    
}

function downloadVideo() {
    let selectedUrl = document.getElementById('formatSelect').value;
    if (selectedUrl) {
        window.open(selectedUrl, "_blank");
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        getFormats();
    }
}

const petunjukButton = document.getElementById('petunjuk');
function showPetunjuk() {
    const petunjukContainer = document.createElement('div');
    petunjukContainer.className = 'petunjuk-container';
    petunjukContainer.textContent = 'Petunjuk download video: \n1. Masukkan url video yang ingin didownload. \n2. Klik tombol cari video. \n3. Pilih format yang ingin didownload. \n4. Klik tombol download. \n5. Setelah anda klik akan menuju ke halaman baru video play, kemudian klik titik tiga dan pilih download. \n6. Tunggu hingga selesai.';
    document.body.appendChild(petunjukContainer);
}

function hidePetunjuk() {
    const petunjukContainer = document.querySelector('.petunjuk-container');
    if (petunjukContainer) {
        document.body.removeChild(petunjukContainer);
    }
}

petunjukButton.addEventListener('click', function() {
    const petunjukContainer = document.querySelector('.petunjuk-container');
    if (petunjukContainer) {
        hidePetunjuk();  
    } else {
        showPetunjuk();  
    }
});
const imageUrl = 'static/catban.png'; // Gambar satu

function createFallingImage() {
    // Membuat elemen gambar
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.className = 'falling-image';

    // Ukuran acak untuk gambar
    const randomSize = Math.floor(Math.random() * (100 - 30 + 1)) + 30; // Ukuran acak antara 30px sampai 100px
    imgElement.style.width = `${randomSize}px`;
    imgElement.style.height = `${randomSize}px`;

    // Posisi horizontal acak
    const randomX = Math.random() * window.innerWidth; // Posisi acak di sepanjang lebar layar
    imgElement.style.left = `${randomX}px`;

    // Kecepatan animasi acak
    const randomSpeedFall = Math.random() * (6 - 3) + 3; // Kecepatan jatuh acak antara 3 detik sampai 6 detik
    const randomSpeedRotate = Math.random() * (4 - 2) + 2; // Kecepatan putaran acak antara 2 detik sampai 4 detik

    // Menambahkan animasi dengan kecepatan acak
    imgElement.style.animation = `fallAnimation ${randomSpeedFall}s linear infinite, rotateAnimation ${randomSpeedRotate}s linear infinite`;

    // Menambahkan gambar ke body
    const bg=document.getElementById('bg');    
    document.body.appendChild(imgElement);

    // Menghapus gambar setelah animasi selesai (ketika keluar layar)
    setTimeout(() => {
        imgElement.remove();
    }, randomSpeedFall * 1000); // Gambar dihapus setelah durasi animasi jatuh selesai
}

// Fungsi untuk membuat banyak gambar jatuh
function createMultipleFallingImages() {
    const numImages = 10; // Jumlah gambar yang ingin dibuat (bisa diubah sesuai keinginan)
    for (let i = 0; i < numImages; i++) {
        createFallingImage();
    }
}

// Mulai membuat gambar pertama kali
setInterval(createMultipleFallingImages, 1000); 
