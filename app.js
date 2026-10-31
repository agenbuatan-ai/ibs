const STORE="dataOperasiOK_v9";
const fields=[
  "okAsal","tanggal","jamPreop","nama","kelamin","umur","rm","jamMulai","kamar",
  "asalRuangan","ruangRawatSelanjutnya","diagnosaMedis","diagnosaPost",
  "tindakan","jenisOperasi","jenis","asa","dokterAnestesi","dokterBedah",
  "dokterAsisten","perawatBedah","penataAnestesi","perawatInstrumen",
  "perawatSirkulasi","jamRR"
];
const labels={
  okAsal:"OK Asal",
  tanggal:"Tanggal",jamPreop:"Jam di PreOP",nama:"Nama Pasien",kelamin:"Kelamin",
  umur:"Umur",rm:"Nomer RM",jamMulai:"Jam mulai OP",kamar:"Kamar OP",
  asalRuangan:"Asal Ruangan",ruangRawatSelanjutnya:"Ruangan Selanjutnya",
  diagnosaMedis:"Diagnosa Medis",diagnosaPost:"Diagnosa Post OP",
  tindakan:"Tindakan",jenisOperasi:"Jenis Operasi",jenis:"Anestesi",asa:"ASA",
  dokterAnestesi:"Dokter Anestesi",dokterBedah:"Dokter Bedah",
  dokterAsisten:"Dokter Asisten",perawatBedah:"Perawat Bedah",
  penataAnestesi:"Penata Anestesi",perawatInstrumen:"Perawat Instrumen",
  perawatSirkulasi:"Perawat Sirkulasi",jamRR:"Jam Masuk RR"
};

const anesthesiaTypes=["Spinal","GA","LMA","IV","Lokal","ETT","Epidural","Block","TIVA","OTT"];
const jenisOperasiTypes=["Elektif","Emergensi"];
const opRooms=["OK 3B","OK 4C","OK 5D"];
const kamarOpTypes=["OK 1","OK 2","OK 3","OK 4","OK 5","OK 6"];
const gedungMap={"OK 3B":"Gedung B","OK 5D":"Gedung D","OK 4C":"Gedung C"};
const gedungOrder=["Gedung B","Gedung C","Gedung D"];
const kasatpelMap={"Gedung B":"Kasatpel Keperawatan Gedung B","Gedung C":"Kasatpel Keperawatan Gedung C","Gedung D":"Kasatpel Keperawatan Gedung D"};
const kepalaRuangan={"OK 3B":"Ns. Evaristo Menezes, S.Kep","OK 5D":"Ns. Etti Manurung, S.Kep","OK 4C":"Ns. Kholisotus Solehah, S.Kep"};

const rooms=["IGD","IGD PONEK","1B MACKAREL TBRO","2B 2 B PENYAKIT DALAM","2B PERINA","4B PENYAKIT DALAM","4B ISOLASI","4B PENYAKIT DALAM SELATAN","5B BEDAH UTARA","5B ULB","6B JANTUNG","6B PERAWATAN JIWA","7B RPKK SELATAN","7B VK","8B PARU SELATAN","8B PARU UTARA","11D NEUROLOGI","11D UNIT STROKE","12D ANAK","13D PENYAKIT DALAM","14D BEDAH","15D DEWASA","16D GURAME ANAK","3B ICU","6D ICU","6A VVIP","7A DEWASA ANAK","8A DEWASA ANAK","8C KELAS I","5B HCU","5C KELAS II","6C KELAS II","7C KELAS II","9D NICU"];

const doctorsAnestesi=["dr. Eva, Sp.An","dr. Raden Hari, Sp.An","dr. Jamalul Adil, Sp.An.TI","dr. Louis, Sp.An","dr. Girhanif Amri Yunda, Sp. An","dr. Hanna, Sp.An","dr. Robert Hotasi, Sp.An"];
const doctorsBedah=["dr. Hendar, SP.OT","dr. Heka, SP.OT","dr. Rico, Sp.BA(K)","dr. Jeslyn, Sp.BP","dr. Tiko,Sp.B","dr. Eric Hermansyah, Sp.P","dr. Nesia Priandari, Sp.P","dr. Nidya Sandi Bahana, Sp.P","dr. Kusnawara, SP.OG","dr. Seindy, Sp.OG","dr. Nur Hasan, Sp.BS","dr. Harris, Sp.BS","dr. Nunki, Sp.OG","dr. Elba, Sp.OG","dr. Galang, Sp.BTKv","dr. Faiz Sp.BTKV","dr. Fanani, Sp.B","dr. Bram, Sp.OG","dr. Andri, Sp.B","dr. Aroyan, Sp.THT.KL","dr. Irma, Sp.THT.KL","dr. Puri, Sp.BP","dr. Ditta, Sp.BP","dr. Roger, Sp.KK","dr. Putu Mira Sp.OT","dr. Rinto Sp.U","dr. Khadijah, Sp.KK","dr. Yusak, Sp.BD","dr. Rita, Sp.P","drg. Ghina Humaira, Sp.BM","dr. Juniarto Sp.OT","dr. Christopher Rico Andrian, Sp.B","dr. Widya, SP.M"];
const nurses=["Anggia Dwi Puspita Sari, A.Md.Kep","Arief Riandy Sulistyono, A.Md. Kep","Ns. Aris Sunandar, S.Kep","Bayu Doni Wicaksono, A.Md. Kep","Ceptian Dwi Hidayat, A.Md. Kep","Dara Oktavia, A.Md. Kep","Debby Simatupang, A.Md. Kep","Devy Handayani, A.Md.Kep","Djoko Kisharyanto, AMK","Evaristo Menezes,Ns.S.Kep","Fendi Warsito, A.Md. Kep","Fitridawati, A.Md. Kep","Fujiati Fajar, A.Md. Kep","Imam Riyadi, A.Md. Kep","Masruroh, A.Md. Kep","Maurist Agustara Lumban R, A.Md. Kep","Melati Sari Dewi, A.Md. Kep","MHD Satria Irvan, A.Md. Kep","Muhamad Hasbi Yusuf, A.Md. Kep","Muhamad Rahman Ansori, A.Md. Kep","Mustofa, Ns.S.Kep","Nafissa Almandita, S.Tr.Kep., Ners","Nia Apriliyanti, AMK","Nico Teo Pratama, A.Md. Kep","Ns. Ali Maghfur, S.Kep","Ns. Arifudin S.Kep","Ns. Bela Novi Anggara, S.Kep","Ns. Etti Manurung, S.Kep","Ns. Kholisotus Sholihah, SKep","Ns. Mercu Neza, S.Kep","Ns. Nardi, S. Kep","Ns. Nurhayati Rusli, S.Kep","Ns. Palupi Mardika,S.Kep","Ns. Reni Oktaria Mulyani, S.Kep","Ns. Retno Yuli Dwiningrum, S.Kep","Ns. Sofiana Sri Nasa, S.Kep","Ns. Susanti Oktaria, Skep","Ns. Windo Hariadi Wijaya, S.Kep","Nur Hidayat, A.Md. Kep","Nur Komalasari, AMK","Nurhayati Rominar, A.Md. Kep","Rahmat Aprianto, A.Md. Kep","Randa Septiadi, A.Md. Kep","Rentawati M. Purba, A.Md. Kep","Riani Primaningsih, A.Md. Kep","Ricky Fauzi Ginanjar, AMK","Ridwan Agung, A.Md. Kep","Selvi Restia Amanda Puteri, A.Md. Kep","Sigit Purnomo, A.Md. Kep","Sintia Priwanti, AMK","Siti Nurjanah, AMK","Sri Muhyani, A.Md. Kep","Sri Wulandari Setianingsih, A.Md. Kep","Suryanto, A.Md. Kep","Tyas Ratna Puri, AMK","Zakki Maulana, A.Md. Kep"];
const penata=["Anjani Nova Sarah, Amk","Fadzniy Khafiyya, Amk","Haris Muhammad K, Amd.PA","Chrisita Oktovira S, Amd.PA","Meike Asniyanti, Amd.PA","Ardhia Ayu RSP, Amd. PA","Dian Puspa, Amd.PA","Ganis Pradhana, Amk","Ariif Budiman, Amd. PA","Siti Aminah, Amd. PA","Ratnengsih, Amd. PA","Chandra Devi K, S. Tr. Kep","Yulia Nurjanah, Amd. PA","Anggun Yunisda N, Amd. PA","Andini Sulistianingrum, S.Tr.Kes","Melia, S.Tr.Kep","Hernitia Aulia, STR.Kes","Rizka, S.Tr.Kes"];

const defaultEmployees=[
  ...["Arief Riandy Sulistyono, A.Md. Kep","Ns. Aris Sunandar, S.Kep","Ceptian Dwi Hidayat, A.Md. Kep","Dara Oktavia, A.Md. Kep","Fendi Warsito, A.Md. Kep","Fitridawati, A.Md. Kep","Fujiati Fajar, A.Md. Kep","Maurist Agustara Lumban R, A.Md. Kep","Melati Sari Dewi, A.Md. Kep","MHD Satria Irvan, A.Md. Kep","Muhamad Rahman Ansori, A.Md. Kep","Nafissa Almandita, S.Tr.Kep., Ners","Ns. Mercu Neza, S.Kep","Ns. Sofiana Sri Nasa, S.Kep","Nur Hidayat, A.Md. Kep","Rentawati M. Purba, A.Md. Kep","Ridwan Agung, A.Md. Kep","Siti Nurjanah, AMK","Sri Wulandari Setianingsih, A.Md. Kep","Suryanto, A.Md. Kep"].map(n=>({name:n,profession:"Bedah",room:"OK 3B"})),
  ...["Ardhia Ayu RSP, Amd. PA","Ganis Pradhana, Amk","Ariif Budiman, Amd. PA","Siti Aminah, Amd. PA","Chandra Devi K, S. Tr. Kep","Yulia Nurjanah, Amd. PA","Anggun Yunisda N, Amd. PA","Melia, S.Tr.Kep","Hernitia Aulia, STR.Kes","Rizka, S.Tr.Kes"].map(n=>({name:n,profession:"Penata Anestesi",room:"OK 3B"})),
  ...["Djoko Kisharyanto, AMK","Imam Riyadi, A.Md. Kep","Masruroh, A.Md. Kep","Mustofa, Ns.S.Kep","Ns. Ali Maghfur, S.Kep","Ns. Nardi, S. Kep","Ns. Retno Yuli Dwiningrum, S.Kep","Ns. Susanti Oktaria, Skep","Ns. Windo Hariadi Wijaya, S.Kep","Nur Komalasari, AMK","Sintia Priwanti, AMK","Tyas Ratna Puri, AMK"].map(n=>({name:n,profession:"Bedah",room:"OK 4C"})),
  ...["Bayu Doni Wicaksono, A.Md. Kep","Debby Simatupang, A.Md. Kep","Devy Handayani, A.Md.Kep","Muhamad Hasbi Yusuf, A.Md. Kep","Nia Apriliyanti, AMK","Nico Teo Pratama, A.Md. Kep","Ns. Arifudin S.Kep","Ns. Bela Novi Anggara, S.Kep","Ns. Nurhayati Rusli, S.Kep","Ns. Palupi Mardika,S.Kep","Ns. Reni Oktaria Mulyani, S.Kep","Nurhayati Rominar, A.Md. Kep","Rahmat Aprianto, A.Md. Kep","Randa Septiadi, A.Md. Kep","Riani Primaningsih, A.Md. Kep","Ricky Fauzi Ginanjar, AMK","Selvi Restia Amanda Puteri, A.Md. Kep","Sigit Purnomo, A.Md. Kep","Sri Muhyani, A.Md. Kep","Zakki Maulana, A.Md. Kep"].map(n=>({name:n,profession:"Bedah",room:"OK 5D"})),
  ...["Anjani Nova Sarah, Amk","Fadzniy Khafiyya, Amk","Haris Muhammad K, Amd.PA","Chrisita Oktovira S, Amd.PA","Meike Asniyanti, Amd.PA","Dian Puspa, Amd.PA","Ratnengsih, Amd. PA","Andini Sulistianingrum, S.Tr.Kes"].map(n=>({name:n,profession:"Penata Anestesi",room:"OK 5D"}))
];

const spesialisMap={
  "dr. Hendar, SP.OT":"Orthopedi","dr. Heka, SP.OT":"Orthopedi","dr. Putu Mira Sp.OT":"Orthopedi","dr. Juniarto Sp.OT":"Orthopedi",
  "dr. Rico, Sp.BA(K)":"Bedah Anak","dr. Jeslyn, Sp.BP":"Bedah Plastik","dr. Puri, Sp.BP":"Bedah Plastik","dr. Ditta, Sp.BP":"Bedah Plastik",
  "dr. Tiko,Sp.B":"Bedah Umum","dr. Fanani, Sp.B":"Bedah Umum","dr. Andri, Sp.B":"Bedah Umum","dr. Christopher Rico Andrian, Sp.B":"Bedah Umum",
  "dr. Eric Hermansyah, Sp.P":"Paru","dr. Nesia Priandari, Sp.P":"Paru","dr. Nidya Sandi Bahana, Sp.P":"Paru","dr. Rita, Sp.P":"Paru",
  "dr. Kusnawara, SP.OG":"Obgyn","dr. Seindy, Sp.OG":"Obgyn","dr. Nunki, Sp.OG":"Obgyn","dr. Elba, Sp.OG":"Obgyn","dr. Bram, Sp.OG":"Obgyn",
  "dr. Nur Hasan, Sp.BS":"Bedah Saraf","dr. Harris, Sp.BS":"Bedah Saraf",
  "dr. Galang, Sp.BTKv":"Bedah Thorax Cardio","dr. Faiz Sp.BTKV":"Bedah Thorax Cardio",
  "dr. Aroyan, Sp.THT.KL":"THT","dr. Irma, Sp.THT.KL":"THT",
  "dr. Roger, Sp.KK":"Kulit","dr. Khadijah, Sp.KK":"Kulit",
  "dr. Yusak, Sp.BD":"Bedah Digestif",
  "drg. Ghina Humaira, Sp.BM":"Bedah Mulut",
  "dr. Widya, SP.M":"Mata"
};
const spesialisGroups=["Bedah Umum","Orthopedi","Bedah Anak","Bedah Plastik","Paru","Obgyn","Bedah Saraf","Bedah Thorax Cardio","THT","Kulit","Bedah Digestif","Bedah Mulut","Mata","Lainnya"];

