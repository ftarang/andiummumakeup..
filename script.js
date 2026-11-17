JS

// 1. Filter Kategori Galeri
function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.gallery-item').forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 2. Fitur Geser Galeri dengan Mouse (Drag) & Klik Buka Foto Penuh
const slider = document.getElementById('gallerySlider');
let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  isDragging = false;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  isDragging = true;
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Buka Modal Foto saat Kartu Diklik
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (isDragging) return;
    const img = item.querySelector('img');
    const title = item.querySelector('h3').innerText;
    const category = item.querySelector('span').innerText;

    document.getElementById('imageModal').style.display = 'flex';
    document.getElementById('imgFull').src = img.src;
    document.getElementById('captionModal').innerText = `${category} - ${title}`;
  });
});

function tutupModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// 3. Galeri Berjalan Otomatis (Auto-Scroll)
let autoScrollInterval;

function mulaiJalanOtomatis() {
  autoScrollInterval = setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, 3000);
}

slider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
slider.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
slider.addEventListener('mouseleave', mulaiJalanOtomatis);

mulaiJalanOtomatis();

// 4. Pilih Paket Otomatis ke Form Booking
function pilihPaket(namaPaket) {
  document.getElementById('paket').value = namaPaket;
  const toast = document.getElementById('toast-notif');
  toast.innerText = `Paket "${namaPaket}" dipilih!`;
  toast.className = 'show';
  setTimeout(() => { toast.className = ''; }, 3000);
}

// 5. Kirim Pemesanan ke WhatsApp
function kirimWhatsApp(event) {
  event.preventDefault();

  const nama = document.getElementById('nama').value;
  const tanggal = document.getElementById('tanggal').value;
  const jam = document.getElementById('jam').value;
  const paket = document.getElementById('paket').value;
  const alamat = document.getElementById('alamat').value;

  const nomorWA = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
  const pesan = `Halo Aura Glam MUA, saya ingin booking jadwal makeup:%0A%0A` +
                `*Nama:* ${nama}%0A` +
                `*Tanggal Acara:* ${tanggal}%0A` +
                `*Jam Selesai:* ${jam}%0A` +
                `*Paket:* ${paket}%0A` +
                `*Alamat:* ${alamat}%0A%0A` +
                `Mohon info ketersediaan jadwalnya. Terima kasih!`;

  window.open(`https://wa.me{nomorWA}?text=${pesan}`, '_blank');
}
