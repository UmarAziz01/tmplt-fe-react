# Panduan Alur Kerja Git & Development Harian

Panduan standar alur kerja pengembangan aplikasi menggunakan Git: mulai dari persiapan branch fitur, rutinitas harian, hingga proses penggabungan kode (*merge*) ke branch utama.

---

## 1. Peta Branch Utama

- **`main`**: Versi produksi (*production-ready*). Tidak boleh ada komit langsung ke sini.
- **`dev`**: Versi integrasi staging/pengembangan. Sumber utama pembuatan branch fitur.
- **`feature/<nama-fitur>`** atau **`<nama-fitur>`**: Branch kerja untuk tugas/fitur spesifik.

---

## 2. Memulai Fitur Baru

Sebelum menulis baris kode pertama untuk fitur baru:

1. **Pindah ke branch integrasi (`dev`):**
   ```bash
   git checkout dev
   ```

2. **Sinkronkan branch `dev` lokal dengan repository remote (GitHub):**
   ```bash
   git pull origin dev
   ```

3. **Buat branch fitur baru yang bercabang dari `dev`:**
   ```bash
   git checkout -b feature/login-page
   ```
   > Format penamaan branch yang disarankan:
   > - Fitur: `feature/<nama-fitur>` (contoh: `feature/login-page`, `feature/payment-gateway`)
   > - Perbaikan bug: `fix/<nama-bug>` (contoh: `fix/navbar-overflow`)
   > - Refactoring: `refactor/<modul>` (contoh: `refactor/auth-provider`)

---

## 3. Rutinitas Koding Harian (Daily Routine)

### A. Awal Hari / Sebelum Mulai Menulis Kode
Pastikan branch fitur kamu tidak tertinggal terlalu jauh dari perubahan rekan setim di `dev`:

```bash
git fetch origin
git merge origin/dev
```
*Jika ada perubahan baru dari rekan tim di `dev`, kode tersebut langsung masuk ke branch kamu tanpa konflik yang menumpuk di akhir.*

---

### B. Menjalankan Server & Menulis Kode
1. Masuk ke folder aplikasi dan jalankan server pengembangan:
   ```bash
   cd frontend
   npm run dev
   ```
2. Kerjakan fitur secara modular per fungsi kecil.

---

### C. Menyimpan Progres (Commit)
Lakukan commit secara bertahap saat satu unit pekerjaan selesai (bukan di akhir hari sekaligus):

1. **Periksa status perubahan:**
   ```bash
   git status
   ```

2. **Stage file yang relevan:**
   ```bash
   git add src/components/LoginForm.tsx src/pages/LoginPage.tsx
   # Atau tambahkan seluruh file yang dimodifikasi:
   git add .
   ```

3. **Simpan komit menggunakan format Conventional Commits:**
   ```bash
   git commit -m "feat: add email and password validation with zod"
   ```
   *Prefix commit standar:*
   - `feat:` Penambahan fitur baru.
   - `fix:` Perbaikan bug.
   - `chore:` Update konfigurasi, package, atau dependensi.
   - `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas.
   - `style:` Perbaikan formatting (whitespace, titik koma).
   - `test:` Menambah atau mengubah unit test.

---

### D. Akhir Hari / Selesai Sesi Koding
Jangan biarkan progres hanya tersimpan di komputer lokal:

```bash
git push -u origin feature/login-page
```
*(Flag `-u origin ...` hanya diperlukan saat push pertama kali. Untuk push berikutnya cukup jalankan `git push`)*.

---

## 4. Menyelesaikan Fitur & Persiapan Penggabungan (Merge)

Setelah fitur selesai diuji di lokal dan siap dimasukkan ke `dev`:

### Langkah 1: Sinkronkan Kembali dengan `dev` Terkini
Pastikan branch kamu kompatibel dengan perubahan terbaru sebelum digabungkan:

```bash
git checkout feature/login-page
git pull origin dev
```

*Jika ada merge conflict:*
1. Buka file yang berstatus konflik (ditandai tanda `<<<<<<<`, `=======`, `>>>>>>>`).
2. Tentukan kode yang dipertahankan.
3. Jalankan:
   ```bash
   git add <file-yang-dibersihkan>
   git commit -m "chore: resolve merge conflicts with dev"
   ```

### Langkah 2: Push Hasil Akhir ke Remote
```bash
git push origin feature/login-page
```

---

## 5. Penggabungan Kode ke Branch `dev`

### Opsi A: Melalui Pull Request (PR) di GitHub (Direkomendasikan)
1. Buka repositori di GitHub.
2. Klik tombol **"Compare & pull request"**.
3. Pastikan konfigurasi arah branch:
   - **Base branch**: `dev`
   - **Compare branch**: `feature/login-page`
4. Berikan deskripsi singkat tentang apa yang dikerjakan.
5. Klik **"Create pull request"**.
6. Setelah di-review (atau diuji via CI), klik **"Merge pull request"**.

---

### Opsi B: Merge Manual via Terminal Lokal
Jika kamu bekerja sendiri dan tidak menggunakan Pull Request:

1. **Pindah ke branch `dev`:**
   ```bash
   git checkout dev
   ```

2. **Pastikan branch `dev` lokal mutakhir:**
   ```bash
   git pull origin dev
   ```

3. **Gabungkan branch fitur ke `dev`:**
   ```bash
   git merge feature/login-page
   ```

4. **Kirim hasil penggabungan ke remote repository:**
   ```bash
   git push origin dev
   ```

---

## 6. Pembersihan Branch (Housekeeping)

Setelah branch berhasil di-merge ke `dev`, hapus branch fitur agar repositori tetap rapi:

1. **Hapus branch lokal:**
   ```bash
   git branch -d feature/login-page
   ```

2. **Hapus branch di remote GitHub:**
   ```bash
   git push origin --delete feature/login-page
   ```

---

## 7. Rangkuman Perintah Cepat

| Aksi | Perintah |
| :--- | :--- |
| Cek status file & branch | `git status` |
| Buat branch baru | `git checkout -b <nama-branch>` |
| Pindah branch | `git checkout <nama-branch>` |
| Simpan commit | `git add . && git commit -m "pesan"` |
| Push perubahan | `git push` |
| Unduh & gabung perubahan remote | `git pull origin dev` |
| Batalkan perubahan file lokal sebelum di-stage | `git restore <nama-file>` |
| Unstage file | `git restore --staged <nama-file>` |