function uid(){return (crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+"-"+Math.random().toString(36).slice(2)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

/* ============ AUTH ============ */
const AUTH_KEY="okcenter_auth";
const ROLE_KEY="okcenter_role";
function isLoggedIn(){return sessionStorage.getItem(AUTH_KEY)==="1"}
function getRole(){return sessionStorage.getItem(ROLE_KEY)||"admin"}
function isAdmin(){return getRole()==="admin"}

function renderLogin(){
  document.body.innerHTML=`<div class="login-wrap"><div class="login-card">
    <div class="login-brand"><div class="login-icon">✚</div><h1>Data Operasi & OK Center</h1><p>Masukan PIN untuk melanjutkan</p></div>
    <form id="loginForm"><div class="pin-inputs">${[0,1,2,3].map(i=>`<input type="password" inputmode="numeric" maxlength="1" class="pin-digit" data-i="${i}" autocomplete="off">`).join("")}</div>
    <button class="primary login-btn" type="submit">Masuk</button></form>
  </div></div>`;
  const inputs=[...document.querySelectorAll(".pin-digit")];
  inputs[0].focus();
  inputs.forEach((inp,i)=>{
    inp.oninput=()=>{if(inp.value&&i<3)inputs[i+1].focus();if(inputs.every(x=>x.value))$("#loginForm").requestSubmit()};
    inp.onkeydown=e=>{if(e.key==="Backspace"&&!inp.value&&i>0)inputs[i-1].focus()};
  });
  $("#loginForm").onsubmit=e=>{
    e.preventDefault();
    let pin=inputs.map(x=>x.value).join("");
    if(pin==="4312"){sessionStorage.setItem(AUTH_KEY,"1");sessionStorage.setItem(ROLE_KEY,"admin");location.reload()}
    else if(pin==="1234"){sessionStorage.setItem(AUTH_KEY,"1");sessionStorage.setItem(ROLE_KEY,"user");location.reload()}
    else{inputs.forEach(x=>x.value="");inputs[0].focus()}
  };
}

/* ============ STATE & GOOGLE SHEETS SYNC ============ */
function createDefaultNotaDinas(){
  return [{
    id:uid(),
    kepada:"[Nama Jabatan/Unit Penerima]",
    dari:"[Nama Jabatan/Unit Pengirim]",
    nomor:"001/ND/OK/2026",
    sifat:"Biasa",
    lampiran:"-",
    hal:"[Pokok/perihal Nota Dinas]",
    latarBelakang:"[Tuliskan latar belakang dan maksud Nota Dinas secara singkat dan jelas.]",
    butir:[
      "Uraian pokok/informasi pertama.",
      "Uraian pokok/informasi berikutnya, bila diperlukan.",
      "Permintaan, arahan, atau tindak lanjut yang diharapkan."
    ],
    tanggal:todayLong(),
    jabatanPenandatangan:"Kasatpel Keperawatan",
    namaPenandatangan:"[Nama Lengkap Pejabat]",
    nipPenandatangan:"[NIP Pejabat]",
    tembusan:[
      "Pihak/unit terkait pertama",
      "Pihak/unit terkait kedua"
    ]
  }];
}

function normalizeStateData(raw){
  const data=(raw && typeof raw==="object")?{...raw}:{};
  ["operations","employees","medical","inventory","stockIn","stockOut","requests","notaDinas"].forEach(k=>{
    if(!Array.isArray(data[k]))data[k]=[];
  });
  data.operations=data.operations.map(o=>({id:o.id||uid(),...o}));
  if(!data.employees.length){
    data.employees=defaultEmployees.map(e=>({id:uid(),status:"Aktif",kompetensi:"",...e}));
  }else{
    data.employees=data.employees.map(e=>({
      id:e.id||uid(),name:e.name||"",profession:e.profession||e.role||"",
      status:e.status||"Aktif",kompetensi:e.kompetensi||"",
      room:opRooms.includes(e.room)?e.room:opRooms[0]
    }));
  }
  data.medical=data.medical.map(m=>({
    id:m.id||uid(),type:m.type||"BHP",name:m.name||"",code:m.code||"",
    unit:m.unit||"",min:+m.min||0,status:m.status||"Aktif"
  }));
  if(!data.notaDinas.length)data.notaDinas=createDefaultNotaDinas();
  return data;
}

/*
 * GANTI URL DI BAWAH INI DENGAN URL WEB APP GOOGLE APPS SCRIPT YANG BERAKHIR /exec.
 * Contoh: https://script.google.com/macros/s/AKfycbxxxxxxxx/exec
 */
const GOOGLE_SHEETS_API_URL="1wwQhhjG1BJeSR4xc-KKKZRKmuZ5hOlRJuDqemobsu0c";
const API_MESSAGE_CHANNEL="OKCENTER_SHEETS_API";
const cloudMode=/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(GOOGLE_SHEETS_API_URL);
let cloudReady=false;
let cloudRevision=0;
let cloudSaveQueue=Promise.resolve();

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let currentPage="dashboard";
let state=normalizeStateData(JSON.parse(localStorage.getItem(STORE)||"null")||{});

function setSyncStatus(message,detail=""){
  const el=document.getElementById("syncStatus");
  if(el){el.textContent="● "+message;el.title=detail||message;}
  const link=document.getElementById("sheetLink");
  if(link&&/^https:\/\//.test(detail)){
    link.href=detail;
    link.hidden=false;
  }
}

/*
 * GitHub Pages tidak memiliki google.script.run. Komunikasi dilakukan melalui
 * form POST ke Apps Script dengan iframe tersembunyi dan balasan postMessage.
 */
function callSheetsApi(action,payload={}){
  return new Promise((resolve,reject)=>{
    if(!cloudMode){reject(new Error("URL Google Apps Script belum dipasang di app.js."));return;}

    const requestId=uid();
    const frame=document.createElement("iframe");
    frame.name="okc_api_"+requestId;
    frame.style.display="none";
    frame.setAttribute("aria-hidden","true");

    const form=document.createElement("form");
    form.method="POST";
    form.action=GOOGLE_SHEETS_API_URL;
    form.target=frame.name;
    form.style.display="none";

    const addField=(name,value)=>{
      const input=document.createElement("input");
      input.type="hidden";
      input.name=name;
      input.value=value;
      form.appendChild(input);
    };

    addField("action",action);
    addField("requestId",requestId);
    if(action==="save")addField("payload",JSON.stringify(payload));

    let finished=false;
    const cleanup=()=>{
      window.removeEventListener("message",onMessage);
      clearTimeout(timeoutId);
      form.remove();
      frame.remove();
    };
    const finish=(fn,value)=>{
      if(finished)return;
      finished=true;
      cleanup();
      fn(value);
    };
    const onMessage=event=>{
      if(event.source!==frame.contentWindow)return;
      const data=event.data;
      if(!data||data.channel!==API_MESSAGE_CHANNEL||data.requestId!==requestId)return;
      if(data.ok)finish(resolve,data);
      else finish(reject,new Error(data.error||"Google Apps Script mengembalikan kesalahan."));
    };
    const timeoutId=setTimeout(()=>{
      finish(reject,new Error("Waktu koneksi ke Google Sheets habis. Periksa URL deployment dan akses Google."));
    },60000);

    window.addEventListener("message",onMessage);
    document.body.appendChild(frame);
    document.body.appendChild(form);
    try{form.submit();}
    catch(error){finish(reject,error);}
  });
}

function persist(){
  const snapshot=JSON.parse(JSON.stringify(state));
  try{localStorage.setItem(STORE,JSON.stringify(snapshot));}
  catch(error){console.warn("Backup lokal gagal:",error);}

  if(!cloudMode||!cloudReady)return Promise.resolve({local:true});

  // Antrikan penyimpanan agar urutan klik tidak menyebabkan data tertimpa.
  cloudSaveQueue=cloudSaveQueue.catch(()=>{}).then(()=>
    callSheetsApi("save",{state:snapshot,expectedRevision:cloudRevision})
      .then(result=>{
        cloudRevision=Number(result.revision||cloudRevision);
        setSyncStatus("Tersimpan di Google Sheets",result.spreadsheetUrl||"");
        return result;
      })
      .catch(error=>{
        const message=error&&error.message?error.message:String(error);
        setSyncStatus("Gagal sinkron",message);
        toast("Gagal menyimpan ke Google Sheets: "+message);
        throw error;
      })
  );
  return cloudSaveQueue;
}

function initCloudDatabase(){
  if(!cloudMode){
    setSyncStatus("Mode lokal — URL API belum dipasang");
    navigate("dashboard");
    return;
  }

  setSyncStatus("Menghubungkan ke Google Sheets...");
  callSheetsApi("read")
    .then(result=>{
      cloudRevision=Number(result.revision||0);
      if(result.spreadsheetUrl){
        const link=document.getElementById("sheetLink");
        if(link){link.href=result.spreadsheetUrl;link.hidden=false;}
      }

      if(result.hasData){
        // Google Sheets menjadi sumber data utama setelah berhasil terhubung.
        state=normalizeStateData(result.state||{});
        try{localStorage.setItem(STORE,JSON.stringify(state));}catch(error){}
        cloudReady=true;
        setSyncStatus("Terhubung ke Google Sheets",result.spreadsheetUrl||"");
        navigate("dashboard");
      }else{
        // Database baru: isi awal dari data lokal/default aplikasi.
        cloudReady=true;
        setSyncStatus("Menyiapkan database Google Sheets...");
        persist().then(()=>{
          setSyncStatus("Database siap",result.spreadsheetUrl||"");
          navigate("dashboard");
        }).catch(()=>navigate("dashboard"));
      }
    })
    .catch(error=>{
      const message=error&&error.message?error.message:String(error);
      cloudReady=false;
      setSyncStatus("Koneksi Google Sheets gagal",message);
      toast("Database Google Sheets belum dapat diakses: "+message);
      // Aplikasi tetap terbuka dengan backup lokal; status menunjukkan belum sinkron.
      navigate("dashboard");
    });
}

function pad(n){return String(n).padStart(2,"0")}
function today(){let d=new Date();return `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()}`}
function todayLong(){
  const bulan=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  let d=new Date();return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}
const monthMap={jan:1,januari:1,january:1,feb:2,februari:2,february:2,mar:3,maret:3,march:3,apr:4,april:4,mei:5,may:5,jun:6,juni:6,june:6,jul:7,juli:7,july:7,agu:8,agustus:8,aug:8,august:8,sep:9,september:9,okt:10,oktober:10,oct:10,october:10,nov:11,november:11,des:12,desember:12,dec:12,december:12};

function normDate(v){
  if(v==null||v==="")return "";
  if(v instanceof Date && !isNaN(v.getTime())){
    return `${pad(v.getDate())}-${pad(v.getMonth()+1)}-${v.getFullYear()}`;
  }
  let s=String(v).trim();
  let num=typeof v==='number'?v:(!isNaN(+v)&&s!==''&&!s.includes('-')&&!s.includes('/')?+v:null);
  if(num&&num>20000&&num<80000){
    let d=new Date(Date.UTC(1899,11,30)+Math.round(num)*86400000);
    return `${pad(d.getUTCDate())}-${pad(d.getUTCMonth()+1)}-${d.getUTCFullYear()}`;
  }
  let m=s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if(m)return `${pad(m[3])}-${pad(m[2])}-${m[1]}`;
  m=s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if(m){
    let y=+m[3];if(y<100)y+=y>=50?1900:2000;
    return `${pad(m[1])}-${pad(m[2])}-${y}`;
  }
  m=s.match(/^(\d{1,2})[\s\-]+([A-Za-z]+)[\s\-]+(\d{2,4})/);
  if(m){
    let mo=monthMap[m[2].toLowerCase()];
    if(mo){
      let y=+m[3];if(y<100)y+=y>=50?1900:2000;
      return `${pad(m[1])}-${pad(mo)}-${y}`;
    }
  }
  return s;
}
function toISO(dateStr){let m=String(dateStr).match(/^(\d{2})-(\d{2})-(\d{4})$/);return m?`${m[3]}-${m[2]}-${m[1]}`:""}
function fromISO(iso){if(!iso)return "";let p=iso.split("-");return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:""}
function normTime(v){
  if(v==null||v==="")return "";
  if(v instanceof Date && !isNaN(v.getTime())){
    return `${pad(v.getHours())}:${pad(v.getMinutes())}`;
  }
  let num=+v;
  if(!isNaN(num)&&num>=0&&num<1&&(typeof v==='number'||String(v).includes('.'))){
    let n=Math.round(num*1440)%1440;
    return `${pad(Math.floor(n/60))}:${pad(n%60)}`;
  }
  let s=String(v).trim();
  let m=s.match(/(\d{1,2})[:.](\d{2})/);
  return m?`${pad(m[1])}:${m[2]}`:s;
}
function dateObj(s){let m=String(s).match(/^(\d{2})-(\d{2})-(\d{4})$/);return m?new Date(+m[3],+m[2]-1,+m[1]):null}
function toast(m){let t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}

function pageTitle(p){
  let map={
    dashboard:"Dashboard",input:"Input Operasi",operations:"Daftar Operasi",
    import:"Import Excel/CSV",notadinas:"Nota Dinas",employees:"Data Pegawai",
    inventory:"Inventaris",stock:"Stok Alkes",stockin:"Barang Masuk",
    stockout:"Barang Keluar",shortage:"Kekurangan Alkes",requests:"Permintaan Alkes",
    daily:"Operasi Harian",monthly:"Operasi Bulanan",
    bedah:"Laporan Bedah",anestesi:"Laporan Anestesi",
    "inventory-report":"Laporan Inventaris","alkes-report":"Laporan Alkes",
    settings:"Backup Database",reset:"Reset Data"
  };
  return map[p]||p;
}

function navigate(p){
  currentPage=p;
  try{renderPage(p)}catch(e){console.error("Render error:",e);$("#pages").innerHTML=`<div class="page"><div class="panel"><h2>Terjadi kesalahan</h2><p class="muted">${esc(e.message)}</p></div></div>`}
  $("#pageTitle").textContent=pageTitle(p);
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===p));
  $("#sidebar").classList.remove('open');
  window.scrollTo({top:0,behavior:"smooth"});
}

