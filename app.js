/* ============================================================
   KONFIGURASI — GANTI DENGAN URL /exec ANDA
   ============================================================ */
const API_URL = 'https://script.google.com/macros/s/AKfycbwhP1xQOC0jCCEDJG-cVVBCnkLF-dQ4Jl6UpxIAC89qBpYAPeBIPeQiLTDWdaNdf7uW/exec';

/* ============================================================
   API
   ============================================================ */
async function loadAll() {
  const res = await fetch(API_URL + '?mode=all');
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data;
}

async function postApi(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json;
}

const create = (sheet, data) => postApi({ action: 'create', sheet, data });
const remove = (sheet, ids)  => postApi({ action: 'delete', sheet, ids });

/* ============================================================
   UTIL
   ============================================================ */
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

/* ============================================================
   STATE
   ============================================================ */
const state = { cache: {} };

/* ============================================================
   ROUTER
   ============================================================ */
const TITLES = {
  dashboard: 'Dashboard',
  input: 'Input Operasi',
  operations: 'Daftar Operasi',
  employees: 'Data Pegawai',
  notadinas: 'Nota Dinas'
};

function navigate(page) {
  document.getElementById('pageTitle').textContent = TITLES[page] || page;
  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.page === page)
  );
  const root = document.getElementById('pages');
  if (page === 'dashboard')  return renderDashboard(root);
  if (page === 'input')      return renderInput(root);
  if (page === 'operations') return renderOperations(root);
  if (page === 'employees')  return renderEmployees(root);
  if (page === 'notadinas')  return renderNota(root);
  root.innerHTML = `<div class="page"><div class="panel"><p class="empty">Halaman belum tersedia.</p></div></div>`;
}

/* ============================================================
   DASHBOARD
   ============================================================ */
