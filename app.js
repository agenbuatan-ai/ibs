/* ============================================================
   KONFIGURASI — GANTI URL INI DENGAN URL /exec ANDA
   ============================================================ */
const API_URL = 'https://script.google.com/macros/s/AKfycbwhP1xQOC0jCCEDJG-cVVBCnkLF-dQ4Jl6UpxIAC89qBpYAPeBIPeQiLTDWdaNdf7uW/exec';

/* ============================================================
   API CORE
   ============================================================ */
async function loadAll() {
  const res = await fetch(API_URL + '?mode=all');
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message || 'Fetch gagal');
  state.cache = json.data;
  return json.data;
}

async function apiPost(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message || 'Request gagal');
  return json;
}

const apiCreate = (sheet, data) => apiPost({ action: 'create', sheet, data });
const apiUpdate = (sheet, id, data) => apiPost({ action: 'update', sheet, id, data });
const apiDelete = (sheet, ids) => apiPost({ action: 'delete', sheet, ids });

/* ============================================================
   STATE & UTIL
   ============================================================ */
const state = { cache: {}, selected: {} };

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function toast(msg, isErr = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.background = isErr
    ? 'linear-gradient(135deg,#ec8a9c,#e05a7a)'
    : 'linear-gradient(135deg,#3aae9f,#8b6df0)';
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2800);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function fmtDate(d) {
  if (!d) return '-';
  return String(d).slice(0, 10);
}

/* ============================================================
   ROUTER
   ============================================================ */
const TITLES = {
  dashboard: 'Dashboard',
  input: 'Input Operasi',
  operations: 'Daftar Operasi',
  import: 'Import Excel/CSV',
  notadinas: 'Nota Dinas',
  employees: 'Data Pegawai',
  inventory: 'Inventaris OK',
  stock: 'Stok Alkes',
  stockin: 'Barang Masuk',
  stockout: 'Barang Keluar',
  shortage: 'Kekurangan Stok',
  requests: 'Permintaan',
  daily: 'Operasi Harian',
  monthly: 'Operasi Bulanan',
  bedah: 'Laporan Bedah',
  anestesi: 'Laporan Anestesi',
  'inventory-report': 'Laporan Inventaris',
  'alkes-report': 'Laporan Alkes',
  settings: 'Backup & Restore',
  reset: 'Reset Data'
};

function navigate(page) {
  document.getElementById('pageTitle').textContent = TITLES[page] || page;
  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.page === page)
  );
  const root = document.getElementById('pages');
  const map = {
    dashboard: renderDashboard,
    input: renderInput,
    operations: renderOperations,
    import: renderImport,
    notadinas: renderNotaDinas,
    employees: renderEmployees,
    inventory: renderInventory,
    stock: renderStock,
    stockin: renderStockIn,
    stockout: renderStockOut,
    shortage: renderShortage,
    requests: renderRequests,
    daily: renderDaily,
    monthly: renderMonthly,
    bedah: renderBedah,
    anestesi: renderAnestesi,
    'inventory-report': renderInventoryReport,
    'alkes-report': renderAlkesReport,
    settings: renderSettings,
    reset: renderReset
  };
  (map[page] || renderDashboard)(root);
}

/* ============================================================
   DASHBOARD
   ============================================================ */
async function renderDashboard(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    const d = await loadAll();
    const ops = d.operations || [];
    const emp = d.employees || [];
    const med = d.medical || [];
    const todayOps = ops.filter(o => String(o.tanggal).slice(0, 10) === todayStr());
    const lowStock = med.filter(m => Number(m.stok) <= Number(m.stokMin || 0));

    root.innerHTML = `
      <div class="page">
        <div class="hero">
          <h2>Selamat datang 👋</h2>
          <p>Sistem manajemen operasi & kamar operasi RSUD Koja. Data tersimpan di Google Sheets.</p>
        </div>
        <div class="stats">
          <div class="stat-card"><span>Total Operasi</span><strong>${ops.length}</strong><small>semua waktu</small></div>
          <div class="stat-card"><span>Operasi Hari Ini</span><strong>${todayOps.length}</strong><small>${todayStr()}</small></div>
          <div class="stat-card"><span>Pegawai</span><strong>${emp.length}</strong><small>terdaftar</small></div>
          <div class="stat-card"><span>Alkes Kritis</span><strong>${lowStock.length}</strong><small>di bawah minimum</small></div>
        </div>
        <div class="panel" style="margin-top:20px">
          <div class="panel-head"><h2>Operasi Terbaru</h2></div>
          ${ops.length === 0 ? '<p class="empty">Belum ada data operasi.</p>' : renderOpsTable(ops.slice(-5).reverse(), false)}
        </div>
      </div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('dashboard')">Coba lagi</button>
    </div></div>`;
  }
}