function opts(arr,selected=""){return '<option value="">Pilih...</option>'+arr.map(x=>`<option ${x===selected?'selected':''}>${esc(x)}</option>`).join("")}

/* ============ FORM FIELD (dengan date picker) ============ */
function formField(label,id,type="text",value="",required=false,extra=""){
  let control;
  if(type==="select"){
    control=`<select id="${id}" ${required?'required':''} ${extra}>${value}</select>`;
  }else if(type==="textarea"){
    control=`<textarea id="${id}" ${required?'required':''} ${extra}>${esc(value)}</textarea>`;
  }else if(type==="date"){
    control=`<div class="date-wrap">
      <input id="${id}" type="text" class="date-input-native" value="${esc(value)}" ${required?'required':''} placeholder="dd-mm-yyyy" maxlength="10" inputmode="numeric" autocomplete="off">
      <input type="date" class="date-picker-hidden" data-target="${id}" value="${toISO(value)}" tabindex="-1" aria-hidden="true">
    </div>`;
  }else{
    control=`<input id="${id}" type="${type}" value="${esc(value)}" ${required?'required':''} ${extra}>`;
  }
  return `<div class="field"><label>${label}${required?' <span class="required">*</span>':''}</label>${control}</div>`;
}

/* ============ OPERATION FORM ============ */
function operationForm(x={}){
  return `<form id="operationForm">
  <div class="form-section"><h3>OK Asal</h3><div class="form-grid">
    ${formField("OK Asal","okAsal","select",opts(opRooms,x.okAsal),true)}
  </div></div>
  
  <div class="form-section"><h3>Identitas & Waktu</h3><div class="form-grid">
    ${formField("Tanggal","tanggal","date",x.tanggal||today(),true,'placeholder="dd-mm-yyyy"')}
    ${formField("Jam di PreOP","jamPreop","text",x.jamPreop||"",true,'class="time-input" placeholder="hh:mm" maxlength="5" inputmode="numeric"')}
    ${formField("Nama Pasien","nama","text",x.nama||"",true,'placeholder="Masukkan nama pasien"')}
    ${formField("Kelamin","kelamin","select",opts(["Laki-laki","Perempuan"],x.kelamin),true)}
    ${formField("Umur","umur","number",x.umur||"",true,'min="0"')}
    ${formField("Nomer RM","rm","text",x.rm||"",true)}
    ${formField("Jam mulai OP","jamMulai","text",x.jamMulai||"",true,'class="time-input" placeholder="hh:mm" maxlength="5"')}
    ${formField("Kamar OP","kamar","select",opts(kamarOpTypes,x.kamar),true)}
    ${formField("Asal Ruangan","asalRuangan","text",x.asalRuangan||"",false,'list="dlRooms" placeholder="Ketik atau pilih..."')}
    ${formField("Ruang Rawat Selanjutnya","ruangRawatSelanjutnya","text",x.ruangRawatSelanjutnya||"",false,'list="dlRooms" placeholder="Ketik atau pilih..."')}
  </div></div>
  <div class="form-section"><h3>Diagnosis & Tindakan</h3><div class="form-grid">
    ${formField("Diagnosa Medis","diagnosaMedis","text",x.diagnosaMedis||"",true)}
    ${formField("Diagnosa Post OP","diagnosaPost","text",x.diagnosaPost||"")}
    ${formField("Tindakan","tindakan","text",x.tindakan||"",true)}
    ${formField("Jenis Operasi","jenisOperasi","select",opts(jenisOperasiTypes,x.jenisOperasi),true)}
    ${formField("Anestesi","jenis","select",opts(anesthesiaTypes,x.jenis),true)}
    ${formField("ASA","asa","select",opts(["ASA I","ASA II","ASA III","ASA IV","ASA V","ASA VI","ASA 2E","ASA 3E","E"],x.asa),true)}
  </div></div>
  <div class="form-section"><h3>Tim Medis</h3><div class="form-grid">
    ${formField("Dokter Anestesi","dokterAnestesi","text",x.dokterAnestesi||"",true,'list="dlAn"')}
    ${formField("Dokter Bedah","dokterBedah","text",x.dokterBedah||"",true,'list="dlBedah"')}
    ${formField("Dokter Asisten","dokterAsisten","text",x.dokterAsisten||"",false,'list="dlAsisten" placeholder="Nama / PPDS"')}
    ${formField("Perawat Bedah","perawatBedah","text",x.perawatBedah||"",true,'list="dlNurse"')}
    ${formField("Penata Anestesi","penataAnestesi","text",x.penataAnestesi||"",true,'list="dlPenata"')}
    ${formField("Perawat Instrumen","perawatInstrumen","text",x.perawatInstrumen||"",true,'list="dlNurse"')}
    ${formField("Perawat Sirkulasi","perawatSirkulasi","text",x.perawatSirkulasi||"",true,'list="dlNurse"')}
    ${formField("Jam Masuk RR","jamRR","text",x.jamRR||"",true,'class="time-input" placeholder="hh:mm" maxlength="5"')}
  </div></div>
  <datalist id="dlRooms">${rooms.map(r=>`<option value="${esc(r)}">`).join("")}</datalist>
  <datalist id="dlAn">${doctorsAnestesi.map(x=>`<option>${esc(x)}</option>`).join("")}</datalist>
  <datalist id="dlBedah">${doctorsBedah.map(x=>`<option>${esc(x)}</option>`).join("")}</datalist>
  <datalist id="dlAsisten"><option>PPDS</option>${doctorsBedah.map(x=>`<option>${esc(x)}</option>`).join("")}</datalist>
  <datalist id="dlNurse">${nurses.map(x=>`<option>${esc(x)}</option>`).join("")}</datalist>
  <datalist id="dlPenata">${penata.map(x=>`<option>${esc(x)}</option>`).join("")}</datalist>
  <div class="form-actions"><button type="reset" class="ghost">↺ Reset</button><button class="primary" type="submit">✓ Simpan Operasi</button></div>
  </form>`;
}

/* ============ DASHBOARD ============ */
function renderDashboard(){
  let ops=state.operations;
  let todayOps=ops.filter(x=>normDate(x.tanggal)===today());
  let roomsUsed=new Set(ops.map(x=>x.kamar).filter(Boolean)).size;
  let low=countLow();
  let recent=todayOps.slice().reverse().slice(0,10);
  return `<div class="page">
  <div class="hero"><h2>Data Operasi & OK Center</h2><p>Kelola operasi, kamar operasi, pegawai, inventaris, alkes, stok, permintaan, nota dinas, dan laporan dalam satu dashboard.</p></div>
  <div class="stats">
    <div class="stat-card"><span>Total Operasi</span><strong>${ops.length}</strong><small>seluruh data operasi</small></div>
    <div class="stat-card"><span>Operasi Hari Ini</span><strong>${todayOps.length}</strong><small>${today()}</small></div>
    <div class="stat-card"><span>OK Terpakai</span><strong>${roomsUsed}</strong><small>dari 3 kamar OK</small></div>
    <div class="stat-card"><span>Alkes Stok Rendah</span><strong>${low}</strong><small>perlu perhatian</small></div>
  </div>
  <div class="grid grid-2">
    <div class="panel"><div class="panel-head"><div><h2>Operasi Terbaru</h2><p>10 transaksi hari ini (${today()})</p></div><button class="ghost" data-page-jump="operations">Lihat semua</button></div>
      ${recent.length?operationTable(recent,false,false):'<div class="empty">Belum ada operasi hari ini.</div>'}
    </div>
    <div class="panel"><div class="panel-head"><div><h2>Ringkasan Anestesi</h2><p>Distribusi hari ini (${today()})</p></div></div>
      ${todayOps.length?anesthesiaSummary(todayOps):'<div class="empty">Belum ada data hari ini.</div>'}
    </div>
  </div></div>`;
}

function operationTable(rows,actions=true,selectable=false){
  let cols=(selectable?1:0)+1+fields.length+(actions?1:0);
  return `<div class="table-wrap"><table><thead><tr>
    ${selectable?'<th class="check-col"><input type="checkbox" class="check-all" data-target="ops" title="Pilih Semua"></th>':''}
    <th>No</th>${fields.map(f=>`<th class="${['jenisOperasi','ruangRawatSelanjutnya','ruanganSelanjutnya'].includes(f)?'th-wrap':''}">${labels[f]}</th>`).join("")}${actions?'<th>Aksi</th>':''}
  </tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr ${selectable?`data-select-id="ops:${r.id}"`:''}>
    ${selectable?`<td class="check-col"><input type="checkbox" class="row-check" data-target="ops" data-id="${r.id}"></td>`:''}
    <td>${i+1}</td>${fields.map(f=>`<td>${esc(r[f]||"")}</td>`).join("")}
    ${actions?`<td class="action-cell"><button class="ghost" onclick="editOperation('${r.id}')">Edit</button><button class="danger-btn" onclick="deleteOperation('${r.id}')">Hapus</button></td>`:""}
  </tr>`).join(""):`<tr><td class="empty" colspan="${cols}">Belum ada data operasi.</td></tr>`}</tbody></table></div>`;
}

function anesthesiaSummary(ops){
  return `<div class="report-list">${anesthesiaTypes.map(a=>{
    let n=ops.filter(x=>x.jenis===a).length,p=ops.length?Math.round(n/ops.length*100):0;
    return `<div><div class="report-line"><span>${a}</span><strong>${n}</strong></div><div class="progress"><i style="width:${p}%"></i></div></div>`;
  }).join("")}</div>`;
}

/* ============ INPUT ============ */
function renderInput(){return `<div class="page"><div class="panel"><div class="panel-head"><div><h2>Input Operasi</h2></div></div>${operationForm()}</div></div>`}

function renderOperations(){
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>Daftar Operasi</h2><p>${state.operations.length} data tersimpan</p></div>
    <div class="toolbar">
      <input class="search-input" id="opSearch" placeholder="Cari pasien / RM / diagnosa / dokter...">
      <button class="primary" data-page-jump="input">＋ Input Operasi</button>
      <button class="ghost" id="exportOps">⇧ Export Excel</button>
      <button class="danger-btn" onclick="deleteSelectedOperations()">Hapus Terpilih</button>
    </div>
  </div>
  <div id="opTable">${operationTable(state.operations.slice().reverse(),true,true)}</div>
  </div></div>`;
}

/* ============ IMPORT ============ */
function renderImport(){
  return `<div class="page">
  <div class="panel">
    <div class="import-zone" id="dropZone">
      <div class="upload-icon">⇩</div>
      <h2>Import Data Operasi</h2>
      <input type="file" id="dataFile" accept=".xlsx,.xls,.csv,.pdf,.doc,.docx" hidden>
      <button class="primary" id="chooseFile">Pilih File</button>
      <div id="fileName" class="muted"></div>
    </div>
    <div id="importNotice" class="notice hidden"></div>
    <div id="previewBox" class="preview hidden">
      <div class="panel-head"><div><h2>Preview Import</h2><p id="previewInfo"></p></div><button class="primary" id="importBtn">✓ Simpan ke Database</button></div>
      <div class="table-wrap"><table><thead id="previewHead"></thead><tbody id="previewBody"></tbody></table></div>
    </div>
  </div>
  <div class="panel"><h3 class="section-title">Format kolom resmi</h3><div class="notice">${fields.map(f=>labels[f]).join(" • ")}</div></div>
  </div>`;
}

/* ============ NOTA DINAS ============ */
function renderNotaDinas(){
  let list=state.notaDinas;
  return `<div class="page">
  <div class="panel">
    <div class="panel-head">
      <div><h2>Nota Dinas</h2><p>Form isian dan riwayat Nota Dinas sesuai format resmi.</p></div>
      <div class="toolbar">
        <button class="primary" onclick="openNotaDinasForm()">＋ Buat Nota Dinas</button>
      </div>
    </div>
    <div class="table-wrap"><table><thead><tr>
      <th>No</th><th>Nomor</th><th>Tanggal</th><th>Kepada</th><th>Dari</th><th>Hal</th><th>Sifat</th><th>Aksi</th>
    </tr></thead><tbody>
    ${list.length?list.slice().reverse().map((n,i)=>`<tr>
      <td>${i+1}</td>
      <td>${esc(n.nomor||"-")}</td>
      <td>${esc(n.tanggal||"-")}</td>
      <td>${esc(n.kepada||"-")}</td>
      <td>${esc(n.dari||"-")}</td>
      <td>${esc(n.hal||"-")}</td>
      <td><span class="badge">${esc(n.sifat||"Biasa")}</span></td>
      <td class="action-cell">
        <button class="ghost" onclick="viewNotaDinas('${n.id}')">Lihat</button>
        <button class="ghost" onclick="printNotaDinas('${n.id}')">🖨 Cetak</button>
        <button class="danger-btn" onclick="deleteNotaDinas('${n.id}')">Hapus</button>
      </td>
    </tr>`).join(""):'<tr><td colspan="8" class="empty">Belum ada Nota Dinas.</td></tr>'}
    </tbody></table></div>
  </div>
  </div>`;
}

