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
// Download JPG
// =======================

document
.getElementById("downloadBtn")
.addEventListener("click",()=>{

    const nota=document.querySelector(".nota");

    html2canvas(nota,{

        scale:5,

        useCORS:true,

        backgroundColor:null

    }).then(canvas=>{

        const link=document.createElement("a");

        link.download="Kuitansi.jpg";

        link.href=canvas.toDataURL("image/jpeg",1);

        link.click();

    });

});