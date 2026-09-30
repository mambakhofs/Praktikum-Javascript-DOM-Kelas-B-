console.log("Bismillah Kita Belajar Javascript DOM");

//Aktivitas 1 DOM SELECTION
//Penjelasan kita harus menyeleski atau "menangkap"
//Mengambil elemen HTML berdasarkan ID/Class


//1.Mengambil Elemen Judul
//getElemenById -> seleksi berdasarkan id
const judulUtama = document.getElementById("judul-utama");

//1.1 Mengambil Elemen Sub Judul
//querySelector(#...)
const subJudul = document.querySelector("#sub-judul");

//2. Mengambil elemen pada kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

//3. Mengambil elemen Tombol-Tombol Aksi pada kartu 1 
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. Mengambil Elemen pada kartu 2 (fitur catatan dinamis / to do list sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


//Aktivitas 2 Manipulasi Teks & Style 
//addEventListener("click", function(){...})
btnUbahTeks.addEventListener("click", function(){
    //.innerText = Mengganti atau mengisi tulisan teks yang ada di HTML 
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

    //.style.color = mengubah warna teks secara langsung melalui javascript 
    teksPreview.style.color = "#3da5bc"

    //console.log mencetak pesan di console 
    console.log("DOM Teks Preview telah diperbaharui");
});


//B --- Manipulasi Class CSS menggunakan ClassListToggle()
btnToggleWarna.addEventListener("click", function() {
    // .classlist.toggle = fitur untuk saklar otomatis 
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Class Highlight berhasil di switch");
});


//mengembalikan (Reset) Teks & Style ke kondisi semula 
btnReset.addEventListener("click", function () {
    //1. kembalikan tulisan teks ke aslinya 
    teksPreview.innerText = ("Halo! Teks ini siap diubah oleh Javascript!");

    //2. kosongkan warna inline style (style.color = "") agar balik ke css bawaan 
    teksPreview.style.color = "";

    //3. Hapus class khusus menggunakan .classList.remove("...")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset!");
});



//aktivitas 3 & 4 : Elemen Dinamis & Event Handling ( TO DO LIST)
//Penjelasan 
//Bagian ini kita akan belajar buat elemen HTML li secara otomatis 
//mengisi teks nya, memberi tombol hapus, lalu menempelkan ke dalam layar <ul>

//Langkah 1 :  variabel penampung angka jumlah catatan 
//'let' digunakan karena nilai variabel yang akan berubah ubah 
let totalCatatan = 0 ; 

//Langkah 2 : Membuah Function agar update angka counter & pesan status 
//fungsi ini kumpulan perintah yang diberi nama. Kita bisa panggil kapan saja 
function perbaruiJumlah () {
    //Masukkan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;
    
    //periksa kondisi : Apakah catatan 0?
    if (totalCatatan === 0) {
        //jika 0: maka hapus class "hidden" supaya teks "belum ada catatan"
        pesanKosong.classList.remove("hidden");
    } else {
        //jika > 0 : tambahkan class "hidden" agat teks "belum ada catatan" SEMBUNYI/hilang
        pesanKosong.classList.add("hidden");
    }
}


//langkah 3: function tambah catatan fungsi utama logika 
function tambahCatatan () {
    //3.1 input catatan value = mengambil teks yang diketik oleh user di kolom input 
    //.trim() = untuk menghapus spasi diawal dan spasi di akhir 
    const isiTeks = inputCatatan.value.trim()

    //3.2 Validasi Input: Jika isiTeks kosong tampilkan peringatan berupa alert 
    if(isiTeks === "") {
        alert("catatan tidak boleh kosong!");
        return;
    } 

    //3.3 document.create.Element("li") = membuat tag html <li> baru secara dinamis pake javascript
    const liBaru = document.createElement("li");
    liBaru.className = "note-item";

    //3.4 .innerHTML = mengisi struktur di dalam <li> dengan teks catatan & tombol "hapus"
    //tanda backtick (`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    //3.5 menambahkan event listener khusus tombol "hapus" pada item <li>
    //liBaru.querySelector(".btn-hapus") mengambil berdasarkan class 'btn-hapus'

    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        liBaru.remove();
        totalCatatan--;
        perbaruiJumlah();
        console.log(`[DOM] Catatan "${isiTeks}" dihapus`);
    });


    //3.6 .appendChild (libaru) = menempelkan elemen <li> didalam wadah <ul id ="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    //3.7 Mengosongkan kembali isi kolom input agar siap diketik lagi
    inputCatatan.value = "";

    //3.8 TotalCatatan++ increment total catatan ditambah 1x
    totalCatatan++
    perbaruiJumlah();

    console.log(`DOM Catatn Baru ditambahkan : ${isiTeks}`);  
}


//langkah 4 : event listener klik tombol + tambah (menggunakan mouse)
//ketika klik tombol + tambah jalankan fungsi TambahCatatan()
btnTambah.addEventListener("click", function(){
    tambahCatatan();
});


//langkah 5 : event listener tombol "enter" (menggunakan keyboard)
//ketika user mengetik dikolom input dan melepas tombol -> (event : keyup)
inputCatatan.addEventListener("keyup", function(event){
    //periksa apakah tombol keyboard yang ditekan adalah tombol enter?
    if(event.key === "Enter") {
        tambahCatatan();
    }
});