function notaDinasPreviewHtml(n){
  let lampiranHtml=n.lampiran&&n.lampiran!=="-"?esc(n.lampiran):"-";
  let butir=n.butir||[];
  let butirHtml=butir.length?butir.map(b=>`<li>${esc(b)}</li>`).join(""):`<li>[Uraian pokok/informasi pertama.]</li>`;
  let tembusan=n.tembusan||[];
  let tembusanHtml=tembusan.length?`<div class="nota-tembusan"><strong>Tembusan:</strong><ol>${tembusan.map(t=>`<li>${esc(t)}</li>`).join("")}</ol></div>`:"";
  
  let kepadaVal=(n.kepada||"[Nama Jabatan/Unit Penerima]").trim();
  if(!/^yth/i.test(kepadaVal)) kepadaVal="Yth. "+kepadaVal;

  let tglStr=(n.tanggal||todayLong()).trim();
  if(!/^jakarta/i.test(tglStr)) tglStr="Jakarta, "+tglStr;

  return `<div class="nota-preview" id="notaPrintArea">
    <table class="kop-table">
      <tr>
        <td class="kop-logo-cell">
          <img src="logo-rsud-koja.png" alt="Logo RSUD Koja" class="kop-logo-img">
        </td>
        <td class="kop-text-cell">
          <div class="kop-line-1">PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA</div>
          <div class="kop-line-2">RUMAH SAKIT UMUM DAERAH KOJA</div>
          <div class="kop-line-3">Jl. Deli No. 4, Kel. Koja, Kec. Koja, Jakarta Utara 14220</div>
          <div class="kop-line-4">Telp. (021) 43938478 &nbsp;|&nbsp; rsudkoja.jakarta.go.id</div>
        </td>
        <td class="kop-spacer-cell"></td>
      </tr>
    </table>
    <div class="kop-divider"></div>
    <div class="nota-title">NOTA DINAS</div>
    <table class="nota-table-meta">
      <tr><td class="k">Kepada</td><td class="sep">:</td><td class="v">${esc(kepadaVal)}</td></tr>
      <tr><td class="k">Dari</td><td class="sep">:</td><td class="v">${esc(n.dari||"[Nama Jabatan/Unit Pengirim]")}</td></tr>
      <tr><td class="k">Nomor</td><td class="sep">:</td><td class="v">${esc(n.nomor||"[Nomor Nota Dinas]")}</td></tr>
      <tr><td class="k">Sifat</td><td class="sep">:</td><td class="v">${esc(n.sifat||"Biasa")}</td></tr>
      <tr><td class="k">Lampiran</td><td class="sep">:</td><td class="v">${lampiranHtml}</td></tr>
      <tr><td class="k">Hal</td><td class="sep">:</td><td class="v"><strong>${esc(n.hal||"[Pokok/perihal Nota Dinas]")}</strong></td></tr>
    </table>
    <div class="nota-body">
      <p class="nota-lead">${esc(n.latarBelakang||"[Tuliskan latar belakang dan maksud Nota Dinas secara singkat dan jelas.]")}</p>
      <ol class="nota-points">${butirHtml}</ol>
      <p class="nota-closing">Demikian disampaikan untuk menjadi perhatian dan ditindaklanjuti sebagaimana mestinya.</p>
    </div>
    <table class="nota-sign-table">
      <tr>
        <td style="width:50%;"></td>
        <td style="width:50%;">
          <div class="nota-sign-inner">
            <p>${esc(tglStr)}</p>
            <p class="sig-jabatan">${esc(n.jabatanPenandatangan||"[NAMA JABATAN PENANDATANGAN]")}</p>
            <div class="sig-space"></div>
            <p class="sig-name">${esc(n.namaPenandatangan||"[Nama Lengkap Pejabat]")}</p>
            <p class="sig-nip">NIP ${esc(n.nipPenandatangan||"[NIP Pejabat]")}</p>
          </div>
        </td>
      </tr>
    </table>
    ${tembusanHtml}
  </div>`;
}

function openNotaDinasForm(id){
  let n=state.notaDinas.find(x=>x.id===id)||{
    sifat:"Biasa",
    tanggal:todayLong(),
    butir:[
      "Uraian pokok/informasi pertama.",
      "Uraian pokok/informasi berikutnya, bila diperlukan.",
      "Permintaan, arahan, atau tindak lanjut yang diharapkan."
    ],
    tembusan:[
      "Pihak/unit terkait, jika ada",
      "Pihak/unit terkait, jika ada"
    ]
  };
  $("#modalTitle").textContent=id?"Edit Nota Dinas":"Buat Nota Dinas";
  let butir=n.butir&&n.butir.length?n.butir:[
    "Uraian pokok/informasi pertama.",
    "Uraian pokok/informasi berikutnya, bila diperlukan.",
    "Permintaan, arahan, atau tindak lanjut yang diharapkan."
  ];
  let tembusan=(n.tembusan||[]).join("\n");
  $("#modalBody").innerHTML=`<form id="notaForm" class="nota-form">
    <div class="form-grid">
      ${formField("Kepada","ndKepada","text",n.kepada||"",true,'placeholder="Yth. Nama Jabatan/Unit Penerima"')}
      ${formField("Dari","ndDari","text",n.dari||"",true,'placeholder="Nama Jabatan/Unit Pengirim"')}
      ${formField("Nomor","ndNomor","text",n.nomor||"",true,'placeholder="Nomor Nota Dinas"')}
      ${formField("Sifat","ndSifat","select",opts(["Biasa","Penting","Segera","Rahasia"],n.sifat||"Biasa"),true)}
      ${formField("Lampiran","ndLampiran","text",n.lampiran||"-",false,'placeholder="Jumlah berkas / -"')}
      ${formField("Hal","ndHal","text",n.hal||"",true,'placeholder="Pokok/perihal Nota Dinas"')}
    </div>
    <div class="field field-full" style="margin-top:14px">
      <label>Latar Belakang / Maksud <span class="required">*</span></label>
      <textarea id="ndLatarBelakang" rows="3" required placeholder="Tuliskan latar belakang dan maksud Nota Dinas secara singkat dan jelas.">${esc(n.latarBelakang||"")}</textarea>
    </div>
    <div class="field field-full" style="margin-top:14px">
      <label>Butir Uraian (1 baris = 1 butir)</label>
      <textarea id="ndButir" rows="4" placeholder="1. Uraian pokok/informasi pertama&#10;2. Uraian pokok/informasi berikutnya&#10;3. Permintaan, arahan, atau tindak lanjut">${esc(butir.join("\n"))}</textarea>
    </div>
    <div class="form-grid" style="margin-top:14px">
      ${formField("Tanggal Tanda Tangan","ndTanggal","text",n.tanggal||todayLong(),true,'placeholder="Jakarta, 24 Oktober 2026"')}
      ${formField("Jabatan Penandatangan","ndJabatan","text",n.jabatanPenandatangan||"",true,'placeholder="NAMA JABATAN PENANDATANGAN"')}
      ${formField("Nama Penandatangan","ndNama","text",n.namaPenandatangan||"",true,'placeholder="Nama Lengkap Pejabat"')}
      ${formField("NIP Penandatangan","ndNip","text",n.nipPenandatangan||"",false,'placeholder="NIP Pejabat"')}
    </div>
    <div class="field field-full" style="margin-top:14px">
      <label>Tembusan (1 baris = 1 tembusan)</label>
      <textarea id="ndTembusan" rows="3" placeholder="Pihak/unit terkait pertama&#10;Pihak/unit terkait kedua">${esc(tembusan)}</textarea>
    </div>
    <div class="form-actions">
      <button type="button" class="ghost" id="cancelModal">Batal</button>
      <button class="primary" type="submit">✓ Simpan Nota Dinas</button>
    </div>
  </form>`;
  $("#modal").showModal();
  $("#notaForm").onsubmit=e=>{
    e.preventDefault();
    let butirList=$("#ndButir").value.split("\n").map(s=>s.trim().replace(/^\d+[\.\)]\s*/,"")).filter(Boolean);
    let tembusanList=$("#ndTembusan").value.split("\n").map(s=>s.trim().replace(/^\d+[\.\)]\s*/,"")).filter(Boolean);
    let obj={
      id:id||uid(),
      kepada:$("#ndKepada").value.trim(),
      dari:$("#ndDari").value.trim(),
      nomor:$("#ndNomor").value.trim(),
      sifat:$("#ndSifat").value,
      lampiran:$("#ndLampiran").value.trim()||"-",
      hal:$("#ndHal").value.trim(),
      latarBelakang:$("#ndLatarBelakang").value.trim(),
      butir:butirList,
      tanggal:$("#ndTanggal").value.trim(),
      jabatanPenandatangan:$("#ndJabatan").value.trim(),
      namaPenandatangan:$("#ndNama").value.trim(),
      nipPenandatangan:$("#ndNip").value.trim(),
      tembusan:tembusanList
    };
    if(id)state.notaDinas=state.notaDinas.map(r=>r.id===id?obj:r);
    else state.notaDinas.push(obj);
    persist();$("#modal").close();
    toast("Nota Dinas disimpan");navigate("notadinas");
  };
}

window.viewNotaDinas=id=>{
  let n=state.notaDinas.find(x=>x.id===id);if(!n)return;
  $("#modalTitle").textContent="Preview Nota Dinas";
  $("#modalBody").innerHTML=`
    ${notaDinasPreviewHtml(n)}
    <div class="form-actions no-print" style="margin-top:16px">
      <button type="button" class="ghost" id="cancelModal">Tutup</button>
      <button class="primary" onclick="printNotaDinas('${n.id}')">🖨 Cetak / PDF</button>
    </div>`;
  $("#modal").showModal();
};

