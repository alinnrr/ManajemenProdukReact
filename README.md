## Ringkasan Perubahan
Membuat aplikasi Manajemen Produk menggunakan React. Fitur yang ditambahkan:
- Menampilkan daftar produk dalam bentuk kartu (3 kolom)
- Pencarian produk berdasarkan nama
- Tambah produk melalui pop-up
- Edit produk melalui pop-up
- Hapus produk dengan pop-up konfirmasi
- Validasi harga harus lebih dari 0
- Penghapusan style bawaan Vite agar tampilan sesuai desain

## Bukti Pengujian

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman utama | 5 produk ditampilkan dengan harga berformat Rp | Sesuai |
| Mengetik "pul" di kolom cari | Hanya produk "Pulpen" yang tampil | Sesuai |
| Tambah produk baru | Produk muncul dengan ID berikutnya | Sesuai |
| Edit produk | Nama/harga berubah di kartu | Sesuai |
| Hapus produk | Produk hilang dari daftar | Sesuai |
| Klik Batal atau ✕ | Pop-up tertutup tanpa mengubah data | Sesuai |
| Harga 0 atau kosong | Produk tidak tersimpan | Sesuai |

## Dokumentasi 

1. menampilkan perintah 'git status' dan 'git log --oneline' yang memperlihatkan daftar commit bertahap
<img width="2880" height="1800" alt="SS_01_Terminal_Git_Log" src="https://github.com/user-attachments/assets/564e78af-4f4a-4f86-95d8-d7ebeb745105" />

2. Menu switch branches di GitHub/VS Code yang menunjukkan adanya branch 'tugas-3' dan branch 'main'.
<img width="1714" height="1016" alt="SS_02_GitHub_Branch" src="https://github.com/user-attachments/assets/5abe327a-7dc1-4819-b89b-e58e05ea0160" />

3. Halaman Pull Request di GitHub yang statusnya sudah "Merged" 
<img width="1460" height="860" alt="SS_03_GitHub_Pull_Request_Merged" src="https://github.com/user-attachments/assets/b9d509fd-2071-458e-b976-fd7d954c3986" />

4. Tampilan aplikasi React di browser (localhost:5173) yang menampilkan header "Manajemen Produk", kolom pencarian, tombol "+ Tambah Produk",dan Jenis-jenis produk
<img width="1792" height="874" alt="SS_04_Localhost_Halaman_Utama" src="https://github.com/user-attachments/assets/f1452cb5-b18d-4358-b1c4-91569ffb88a1" />

5. Tampilan pop-up form "Tambah Produk" saat tombol tambah diklik.
<img width="666" height="518" alt="SS_05_Modal_Tambah_Produk" src="https://github.com/user-attachments/assets/f8298f5f-a9ab-4d21-b75c-a7ddc83e9875" />

6. Tampilan pop-up form "Edit Produk" beserta ID dan data produk yang dipilih.
<img width="652" height="530" alt="SS_06_Modal_Edit_Produk" src="https://github.com/user-attachments/assets/9b657bad-31e5-4621-b37a-dd5a151b2190" />

7. Tampilan pop-up konfirmasi "Hapus Produk?" dengan ikon tempat sampah dan detail produk.
<img width="672" height="460" alt="SS_07_Modal_Hapus_Produk" src="https://github.com/user-attachments/assets/93944d77-ed69-4f5e-9318-ce370a0f3de2" />
