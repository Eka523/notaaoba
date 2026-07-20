// =======================
// Ambil semua input
// =======================

const noNota = document.getElementById("noNota");
const nama = document.getElementById("nama");
const nominal = document.getElementById("nominal");
const keperluan = document.getElementById("keperluan");
const catatan = document.getElementById("catatan");
const kota = document.getElementById("kota");
const tanggal = document.getElementById("tanggal");




// =======================
// Ambil preview
// =======================

const previewNo = document.getElementById("previewNo");
const previewNama = document.getElementById("previewNama");
const previewNominal = document.getElementById("previewNominal");
const previewKeperluan = document.getElementById("previewKeperluan");
const previewCatatan = document.getElementById("previewCatatan");
const previewTanggal = document.getElementById("previewTanggal");




// =======================
// Format Rupiah
// =======================

function rupiah(number){

    return new Intl.NumberFormat('id-ID',{
        style:'currency',
        currency:'IDR',
        minimumFractionDigits:0
    }).format(number);

}


// =======================
// Update Preview
// =======================

function updatePreview(){

    previewNo.textContent = noNota.value;

    previewNama.textContent = nama.value;

    previewNominal.textContent = rupiah(
        nominal.value || 0
    );

    previewKeperluan.textContent = keperluan.value;

    previewCatatan.textContent = catatan.value;


    if(tanggal.value){

        const tgl = new Date(tanggal.value);

        const hasil = tgl.toLocaleDateString("id-ID",{

            day:"numeric",

            month:"long",

            year:"numeric"

        });

        previewTanggal.textContent =
            kota.value + ", " + hasil;

    }

}


// =======================
// Event Input
// =======================

document.querySelectorAll("input, textarea").forEach(item=>{

    item.addEventListener("input",updatePreview);

});


// =======================
// Download PNG HD
// =======================

document
.getElementById("downloadBtn")
.addEventListener("click", async () => {

    const nota = document.querySelector(".nota");

    // Simpan style lama
    const oldTransform = nota.style.transform;
    const oldWidth = nota.style.width;
    const oldHeight = nota.style.height;

    // Paksa ukuran desktop
    nota.style.transform = "none";
    nota.style.width = "1550px";
    nota.style.height = "730px";

    // Tunggu browser render ulang
    await new Promise(resolve => setTimeout(resolve, 100));

    html2canvas(nota, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#F8F3EA",
        width: 1550,
        height: 730,
        windowWidth: 1550,
        windowHeight: 730
    }).then(canvas => {

        // Balikin style semula
        nota.style.transform = oldTransform;
        nota.style.width = oldWidth;
        nota.style.height = oldHeight;

        const link = document.createElement("a");

        link.download = "Kuitansi.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});