window.printNotaDinas=id=>{
  let n=state.notaDinas.find(x=>x.id===id);if(!n)return;
  let baseHref=location.href.substring(0, location.href.lastIndexOf('/')+1);
  let w=window.open("","_blank");
  if(!w)return toast("Popup diblokir browser");
  w.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<base href="${baseHref}">
<title>Nota Dinas - ${esc(n.nomor||"RSUD Koja")}</title>
<link rel="stylesheet" href="style.css">
<style>
  @page {
    size: A4 portrait;
    margin: 15mm 20mm;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 20px;
    background: #f5f5f5;
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
  }
  .print-page-wrap {
    max-width: 820px;
    margin: 0 auto;
    background: #fff;
    padding: 20mm 18mm;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
  .print-bar {
    max-width: 820px;
    margin: 0 auto 16px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .print-bar button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #fff;
  }
  .print-bar button.primary {
    background: #5b21b6;
    color: #fff;
    border-color: #5b21b6;
  }
  .nota-preview {
    box-shadow: none!important;
    border: 0!important;
    padding: 0!important;
    max-width: 100%!important;
    font-family: Arial, Helvetica, sans-serif!important;
    background: #fff!important;
  }
  @media print {
    body {
      background: #fff!important;
      padding: 0!important;
    }
    .print-bar {
      display: none!important;
    }
    .print-page-wrap {
      padding: 0!important;
      box-shadow: none!important;
      max-width: 100%!important;
      margin: 0!important;
    }
  }
</style>
</head>
<body>
  <div class="print-bar no-print">
    <button onclick="window.close()">Tutup</button>
    <button class="primary" onclick="window.print()">🖨 Cetak Nota Dinas</button>
  </div>
  <div class="print-page-wrap">
    ${notaDinasPreviewHtml(n)}
  </div>
</body>
</html>`);
  w.document.close();
  setTimeout(()=>{w.focus();w.print()},400);
};
window.deleteNotaDinas=id=>{
  if(confirm("Hapus Nota Dinas ini?")){
    state.notaDinas=state.notaDinas.filter(x=>x.id!==id);
    persist();navigate("notadinas");toast("Nota Dinas dihapus");
  }
};

/* ============ EMPLOYEES ============ */
function renderEmployees(){
  let orgHtml=`<div class="org-chart">
    <div class="org-level"><div class="org-box org-head">Kabid Pelayanan Keperawatan</div></div>
    <div class="org-arrow">▼</div>
    <div class="org-level org-children">${gedungOrder.map(g=>`<div class="org-box org-kasatpel">${esc(kasatpelMap[g])}</div>`).join("")}</div>
    <div class="org-arrow">▼</div>
    <div class="org-level org-children">${opRooms.map(r=>`<div class="org-box"><strong>${r}</strong><small>Kepala Ruangan: ${esc(kepalaRuangan[r]||"-")}</small></div>`).join("")}</div>
    <div class="org-arrow">▼</div>
    <div class="org-level org-children">${opRooms.map(r=>{let n=state.employees.filter(e=>e.room===r).length;return `<div class="org-box org-member">${r}<small>${n} anggota</small></div>`}).join("")}</div>
  </div>`;
  let sections=opRooms.map(room=>{
    let rows=state.employees.filter(e=>e.room===room);
    let byProf={};
    rows.forEach(e=>{(byProf[e.profession||"Lainnya"]=byProf[e.profession||"Lainnya"]||[]).push(e)});
    let tables=Object.entries(byProf).map(([prof,list])=>`
      <div style="margin-top:14px">
        <h3 class="prof-title">${esc(prof)} (${list.length})</h3>
        ${employeeTable(list)}
      </div>`).join("");
    return `<div class="panel">
      <div class="panel-head">
        <div><h2>${room} <small class="muted">— ${esc(gedungMap[room])}</small></h2><p>${rows.length} pegawai</p></div>
        <div class="toolbar">
          <button class="primary" onclick="openEmployeeModal(null,'${room}')">＋ Tambah Pegawai</button>
          <button class="danger-btn" onclick="deleteSelectedEmployees()">Hapus Terpilih</button>
        </div>
      </div>
      ${tables||'<div class="empty">Belum ada pegawai di kamar ini.</div>'}
    </div>`;
  }).join("");
  return `<div class="page">
  <div class="panel">
    <div class="panel-head">
      <div><h2>Struktur Organisasi</h2><p>Kabid → Kasatpel Gedung → Kepala Ruangan → Anggota</p></div>
      <button class="primary" onclick="openEmployeeModal()">＋ Tambah Pegawai</button>
    </div>
    ${orgHtml}
  </div>
  ${sections}
  </div>`;
}

function employeeTable(rows){
  return `<div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="emp" title="Pilih Semua"></th>
    <th>No</th><th>Nama</th><th>Profesi</th><th>Status</th><th>Kompetensi</th><th>Aksi</th>
  </tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr data-select-id="emp:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="emp" data-id="${r.id}"></td>
    <td>${i+1}</td><td>${esc(r.name)}</td><td>${esc(r.profession)}</td>
    <td><span class="badge ${r.status==='Nonaktif'?'danger':''}">${esc(r.status)}</span></td>
    <td>${esc(r.kompetensi)}</td>
    <td class="action-cell"><button class="ghost" onclick="openEmployeeModal('${r.id}')">Edit</button><button class="danger-btn" onclick="deleteEmployee('${r.id}')">Hapus</button></td>
  </tr>`).join(""):'<tr><td colspan="7" class="empty">Belum ada data.</td></tr>'}</tbody></table></div>`;
}

/* ============ INVENTORY ============ */
function renderInventory(){
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>Inventaris OK</h2><p>Inventaris fisik, kondisi, dan kelayakan alat.</p></div>
    <div class="toolbar">
      <button class="primary" onclick="openInventoryModal()">＋ Tambah Inventaris</button>
      <button class="danger-btn" onclick="deleteSelectedInventory()">Hapus Terpilih</button>
    </div>
  </div>
  ${inventoryTable()}
  </div></div>`;
}
function inventoryTable(filter=""){
  let rows=state.inventory.filter(r=>(r.name||"").toLowerCase().includes(filter.toLowerCase()));
  return `<div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="inv" title="Pilih Semua"></th>
    <th>No</th><th>Nama Barang</th><th>OK</th><th>Nomor Inventaris</th><th>Kondisi</th><th>Kelayakan</th><th>Terakhir Cek</th><th>Aksi</th>
  </tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr data-select-id="inv:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="inv" data-id="${r.id}"></td>
    <td>${i+1}</td><td>${esc(r.name)}</td><td>${esc(r.ok)}</td><td>${esc(r.code)}</td>
    <td><span class="badge ${r.condition==='Rusak'?'danger':r.condition==='Perlu Perbaikan'?'warn':''}">${esc(r.condition)}</span></td>
    <td>${r.eligible==='Layak'?'<span class="badge">Layak</span>':'<span class="badge danger">Tidak Layak</span>'}</td>
    <td>${esc(r.checked)}</td>
    <td class="action-cell"><button class="ghost" onclick="openInventoryModal('${r.id}')">Edit</button><button class="danger-btn" onclick="deleteInventory('${r.id}')">Hapus</button></td>
  </tr>`).join(""):'<tr><td colspan="9" class="empty">Belum ada inventaris.</td></tr>'}</tbody></table></div>`;
}

/* ============ STOCK ============ */
function stockItems(){return state.medical.map(x=>({id:x.id,type:x.type||"BHP",name:x.name||"",code:x.code||"",unit:x.unit||"Unit",min:+x.min||0,qty:stockQty(x.id)})).filter(x=>x.name)}
function stockQty(id){return state.stockIn.filter(x=>x.medicalId===id).reduce((a,b)=>a+(+b.qty||0),0)-state.stockOut.filter(x=>x.medicalId===id).reduce((a,b)=>a+(+b.qty||0),0)}
function countLow(){return stockItems().filter(x=>x.qty<x.min).length}

function stockTable(){
  let rows=stockItems();
  return `<div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="med" title="Pilih Semua"></th>
    <th>No</th><th>Alkes</th><th>Nama</th><th>Nomor Barang</th><th>Stok</th><th>Satuan</th><th>Min.</th><th>Status</th><th>Aksi</th>
  </tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr data-select-id="med:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="med" data-id="${r.id}"></td>
    <td>${i+1}</td><td>${esc(r.type)}</td><td>${esc(r.name)}</td><td>${esc(r.code)}</td>
    <td class="${r.qty<r.min?'low-stock':''}">${r.qty}</td><td>${esc(r.unit)}</td><td>${r.min}</td>
    <td>${r.qty<r.min?'<span class="badge danger">Stok Rendah</span>':'<span class="badge">Aman</span>'}</td>
    <td class="action-cell"><button class="ghost" onclick="openMedicalModal('${r.id}')">Edit</button><button class="danger-btn" onclick="deleteMedical('${r.id}')">Hapus</button></td>
  </tr>`).join(""):'<tr><td colspan="10" class="empty">Tambahkan data alkes terlebih dahulu.</td></tr>'}</tbody></table></div>`;
}
function renderStock(){
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>Stok Alkes</h2><p>Stok dihitung otomatis dari transaksi masuk dan keluar.</p></div>
    <div class="toolbar">
      <button class="primary" onclick="openMedicalModal()">＋ Tambah Alkes</button>
      <button class="primary" data-page-jump="stockin">＋ Barang Masuk</button>
      <button class="ghost" data-page-jump="stockout">− Barang Keluar</button>
      <button class="danger-btn" onclick="deleteSelectedMedical()">Hapus Terpilih</button>
    </div>
  </div>
  ${stockTable()}
  </div></div>`;
}
function transactionPage(kind){
  let isIn=kind==='stockIn',title=isIn?'Barang Masuk':'Barang Keluar',rows=state[kind]||[];
  let target=kind;
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>${title}</h2><p>Catat transaksi alkes.</p></div>
    <div class="toolbar">
      <button class="primary" onclick="openStockModal('${kind}')">＋ Tambah Transaksi</button>
      <button class="danger-btn" onclick="deleteSelectedTransactions('${kind}')">Hapus Terpilih</button>
    </div>
  </div>
  <div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="${target}" title="Pilih Semua"></th>
    <th>Tanggal</th><th>Alkes</th><th>Nama</th><th>Jumlah</th><th>Satuan</th><th>Keterangan</th>
  </tr></thead><tbody>
  ${rows.length?rows.slice().reverse().map(r=>{let m=state.medical.find(x=>x.id===r.medicalId);return `<tr data-select-id="${target}:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="${target}" data-id="${r.id}"></td>
    <td>${esc(r.date)}</td><td>${esc(m?.type||'-')}</td><td>${esc(m?.name||r.medicalName||'-')}</td><td>${esc(r.qty)}</td><td>${esc(m?.unit||'-')}</td><td>${esc(r.note||'')}</td>
  </tr>`}).join(""):'<tr><td colspan="7" class="empty">Belum ada transaksi.</td></tr>'}
  </tbody></table></div>
  </div></div>`;
}
function renderShortage(){
  let rows=stockItems().filter(x=>x.qty<x.min);
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>Kekurangan Alkes</h2><p>Barang di bawah stok minimum.</p></div><button class="primary" data-page-jump="requests">Buat Permintaan</button></div>
  ${stockTableRows(rows)}
  </div></div>`;
}
function stockTableRows(rows){
  return `<div class="table-wrap"><table><thead><tr><th>Alkes</th><th>Nama</th><th>Nomor Barang</th><th>Stok</th><th>Minimum</th><th>Kekurangan</th><th>Satuan</th></tr></thead><tbody>
  ${rows.length?rows.map(r=>`<tr><td>${esc(r.type)}</td><td>${esc(r.name)}</td><td>${esc(r.code)}</td><td class="low-stock">${r.qty}</td><td>${r.min}</td><td class="low-stock">${r.min-r.qty}</td><td>${esc(r.unit)}</td></tr>`).join(""):'<tr><td colspan="7" class="empty">Tidak ada alkes yang kurang.</td></tr>'}
  </tbody></table></div>`;
}
function renderRequests(){
  let rows=state.requests;
  return `<div class="page"><div class="panel">
  <div class="panel-head"><div><h2>Permintaan Alkes</h2><p>Pengajuan kebutuhan alkes.</p></div>
    <div class="toolbar">
      <button class="primary" onclick="openRequestModal()">＋ Buat Permintaan</button>
      <button class="danger-btn" onclick="deleteSelectedRequests()">Hapus Terpilih</button>
    </div>
  </div>
  <div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="req" title="Pilih Semua"></th>
    <th>Tanggal</th><th>Alkes</th><th>Jumlah</th><th>Pemohon</th><th>Status</th><th>Catatan</th>
  </tr></thead><tbody>
  ${rows.length?rows.slice().reverse().map(r=>`<tr data-select-id="req:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="req" data-id="${r.id}"></td>
    <td>${esc(r.date)}</td><td>${esc(r.name)}</td><td>${esc(r.qty)}</td><td>${esc(r.requester)}</td>
    <td><span class="badge ${r.status==='Ditolak'?'danger':r.status==='Menunggu'?'warn':''}">${esc(r.status)}</span></td>
    <td>${esc(r.note||'')}</td>
  </tr>`).join(""):'<tr><td colspan="7" class="empty">Belum ada permintaan.</td></tr>'}
  </tbody></table></div>
  </div></div>`;
}

/* ============ REPORTS ============ */
function reportPanel(title,map){return `<div class="panel"><h2>${title}</h2><div class="report-list">${Object.keys(map).length?Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="report-line"><span>${esc(k)}</span><strong>${v}</strong></div>`).join(""):'<div class="empty">Belum ada data.</div>'}</div></div>`}

function renderReports(kind){
  let ops=state.operations;
  if(kind==='daily'){
    let filtered=ops.filter(x=>normDate(x.tanggal)===today());
    return dailyPrintPage(filtered);
  }
  if(kind==='monthly'){
    let d=new Date();let prefix=`${pad(d.getMonth()+1)}-${d.getFullYear()}`;
    let filtered=ops.filter(x=>{let dt=dateObj(normDate(x.tanggal));return dt&&`${pad(dt.getMonth()+1)}-${dt.getFullYear()}`===prefix});
    return detailReportPage("Operasi Bulanan - "+prefix,filtered);
  }
  if(kind==='bedah')return renderBedahReport();
  if(kind==='anestesi')return renderAnestesiReport();
  if(kind==='inventory-report')return `<div class="page">${reportPanel("Inventaris per Kondisi",reportCountsByInventory("condition"))}</div>`;
  return `<div class="page">${reportPanel("Laporan Alkes - Status Stok",Object.fromEntries(stockItems().map(x=>[x.name,x.qty])))}</div>`;
}

/* ============ LAPORAN HARIAN + CETAK ============ */
function dailyPrintTableHtml(list){
  return `<div class="print-table-wrap">
  <table class="print-table">
    <colgroup>
      <col style="width:3.5%">
      <col style="width:8%">
      <col style="width:12%">
      <col style="width:6%">
      <col style="width:5%">
      <col style="width:8.5%">
      <col style="width:15%">
      <col style="width:15%">
      <col style="width:8%">
      <col style="width:9.5%">
      <col style="width:9.5%">
    </colgroup>
    <thead>
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Nama</th>
        <th>Kelamin</th>
        <th>Umur</th>
        <th>Nomer RM</th>
        <th>Diagnosa Medis</th>
        <th>Tindakan</th>
        <th class="th-wrap">Jenis<br>Operasi</th>
        <th>Dokter Bedah</th>
        <th class="th-wrap">Ruangan<br>Selanjutnya</th>
      </tr>
    </thead>
    <tbody>
    ${list.map((r,i)=>`<tr>
      <td class="center">${i+1}</td>
      <td class="center">${esc(r.tanggal)}</td>
      <td>${esc(r.nama)}</td>
      <td class="center">${esc(r.kelamin||"")}</td>
      <td class="center">${esc(r.umur||"")}</td>
      <td class="center">${esc(r.rm||"")}</td>
      <td>${esc(r.diagnosaMedis||"")}</td>
      <td>${esc(r.tindakan||"")}</td>
      <td class="center">${esc(r.jenisOperasi||"")}</td>
      <td>${esc(r.dokterBedah||"")}</td>
      <td>${esc(r.ruangRawatSelanjutnya||r.ruanganSelanjutnya||"")}</td>
    </tr>`).join("")}
    </tbody>
  </table>
  </div>`;
}

function dailyPrintPage(rows){
  // Kelompokkan per OK Asal
  let groups={};
  opRooms.forEach(r=>groups[r]=[]);
  rows.forEach(o=>{
    let k=opRooms.includes(o.okAsal)?o.okAsal:"Lainnya";
    (groups[k]=groups[k]||[]).push(o);
  });
  let sections=Object.entries(groups).map(([room,list])=>{
    if(!list.length)return `<div class="panel no-print"><div class="panel-head"><div><h2>${esc(room)}</h2><p>0 operasi</p></div></div><div class="empty">Belum ada operasi pada ${esc(room)} hari ini.</div></div>`;
    return `<div class="panel">
      <div class="panel-head no-print">
        <div><h2>${esc(room)}</h2><p>${list.length} operasi • ${todayLong()}</p></div>
        <div class="toolbar">
          <button class="ghost" onclick="printDailyRoom('${esc(room)}')">🖨 Cetak ${esc(room)}</button>
        </div>
      </div>
      <div class="print-header">
        <h2>LAPORAN OPERASI HARIAN KAMAR OPERASI [${esc(room)}]</h2>
        <h3>RSUD KOJA JAKARTA</h3>
      </div>
      <div class="print-meta">
        <span>Tanggal: ${todayLong()}</span>
        <span>Kamar: ${esc(room)}</span>
        <span>Jumlah Operasi: ${list.length}</span>
      </div>
      ${dailyPrintTableHtml(list)}
      <div class="print-foot">
        <div class="sign">
          <p>Mengetahui,</p>
          <p>Kepala Ruangan ${esc(room)}</p>
          <div class="space"></div>
          <p class="name">${esc(kepalaRuangan[room]||"(..............................)")}</p>
        </div>
        <div class="sign">
          <p>Jakarta, ${todayLong()}</p>
          <p>Petugas OK</p>
          <div class="space"></div>
          <p class="name">(..............................)</p>
        </div>
      </div>
      <div class="print-summary">Total operasi ${esc(room)}: ${list.length} • Dicetak ${todayLong()}</div>
    </div>`;
  }).join("");
  return `<div class="page">
    <div class="panel no-print">
      <div class="panel-head">
        <div><h2>Laporan Operasi Harian</h2><p>Layout cetak resmi RSUD Koja Jakarta — per OK Asal</p></div>
        <div class="toolbar">
          <button class="primary" onclick="window.print()">🖨 Cetak Semua OK</button>
        </div>
      </div>
    </div>
    ${sections}
  </div>`;
}

window.printDailyRoom=function(room){
  let ops=state.operations;
  let list=ops.filter(x=>normDate(x.tanggal)===today() && (opRooms.includes(x.okAsal)?x.okAsal:"Lainnya")===room);
  if(!list.length)return toast("Belum ada data operasi untuk "+room+" hari ini");
  let baseHref=location.href.substring(0, location.href.lastIndexOf('/')+1);
  let w=window.open("","_blank");
  if(!w)return toast("Popup diblokir browser");
  w.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<base href="${baseHref}">
<title>Laporan Harian ${esc(room)} - RSUD Koja</title>
<link rel="stylesheet" href="style.css">
<style>
  @page { size: landscape; margin: 8mm 6mm; }
  body { margin: 0; padding: 12px; background: #fff; font-family: Arial, Helvetica, sans-serif; color: #000; }
  .no-print { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 12px; }
  .no-print button { padding: 6px 14px; border-radius: 4px; cursor: pointer; border: 1px solid #ccc; background: #fff; font-size: 12px; font-weight: 600; }
  .no-print button.primary { background: #5b21b6; color: #fff; border-color: #5b21b6; }
  .print-table { font-size: 8pt!important; width: 100%!important; table-layout: fixed!important; border-collapse: collapse!important; }
  .print-table th, .print-table td { font-size: 8pt!important; padding: 3px 2px!important; line-height: 1.2!important; border: 1px solid #000!important; word-wrap: break-word!important; overflow-wrap: break-word!important; word-break: break-word!important; hyphens: auto; }
  .print-table th { background: #f0f0f0!important; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-weight: bold; }
  @media print {
    .no-print { display: none!important; }
    body { padding: 0!important; }
  }
</style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.close()">Tutup</button>
    <button class="primary" onclick="window.print()">🖨 Cetak Laporan</button>
  </div>
  <div class="print-header">
    <h2>LAPORAN OPERASI HARIAN KAMAR OPERASI [${esc(room)}]</h2>
    <h3>RSUD KOJA JAKARTA</h3>
  </div>
  <div class="print-meta">
    <span>Tanggal: ${todayLong()}</span>
    <span>Kamar: ${esc(room)}</span>
    <span>Jumlah Operasi: ${list.length}</span>
  </div>
  ${dailyPrintTableHtml(list)}
  <div class="print-foot">
    <div class="sign">
      <p>Mengetahui,</p>
      <p>Kepala Ruangan ${esc(room)}</p>
      <div class="space"></div>
      <p class="name">${esc(kepalaRuangan[room]||"(..............................)")}</p>
    </div>
    <div class="sign">
      <p>Jakarta, ${todayLong()}</p>
      <p>Petugas OK</p>
      <div class="space"></div>
      <p class="name">(..............................)</p>
    </div>
  </div>
  <div class="print-summary">Total operasi ${esc(room)}: ${list.length} • Dicetak ${todayLong()}</div>
</body>
</html>`);
  w.document.close();
  setTimeout(()=>{w.focus();w.print()},400);
};