async function renderDashboard(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    state.cache = await loadAll();
    const ops = state.cache.operations || [];
    const emp = state.cache.employees || [];
    const med = state.cache.medical || [];
    const todayOps = ops.filter(o => String(o.tanggal).slice(0, 10) === todayStr());

    root.innerHTML = `
      <div class="page">
        <div class="hero">
          <h2>Selamat datang 👋</h2>
          <p>Data tersimpan di Google Sheets.</p>
        </div>
        <div class="stats">
          <div class="stat-card"><span>Total Operasi</span><strong>${ops.length}</strong><small>semua</small></div>
          <div class="stat-card"><span>Hari Ini</span><strong>${todayOps.length}</strong><small>${todayStr()}</small></div>
          <div class="stat-card"><span>Pegawai</span><strong>${emp.length}</strong><small>terdaftar</small></div>
          <div class="stat-card"><span>Item Alkes</span><strong>${med.length}</strong><small>di master</small></div>
        </div>
      </div>`;
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${e.message}</p>
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
      <div class="panel-head"><h2>Input Operasi Baru</h2></div>
      <form id="formOp">
        <div class="form-grid">
          <div class="field"><label>Tanggal *</label>
            <input type="date" name="tanggal" value="${todayStr()}" required></div>
          <div class="field"><label>No. RM *</label><input name="noRM" required></div>
          <div class="field"><label>Nama Pasien *</label><input name="namaPasien" required></div>
          <div class="field"><label>Diagnosa</label><input name="diagnosa"></div>
          <div class="field"><label>Tindakan</label><input name="tindakan"></div>
          <div class="field"><label>Operator</label><input name="operator"></div>
          <div class="field"><label>Anestesi</label>
            <select name="anestesi"><option value="">-</option>
              <option>Umum</option><option>Lokal</option><option>Regional</option><option>Sedasi</option>
            </select></div>
          <div class="field"><label>Ruang</label><input name="ruang"></div>
          <div class="field"><label>Jam Mulai</label><input type="time" name="jamMulai"></div>
          <div class="field"><label>Jam Selesai</label><input type="time" name="jamSelesai"></div>
          <div class="field"><label>Status</label>
            <select name="status">
              <option>Scheduled</option><option>In Progress</option>
              <option>Done</option><option>Cancel</option>
            </select></div>
        </div>
        <div class="form-actions" style="margin-top:16px">
          <button type="submit" class="primary">💾 Simpan</button>
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
      await create('operations', data);
      toast('✅ Operasi disimpan');
      navigate('operations');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   DAFTAR OPERASI (READ + DELETE)
   ============================================================ */
async function renderOperations(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    state.cache = await loadAll();
    const ops = (state.cache.operations || []).slice().reverse();

    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Daftar Operasi</h2><p>Total ${ops.length}</p></div>
          <button class="primary" id="btnAdd">＋ Tambah</button>
        </div>
        ${ops.length === 0 ? '<p class="empty">Belum ada data operasi.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr>
            <th>Tanggal</th><th>No. RM</th><th>Pasien</th>
            <th>Tindakan</th><th>Operator</th><th>Status</th><th>Aksi</th>
          </tr></thead>
          <tbody>${ops.map(o => `
            <tr>
              <td>${o.tanggal || '-'}</td>
              <td>${o.noRM || '-'}</td>
              <td>${o.namaPasien || '-'}</td>
              <td>${o.tindakan || '-'}</td>
              <td>${o.operator || '-'}</td>
              <td><span class="badge">${o.status || '-'}</span></td>
              <td class="action-cell">
                <button class="danger-btn" data-del="${o.id}">Hapus</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAdd').addEventListener('click', () => navigate('input'));
    root.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.del;
        if (!confirm('Hapus data ini?')) return;
        try {
          await remove('operations', [id]);
          toast('🗑 Data dihapus');
          navigate('operations');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${e.message}</p>
      <button class="primary" onclick="navigate('operations')">Coba lagi</button>
    </div></div>`;
  }
}

/* ============================================================
   PEGAWAI
   ============================================================ */
async function renderEmployees(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    state.cache = await loadAll();
    const list = (state.cache.employees || []).slice().reverse();

    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Data Pegawai</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddEmp">＋ Tambah Pegawai</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada pegawai.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr>
            <th>Nama</th><th>NIP</th><th>Jabatan</th><th>Unit</th><th>Telepon</th><th>Aksi</th>
          </tr></thead>
          <tbody>${list.map(e => `
            <tr>
              <td>${e.nama || '-'}</td>
              <td>${e.nip || '-'}</td>
              <td>${e.jabatan || '-'}</td>
              <td>${e.unit || '-'}</td>
              <td>${e.telepon || '-'}</td>
              <td class="action-cell">
                <button class="danger-btn" data-del-emp="${e.id}">Hapus</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddEmp').addEventListener('click', openEmpModal);
    root.querySelectorAll('[data-del-emp]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.delEmp;
        if (!confirm('Hapus pegawai ini?')) return;
        try {
          await remove('employees', [id]);
          toast('🗑 Pegawai dihapus');
          navigate('employees');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${e.message}</p>
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
      await create('employees', data);
      toast('✅ Pegawai ditambahkan');
      dlg.close();
      navigate('employees');
    } catch (e) { toast('❌ ' + e.message, true); }
  });
}

/* ============================================================
   NOTA DINAS
   ============================================================ */
async function renderNota(root) {
  root.innerHTML = `<div class="page"><p class="empty">Memuat...</p></div>`;
  try {
    state.cache = await loadAll();
    const list = (state.cache.notaDinas || []).slice().reverse();

    root.innerHTML = `
      <div class="page"><div class="panel">
        <div class="panel-head">
          <div><h2>Nota Dinas</h2><p>Total ${list.length}</p></div>
          <button class="primary" id="btnAddNota">＋ Buat Nota</button>
        </div>
        ${list.length === 0 ? '<p class="empty">Belum ada nota.</p>' : `
        <div class="table-wrap"><table>
          <thead><tr>
            <th>Nomor</th><th>Tanggal</th><th>Perihal</th><th>Tujuan</th><th>Aksi</th>
          </tr></thead>
          <tbody>${list.map(n => `
            <tr>
              <td>${n.nomor || '-'}</td>
              <td>${n.tanggal || '-'}</td>
              <td>${n.perihal || '-'}</td>
              <td>${n.tujuan || '-'}</td>
              <td class="action-cell">
                <button class="danger-btn" data-del-nota="${n.id}">Hapus</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table></div>`}
      </div></div>`;

    document.getElementById('btnAddNota').addEventListener('click', openNotaModal);
    root.querySelectorAll('[data-del-nota]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.delNota;
        if (!confirm('Hapus nota ini?')) return;
        try {
          await remove('notaDinas', [id]);
          toast('🗑 Nota dihapus');
          navigate('notadinas');
        } catch (e) { toast('❌ ' + e.message, true); }
      });
    });
  } catch (e) {
    root.innerHTML = `<div class="page"><div class="panel">
      <p class="empty">Gagal memuat: ${e.message}</p>
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
        <div class="field" style="grid-column:1/-1"><label>Perihal</label>
          <input name="perihal"></div>
        <div class="field" style="grid-column:1/-1"><label>Tujuan</label>
          <input name="tujuan"></div>
        <div class="field" style="grid-column:1/-1">
          <label>Butir (1 per baris)</label>
          <textarea name="butir" rows="4"></textarea></div>
        <div class="field" style="grid-column:1/-1">
          <label>Tembusan (1 per baris)</label>
          <textarea name="tembusan" rows="3"></textarea></div>
        <div class="field"><label>Penandatangan</label>
          <input name="penandatangan"></div>
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
      await create('notaDinas', d);
      toast('✅ Nota disimpan');
      dlg.close();
      navigate('notadinas');
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

  const mc = document.getElementById('modalClose');
  if (mc) mc.addEventListener('click', () => document.getElementById('modal').close());

  const st = document.getElementById('sidebarToggle');
  if (st) st.addEventListener('click', () =>
    document.body.classList.toggle('sidebar-hidden')
  );

  const lo = document.getElementById('logoutBtn');
  if (lo) lo.addEventListener('click', () => {
    if (confirm('Logout?')) location.reload();
  });

  navigate('dashboard');
});
