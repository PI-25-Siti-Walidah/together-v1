const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const punyaRumah = document.getElementById("punyaRumah");
const statusRumahField = document.getElementById("statusRumahField");
const bekerja = document.getElementById("bekerja");
const pendapatanIstriField = document.getElementById("pendapatanIstriField");

const jumlahTanggungan = document.getElementById("jumlahTanggungan");
const tanggunganContainer = document.getElementById("tanggunganContainer");

let currentStep = 0;

function showStep(n) {
  steps.forEach((step, index) => {
    step.classList.toggle("hidden", index !== n);
  });
  prevBtn.classList.toggle("hidden", n === 0);
  nextBtn.classList.toggle("hidden", n === steps.length - 1);
  submitBtn.classList.toggle("hidden", n !== steps.length - 1);
}

// Buka modal
openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showStep(0);
});

// Tutup modal via tombol close
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Tutup modal jika klik area luar
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Navigasi step
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

punyaRumah.addEventListener("change", (e) => {
  statusRumahField.classList.toggle("hidden", e.target.value !== "ya");
});

bekerja.addEventListener("change", (e) => {
  pendapatanIstriField.classList.toggle("hidden", e.target.value !== "ya");
});

jumlahTanggungan.addEventListener("input", (e) => {
  tanggunganContainer.innerHTML = "";
  const jumlah = parseInt(e.target.value) || 0;
  for (let i = 1; i <= jumlah; i++) {
    tanggunganContainer.innerHTML += `
      <div class="border p-3 rounded-lg">
        <h4 class="font-semibold mb-2">Tanggungan ${i}</h4>
        <label class="block text-sm">Umur</label>
        <input type="number" class="w-full border rounded px-3 py-2 mb-2" />
        <label class="block text-sm">Status</label>
        <select class="w-full border rounded px-3 py-2 mb-2">
          <option>Ber-sekolah</option>
          <option>Tidak</option>
        </select>
      </div>
    `;
  }
});

async function loadProvinsi() {
  const res = await fetch(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
  );
  const data = await res.json();
  const provinsiSelect = document.getElementById("provinsi");
  data.forEach((prov) => {
    provinsiSelect.innerHTML += `<option value="${prov.id}">${prov.name}</option>`;
  });
}
loadProvinsi();