function detailReportPage(title,ops){
  let groups={};opRooms.forEach(r=>groups[r]=[]);
  ops.forEach(o=>{let k=opRooms.includes(o.okAsal)?o.okAsal:"Lainnya";(groups[k]=groups[k]||[]).push(o)});
  let sections=Object.entries(groups).map(([room,rows])=>`<div class="panel"><div class="panel-head"><div><h2>${room}</h2><p>${rows.length} operasi</p></div></div>${detailReportTable(rows)}</div>`).join("");
  return `<div class="page"><div class="panel"><div class="panel-head"><div><h2>${title}</h2><p>Data operasi per OK Asal</p></div><button class="danger-btn" onclick="deleteSelectedOperations()">Hapus Terpilih</button></div></div>${sections}</div>`;
}
function detailReportTable(rows){
  return `<div class="table-wrap"><table><thead><tr>
    <th class="check-col"><input type="checkbox" class="check-all" data-target="rep-ops" title="Pilih Semua"></th>
    <th>No</th><th>Tanggal</th><th>Nama</th><th>No RM</th><th>Diagnosa</th><th>Tindakan</th><th class="th-wrap">Jenis Operasi</th><th>DPJP</th>
  </tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr data-select-id="rep-ops:${r.id}">
    <td class="check-col"><input type="checkbox" class="row-check" data-target="rep-ops" data-id="${r.id}"></td>
    <td>${i+1}</td><td>${esc(r.tanggal)}</td><td>${esc(r.nama)}</td><td>${esc(r.rm)}</td><td>${esc(r.diagnosaMedis)}</td><td>${esc(r.tindakan)}</td><td>${esc(r.jenisOperasi||"-")}</td><td>${esc(r.dokterBedah)}</td>
  </tr>`).join(""):'<tr><td colspan="9" class="empty">Belum ada data.</td></tr>'}</tbody></table></div>`;
}
function reportCountsByInventory(k){let m={};state.inventory.forEach(x=>m[x[k]||"Belum diisi"]=(m[x[k]||"Belum diisi"]||0)+1);return m}

/* ============ BEDAH ============ */
function getSpesialis(dokter){return spesialisMap[dokter]||"Lainnya"}
function buildSpesialisTable(ops,title){
  let bySpes={};
  ops.forEach(o=>{
    let sp=getSpesialis(o.dokterBedah);
    if(!bySpes[sp])bySpes[sp]={total:0,doctors:{}};
    bySpes[sp].total++;
    let d=o.dokterBedah||"(Tidak diisi)";
    bySpes[sp].doctors[d]=(bySpes[sp].doctors[d]||0)+1;
  });
  let rowsHtml="";
  let totalAll=0;
  spesialisGroups.forEach(sp=>{
    if(!bySpes[sp])return;
    let g=bySpes[sp];totalAll+=g.total;
    rowsHtml+=`<tr class="sp-row"><td><strong>${esc(sp)}</strong></td><td><strong>${g.total}</strong></td></tr>`;
    Object.entries(g.doctors).sort((a,b)=>b[1]-a[1]).forEach(([doc,n])=>{
      rowsHtml+=`<tr><td class="sp-doctor">${esc(doc)}</td><td>${n}</td></tr>`;
    });
  });
  if(!rowsHtml)rowsHtml='<tr><td colspan="2" class="empty">Belum ada data.</td></tr>';
  return `<div class="panel"><div class="panel-head"><div><h2>${title}</h2></div></div>
  <div class="table-wrap"><table><thead><tr><th>Kelompok Spesialis / Dokter</th><th>Jumlah Operasi</th></tr></thead>
  <tbody>${rowsHtml}<tr class="total-row"><td><strong>TOTAL KESELURUHAN</strong></td><td><strong>${totalAll}</strong></td></tr></tbody></table></div></div>`;
}
function renderBedahReport(){
  let ops=state.operations;
  let cito=ops.filter(o=>(o.jenisOperasi||"").toLowerCase()==="emergensi"||/cito/i.test(o.tindakan||"")||/cito/i.test(o.diagnosaMedis||""));
  return `<div class="page">
  <div class="hero"><h2>Laporan Bedah</h2><p>Rekap jumlah operasi per kelompok spesialis dan dokter bedah.</p></div>
  ${buildSpesialisTable(ops,"Jumlah Operasi per Spesialis (Bedah)")}
  ${buildSpesialisTable(cito,"Operasi Cito (Emergensi) per Spesialis")}
  </div>`;
}

/* ============ ANESTESI ============ */
function renderAnestesiReport(){
  let ops=state.operations;
  // Tabel 1: Per jenis anestesi
  let byJenis={};
  ops.forEach(o=>{
    let j=o.jenis||"(Tidak diisi)";
    byJenis[j]=(byJenis[j]||0)+1;
  });
  let rowsJenis=Object.entries(byJenis).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join("");
  // Tabel 2: Per dokter anestesi
  let byDokter={};
  ops.forEach(o=>{
    let d=o.dokterAnestesi||"(Tidak diisi)";
    byDokter[d]=(byDokter[d]||0)+1;
  });
  let rowsDokter=Object.entries(byDokter).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join("");
  // Tabel 3: Per kelompok anestesi
  let groups={
    "General":{types:["GA","OTT","LMA","ETT"],total:0,detail:{}},
    "Regional Anestesi (RA)":{types:["Spinal"],total:0,detail:{}},
    "Lokal":{types:["Lokal"],total:0,detail:{}},
    "Block":{types:["Block","Epidural"],total:0,detail:{}},
    "Sedasi":{types:["TIVA","IV"],total:0,detail:{}}
  };
  ops.forEach(o=>{
    let j=o.jenis||"";
    for(let gk in groups){
      if(groups[gk].types.includes(j)){
        groups[gk].total++;
        groups[gk].detail[j]=(groups[gk].detail[j]||0)+1;
        break;
      }
    }
  });
  let rowsGroup="";
  Object.entries(groups).forEach(([gk,g])=>{
    if(g.total===0)return;
    rowsGroup+=`<tr class="sp-row"><td><strong>${esc(gk)}</strong></td><td><strong>${g.total}</strong></td></tr>`;
    g.types.forEach(t=>{
      if(g.detail[t])rowsGroup+=`<tr><td class="sp-doctor">${esc(t)}</td><td>${g.detail[t]}</td></tr>`;
    });
  });
  if(!rowsGroup)rowsGroup='<tr><td colspan="2" class="empty">Belum ada data.</td></tr>';

  return `<div class="page">
  <div class="hero"><h2>Laporan Anestesi</h2><p>Rekap tindakan anestesi per jenis, per dokter, dan per kelompok.</p></div>

  <div class="panel"><div class="panel-head"><div><h2>Jumlah Operasi per Jenis Anestesi</h2></div></div>
    <div class="table-wrap"><table><thead><tr><th>Jenis Anestesi</th><th>Jumlah Operasi</th></tr></thead>
    <tbody>${rowsJenis||'<tr><td colspan="2" class="empty">Belum ada data.</td></tr>'}
    <tr class="total-row"><td><strong>TOTAL</strong></td><td><strong>${ops.length}</strong></td></tr></tbody></table></div>
  </div>

  <div class="panel"><div class="panel-head"><div><h2>Jumlah Operasi per Dokter Anestesi</h2></div></div>
    <div class="table-wrap"><table><thead><tr><th>Dokter Anestesi</th><th>Jumlah Operasi</th></tr></thead>
    <tbody>${rowsDokter||'<tr><td colspan="2" class="empty">Belum ada data.</td></tr>'}
    <tr class="total-row"><td><strong>TOTAL</strong></td><td><strong>${ops.length}</strong></td></tr></tbody></table></div>
  </div>

  <div class="panel"><div class="panel-head"><div><h2>Jumlah Operasi per Kelompok Anestesi</h2></div></div>
    <div class="table-wrap"><table><thead><tr><th>Kelompok / Jenis Anestesi</th><th>Jumlah Operasi</th></tr></thead>
    <tbody>${rowsGroup}<tr class="total-row"><td><strong>TOTAL KESELURUHAN</strong></td><td><strong>${ops.length}</strong></td></tr></tbody></table></div>
  </div>
  </div>`;
}

/* ============ SETTINGS ============ */
function renderSettings(){
  return `<div class="page"><div class="grid grid-2">
  <div class="panel"><h2>Backup Database</h2><p class="muted">Unduh seluruh data aplikasi dalam satu file JSON.</p><button class="primary" id="backupBtn">⇩ Backup JSON</button></div>
  <div class="panel"><h2>Restore Database</h2><p class="muted">Pulihkan data dari file backup JSON yang dibuat aplikasi.</p><input type="file" id="restoreFile" accept="application/json,.json"><button class="primary" id="restoreBtn">↥ Restore</button></div>
  </div><div class="panel"><h2>Informasi Data</h2><div class="kpi-grid">
    <div class="kpi"><span>Operasi</span><strong>${state.operations.length}</strong></div>
    <div class="kpi"><span>Pegawai</span><strong>${state.employees.length}</strong></div>
    <div class="kpi"><span>Inventaris</span><strong>${state.inventory.length}</strong></div>
    <div class="kpi"><span>Master Alkes</span><strong>${state.medical.length}</strong></div>
  </div></div></div>`;
}
function renderReset(){return `<div class="page"><div class="panel"><h2>Reset Data</h2><p class="muted">Tindakan ini menghapus seluruh data aplikasi dari browser. Backup terlebih dahulu.</p><button class="danger-btn" id="resetAll">⚠ Reset seluruh data</button></div></div>`}

/* ============ RENDER ============ */
function renderPage(p){
  let html;
  if(p==='dashboard')html=renderDashboard();
  else if(p==='input')html=renderInput();
  else if(p==='operations')html=renderOperations();
  else if(p==='import')html=renderImport();
  else if(p==='notadinas')html=renderNotaDinas();
  else if(p==='employees')html=renderEmployees();
  else if(p==='inventory')html=renderInventory();
  else if(p==='stock')html=renderStock();
  else if(p==='stockin')html=transactionPage('stockIn');
  else if(p==='stockout')html=transactionPage('stockOut');
  else if(p==='shortage')html=renderShortage();
  else if(p==='requests')html=renderRequests();
  else if(["daily","monthly","bedah","anestesi","inventory-report","alkes-report"].includes(p))html=renderReports(p);
  else if(p==='settings')html=isAdmin()?renderSettings():`<div class="page"><div class="panel"><h2>Akses Ditolak</h2><p class="muted">Halaman ini hanya untuk administrator.</p></div></div>`;
  else if(p==='reset')html=isAdmin()?renderReset():`<div class="page"><div class="panel"><h2>Akses Ditolak</h2><p class="muted">Halaman ini hanya untuk administrator.</p></div></div>`;
  else html=renderReset();
  $("#pages").innerHTML=html;
  bindPage(p);
}

function bindPage(p){
  $$('[data-page-jump]').forEach(b=>b.onclick=()=>navigate(b.dataset.pageJump));
  if(p==='input'){$("#operationForm").onsubmit=saveOperation;bindFormatInputs();bindDatePickers()}
  if(p==='operations'){
    $("#opSearch")?.addEventListener('input',e=>{
      let filtered=state.operations.slice().reverse().filter(r=>Object.values(r).join(' ').toLowerCase().includes(e.target.value.toLowerCase()));
      $("#opTable").innerHTML=operationTable(filtered,true,true);bindChecks();bindLongPress();
    });
    $("#exportOps")?.addEventListener('click',()=>exportRows(state.operations,"data_operasi.xlsx"));
  }
  if(p==='import')bindImport();
  if(p==='settings'){$("#backupBtn")&&($("#backupBtn").onclick=backup);$("#restoreBtn")&&($("#restoreBtn").onclick=restore)}
  if(p==='reset')$("#resetAll")&&($("#resetAll").onclick=resetAll);
  bindChecks();
  bindLongPress();
  bindLogout();
}

function bindLogout(){
  let btn=$("#logoutBtn");
  if(btn)btn.onclick=()=>{if(confirm("Logout dari aplikasi?")){sessionStorage.removeItem(AUTH_KEY);sessionStorage.removeItem(ROLE_KEY);location.reload()}};
}
function bindChecks(){
  $$('.check-all').forEach(cb=>{
    cb.onchange=()=>{let table=cb.closest('table');if(!table)return;table.querySelectorAll('.row-check').forEach(rc=>rc.checked=cb.checked)}
  });
}
function bindLongPress(){
  $$('tr[data-select-id]').forEach(tr=>{
    let timer=null;
    let start=()=>{timer=setTimeout(()=>{let cb=tr.querySelector('.row-check');if(cb){cb.checked=!cb.checked}},500)};
    let cancel=()=>{clearTimeout(timer)};
    tr.onmousedown=start;tr.onmouseup=cancel;tr.onmouseleave=cancel;
    tr.ontouchstart=start;tr.ontouchend=cancel;tr.ontouchcancel=cancel;
  });
}
function bindDatePickers(){
  $$('.date-input-native').forEach(inp=>{
    let hidden=document.querySelector(`.date-picker-hidden[data-target="${inp.id}"]`);
    if(!hidden)return;
    hidden.onchange=()=>{if(hidden.value)inp.value=fromISO(hidden.value)};
    inp.oninput=()=>{
      let v=inp.value.replace(/\D/g,'').slice(0,8);
      inp.value=v.length>4?v.slice(0,2)+'-'+v.slice(2,4)+'-'+v.slice(4):v.length>2?v.slice(0,2)+'-'+v.slice(2):v;
      let iso=toISO(inp.value);if(iso)hidden.value=iso;
    };
    inp.onblur=()=>{let n=normDate(inp.value);if(n&&dateObj(n))inp.value=n};
  });
}
function bindFormatInputs(){
  $$('.time-input').forEach(el=>el.addEventListener('input',e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+':'+v.slice(2):v}));
}

/* ============ CRUD OPERASI ============ */
function saveOperation(e){
  e.preventDefault();
  let o={id:uid()};
  fields.forEach(f=>o[f]=$("#"+f)?.value.trim()||"");
  o.tanggal=normDate(o.tanggal);o.jamPreop=normTime(o.jamPreop);o.jamMulai=normTime(o.jamMulai);o.jamRR=normTime(o.jamRR);
  state.operations.push(o);persist();toast('Data operasi berhasil disimpan');navigate('operations');
}

window.editOperation=id=>{
  let x=state.operations.find(r=>r.id===id);if(!x)return;
  renderPage('input');fields.forEach(f=>{let el=$("#"+f);if(el)el.value=x[f]||""});
  bindDatePickers();
  $("#operationForm").onsubmit=e=>{
    e.preventDefault();let o={...x};
    fields.forEach(f=>o[f]=$("#"+f)?.value.trim()||"");
    o.tanggal=normDate(o.tanggal);o.jamPreop=normTime(o.jamPreop);o.jamMulai=normTime(o.jamMulai);o.jamRR=normTime(o.jamRR);
    state.operations=state.operations.map(r=>r.id===id?o:r);persist();toast('Data operasi diperbarui');navigate('operations');
  };
};
window.deleteOperation=id=>{if(confirm('Hapus data operasi ini?')){state.operations=state.operations.filter(x=>x.id!==id);persist();navigate(currentPage);toast('Data dihapus')}};

function getSelected(target){return $$(`.row-check[data-target="${target}"]:checked`).map(c=>c.dataset.id)}
window.deleteSelectedOperations=()=>{
  let ids=[...getSelected('ops'),...getSelected('rep-ops')];
  if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} data operasi?`))return;
  state.operations=state.operations.filter(o=>!ids.includes(o.id));persist();
  toast(`${ids.length} data operasi dihapus`);navigate(currentPage);
};
window.deleteSelectedEmployees=()=>{
  let ids=getSelected('emp');if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} pegawai?`))return;
  state.employees=state.employees.filter(e=>!ids.includes(e.id));persist();
  toast(`${ids.length} pegawai dihapus`);navigate(currentPage);
};
window.deleteSelectedInventory=()=>{
  let ids=getSelected('inv');if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} inventaris?`))return;
  state.inventory=state.inventory.filter(i=>!ids.includes(i.id));persist();
  toast(`${ids.length} inventaris dihapus`);navigate(currentPage);
};
window.deleteSelectedMedical=()=>{
  let ids=getSelected('med');if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} alkes?`))return;
  state.medical=state.medical.filter(m=>!ids.includes(m.id));persist();
  toast(`${ids.length} alkes dihapus`);navigate(currentPage);
};
window.deleteSelectedTransactions=(kind)=>{
  let ids=getSelected(kind);if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} transaksi?`))return;
  state[kind]=state[kind].filter(x=>!ids.includes(x.id));persist();
  toast(`${ids.length} transaksi dihapus`);navigate(kind==='stockIn'?'stockin':'stockout');
};
window.deleteSelectedRequests=()=>{
  let ids=getSelected('req');if(!ids.length)return toast('Pilih data terlebih dahulu');
  if(!confirm(`Hapus ${ids.length} permintaan?`))return;
  state.requests=state.requests.filter(x=>!ids.includes(x.id));persist();
  toast(`${ids.length} permintaan dihapus`);navigate('requests');
};