/* ============================================================
   INPUT OPERASI (CREATE)
   ============================================================ */
function renderInput(root) {
  root.innerHTML = `
    <div class="page"><div class="panel">
      <div class="panel-head"><h2>Input Operasi Baru</h2>
        <p>Isi data operasi, lalu klik Simpan.</p></div>
      <form id="formOp">
        <div class="form-grid">
          <div class="field"><label>Tanggal <span class="required">*</span></label>
            <input type="date" name="tanggal" value="${todayStr()}" required></div>
          <div class="field"><label>No. RM <span class="required">*</span></label>
            <input name="noRM" required placeholder="RM-xxxx"></div>
          <div class="field"><label>Nama Pasien <span class="required">*</span></label>
            <input name="namaPasien" required></div>
          <div class="field"><label>Diagnosa</label><input name="diagnosa"></div>
          <div class="field"><label>Tindakan</label><input name="tindakan"></div>
          <div class="field"><label>Operator</label><input name="operator"></div>
          <div class="field"><label>Anestesi</label>
            <select name="anestesi"><option value="">- pilih -</option>
              <option>Umum</option><option>Lokal</option><option>Regional</option><option>Sedasi</option>
            </select></div>
          <div class="field"><label>Ruang</label>
            <input name="ruang" placeholder="OK 1 / OK 2 / ..."></div>
          <div class="field"><label>Jam Mulai</label><input type="time" name="jamMulai"></div>
          <div class="field"><label>Jam Selesai</label><input type="time" name="jamSelesai"></div>
          <div class="field"><label>Status</label>
            <select name="status">
              <option>Scheduled</option><option>In Progress</option>
              <option>Done</option><option>Cancel</option>
            </select></div>
        </div>
        <div class="form-actions" style="margin-top:16px">
          <button type="submit" class="primary">💾 Simpan Operasi</button>
          <button type="reset" class="ghost">Reset</button>
        </div>
      </form>
    </div></div>`;

  document.getElementById('formOp').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    data.createdAt = new Date().toISOString();
    try {
      await apiCreate('operations', data);
      toast('✅ Operasi berhasil disimpan');
      navigate('operations');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   DAFTAR OPERASI (READ + DELETE)
   ============================================================ */
function renderOpsTable(list, withCheck) {
  if (!list.length) return `<p class="empty">Belum ada data operasi.</p>`;
  const rows = list.map(o => `
    <tr>
      ${withCheck ? `<td class="check-col"><input type="checkbox" class="row-check" value="${esc(o.id)}"></td>` : ''}
      <td>${esc(fmtDate(o.tanggal))}</td>
      <td>${esc(o.noRM || '-')}</td>
      <td>${esc(o.namaPasien || '-')}</td>
      <td>${esc(o.tindakan || '-')}</td>
      <td>${esc(o.operator || '-')}</td>
      <td>${esc(o.anestesi || '-')}</td>
      <td><span class="badge">${esc(o.status || '-')}</span></td>
      ${withCheck ? `<td class="action-cell">
        <button class="danger-btn btn-del-one" data-id="${esc(o.id)}">Hapus</button>
      </td>` : ''}
    </tr>`).join('');
  return `
    <div class="table-wrap"><table>
      <thead><tr>
        ${withCheck ? '<th class="check-col"></th>' : ''}
        <th>Tanggal</th><th>No. RM</th><th>Pasien</th>
        <th>Tindakan</th><th>Operator</th><th>Anestesi</th><th>Status</th>
        ${withCheck ? '<th>Aksi</th>' : ''}
      </tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
}

async function renderOperations(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const ops = (state.cache.operations || []).slice().reverse();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Daftar Operasi</h2><p>Total ${ops.length} data</p></div>
          <div class="toolbar">
            <button class="primary" data-page-jump="input">＋ Tambah</button>
            <button class="danger-btn" id="btnDeleteSelected">🗑 Hapus Terpilih</button>
          </div>
        </div>
        ${renderOpsTable(ops, true)}
      </div></div>`;

    document.getElementById('btnDeleteSelected').addEventListener('click', async () => {
      const set = state.selected.operations || new Set();
      if (!set.size) return toast('Pilih dulu data yang akan dihapus', true);
      if (!confirm(`Hapus ${set.size} data operasi?`)) return;
      try {
        await apiDelete('operations', [...set]);
        state.selected.operations.clear();
        toast(`🗑 ${set.size} data dihapus`);
        navigate('operations');
      } catch (e) { toast('❌ ' + e.message, true); }
    });

    root.querySelectorAll('.row-check').forEach(cb => {
      cb.addEventListener('change', () => {
        if (!state.selected.operations) state.selected.operations = new Set();
        cb.checked
          ? state.selected.operations.add(cb.value)
          : state.selected.operations.delete(cb.value);
      });
    });

    root.querySelectorAll('.btn-del-one').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus data ini?')) return;
        try {
          await apiDelete('operations', [btn.dataset.id]);
          toast('🗑 Data dihapus');
          navigate('operations');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });

    root.querySelectorAll('[data-page-jump]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.pageJump));
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('operations')">Coba lagi</button>
    </div></div>`;
  }
}

/* ============================================================
   IMPORT EXCEL/CSV
   ============================================================ */
function renderImport(root) {
  root.innerHTML = `
    <div class="page"><div class="panel">
      <div class="panel-head"><h2>Import Excel / CSV</h2>
        <p>File harus punya kolom sesuai header sheet (id, tanggal, noRM, ...).</p></div>
      <div class="import-zone">
        <div class="upload-icon">📤</div>
        <h2>Tarik file ke sini atau klik</h2>
        <p class="muted">Format: .xlsx, .xls, .csv</p>
        <input type="file" id="fileImport" accept=".xlsx,.xls,.csv" style="display:none">
        <div class="button-row" style="justify-content:center;margin-top:12px">
          <button class="primary" id="btnPickFile">Pilih File</button>
        </div>
      </div>
      <div id="importPreview" class="preview"></div>
    </div></div>`;

  const fileInput = document.getElementById('fileImport');
  document.getElementById('btnPickFile').addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

      if (!rows.length) return toast('File kosong', true);

      const preview = document.getElementById('importPreview');
      const cols = Object.keys(rows[0]);
      preview.innerHTML = `
        <div class="notice">✅ ${rows.length} baris terbaca. Kolom: ${cols.join(', ')}</div>
        <div class="table-wrap"><table>
          <thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${rows.slice(0, 5).map(r => `<tr>${cols.map(c => `<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <div class="form-actions" style="margin-top:12px">
          <button class="primary" id="btnDoImport">⬆ Import ${rows.length} Baris ke Operations</button>
        </div>`;

      document.getElementById('btnDoImport').addEventListener('click', async () => {
        try {
          const list = rows.map(r => ({ ...r, id: r.id || uuid() }));
          await apiPost({ action: 'createMany', sheet: 'operations', data: list });
          toast(`✅ ${list.length} baris di-import`);
          navigate('operations');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    } catch (e) { toast('❌ Gagal baca file: ' + e.message, true); }
  });
}

/* ============================================================
   NOTA DINAS
   ============================================================ */
async function renderNotaDinas(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.notaDinas || []).slice().reverse();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Nota Dinas</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddNota">＋ Buat Nota</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada nota.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nomor</th><th>Tanggal</th><th>Perihal</th><th>Tujuan</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(n => `
            <tr>
              <td>${esc(n.nomor || '-')}</td>
              <td>${esc(fmtDate(n.tanggal))}</td>
              <td>${esc(n.perihal || '-')}</td>
              <td>${esc(n.tujuan || '-')}</td>
              <td class="action-cell"><button class="danger-btn" data-del-nota="${esc(n.id)}">Hapus</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddNota').addEventListener('click', openNotaModal);
    root.querySelectorAll('[data-del-nota]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus nota ini?')) return;
        try {
          await apiDelete('notaDinas', [btn.dataset.delNota]);
          toast('🗑 Nota dihapus');
          navigate('notadinas');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('notadinas')">Coba lagi</button>
    </div></div>`;
  }
}

function openNotaModal() {
  const dlg = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = 'Buat Nota Dinas';
  document.getElementById('modalBody').innerHTML = `
    <form id="formNota">
      <div class="form-grid">
        <div class="field"><label>Nomor</label><input name="nomor"></div>
        <div class="field"><label>Tanggal</label>
          <input type="date" name="tanggal" value="${todayStr()}"></div>
        <div class="field field-full" style="grid-column:1/-1"><label>Perihal</label>
          <input name="perihal"></div>
        <div class="field" style="grid-column:1/-1"><label>Tujuan</label>
          <input name="tujuan"></div>
        <div class="field" style="grid-column:1/-1"><label>Butir (satu per baris)</label>
          <textarea name="butir" rows="4"></textarea></div>
        <div class="field" style="grid-column:1/-1"><label>Tembusan (satu per baris)</label>
          <textarea name="tembusan" rows="3"></textarea></div>
        <div class="field"><label>Penandatangan</label><input name="penandatangan"></div>
      </div>
      <div class="form-actions" style="margin-top:12px">
        <button type="submit" class="primary">Simpan Nota</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formNota').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(ev.target).entries());
    d.id = uuid();
    d.createdAt = new Date().toISOString();
    d.butir = (d.butir || '').split('\n').map(s => s.trim()).filter(Boolean);
    d.tembusan = (d.tembusan || '').split('\n').map(s => s.trim()).filter(Boolean);
    try {
      await apiCreate('notaDinas', d);
      toast('✅ Nota disimpan');
      dlg.close();
      navigate('notadinas');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   PEGAWAI
   ============================================================ */
async function renderEmployees(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.employees || []).slice().reverse();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Data Pegawai</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddEmp">＋ Tambah Pegawai</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada pegawai.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>NIP</th><th>Jabatan</th><th>Unit</th><th>Telepon</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(e => `
            <tr>
              <td>${esc(e.nama || '-')}</td>
              <td>${esc(e.nip || '-')}</td>
              <td>${esc(e.jabatan || '-')}</td>
              <td>${esc(e.unit || '-')}</td>
              <td>${esc(e.telepon || '-')}</td>
              <td><span class="badge">${esc(e.status || '-')}</span></td>
              <td class="action-cell"><button class="danger-btn" data-del-emp="${esc(e.id)}">Hapus</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddEmp').addEventListener('click', openEmpModal);
    root.querySelectorAll('[data-del-emp]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus pegawai ini?')) return;
        try {
          await apiDelete('employees', [btn.dataset.delEmp]);
          toast('🗑 Pegawai dihapus');
          navigate('employees');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('employees')">Coba lagi</button>
    </div></div>`;
  }
}

function openEmpModal() {
  const dlg = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = 'Tambah Pegawai';
  document.getElementById('modalBody').innerHTML = `
    <form id="formEmp" class="form-grid">
      <div class="field"><label>Nama *</label><input name="nama" required></div>
      <div class="field"><label>NIP</label><input name="nip"></div>
      <div class="field"><label>Jabatan</label><input name="jabatan"></div>
      <div class="field"><label>Unit</label><input name="unit"></div>
      <div class="field"><label>Telepon</label><input name="telepon"></div>
      <div class="field"><label>Status</label>
        <select name="status"><option>Aktif</option><option>Non-Aktif</option></select></div>
      <div class="form-actions" style="grid-column:1/-1;margin-top:10px">
        <button type="submit" class="primary">Simpan</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formEmp').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    try {
      await apiCreate('employees', data);
      toast('✅ Pegawai ditambahkan');
      dlg.close();
      navigate('employees');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   INVENTARIS OK
   ============================================================ */
async function renderInventory(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.inventory || []).slice().reverse();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Inventaris OK</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddInv">＋ Tambah Item</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada data inventaris.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Jumlah</th><th>Kondisi</th><th>Lokasi</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(i => `
            <tr>
              <td>${esc(i.nama || '-')}</td>
              <td>${esc(i.kategori || '-')}</td>
              <td>${esc(i.jumlah || '-')}</td>
              <td><span class="badge">${esc(i.kondisi || '-')}</span></td>
              <td>${esc(i.lokasi || '-')}</td>
              <td class="action-cell"><button class="danger-btn" data-del-inv="${esc(i.id)}">Hapus</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddInv').addEventListener('click', openInvModal);
    root.querySelectorAll('[data-del-inv]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus item ini?')) return;
        try {
          await apiDelete('inventory', [btn.dataset.delInv]);
          toast('🗑 Item dihapus');
          navigate('inventory');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('inventory')">Coba lagi</button>
    </div></div>`;
  }
}

function openInvModal() {
  const dlg = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = 'Tambah Item Inventaris';
  document.getElementById('modalBody').innerHTML = `
    <form id="formInv" class="form-grid">
      <div class="field"><label>Nama *</label><input name="nama" required></div>
      <div class="field"><label>Kategori</label><input name="kategori"></div>
      <div class="field"><label>Jumlah</label><input type="number" name="jumlah" min="0"></div>
      <div class="field"><label>Kondisi</label>
        <select name="kondisi"><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
      <div class="field"><label>Lokasi</label><input name="lokasi"></div>
      <div class="form-actions" style="grid-column:1/-1;margin-top:10px">
        <button type="submit" class="primary">Simpan</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formInv').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    try {
      await apiCreate('inventory', data);
      toast('✅ Item ditambahkan');
      dlg.close();
      navigate('inventory');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   STOK ALKES
   ============================================================ */
async function renderStock(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.medical || []).slice();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Stok Alkes</h2><p>Total ${list.length} item</p></div>
          <button class="primary" id="btnAddMed">＋ Tambah Item</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada data alkes.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Satuan</th><th>Stok</th><th>Min</th><th>Harga</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(m => {
            const low = Number(m.stok) <= Number(m.stokMin || 0);
            return `
            <tr>
              <td>${esc(m.nama || '-')}</td>
              <td>${esc(m.kategori || '-')}</td>
              <td>${esc(m.satuan || '-')}</td>
              <td class="${low ? 'low-stock' : ''}">${esc(m.stok || '0')}</td>
              <td>${esc(m.stokMin || '0')}</td>
              <td>${esc(m.harga || '-')}</td>
              <td class="action-cell"><button class="danger-btn" data-del-med="${esc(m.id)}">Hapus</button></td>
            </tr>`;
          }).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddMed').addEventListener('click', openMedModal);
    root.querySelectorAll('[data-del-med]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus item ini?')) return;
        try {
          await apiDelete('medical', [btn.dataset.delMed]);
          toast('🗑 Item dihapus');
          navigate('stock');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('stock')">Coba lagi</button>
    </div></div>`;
  }
}

function openMedModal() {
  const dlg = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = 'Tambah Alkes';
  document.getElementById('modalBody').innerHTML = `
    <form id="formMed" class="form-grid">
      <div class="field"><label>Nama *</label><input name="nama" required></div>
      <div class="field"><label>Kategori</label><input name="kategori"></div>
      <div class="field"><label>Satuan</label><input name="satuan" placeholder="pcs / box / botol"></div>
      <div class="field"><label>Stok</label><input type="number" name="stok" min="0"></div>
      <div class="field"><label>Stok Minimum</label><input type="number" name="stokMin" min="0"></div>
      <div class="field"><label>Harga</label><input type="number" name="harga" min="0"></div>
      <div class="form-actions" style="grid-column:1/-1;margin-top:10px">
        <button type="submit" class="primary">Simpan</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formMed').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    try {
      await apiCreate('medical', data);
      toast('✅ Alkes ditambahkan');
      dlg.close();
      navigate('stock');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   BARANG MASUK / KELUAR
   ============================================================ */
async function renderStockIn(root) { renderStockIO(root, 'stockIn'); }
async function renderStockOut(root) { renderStockIO(root, 'stockOut'); }

async function renderStockIO(root, sheet) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache[sheet] || []).slice().reverse();
    const title = sheet === 'stockIn' ? 'Barang Masuk' : 'Barang Keluar';
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>${title}</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddIO">＋ Tambah</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada data.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Tanggal</th><th>Item</th><th>Jumlah</th><th>${sheet === 'stockIn' ? 'Supplier' : 'Tujuan'}</th><th>Keterangan</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(r => `
            <tr>
              <td>${esc(fmtDate(r.tanggal))}</td>
              <td>${esc(r.namaItem || '-')}</td>
              <td>${esc(r.jumlah || '-')}</td>
              <td>${esc(sheet === 'stockIn' ? (r.supplier || '-') : (r.tujuan || '-'))}</td>
              <td>${esc(r.keterangan || '-')}</td>
              <td class="action-cell"><button class="danger-btn" data-del-io="${esc(r.id)}">Hapus</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddIO').addEventListener('click', () => openStockIOModal(sheet));
    root.querySelectorAll('[data-del-io]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus data ini?')) return;
        try {
          await apiDelete(sheet, [btn.dataset.delIo]);
          toast('🗑 Data dihapus');
          navigate(sheet);
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('${sheet}')">Coba lagi</button>
    </div></div>`;
  }
}

function openStockIOModal(sheet) {
  const dlg = document.getElementById('modal');
  const title = sheet === 'stockIn' ? 'Tambah Barang Masuk' : 'Tambah Barang Keluar';
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = `
    <form id="formIO" class="form-grid">
      <div class="field"><label>Tanggal</label>
        <input type="date" name="tanggal" value="${todayStr()}"></div>
      <div class="field"><label>Nama Item *</label><input name="namaItem" required></div>
      <div class="field"><label>Jumlah</label><input type="number" name="jumlah" min="1"></div>
      ${sheet === 'stockIn'
        ? `<div class="field"><label>Supplier</label><input name="supplier"></div>`
        : `<div class="field"><label>Tujuan</label><input name="tujuan"></div>`}
      <div class="field"><label>Keterangan</label><input name="keterangan"></div>
      <div class="form-actions" style="grid-column:1/-1;margin-top:10px">
        <button type="submit" class="primary">Simpan</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formIO').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    try {
      await apiCreate(sheet, data);
      toast('✅ Data disimpan');
      dlg.close();
      navigate(sheet);
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   KEKURANGAN STOK
   ============================================================ */
async function renderShortage(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.medical || []).filter(m =>
      Number(m.stok) <= Number(m.stokMin || 0)
    );
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Kekurangan Stok</h2>
            <p>Item dengan stok ≤ minimum</p></div>
        </div>
        ${list.length === 0 ? '<p class="empty">Semua stok aman 👍</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Stok</th><th>Minimum</th><th>Kurang</th></tr></thead>
          <tbody>${list.map(m => `
            <tr>
              <td>${esc(m.nama || '-')}</td>
              <td>${esc(m.kategori || '-')}</td>
              <td class="low-stock">${esc(m.stok || '0')}</td>
              <td>${esc(m.stokMin || '0')}</td>
              <td class="low-stock">${Math.max(0, Number(m.stokMin || 0) - Number(m.stok || 0))}</td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('shortage')">Coba lagi</button>
    </div></div>`;
  }
}

/* ============================================================
   PERMINTAAN
   ============================================================ */
async function renderRequests(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = (state.cache.requests || []).slice().reverse();
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Permintaan</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddReq">＋ Tambah Permintaan</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada permintaan.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Tanggal</th><th>Pemohon</th><th>Item</th><th>Jumlah</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>${list.map(r => `
            <tr>
              <td>${esc(fmtDate(r.tanggal))}</td>
              <td>${esc(r.pemohon || '-')}</td>
              <td>${esc(r.namaItem || '-')}</td>
              <td>${esc(r.jumlah || '-')}</td>
              <td><span class="badge">${esc(r.status || '-')}</span></td>
              <td class="action-cell"><button class="danger-btn" data-del-req="${esc(r.id)}">Hapus</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddReq').addEventListener('click', openReqModal);
    root.querySelectorAll('[data-del-req]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus permintaan ini?')) return;
        try {
          await apiDelete('requests', [btn.dataset.delReq]);
          toast('🗑 Permintaan dihapus');
          navigate('requests');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
      <button class="primary" onclick="navigate('requests')">Coba lagi</button>
    </div></div>`;
  }
}

function openReqModal() {
  const dlg = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = 'Tambah Permintaan';
  document.getElementById('modalBody').innerHTML = `
    <form id="formReq" class="form-grid">
      <div class="field"><label>Tanggal</label>
        <input type="date" name="tanggal" value="${todayStr()}"></div>
      <div class="field"><label>Pemohon *</label><input name="pemohon" required></div>
      <div class="field"><label>Nama Item *</label><input name="namaItem" required></div>
      <div class="field"><label>Jumlah</label><input type="number" name="jumlah" min="1"></div>
      <div class="field"><label>Status</label>
        <select name="status"><option>Pending</option><option>Disetujui</option><option>Ditolak</option></select></div>
      <div class="field"><label>Keterangan</label><input name="keterangan"></div>
      <div class="form-actions" style="grid-column:1/-1;margin-top:10px">
        <button type="submit" class="primary">Simpan</button>
      </div>
    </form>`;
  dlg.showModal();

  document.getElementById('formReq').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.target).entries());
    data.id = uuid();
    try {
      await apiCreate('requests', data);
      toast('✅ Permintaan disimpan');
      dlg.close();
      navigate('requests');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   LAPORAN: HARIAN
   ============================================================ */
async function renderDaily(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const ops = state.cache.operations || [];
    const dates = [...new Set(ops.map(o => String(o.tanggal).slice(0, 10)))].sort().reverse();
    const pick = dates[0] || todayStr();
    const filtered = ops.filter(o => String(o.tanggal).slice(0, 10) === pick);

    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Laporan Operasi Harian</h2><p>${pick}</p></div>
        </div>
        <div class="filter-bar">
          <div class="field"><label>Tanggal</label>
            <input type="date" id="dailyDate" value="${pick}"></div>
          <button class="ghost" id="btnPrintDaily">🖨 Print</button>
        </div>
        <div id="dailyContent">${renderOpsTable(filtered, false)}</div>
      </div></div>`;

    document.getElementById('dailyDate').addEventListener('change', (ev) => {
      const d = ev.target.value;
      const f = ops.filter(o => String(o.tanggal).slice(0, 10) === d);
      document.getElementById('dailyContent').innerHTML = renderOpsTable(f, false);
    });
    document.getElementById('btnPrintDaily').addEventListener('click', () => window.print());
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

/* ============================================================
   LAPORAN: BULANAN
   ============================================================ */
async function renderMonthly(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const ops = state.cache.operations || [];
    const months = [...new Set(ops.map(o => String(o.tanggal).slice(0, 7)))].sort().reverse();
    const pick = months[0] || todayStr().slice(0, 7);
    const filtered = ops.filter(o => String(o.tanggal).slice(0, 7) === pick);

    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Laporan Operasi Bulanan</h2><p>${pick}</p></div>
        </div>
        <div class="filter-bar">
          <div class="field"><label>Bulan</label>
            <input type="month" id="monthlyMonth" value="${pick}"></div>
          <button class="ghost" id="btnPrintMonthly">🖨 Print</button>
        </div>
        <div id="monthlyContent">${renderOpsTable(filtered, false)}</div>
      </div></div>`;

    document.getElementById('monthlyMonth').addEventListener('change', (ev) => {
      const m = ev.target.value;
      const f = ops.filter(o => String(o.tanggal).slice(0, 7) === m);
      document.getElementById('monthlyContent').innerHTML = renderOpsTable(f, false);
    });
    document.getElementById('btnPrintMonthly').addEventListener('click', () => window.print());
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

/* ============================================================
   LAPORAN: BEDAH / ANESTESI
   ============================================================ */
async function renderBedah(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const ops = (state.cache.operations || []).filter(o =>
      String(o.tindakan || '').toLowerCase().includes('bedah')
    );
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head"><div><h2>Laporan Bedah</h2><p>${ops.length} tindakan</p></div></div>
        ${renderOpsTable(ops, false)}
      </div></div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

async function renderAnestesi(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const ops = state.cache.operations || [];
    const groups = {};
    ops.forEach(o => {
      const k = o.anestesi || 'Tidak diketahui';
      groups[k] = (groups[k] || 0) + 1;
    });
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head"><div><h2>Laporan Anestesi</h2><p>Rekap per jenis</p></div></div>
        <div class="report-list">
          ${Object.keys(groups).map(k => `
            <div class="report-line">
              <span>${esc(k)}</span>
              <strong>${groups[k]} operasi</strong>
            </div>`).join('') || '<p class="empty">Belum ada data.</p>'}
        </div>
      </div></div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

/* ============================================================
   LAPORAN INVENTARIS / ALKES
   ============================================================ */
async function renderInventoryReport(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = state.cache.inventory || [];
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head"><div><h2>Laporan Inventaris</h2><p>${list.length} item</p></div></div>
        ${list.length === 0 ? '<p class="empty">Belum ada data.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Jumlah</th><th>Kondisi</th><th>Lokasi</th></tr></thead>
          <tbody>${list.map(i => `
            <tr>
              <td>${esc(i.nama || '-')}</td>
              <td>${esc(i.kategori || '-')}</td>
              <td>${esc(i.jumlah || '-')}</td>
              <td>${esc(i.kondisi || '-')}</td>
              <td>${esc(i.lokasi || '-')}</td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

async function renderAlkesReport(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    await loadAll();
    const list = state.cache.medical || [];
    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head"><div><h2>Laporan Alkes</h2><p>${list.length} item</p></div></div>
        ${list.length === 0 ? '<p class="empty">Belum ada data.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Satuan</th><th>Stok</th><th>Min</th><th>Harga</th></tr></thead>
          <tbody>${list.map(m => `
            <tr>
              <td>${esc(m.nama || '-')}</td>
              <td>${esc(m.kategori || '-')}</td>
              <td>${esc(m.satuan || '-')}</td>
              <td class="${Number(m.stok) <= Number(m.stokMin || 0) ? 'low-stock' : ''}">${esc(m.stok || '0')}</td>
              <td>${esc(m.stokMin || '0')}</td>
              <td>${esc(m.harga || '-')}</td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${esc(e.message)}</p>
    </div></div>`;
  }
}

/* ============================================================
   SETTINGS (Backup & Restore)
   ============================================================ */
async function renderSettings(root) {
  root.innerHTML = `
    <div class="page"><div class="panel">
      <div class="panel-head"><div><h2>Backup & Restore</h2><p>Export semua data ke JSON atau import balik.</p></div></div>
      <div class="button-row" style="margin-bottom:16px">
        <button class="primary" id="btnBackup">⬇ Backup JSON</button>
        <button class="ghost" id="btnRestore">⬆ Restore (pilih file)</button>
        <input type="file" id="fileRestore" accept=".json" style="display:none">
      </div>
      <div class="notice">Backup berisi semua sheet: operations, employees, medical, inventory, stockIn, stockOut, requests, notaDinas.</div>
      <div id="backupInfo" class="footer-note"></div>
    </div></div>`;

  document.getElementById('btnBackup').addEventListener('click', async () => {
    try {
      const d = await loadAll();
      const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `backup-operasi-${todayStr()}.json`;
      a.click();
      toast('✅ Backup diunduh');
    } catch (e) { toast('❌ ' + e.message, true); }
  });

  const fr = document.getElementById('fileRestore');
  document.getElementById('btnRestore').addEventListener('click', () => fr.click());
  fr.addEventListener('change', async (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    if (!confirm('Restore akan MENGGABUNG data. Lanjut?')) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      for (const sheet of Object.keys(data)) {
        const list = data[sheet] || [];
        if (list.length) await apiPost({ action: 'createMany', sheet, data: list });
      }
      toast('✅ Restore selesai');
      document.getElementById('backupInfo').textContent = `Restore ${Object.keys(data).length} sheet pada ${new Date().toLocaleString()}`;
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   RESET DATA
   ============================================================ */
async function renderReset(root) {
  root.innerHTML = `
    <div class="page"><div class="panel">
      <div class="panel-head"><div><h2>Reset Data</h2>
        <p>Hapus semua baris dari sheet tertentu. Tindakan tidak bisa dibatalkan.</p></div></div>
      <div class="notice warn">⚠ Backup dulu sebelum reset!</div>
      <div class="form-grid">
        <div class="field"><label>Pilih Sheet</label>
          <select id="resetSheet">
            <option value="operations">operations</option>
            <option value="employees">employees</option>
            <option value="medical">medical</option>
            <option value="inventory">inventory</option>
            <option value="stockIn">stockIn</option>
            <option value="stockOut">stockOut</option>
            <option value="requests">requests</option>
            <option value="notaDinas">notaDinas</option>
          </select></div>
      </div>
      <div class="form-actions" style="margin-top:16px">
        <button class="danger-btn" id="btnReset">🗑 Reset Sheet Terpilih</button>
      </div>
    </div></div>`;

  document.getElementById('btnReset').addEventListener('click', async () => {
    const sheet = document.getElementById('resetSheet').value;
    if (!confirm(`Hapus SEMUA data di sheet "${sheet}"?`)) return;
    if (!confirm('Yakin? Tindakan ini permanen.')) return;
    try {
      await loadAll();
      const ids = (state.cache[sheet] || []).map(r => r.id);
      if (!ids.length) return toast('Sheet sudah kosong', true);
      await apiDelete(sheet, ids);
      toast(`🗑 ${ids.length} baris dihapus dari ${sheet}`);
      navigate('reset');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   BOOTSTRAP
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item, [data-page-jump]').forEach(el => {
    el.addEventListener('click', () =>
      navigate(el.dataset.page || el.dataset.pageJump)
    );
  });

  document.querySelectorAll('[data-page-jump]').forEach(el => {
    if (!el._bound) {
      el._bound = true;
      el.addEventListener('click', () => navigate(el.dataset.pageJump));
    }
  });

  const mc = document.getElementById('modalClose');
  if (mc) mc.addEventListener('click', () => document.getElementById('modal').close());

  const st = document.getElementById('sidebarToggle');
  if (st) st.addEventListener('click', () =>
    document.body.classList.toggle('sidebar-hidden')
  );

  const lo = document.getElementById('logoutBtn');
  if (lo) lo.addEventListener('click', () => {
    if (confirm('Logout dari sistem?')) location.reload();
  });

  navigate('dashboard');
});
