const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const punyaRumah = document.getElementById("punyaRumah");
const statusRumahField = document.getElementById("statusRumahField");
const statusRumah = document.getElementById("statusRumah");
const bekerja = document.getElementById("bekerja");
const pendapatanField = document.getElementById("pendapatanField");
const pendapatan = document.getElementById("pendapatan");

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

function validateStep(n) {
  const activeStep = steps[n];
  const requiredInputs = activeStep.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let valid = true;

  requiredInputs.forEach((input) => {
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains("error-msg")) {
      errorMsg = document.createElement("p");
      errorMsg.className = "error-msg text-red-500 text-sm mt-1";
      input.insertAdjacentElement("afterend", errorMsg);
    }

    if (!input.value.trim()) {
      errorMsg.textContent = "Field ini wajib diisi";
      input.classList.add("border-red-500");
      valid = false;
    } else {
      errorMsg.textContent = "";
      input.classList.remove("border-red-500");
    }
  });

  return valid;
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
  if (validateStep(currentStep)) {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

punyaRumah.addEventListener("change", () => {
  if (punyaRumah.value === "ya") {
    statusRumahField.classList.remove("hidden");
    statusRumah.setAttribute("required", "true");
  } else {
    statusRumahField.classList.add("hidden");
    statusRumah.removeAttribute("required");
    statusRumah.value = "";
  }
});

bekerja.addEventListener("change", () => {
  if (bekerja.value === "ya") {
    pendapatanField.classList.remove("hidden");
    pendapatan.setAttribute("required", "true");
  } else {
    pendapatanField.classList.add("hidden");
    pendapatan.removeAttribute("required");
    pendapatan.value = "";
  }
});

jumlahTanggungan.addEventListener("input", (e) => {
  tanggunganContainer.innerHTML = "";
  const jumlah = parseInt(e.target.value) || 0;
  for (let i = 1; i <= jumlah; i++) {
    tanggunganContainer.innerHTML += `
      <div class="border p-3 rounded-lg">
        <h4 class="font-semibold mb-2">Tanggungan ${i}</h4>
        <label class="block text-sm">Umur</label>
        <input type="number" name="tanggunganUmur${i}" class="w-full border rounded px-3 py-2 mb-2" required />
        <label class="block text-sm">Status</label>
        <select name="tanggunganStatus${i}" class="w-full border rounded px-3 py-2 mb-2" required>
          <option value="">Pilih</option>
          <option value="sekolah">Ber-sekolah</option>
          <option value="tidak">Tidak</option>
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
    provinsiSelect.innerHTML += `<option value="${prov.name}">${prov.name}</option>`;
  });
}
loadProvinsi();