window.openEmployeeModal=(id,defaultRoom)=>{
  let x=state.employees.find(r=>r.id===id)||{room:defaultRoom||opRooms[0]};
  $("#modalTitle").textContent=id?'Edit Pegawai':'Tambah Pegawai';
  $("#modalBody").innerHTML=`<form id="empForm"><div class="form-grid">
    ${formField('Nama','empName','text',x.name||'',true)}
    ${formField('Profesi','empProfession','text',x.profession||'',true)}
    ${formField('Status','empStatus','select',opts(['Aktif','Nonaktif'],x.status||'Aktif'),true)}
    ${formField('Kompetensi','empKompetensi','text',x.kompetensi||'',false)}
    ${formField('Kamar OK','empRoom','select',opts(opRooms,x.room),true)}
  </div><div class="form-actions"><button type="button" class="ghost" id="cancelModal">Batal</button><button class="primary">Simpan</button></div></form>`;
  $("#modal").showModal();
  $("#empForm").onsubmit=e=>{
    e.preventDefault();
    let o={id:id||uid(),name:$("#empName").value.trim(),profession:$("#empProfession").value.trim(),status:$("#empStatus").value,kompetensi:$("#empKompetensi").value.trim(),room:$("#empRoom").value};
    if(id)state.employees=state.employees.map(r=>r.id===id?o:r);else state.employees.push(o);
    persist();$("#modal").close();navigate('employees');toast('Pegawai disimpan');
  };
};
window.deleteEmployee=id=>{if(confirm('Hapus pegawai ini?')){state.employees=state.employees.filter(x=>x.id!==id);persist();navigate('employees');toast('Pegawai dihapus')}};

window.openInventoryModal=(id)=>{
  let x=state.inventory.find(r=>r.id===id)||{};
  $("#modalTitle").textContent=id?'Edit Inventaris':'Tambah Inventaris';
  $("#modalBody").innerHTML=`<form id="invForm"><div class="form-grid">
    ${formField('Nama Barang','ivName','text',x.name||'',true)}
    ${formField('OK','ivOk','select',opts(opRooms,x.ok||opRooms[0]),true)}
    ${formField('Nomor Inventaris','ivCode','text',x.code||'',true)}
    ${formField('Kondisi','ivCondition','select',opts(['Baik','Perlu Perbaikan','Rusak'],x.condition||'Baik'),true)}
    ${formField('Kelayakan','ivEligible','select',opts(['Layak','Tidak Layak'],x.eligible||'Layak'),true)}
    ${formField('Terakhir Cek','ivChecked','date',x.checked||today(),true)}
  </div><div class="form-actions"><button type="button" class="ghost" id="cancelModal">Batal</button><button class="primary">Simpan</button></div></form>`;
  $("#modal").showModal();bindDatePickers();
  $("#invForm").onsubmit=e=>{
    e.preventDefault();
    let o={id:id||uid(),name:$("#ivName").value.trim(),ok:$("#ivOk").value,code:$("#ivCode").value.trim(),condition:$("#ivCondition").value,eligible:$("#ivEligible").value,checked:normDate($("#ivChecked").value)};
    if(id)state.inventory=state.inventory.map(r=>r.id===id?o:r);else state.inventory.push(o);
    persist();$("#modal").close();navigate('inventory');toast('Inventaris disimpan');
  };
};
window.deleteInventory=id=>{if(confirm('Hapus inventaris?')){state.inventory=state.inventory.filter(x=>x.id!==id);persist();navigate('inventory');toast('Dihapus')}};

window.openMedicalModal=(id)=>{
  let x=state.medical.find(r=>r.id===id)||{type:'BHP'};
  $("#modalTitle").textContent=id?'Edit Alkes':'Tambah Alkes';
  $("#modalBody").innerHTML=`<form id="medForm"><div class="form-grid">
    ${formField('Alkes','medType','select',opts(['BHP','Alat Medis'],x.type||'BHP'),true)}
    ${formField('Nama','medName','text',x.name||'',true)}
    ${formField('Nomor Barang','medCode','text',x.code||'',true)}
    ${formField('Satuan','medUnit','text',x.unit||'',true)}
    ${formField('Min. Stok','medMin','number',x.min||0,true,'min="0"')}
    ${formField('Status','medStatus','select',opts(['Aktif','Nonaktif'],x.status||'Aktif'),true)}
  </div><div class="form-actions"><button type="button" class="ghost" id="cancelModal">Batal</button><button class="primary">Simpan</button></div></form>`;
  $("#modal").showModal();
  $("#medForm").onsubmit=e=>{
    e.preventDefault();
    let o={id:id||uid(),type:$("#medType").value,name:$("#medName").value.trim(),code:$("#medCode").value.trim(),unit:$("#medUnit").value.trim(),min:+$("#medMin").value||0,status:$("#medStatus").value};
    if(id)state.medical=state.medical.map(r=>r.id===id?o:r);else state.medical.push(o);
    persist();$("#modal").close();navigate('stock');toast('Alkes disimpan');
  };
};
window.deleteMedical=id=>{if(confirm('Hapus alkes ini?')){state.medical=state.medical.filter(x=>x.id!==id);persist();navigate('stock');toast('Dihapus')}};

window.openStockModal=(kind)=>{
  let title=kind==='stockIn'?'Barang Masuk':'Barang Keluar';
  $("#modalTitle").textContent=title;
  $("#modalBody").innerHTML=`<form id="stockForm"><div class="form-grid">
    ${formField('Tanggal','stDate','date',today(),true)}
    ${formField('Alkes','stMedical','select',opts(state.medical.map(x=>x.name)),true)}
    ${formField('Jumlah','stQty','number','',true,'min="1"')}
    ${formField('Keterangan','stNote','text','')}
  </div><div class="form-actions"><button type="button" class="ghost" id="cancelModal">Batal</button><button class="primary">Simpan</button></div></form>`;
  $("#modal").showModal();bindDatePickers();
  $("#stockForm").onsubmit=e=>{
    e.preventDefault();
    let name=$("#stMedical").value,m=state.medical.find(x=>x.name===name);if(!m)return;
    state[kind].push({id:uid(),date:normDate($("#stDate").value),medicalId:m.id,medicalName:name,qty:+$("#stQty").value,note:$("#stNote").value});
    persist();$("#modal").close();navigate(kind==='stockIn'?'stockin':'stockout');toast('Transaksi disimpan');
  };
};

window.openRequestModal=()=>{
  $("#modalTitle").textContent='Buat Permintaan Alkes';
  $("#modalBody").innerHTML=`<form id="reqForm"><div class="form-grid">
    ${formField('Tanggal','rqDate','date',today(),true)}
    ${formField('Alkes','rqName','select',opts(state.medical.map(x=>x.name)),true)}
    ${formField('Jumlah','rqQty','number','',true,'min="1"')}
    ${formField('Pemohon','rqRequester','text','',true)}
    ${formField('Catatan','rqNote','text','')}
  </div><div class="form-actions"><button type="button" class="ghost" id="cancelModal">Batal</button><button class="primary">Kirim Permintaan</button></div></form>`;
  $("#modal").showModal();bindDatePickers();
  $("#reqForm").onsubmit=e=>{
    e.preventDefault();
    state.requests.push({id:uid(),date:normDate($("#rqDate").value),name:$("#rqName").value,qty:+$("#rqQty").value,requester:$("#rqRequester").value,status:'Menunggu',note:$("#rqNote").value});
    persist();$("#modal").close();navigate('requests');toast('Permintaan dibuat');
  };
};

function backup(){let blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='backup-data-operasi-ok-'+today()+'.json';a.click();URL.revokeObjectURL(a.href);toast('Backup berhasil dibuat')}
function restore(){let f=$("#restoreFile")?.files?.[0];if(!f)return toast('Pilih file backup JSON terlebih dahulu');let r=new FileReader();r.onload=()=>{try{let d=JSON.parse(r.result);if(!d.operations||!Array.isArray(d.operations))throw Error('Struktur backup tidak valid');state=d;["operations","employees","medical","inventory","stockIn","stockOut","requests","notaDinas"].forEach(k=>{if(!Array.isArray(state[k]))state[k]=[]});persist();toast('Restore berhasil');navigate('dashboard')}catch(e){toast('File backup tidak valid')}};r.readAsText(f)}
function resetAll(){
  if(!confirm('PERINGATAN: seluruh data aplikasi akan dihapus. Lanjutkan?'))return;
  state=normalizeStateData({});
  persist().then(()=>location.reload()).catch(()=>toast('Reset lokal selesai, tetapi sinkronisasi cloud gagal.'));
}
function exportRows(rows,name){if(!window.XLSX)return toast('Library Excel belum tersedia');let out=rows.map(r=>{let o={};fields.forEach(f=>o[labels[f]]=r[f]||'');return o});let ws=XLSX.utils.json_to_sheet(out),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Data Operasi');XLSX.writeFile(wb,name)}

/* ============ IMPORT (FIXED & COMPLETE) ============ */
let imported=[];
const ignoredHeaders=['no','nomor','no urut','nomor urut','index','idx','#','bil','nourut'];
const aliases={
  tanggal:['tanggal operasi','tgl operasi','tanggal op','tgl op','tanggal','tgl','date','waktu op'],
  jamPreop:['jam di preop','jam masuk preop','jam preop','jam pre op','masuk preop','preop','pre op','jam transfer'],
  nama:['nama pasien','nama lengkap','pasien','nama'],
  kelamin:['jenis kelamin','kelamin','gender','sex','jk','l p','lp'],
  umur:['umur tahun','umur th','usia tahun','usia th','umur','usia','thn','tahun'],
  rm:['nomor rekam medis','no rekam medis','rekam medis','nomer rm','nomor rm','no rm','no mr','norm','no medrec','medrec','mr','rm'],
  jamMulai:['jam mulai operasi','jam mulai op','jam mulai','jam masuk op','mulai operasi','mulai op','jam op','waktu mulai','jam masuk'],
  kamar:['kamar operasi','ruang operasi','kamar op','ruang ok','ok kamar','ok center','nama ok','kamar','ok'],
  asalRuangan:['asal ruangan','asal ruang','ruangan asal','ruang asal','dari ruangan','dari ruang','asal'],
  ruangRawatSelanjutnya:['ruang rawat selanjutnya','ruangan selanjutnya','ruang selanjutnya','rawat selanjutnya','ruang rawat','ruang tujuan','ruangan tujuan','tujuan ruangan','tujuan ruang','pindah ruangan','pindah ruang','ke ruangan','ke ruang','tujuan'],
  diagnosaMedis:['diagnosa pra operasi','diagnosis pra operasi','diagnosa pre op','diagnosis pre op','diagnosa pra op','diagnosis pra op','diagnosa medis','diagnosis medis','diagnosa awal','dx pre op','dx pra op','dx medis','diagnosa pre','diagnosa','diagnosis'],
  diagnosaPost:['diagnosa pasca operasi','diagnosa pasca bedah','diagnosa postoperasi','diagnosa post op','diagnosis post op','diagnosa post','diagnosis post','diagnosa akhir','dx post op','dx post','post op'],
  tindakan:['tindakan operasi','tindakan bedah','tindakan op','nama tindakan','nama operasi','tindakan','prosedur','operasi'],
  jenisOperasi:['jenis operasi','tipe operasi','sifat operasi','kategori operasi','kategori op','tipe op','cito elektif','elektif cito','elektif emergensi','emergensi','cito'],
  jenis:['jenis anestesi','tipe anestesi','metode anestesi','teknik anestesi','macam anestesi','pembiusan','anestesi'],
  asa:['status fisik asa','klasifikasi asa','status asa','skor asa','grade asa','asa'],
  dokterAnestesi:['dokter anestesi','dr anestesi','dr. anestesi','dokter anastesi','sp an','span','dpjp anestesi'],
  dokterBedah:['dokter bedah','dr bedah','dr. bedah','dokter operator','operator','dpjp bedah','ahli bedah','dpjp'],
  dokterAsisten:['dokter bedah asisten','dokter asisten','asisten bedah','asisten dokter','asisten operator','asisten 1','dr asisten','ppds bedah','ppds'],
  perawatBedah:['perawat bedah asisten','asisten perawat bedah','perawat bedah 1','perawat bedah'],
  penataAnestesi:['penata anestesi','perawat anestesi','asisten anestesi','penata'],
  perawatInstrumen:['perawat instrumen','perawat instrument','instrumentator','instrumen','scrub nurse','scrub'],
  perawatSirkulasi:['perawat sirkulasi','perawat sirkuler','circulating nurse','circulating','sirkulasi','sirkuler'],
  jamRR:['jam masuk recovery room','jam masuk rr','jam selesai op','jam keluar op','selesai op','jam keluar','jam pacu','jam selesai','recovery room','jam rr','pacu']
};

function normHeader(s){
  return String(s??'')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ')
    .trim();
}

function resolveField(h){
  if(!h)return null;
  let n=normHeader(h);
  if(!n||ignoredHeaders.includes(n))return null;

  // 1. Exact match prioritas utama
  for(let f of fields){
    if(aliases[f]&&aliases[f].some(a=>normHeader(a)===n))return f;
  }

  // 2. Phrase matching terpanjang (lebih spesifik)
  let best=null, bestLen=0;
  for(let f of fields){
    if(!aliases[f])continue;
    for(let a of aliases[f]){
      let na=normHeader(a);
      if(!na)continue;
      let matched=false;
      if(na.length<=3){
        // Alias pendek (<= 3 karakter) harus match per kata utuh
        matched=new RegExp('(^|\\s)'+na+'(\\s|$)').test(n);
      }else{
        matched=n.includes(na);
      }
      if(matched && na.length>bestLen){
        best=f;bestLen=na.length;
      }
    }
  }
  return best;
}

function cleanField(f,v){
  if(v==null)return '';
  if(f==='tanggal')return normDate(v);
  if(['jamPreop','jamMulai','jamRR'].includes(f))return normTime(v);
  let s=String(v).trim();
  if(f==='umur')return s.replace(/[^0-9]/g,'');
  if(f==='kelamin'){
    if(/^(l|pria|laki)/i.test(s))return 'Laki-laki';
    if(/^(p|wanita|perempuan)/i.test(s))return 'Perempuan';
  }
  if(f==='jenisOperasi'){
    if(/cito|emerg/i.test(s))return 'Emergensi';
    if(/elek/i.test(s))return 'Elektif';
  }
  if(f==='kamar'){
    let up=s.toUpperCase().replace(/\s+/g,'');
    if(up.includes('3B'))return 'OK 3B';
    if(up.includes('4C'))return 'OK 4C';
    if(up.includes('5D'))return 'OK 5D';
  }
  return s;
}

function normalizeRow(obj){
  let out={};
  fields.forEach(f=>out[f]='');
  Object.entries(obj).forEach(([k,v])=>{
    let f=resolveField(k);
    if(f){
      let val=cleanField(f,v);
      if(val&&!out[f])out[f]=val;
      else if(!out[f])out[f]=val;
    }
  });
  return out;
}

async function readImport(file){
  $("#fileName").textContent='File: '+file.name;
  $("#previewBox").classList.add('hidden');
  try{
    if(/\.pdf$/i.test(file.name)){await readPdf(file)}
    else if(/\.docx?$/i.test(file.name)){await readDoc(file)}
    else await readSheet(file);
    if(!imported.length)throw Error('Tidak ada baris data operasi yang dapat dipetakan.');
    previewImport();
  }catch(e){console.error(e);toast(e.message||'File gagal dibaca')}
}

async function readSheet(file){
  if(!window.XLSX)throw Error('Library Excel belum termuat.');
  let buf=await file.arrayBuffer();
  let wb;
  try{
    wb=XLSX.read(buf,{type:'array',cellDates:true,raw:false});
  }catch(e){
    let txt=await file.text();
    wb=XLSX.read(txt,{type:'string',cellDates:true,raw:false});
  }
  let best=null;
  for(let sn of wb.SheetNames){
    let sheet=wb.Sheets[sn];
    let aoa=XLSX.utils.sheet_to_json(sheet,{header:1,defval:'',raw:false,blankrows:false});
    if(!aoa||!aoa.length)continue;

    // Deteksi CSV semicolon (jika semua kolom masuk ke 1 string)
    if(aoa.length&&aoa[0].length===1&&String(aoa[0][0]).includes(';')){
      aoa=aoa.map(row=>String(row[0]||'').split(';'));
    }

    // Cari baris header pada 30 baris pertama
    for(let i=0;i<Math.min(aoa.length,30);i++){
      let rowHeader=aoa[i];
      if(!rowHeader||!rowHeader.length)continue;

      let mapping=[];
      let score=0;
      for(let j=0;j<rowHeader.length;j++){
        let h=String(rowHeader[j]||'').trim();
        let prevH=(i>0&&aoa[i-1]&&aoa[i-1][j])?String(aoa[i-1][j]).trim():'';
        let combined=(prevH&&!h.toLowerCase().includes(prevH.toLowerCase())?prevH+' ':'')+h;

        let f=resolveField(h)||(combined?resolveField(combined):null);
        mapping.push(f);
        if(f)score++;
      }

      if(score<3)continue;

      let rows=[];
      for(let rIdx=i+1;rIdx<aoa.length;rIdx++){
        let rowData=aoa[rIdx];
        if(!rowData||!rowData.some(v=>String(v??'').trim()))continue;

        let obj={};
        for(let j=0;j<mapping.length;j++){
          let f=mapping[j];
          let val=rowData[j]??'';
          if(f){
            let cleaned=cleanField(f,val);
            if(cleaned&&!obj[f])obj[f]=cleaned;
            else if(!obj[f])obj[f]=cleaned;
          }
        }

        fields.forEach(f=>{if(!obj[f])obj[f]=''});
        if(obj.nama||obj.rm||obj.tanggal||obj.tindakan){
          rows.push(obj);
        }
      }

      if(rows.length && score>(best?.score||0)){
        best={score,rows,sheet:sn};
      }
    }
  }

  if(!best||!best.rows||!best.rows.length){
    throw Error('Header kolom tabel operasi tidak ditemukan atau data kosong.');
  }
  imported=best.rows;
}

async function readPdf(file){
  let pdfjs;try{pdfjs=await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs')}catch(e){throw Error('PDF reader gagal dimuat.')}
  pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
  let pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
  let rows=[];
  for(let p=1;p<=pdf.numPages;p++){
    let page=await pdf.getPage(p),content=await page.getTextContent();
    let items=content.items.map(i=>({s:String(i.str||'').trim(),x:i.transform[4],y:i.transform[5]})).filter(i=>i.s);
    let text=items.map(i=>i.s).join(' ');
    if(!/tanggal/i.test(text))continue;
    let lines={};
    items.forEach(i=>{let y=Math.round(i.y/2)*2;(lines[y]??=[]).push(i)});
    let arr=Object.values(lines).sort((a,b)=>b[0].y-a[0].y).map(a=>a.sort((x,y)=>x.x-y.x));
    for(let line of arr){
      let date=line.find(i=>/\d{1,2}[/-]\d{1,2}[/-]\d{4}/.test(i.s));
      if(!date)continue;
      let r=normalizeRow({Tanggal:date.s});
      let next=arr.find(l=>Math.abs(l[0].y-line[0].y)<7);
      let joined=next?.map(i=>i.s).join(' ')||'';
      r.nama=(line.find(i=>/[A-Za-z]{3,}/.test(i.s)&&!/^\d/.test(i.s))?.s)||'';
      let tokens=joined.split(/\s{2,}/);
      if(tokens.length>=4){r.nama=tokens[1]||r.nama;r.diagnosaMedis=tokens[9]||''}
      rows.push(r);
    }
  }
  imported=rows.filter(r=>r.nama||r.tanggal);
  if(!imported.length)throw Error('PDF tidak dapat dipetakan.');
}

async function readDoc(file){
  if(/\.doc$/i.test(file.name)) throw Error('File .doc lama tidak didukung, gunakan .docx atau Excel/CSV/PDF');
  try{
    let zip=await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js').then(m=>m.default||m);
    let buf=await file.arrayBuffer();
    let z=await zip.loadAsync(buf);
    let xml=await z.file("word/document.xml").async("string");
    let parser=new DOMParser();
    let doc=parser.parseFromString(xml,"application/xml");
    let tableRows=[...doc.getElementsByTagName("w:tr")];
    let rows=[];
    tableRows.forEach(tr=>{
      let cells=[...tr.getElementsByTagName("w:tc")];
      let vals=cells.map(tc=>[...tc.getElementsByTagName("w:t")].map(t=>t.textContent).join("").trim());
      if(vals.some(v=>v))rows.push(vals);
    });
    if(!rows.length)throw Error('Tabel tidak ditemukan di file DOCX');
    let best=null;
    for(let i=0;i<Math.min(rows.length,10);i++){
      let score=rows[i].reduce((n,h)=>n+(resolveField(h)?1:0),0);
      if(score>=3){best=i;break}
    }
    if(best===null)throw Error('Header tidak ditemukan');
    let header=rows[best];
    let out=[];
    for(let i=best+1;i<rows.length;i++){
      let obj={};header.forEach((h,j)=>obj[h||("__"+j)]=rows[i][j]??"");
      let r=normalizeRow(obj);
      if(r.nama||r.rm||r.tanggal)out.push(r);
    }
    if(!out.length)throw Error('Tidak ada baris data');
    imported=out;
  }catch(e){throw Error(e.message||'File DOCX gagal dibaca')}
}

function previewImport(){
  let head=fields.map(f=>`<th>${labels[f]}</th>`).join('');
  $("#previewHead").innerHTML='<tr>'+head+'</tr>';
  $("#previewBody").innerHTML=imported.slice(0,100).map((r,i)=>'<tr>'+fields.map(f=>`<td class="editable" contenteditable="true" data-i="${i}" data-f="${f}">${esc(r[f])}</td>`).join('')+'</tr>').join('');
  $$('.editable').forEach(c=>c.oninput=()=>imported[+c.dataset.i][c.dataset.f]=c.textContent.trim());
  let bad=imported.filter(r=>!r.tanggal||!r.nama||!r.rm).length;
  $("#previewInfo").textContent=`${imported.length} baris ditemukan. ${bad?bad+' baris perlu diperiksa.':'Semua field utama terisi.'}`;
  $("#previewBox").classList.remove('hidden');
}

function commitImport(){
  if(!imported.length)return toast('Belum ada data import');
  let rows=imported.map(r=>{let o={id:uid()};fields.forEach(f=>o[f]=cleanField(f,r[f]));return o});
  state.operations.push(...rows);
  persist();imported=[];
  toast(`${rows.length} data berhasil diimport`);
  navigate('operations');
}

function bindImport(){
  let file=$("#dataFile");
  $("#chooseFile")&&($("#chooseFile").onclick=()=>file.click());
  file.onchange=e=>e.target.files[0]&&readImport(e.target.files[0]);
  $("#dropZone").ondragover=e=>{e.preventDefault();$("#dropZone").style.borderColor='#4ecdc4'};
  $("#dropZone").ondrop=e=>{e.preventDefault();let f=e.dataTransfer.files[0];if(f)readImport(f)};
  $("#importBtn")&&($("#importBtn").onclick=commitImport);
}

/* ============ NAV ============ */
function applyRoleNav(){
  if(!isAdmin()){
    $$('.nav-item[data-page="settings"],.nav-item[data-page="reset"]').forEach(b=>b.style.display="none");
  }
}
function bindGlobal(){
  $$('.nav-item').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
  $("#mobileMenu")&&($("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle('open'));
  $("#sidebarToggle")&&($("#sidebarToggle").onclick=()=>{
    let sb=$("#sidebar");
    if(window.innerWidth<=780){sb.classList.toggle('open')}
    else{document.body.classList.toggle('sidebar-hidden')}
  });
  $("#modalClose")&&($("#modalClose").onclick=()=>$("#modal").close());
  document.addEventListener('click',e=>{if(e.target.id==='cancelModal')$("#modal").close()});
}

/* ============ BOOT ============ */
if(!isLoggedIn()){
  renderLogin();
}else{
  if(!isAdmin()) document.body.classList.add("role-user");
  bindGlobal();
  applyRoleNav();
  initCloudDatabase();
}
