const SUPABASE_URL="https://pdkdvaisggntdrvpxuur.supabase.co";
const SUPABASE_KEY="sb_publishable_S-xxocuLz-FX_6HLaYhb0A_Avnr01AW";
const restDb={from(table){let action=null,payload=null,filters={},wantSelect=false,wantSingle=false;const api=async()=>{let url=SUPABASE_URL+"/rest/v1/"+encodeURIComponent(table),opts={headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json",Accept:"application/json"}};if(action==="select"){url+="?select=*"+Object.entries(filters).map(([k,v])=>"&"+encodeURIComponent(k)+"=eq."+encodeURIComponent(v)).join("") ;}else{Object.entries(filters).forEach(([k,v])=>url+=(url.includes("?")?"&":"?")+encodeURIComponent(k)+"=eq."+encodeURIComponent(v));opts.method=action==="insert"?"POST":action==="update"?"PATCH":action==="delete"?"DELETE":"POST";if(payload!==null)opts.body=JSON.stringify(payload);if(action==="insert"||action==="upsert")opts.headers.Prefer="return=representation";if(action==="update")opts.headers.Prefer="return=representation";if(action==="upsert"){url+="?on_conflict=id";opts.headers.Prefer="resolution=merge-duplicates,return=representation";}}const res=await fetch(url,opts);const text=await res.text();let data=null;try{data=text?JSON.parse(text):null}catch{}if(!res.ok)return{data:null,error:{message:data?.message||text||res.statusText}};if(wantSingle&&Array.isArray(data))data=data[0]||null;return{data,error:null}};const b={select(){action="select";wantSelect=true;return b},insert(v){action="insert";payload=v;return b},update(v){action="update";payload=v;return b},delete(){action="delete";return b},upsert(v){action="upsert";payload=v;return b},eq(k,v){filters[k]=v;return b},single(){wantSingle=true;return b},then(resolve,reject){return api().then(resolve,reject)}};return b}};const db=restDb;
const today=new Date().toISOString().slice(0,10);
const roleGroups=[
["الإدارة العليا",["الرئيس التنفيذي","المدير العام","نائب المدير العام","مدير العمليات","مدير المشاريع","مدير التطوير المؤسسي"]],
["الموارد البشرية",["مدير الموارد البشرية","نائب مدير الموارد البشرية","أخصائي موارد بشرية","أخصائي توظيف","أخصائي شؤون موظفين","أخصائي رواتب وأجور","منسق موارد بشرية","مسؤول ملفات الموظفين","مسؤول التدريب والتطوير"]],
["الإدارة الهندسية",["مدير الإدارة الهندسية","مدير المشاريع الهندسية","مدير التصميم الهندسي","مهندس مدني","مهندس معماري","مهندس كهرباء","مهندس ميكانيكا","مهندس تخطيط","مهندس حصر كميات","منسق هندسي"]],
["المكتب الفني",["مدير المكتب الفني","نائب مدير المكتب الفني","مهندس مكتب فني مدني","مهندس مكتب فني معماري","مهندس مكتب فني كهرباء","مهندس مكتب فني ميكانيكا","مهندس تسعير","مهندس إعداد مستخلصات","مهندس مطالبات","مهندس تخطيط وجدولة","مهندس مستندات فنية","منسق مكتب فني"]],
["إدارة التشغيل",["مدير التشغيل","نائب مدير التشغيل","مدير مشروع","نائب مدير مشروع","مدير منطقة","مهندس تنفيذ","مهندس موقع أول","مهندس موقع"]],
["المشتريات وسلسلة الإمداد",["مدير المشتريات وسلسلة الإمداد","نائب مدير المشتريات","أخصائي مشتريات","مسؤول مشتريات مشاريع","أخصائي عقود توريد","منسق سلسلة الإمداد","مسؤول متابعة الموردين","مسؤول لوجستيات","منسق الشحن والتوريد"]],
["المستودعات والمخزون",["مدير المستودعات","مشرف مستودع","أمين مستودع رئيسي","أمين مستودع موقع","مراقب مخزون","منسق مخزون","مراقب استلام وتسليم"]],
["إدارة العقود",["مدير العقود","نائب مدير العقود","أخصائي عقود","مسؤول مطالبات وعقود","أخصائي مستخلصات","منسق عقود المشاريع","مسؤول أوامر التغيير"]],
["المالية والمحاسبة",["المدير المالي","نائب المدير المالي","مدير الحسابات","محاسب عام","محاسب مشاريع","محاسب تكاليف","محاسب عملاء","محاسب موردين","أمين صندوق","مراقب مالي"]],
["الجودة",["مدير الجودة","نائب مدير الجودة","مهندس جودة","مفتش جودة مدني","مفتش جودة معماري","مفتش جودة كهرباء","مفتش جودة ميكانيكا"]],
["السلامة والصحة المهنية",["مدير السلامة والصحة المهنية","نائب مدير السلامة","مشرف سلامة","مسؤول سلامة موقع","أخصائي سلامة وصحة مهنية","مفتش سلامة","منسق سلامة"]],
["المبيعات وتطوير الأعمال",["مدير المبيعات وتطوير الأعمال","مدير تطوير الأعمال","مدير المبيعات","مهندس مبيعات","أخصائي تطوير أعمال","منسق عروض ومناقصات"]],
["تقنية المعلومات",["مدير تقنية المعلومات","مسؤول دعم فني","مسؤول شبكات وأنظمة","مسؤول أمن معلومات","مطور أنظمة داخلية","مسؤول قواعد بيانات"]],
["الإدارة والمساندة",["مدير الإدارة والمساندة","مدير الشؤون الإدارية","مسؤول إداري","سكرتير تنفيذي","منسق إداري","مسؤول علاقات حكومية","مسؤول أرشيف ووثائق"]],
["المواقع والمعدات",["مدير المواقع والمعدات","مدير المعدات","مشرف المعدات","مسؤول الحركة والأسطول","مسؤول صيانة المعدات","مراقب معدات الموقع","منسق المعدات"]]
];
const roles=roleGroups.flatMap(([department,names])=>names.map(name=>({name,department})));
function arr(...x){return x.filter(Boolean)}
function makeJob({name,department}){
 const manager=name.includes("مدير")?"المدير العام":name.includes("نائب")?"مدير القسم":name.includes("رئيس")?"المدير العام":"مدير "+department;
 const management=/مدير|نائب|رئيس/.test(name);
 const engineering=/مهندس|هندسي/.test(name);
 const finance=/محاسب|مالي|تكاليف|حسابات|صندوق/.test(name);
 let purpose="تنفيذ المهام والمسؤوليات المرتبطة بوظيفة "+name+" بما يحقق أهداف "+department+" ويدعم جودة وكفاءة أعمال الشركة.";
 if(management) purpose="قيادة وتنظيم أعمال "+department+" ووضع خطط العمل ومتابعة التنفيذ ورفع التقارير والتوصيات بما يحقق أهداف الشركة.";
 else if(engineering) purpose="تنفيذ ومتابعة الأعمال الهندسية والفنية المرتبطة بالوظيفة وفق المخططات والمواصفات والبرامج المعتمدة.";
 else if(finance) purpose="تنفيذ ومراجعة الأعمال المالية والمحاسبية المرتبطة بالوظيفة بدقة، مع المحافظة على سلامة السجلات والتقارير.";
 const responsibilities=management
 ? arr("إعداد خطط العمل والأهداف التشغيلية للقسم ومتابعة تنفيذها.","توزيع المهام ومتابعة أداء فريق العمل.","مراجعة التقارير والنتائج واتخاذ الإجراءات التصحيحية ضمن الصلاحيات.","التنسيق مع الإدارات والمشاريع ذات العلاقة.","رفع التقارير الدورية والتوصيات للإدارة العليا.")
 : engineering
 ? arr("مراجعة المخططات والمواصفات والمستندات ذات الصلة.","متابعة التنفيذ أو الإعداد الفني وفق متطلبات المشروع.","إعداد ومراجعة التقارير والجداول والكميات حسب طبيعة الوظيفة.","التنسيق مع فرق المشاريع والمكتب الفني والاستشاريين.","توثيق الملاحظات ومتابعة إغلاقها.")
 : finance
 ? arr("تنفيذ وتسجيل ومراجعة العمليات المالية المرتبطة بالوظيفة.","مطابقة المستندات والسجلات والأرصدة.","إعداد التقارير والكشوف المطلوبة.","متابعة المستندات الناقصة والتنسيق مع الإدارات المعنية.","حفظ المستندات المالية وفق إجراءات الشركة.")
 : arr("تنفيذ الأعمال اليومية والدورية المرتبطة بالوظيفة.","متابعة الطلبات والمعاملات ضمن نطاق القسم.","التنسيق مع الأطراف والإدارات ذات العلاقة.","تحديث السجلات والبيانات والتقارير.","رفع الملاحظات والمخاطر والمعوقات للمسؤول المباشر.");
 const routine=arr("مراجعة الأعمال المفتوحة والأولويات.","متابعة الطلبات والمعاملات المستحقة.","تحديث السجلات والبيانات.","التنسيق مع المسؤول المباشر والجهات ذات العلاقة.");
 const authorities=arr("تنفيذ المهام ضمن الصلاحيات المعتمدة.","طلب البيانات والمستندات اللازمة لإنجاز العمل.","رفع الحالات الاستثنائية أو المخالفات للمسؤول المباشر.","اقتراح التحسينات المتعلقة بمجال العمل.");
 const qualifications=arr("مؤهل علمي مناسب لطبيعة الوظيفة.","دورات مهنية مرتبطة بطبيعة العمل حسب الحاجة.");
 const experience=arr("خبرة عملية مناسبة لمستوى الوظيفة ومسؤولياتها.","خبرة في بيئة عمل ومشاريع مشابهة لطبيعة الوظيفة.");
 const skills=arr("التنظيم وإدارة الوقت.","الدقة والمتابعة.","التواصل والعمل الجماعي.","إجادة استخدام الحاسب والبرامج المرتبطة بالوظيفة.");
 const kpi=arr("نسبة إنجاز المهام في المواعيد المحددة.","دقة واكتمال السجلات والمستندات.","نسبة إغلاق الملاحظات والمعاملات المفتوحة.","الالتزام بالإجراءات والتعليمات.");
 const compliance=arr("الالتزام بسياسات الشركة واللوائح والتعليمات الداخلية.","المحافظة على سرية معلومات العمل والمستندات.","الالتزام بساعات العمل ومتطلبات الانضباط.","عدم تجاوز الصلاحيات المعتمدة.");
 return {name,department,manager,purpose,responsibilities,routine,authorities,qualifications,experience,skills,kpi,compliance,updated_at:new Date().toISOString()};
}
const seed=roles.map(makeJob);
const $=s=>document.querySelector(s);
let jobs=[],activeDept="الكل",currentId=null;

async function loadJobs(){
 $("#jobs").innerHTML='<div class="empty">جاري تحميل مكتبة الأوصاف الوظيفية...</div>';
 const {data,error}=await db.from("job_descriptions").select("*");
 if(error){console.error(error);$("#jobs").innerHTML='<div class="empty">تعذر الاتصال بقاعدة البيانات. تحقق من إعدادات Supabase.</div>';return}
 if(!data.length){
   const {data:inserted,error:seedError}=await db.from("job_descriptions").insert(seed).select();
   if(seedError){console.error(seedError);$("#jobs").innerHTML='<div class="empty">تعذر إنشاء مكتبة الوظائف في قاعدة البيانات.</div>';return}
   jobs=inserted||[];
 }else jobs=data;
 render();
}
function lines(v){return Array.isArray(v)?v:(v||"").split("\n").map(x=>x.trim()).filter(Boolean)}
function departments(){return[...new Set(jobs.map(j=>j.department).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ar"))}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function renderDepts(){const ds=departments();$("#deptCount").textContent=ds.length;$("#jobCount").textContent=jobs.length;$("#departments").innerHTML=ds.map(d=>'<button class="dept '+(activeDept===d?"active":"")+'" data-dept="'+esc(d)+'"><span>'+esc(d)+'</span><b>'+jobs.filter(j=>j.department===d).length+'</b></button>').join("");$("#allDeptBtn").classList.toggle("active",activeDept==="الكل");$("#deptList").innerHTML=ds.map(d=>'<option value="'+esc(d)+'"></option>').join("")}
function render(){renderDepts();if(window.refreshMainDepartments)window.refreshMainDepartments();const q=$("#search").value.trim().toLowerCase();let list=jobs.filter(j=>(activeDept==="الكل"||j.department===activeDept)&&[j.name,j.department,j.manager,j.purpose].join(" ").toLowerCase().includes(q));list.sort((a,b)=>$("#sort").value==="dept"?a.department.localeCompare(b.department,"ar")||a.name.localeCompare(b.name,"ar"):a.name.localeCompare(b.name,"ar"));$("#jobs").innerHTML=list.map(card).join("");$("#empty").classList.toggle("hidden",list.length>0)}
function card(j){return'<article class="job-card"><span class="tag">'+esc(j.department)+'</span><h3>'+esc(j.name)+'</h3><div class="manager">الرئيس المباشر: '+esc(j.manager||"—")+'</div><p class="purpose">'+esc(j.purpose||"لا يوجد وصف مختصر.")+'</p><div class="card-bottom"><button class="open" data-open="'+j.id+'">فتح الوصف</button><button class="edit-link" data-edit="'+j.id+'">تعديل</button></div></article>'}
function section(title,value,full=false,printHidden=false,printInclude=false){const ls=lines(value);return'<div class="section '+(full?"full ":"")+(printHidden?"print-hidden ":"")+(printInclude?"print-include":"")+'"><h3>'+title+'</h3>'+(ls.length?'<ul>'+ls.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':'<p>لا توجد بيانات مضافة.</p>')+'</div>'}
function showDetail(id){const j=jobs.find(x=>x.id===id);if(!j)return;currentId=id;window.currentId=id;$("#detail").innerHTML='<div class="print-header"><div class="print-company">شركة البنية الأساسية</div><div class="print-subcompany">إدارة الموارد البشرية</div><div class="print-doc">الوصف الوظيفي</div><div class="print-meta"><span>القسم: '+esc(j.department)+'</span><span>رقم الوثيقة: JD-'+esc(String(j.id||"").slice(0,8).toUpperCase())+'</span></div></div><div class="detail-top"><span class="tag">'+esc(j.department)+'</span><h2>'+esc(j.name)+'</h2><p>الرئيس المباشر: '+esc(j.manager||"—")+' • آخر تحديث: '+esc((j.updated_at||"").slice(0,10)||"—")+'</p><div class="detail-actions"><button class="btn gold" onclick="window.print()">طباعة / حفظ PDF</button><button class="btn ghost" style="color:var(--navy)" onclick="editJob(currentId)">تعديل</button><button class="btn ghost" style="color:var(--danger)" onclick="deleteJob(currentId)">حذف</button></div></div><div class="detail-grid"><div class="section full print-include"><h3>الهدف العام من الوظيفة</h3><p>'+esc(j.purpose||"لا يوجد")+'</p></div>'+section("المهام والمسؤوليات الرئيسية",j.responsibilities,true,false,true)+section("المهام اليومية / الدورية",j.routine,false,true)+section("الصلاحيات والمسؤوليات",j.authorities,false,false,true)+section("المؤهلات",j.qualifications,false,true)+section("الخبرات",j.experience,false,true)+section("المهارات",j.skills,false,true)+section("مؤشرات الأداء KPI",j.kpi,false,true)+section("متطلبات الالتزام والانضباط",j.compliance,true,true)+'</div>';$("#detailModal").classList.remove("hidden")}
function editJob(id){const j=jobs.find(x=>x.id===id);if(!j)return;$("#jobId").value=j.id;$("#fName").value=j.name;$("#fDept").value=j.department;$("#fManager").value=j.manager||"";$("#fDate").value=(j.updated_at||today).slice(0,10);$("#fPurpose").value=j.purpose||"";$("#fResponsibilities").value=lines(j.responsibilities).join("\n");$("#fRoutine").value=lines(j.routine).join("\n");$("#fAuthorities").value=lines(j.authorities).join("\n");$("#fQualifications").value=lines(j.qualifications).join("\n");$("#fExperience").value=lines(j.experience).join("\n");$("#fSkills").value=lines(j.skills).join("\n");$("#fKpi").value=lines(j.kpi).join("\n");$("#fCompliance").value=lines(j.compliance).join("\n");$("#formTitle").textContent="تعديل الوصف الوظيفي";$("#detailModal").classList.add("hidden");$("#formModal").classList.remove("hidden")}
async function deleteJob(id){const j=jobs.find(x=>x.id===id);if(!j)return;if(!confirm("هل أنت متأكد من حذف وصف وظيفة «"+j.name+"»؟"))return;const {error}=await db.from("job_descriptions").delete().eq("id",id);if(error){alert("تعذر حذف الوظيفة.");return}jobs=jobs.filter(x=>x.id!==id);$("#detailModal").classList.add("hidden");render()}
function addJob(){$("#jobForm").reset();$("#jobId").value="";$("#fDate").value=today;$("#formTitle").textContent="إضافة وصف وظيفي";$("#formModal").classList.remove("hidden")}
document.addEventListener("click",e=>{const close=e.target.closest("[data-close]");if(close){const modalId=close.getAttribute("data-close");const modal=document.getElementById(modalId);if(modal)modal.classList.add("hidden");return}const d=e.target.closest("[data-dept]");if(d){activeDept=d.dataset.dept;render();return}if(e.target.id==="allDeptBtn"){activeDept="الكل";render();return}const o=e.target.closest("[data-open]");if(o)showDetail(o.dataset.open);const ed=e.target.closest("[data-edit]");if(ed)editJob(ed.dataset.edit);});
$("#search").addEventListener("input",render);$("#sort").addEventListener("change",render);$("#addBtn").addEventListener("click",addJob);
$("#jobForm").addEventListener("submit",async e=>{e.preventDefault();const id=$("#jobId").value;const payload={name:$("#fName").value.trim(),department:$("#fDept").value.trim(),manager:$("#fManager").value.trim(),purpose:$("#fPurpose").value.trim(),responsibilities:lines($("#fResponsibilities").value),routine:lines($("#fRoutine").value),authorities:lines($("#fAuthorities").value),qualifications:lines($("#fQualifications").value),experience:lines($("#fExperience").value),skills:lines($("#fSkills").value),kpi:lines($("#fKpi").value),compliance:lines($("#fCompliance").value),updated_at:new Date().toISOString()};let result;if(id)result=await db.from("job_descriptions").update(payload).eq("id",id).select().single();else result=await db.from("job_descriptions").insert(payload).select().single();if(result.error){alert("تعذر حفظ التعديل في قاعدة البيانات.");console.error(result.error);return}if(id){jobs=jobs.map(j=>j.id===id?result.data:j)}else jobs.push(result.data);$("#formModal").classList.add("hidden");render()});
$("#exportBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(jobs,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="job-description-library.json";a.click();URL.revokeObjectURL(a.href)});
$("#importInput").addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=async()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x))throw 0;const rows=x.map(j=>({...j,id:j.id||crypto.randomUUID()}));const {data,error}=await db.from("job_descriptions").upsert(rows).select();if(error)throw error;jobs=data;render();alert("تم استيراد البيانات وحفظها في Supabase.")}catch(err){console.error(err);alert("ملف البيانات غير صالح أو تعذر حفظه.")}};r.readAsText(file)});

// ===== الموظفون + الاستيراد من Excel + التقييم الإلكتروني =====
let employees=[];
let kpiTemplates=[];
function normalizeKey(v){return String(v||"").trim().toLowerCase().replace(/[\s_\-]+/g,"");}
function employeeRow(row){
  const m={}; Object.keys(row||{}).forEach(k=>m[normalizeKey(k)]=row[k]);
  const pick=(keys)=>{for(const k of keys){if(m[normalizeKey(k)]!==undefined&&m[normalizeKey(k)]!=="")return m[normalizeKey(k)];}return "";};
  return {
    employee_no:String(pick(["رقم الموظف","الرقم الوظيفي","employee no","employee_no","id"])||"").trim(),
    name:String(pick(["اسم الموظف","الاسم","name","employee name"])||"").trim(),
    national_id:String(pick(["رقم الهوية","الهوية","رقم الاقامة","الإقامة","national id","national_id"])||"").trim(),
    nationality:String(pick(["الجنسية","nationality"])||"").trim(),
    department:String(pick(["القسم","الإدارة","department"])||"").trim(),
    job_title:String(pick(["المسمى الوظيفي","الوظيفة","job title","job_title","المسمى"])||"").trim(),
    manager:String(pick(["الرئيس المباشر","المدير المباشر","manager"])||"").trim(),
    hire_date:String(pick(["تاريخ التعيين","تاريخ المباشرة","hire date","hire_date"])||"").trim()||null,
    base_salary:Number(pick(["الراتب الأساسي","basic salary","base salary","base_salary"]))||null,
    housing_allowance:Number(pick(["بدل السكن","housing allowance","housing_allowance"]))||null,
    transport_allowance:Number(pick(["بدل النقل","transport allowance","transport_allowance"]))||null,
    phone:String(pick(["رقم الجوال","الجوال","الهاتف","phone","mobile"])||"").trim(),
    email:String(pick(["البريد الإلكتروني","البريد","email"])||"").trim(),
    status:String(pick(["الحالة","status"])||"على رأس العمل").trim(),
    source_data:row||{},
    updated_at:new Date().toISOString()
  };
}
async function importEmployeesFromExcel(file){
  if(!window.XLSX) throw new Error("مكتبة Excel لم تُحمّل.");
  const buf=await file.arrayBuffer();
  const wb=XLSX.read(buf,{type:"array",cellDates:true});
  const sheet=wb.Sheets[wb.SheetNames[0]];
  const rows=XLSX.utils.sheet_to_json(sheet,{defval:""});
  if(!rows.length) throw new Error("الملف لا يحتوي على بيانات.");
  const mapped=rows.map(employeeRow).filter(x=>x.name);
  if(!mapped.length) throw new Error("لم يتم العثور على عمود اسم الموظف.");
  const {data:existing,error}=await db.from("employees").select("*");
  if(error) throw error;
  const old=existing||[];
  for(const row of mapped){
    const match=old.find(e=>(row.employee_no&&e.employee_no===row.employee_no)||(row.national_id&&e.national_id===row.national_id)||(e.name===row.name&&row.job_title&&e.job_title===row.job_title));
    if(match) await db.from("employees").update(row).eq("id",match.id);
    else await db.from("employees").insert(row);
  }
  const refreshed=await db.from("employees").select("*");
  if(refreshed.error) throw refreshed.error;
  employees=refreshed.data||[];
  return mapped.length;
}
async function ensureKpis(job){
  const got=await db.from("job_kpi_templates").select("*").eq("job_description_id",job.id);
  if(got.error) throw got.error;
  if((got.data||[]).length) return got.data;
  const tasks=lines(job.responsibilities).slice(0,6);
  const rows=tasks.map((task,i)=>({
    job_description_id:job.id,
    indicator_name:"مؤشر أداء "+(i+1),
    question:"إلى أي مدى ينجز الموظف المهمة التالية بجودة وفي الوقت المحدد: "+task,
    category:"إنجاز وجودة العمل",
    weight:Number((100/Math.max(tasks.length,1)).toFixed(2)),
    answer_type:"scale_1_5",
    active:true
  }));
  if(!rows.length) return [];
  const ins=await db.from("job_kpi_templates").insert(rows).select();
  if(ins.error) throw ins.error;
  return ins.data||[];
}
function performanceLevel(score){
  if(score>=90)return"متميز";
  if(score>=80)return"جيد جدًا";
  if(score>=70)return"جيد";
  if(score>=60)return"يحتاج إلى تحسين";
  return"يحتاج إلى خطة تطوير";
}
async function loadEmployees(){
  const r=await db.from("employees").select("*");
  if(r.error){console.error("تعذر تحميل الموظفين:",r.error);return false}
  employees=r.data||[];
  return true;
}
async function openEvaluation(){
  const er=await db.from("employees").select("*");
  if(er.error){alert("تعذر تحميل قاعدة بيانات الموظفين.");return}
  employees=er.data||[];
  if(!employees.length){alert("لا توجد بيانات موظفين. استخدم زر «استيراد Excel للموظفين» أولًا.");return}
  const options=employees.map(e=>'<option value="'+esc(e.id)+'">'+esc(e.name)+' — '+esc(e.job_title||"بدون مسمى")+'</option>').join("");
  const html='<div class="eval-overlay" id="evalOverlay"><div class="eval-card"><button class="close" id="evalClose">×</button><div class="form-head"><span class="eyebrow">تقييم الأداء الإلكتروني</span><h2>تقييم موظف</h2></div><label>الموظف<select id="evalEmployee">'+options+'</select></label><div id="evalQuestions" class="eval-questions"></div><div id="evalResult" class="eval-result hidden"></div><div class="form-actions"><button class="btn ghost" id="evalCancel">إلغاء</button><button class="btn gold" id="calcEval">حساب التقييم</button></div></div></div>';
  document.body.insertAdjacentHTML("beforeend",html);
  const loadQuestions=async()=>{const emp=employees.find(x=>x.id===$("#evalEmployee").value);const job=jobs.find(j=>j.name===emp?.job_title)||jobs.find(j=>j.department===emp?.department&&j.name===emp?.job_title);const box=$("#evalQuestions");if(!job){box.innerHTML='<div class="empty">لا يوجد وصف وظيفي مطابق للمسمى الوظيفي للموظف. راجع المسمى في ملف Excel.</div>';return}const qs=await ensureKpis(job);box.innerHTML=qs.map((q,i)=>'<div class="eval-q" data-kpi="'+q.id+'"><b>'+esc(q.indicator_name)+'</b><p>'+esc(q.question)+'</p><div class="scale">'+[1,2,3,4,5].map(n=>'<label><input type="radio" name="q'+i+'" value="'+n+'" '+(n===3?"checked":"")+'><span>'+n+'</span></label>').join("")+'</div></div>').join("");box.dataset.job=job.id};
  $("#evalEmployee").addEventListener("change",loadQuestions); await loadQuestions();
  $("#evalClose").onclick=$("#evalCancel").onclick=()=>$("#evalOverlay")?.remove();
  $("#calcEval").onclick=async()=>{
    const emp=employees.find(x=>x.id===$("#evalEmployee").value);const job=jobs.find(j=>j.id===$("#evalQuestions").dataset.job);if(!emp||!job)return;
    const qs=await ensureKpis(job);let total=0;const answers=[];
    qs.forEach((q,i)=>{const a=Number(document.querySelector('input[name="q'+i+'"]:checked')?.value||0);const score=a*20;const weighted=score*(Number(q.weight||0)/100);total+=weighted;answers.push({kpi_id:q.id,answer:a,score,weighted_score:weighted});});
    total=Number(total.toFixed(2));const level=performanceLevel(total);
    const strengths=qs.filter((q,i)=>answers[i].score>=80).map(q=>q.indicator_name).join("، ")||"لا توجد مؤشرات مرتفعة في هذه الدورة.";
    const improvements=qs.filter((q,i)=>answers[i].score<70).map(q=>q.indicator_name).join("، ")||"لا توجد مؤشرات تحتاج تحسينًا وفق الإجابات.";
    const recommendations=total>=80?"المحافظة على مستوى الأداء وتوسيع نطاق المسؤوليات تدريجيًا.":total>=70?"متابعة نقاط التحسين ورفع مستوى الاتساق في الأداء.":"إعداد خطة تطوير ومتابعة دورية للمؤشرات الأقل نتيجة.";
    const saved=await db.from("employee_evaluations").insert({employee_id:emp.id,job_description_id:job.id,evaluator_name:"الموارد البشرية",total_score:total,performance_level:level,strengths,improvements,recommendations}).select().single();
    if(saved.error){alert("تعذر حفظ التقييم.");return}
    const evId=saved.data.id;const ar=answers.map(a=>({...a,evaluation_id:evId}));const ins=await db.from("employee_evaluation_answers").insert(ar);
    if(ins.error){alert("تم حفظ التقييم الأساسي لكن تعذر حفظ تفاصيل الإجابات.");return}
    $("#evalResult").classList.remove("hidden");$("#evalResult").innerHTML='<h3>نتيجة التقييم</h3><div class="eval-score">'+total+'%</div><p><b>المستوى:</b> '+esc(level)+'</p><p><b>نقاط القوة:</b> '+esc(strengths)+'</p><p><b>نقاط التحسين:</b> '+esc(improvements)+'</p><p><b>التوصية:</b> '+esc(recommendations)+'</p>';
  };
}
$("#evaluateBtn").addEventListener("click",openEvaluation);
$("#employeeExcelInput").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{const n=await importEmployeesFromExcel(file);alert("تم استيراد وتحديث "+n+" موظف وحفظ البيانات في قاعدة البيانات.");}catch(err){console.error(err);alert("تعذر استيراد ملف Excel: "+(err.message||"تأكد من عناوين الأعمدة."));}e.target.value="";});

window.editJob=editJob;window.deleteJob=deleteJob;window.currentId=null;
loadJobs();
/* ===== واجهة النظام الجديدة: التنقل الرئيسي + قسم الموظفين + ربط الوصف ===== */
(function(){
  const q=s=>document.querySelector(s);
  const esc2=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  const deptNames=()=>[...new Set((jobs||[]).map(j=>j.department).filter(Boolean))];
  const linkedJob=e=>(jobs||[]).find(j=>j.id===e.job_description_id)||(jobs||[]).find(j=>j.name===e.job_title&&j.department===e.department)||(jobs||[]).find(j=>j.name===e.job_title);

  function showView(name){
    document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
    q("#"+name+"View")?.classList.remove("hidden");
    document.querySelectorAll(".main-nav").forEach(n=>n.classList.toggle("active",n.dataset.view===name));
    if(name==="employees"){ loadEmployees().then(()=>renderEmployeesPanel()); }
    if(name==="evaluation") renderEvaluationPanel();
  }

  function renderMainDepartments(){
    const ds=deptNames();
    q("#jobDepartments").innerHTML=ds.map(d=>'<button class="dept '+(typeof activeDept!=="undefined"&&activeDept===d?"active":"")+'" data-newdept="'+esc2(d)+'"><span>'+esc2(d)+'</span><b>'+jobs.filter(j=>j.department===d).length+'</b></button>').join("");
  }

  function renderEmployeesPanel(){
    const box=q("#employeesTable"); if(!box)return;
    const search=(q("#employeeSearch")?.value||"").trim().toLowerCase(), dep=q("#employeeDeptFilter")?.value||"";
    const ds=deptNames();
    q("#employeeDeptFilter").innerHTML='<option value="">كل الإدارات</option>'+ds.map(d=>'<option value="'+esc2(d)+'">'+esc2(d)+'</option>').join("");
    q("#employeeDeptFilter").value=dep;
    const list=(employees||[]).filter(e=>(!dep||e.department===dep)&&[e.name,e.employee_no,e.job_title,e.national_id,e.nationality].join(" ").toLowerCase().includes(search));
    box.innerHTML='<div class="employee-row head"><div>الموظف</div><div>الهوية</div><div>الإدارة / المسمى</div><div>الحالة</div><div>الإجراءات</div></div>'+
      (list.length?list.map(e=>{const j=linkedJob(e);return '<div class="employee-row"><div><div class="employee-name">'+esc2(e.name)+'</div><div class="employee-meta">'+esc2(e.employee_no||"بدون رقم")+'</div></div><div>'+esc2(e.national_id||"—")+'</div><div><b>'+esc2(e.department||j?.department||"—")+'</b><div class="employee-meta">'+esc2(e.job_title||j?.name||"غير مسند")+'</div></div><div>'+esc2(e.status||"—")+'</div><div class="row-actions"><button class="small-btn" data-newfile="'+e.id+'">فتح الملف</button><button class="small-btn gold" data-newedit="'+e.id+'">تعديل / إسناد</button><button class="small-btn" data-neweval="'+e.id+'">تقييم</button><button class="small-btn danger" data-newdelete="'+e.id+'">حذف</button></div></div>'}).join(""):'<div class="empty">لا توجد بيانات موظفين. استورد Excel أو أضف موظفًا.</div>');
  }

  function populateEmployeeForm(id){
    const e=(employees||[]).find(x=>x.id===id)||{};
    q("#employeeId").value=e.id||"";
    q("#employeeFormTitle").textContent=id?"تعديل وإسناد المسمى الوظيفي":"إضافة موظف";
    q("#eNo").value=e.employee_no||"";q("#eName").value=e.name||"";q("#eNationalId").value=e.national_id||"";q("#eNationality").value=e.nationality||"";
    q("#eManager").value=e.manager||"";q("#eHireDate").value=e.hire_date||"";q("#eBaseSalary").value=e.base_salary??"";q("#eHousing").value=e.housing_allowance??"";q("#eTransport").value=e.transport_allowance??"";q("#eStatus").value=e.status||"على رأس العمل";q("#ePhone").value=e.phone||"";q("#eEmail").value=e.email||"";
    q("#eDept").innerHTML='<option value="">اختر الإدارة</option>'+deptNames().map(d=>'<option value="'+esc2(d)+'" '+(d===e.department?"selected":"")+'>'+esc2(d)+'</option>').join("");
    fillEmployeeJobs(e.department,e.job_description_id||(linkedJob(e)?.id||""));
    q("#employeeModal").classList.remove("hidden");
  }
  function fillEmployeeJobs(dep,selected){
    const list=(jobs||[]).filter(j=>!dep||j.department===dep).sort((a,b)=>a.name.localeCompare(b.name,"ar"));
    q("#eJob").innerHTML='<option value="">اختر المسمى الوظيفي</option>'+list.map(j=>'<option value="'+j.id+'" '+(j.id===selected?"selected":"")+'>'+esc2(j.name)+'</option>').join("");
    showLinkedJob();
  }
  function showLinkedJob(){
    const j=(jobs||[]).find(x=>x.id===q("#eJob").value);
    q("#employeeLinkedJob").innerHTML=j?'<b>الوصف الوظيفي المرتبط:</b> '+esc2(j.name)+' — '+esc2(j.department)+'<br><small>سيتم ربط الموظف مباشرة بهذا الوصف وبمؤشرات KPI الخاصة به.</small>':'اختر المسمى الوظيفي لربط الموظف بالوصف الوظيفي.';
  }
  async function saveEmployeeForm(ev){
    ev.preventDefault();
    const id=q("#employeeId").value,j=(jobs||[]).find(x=>x.id===q("#eJob").value);
    if(!j){alert("اختر المسمى الوظيفي أولاً.");return}
    const p={employee_no:q("#eNo").value.trim(),name:q("#eName").value.trim(),national_id:q("#eNationalId").value.trim(),nationality:q("#eNationality").value.trim(),department:j.department,job_title:j.name,job_description_id:j.id,manager:q("#eManager").value.trim(),hire_date:q("#eHireDate").value||null,base_salary:Number(q("#eBaseSalary").value)||null,housing_allowance:Number(q("#eHousing").value)||null,transport_allowance:Number(q("#eTransport").value)||null,status:q("#eStatus").value.trim()||"على رأس العمل",phone:q("#ePhone").value.trim(),email:q("#eEmail").value.trim(),updated_at:new Date().toISOString()};
    const r=id?await db.from("employees").update(p).eq("id",id).select().single():await db.from("employees").insert(p).select().single();
    if(r.error){alert("تعذر حفظ الموظف: "+r.error.message);return}
    if(id)employees=employees.map(x=>x.id===id?r.data:x);else employees.push(r.data);
    q("#employeeModal").classList.add("hidden");renderEmployeesPanel();
  }
  function openEmployeeFile2(id){
    const e=employees.find(x=>x.id===id),j=linkedJob(e);if(!e)return;
    q("#employeeFile").innerHTML='<div class="form-head"><span class="eyebrow">EMPLOYEE FILE</span><h2>'+esc2(e.name)+'</h2><p>البيانات الوظيفية والارتباط بالوصف الوظيفي</p></div><div class="file-grid">'+[["الرقم الوظيفي",e.employee_no],["الهوية / الإقامة",e.national_id],["الجنسية",e.nationality],["الإدارة",e.department],["المسمى الوظيفي",e.job_title],["الرئيس المباشر",e.manager],["تاريخ المباشرة",e.hire_date],["الحالة",e.status],["الجوال",e.phone]].map(a=>'<div class="file-item"><span>'+a[0]+'</span><b>'+esc2(a[1]||"—")+'</b></div>').join("")+'</div><div class="file-job"><h3>الوصف الوظيفي المرتبط</h3><p><b>'+esc2(j?.name||"غير مرتبط")+'</b> — '+esc2(j?.department||"")+'</p><p>'+esc2(j?.purpose||"لا يوجد وصف مرتبط.")+'</p><div class="form-actions">'+(j?'<button class="btn gold" data-file-job2="'+j.id+'">فتح الوصف الوظيفي</button>':"")+'<button class="btn ghost" data-neweval="'+e.id+'">إجراء تقييم KPI</button><button class="btn ghost" data-newedit="'+e.id+'">تعديل الموظف</button></div></div>';
    q("#fileModal").classList.remove("hidden");
  }
  async function deleteEmployee2(id){const e=employees.find(x=>x.id===id);if(!e||!confirm("هل تريد حذف الموظف «"+e.name+"»؟"))return;const r=await db.from("employees").delete().eq("id",id);if(r.error){alert("تعذر حذف الموظف.");return}employees=employees.filter(x=>x.id!==id);renderEmployeesPanel()}
  function renderEvaluationPanel(){const total=employees.length,linked=employees.filter(linkedJob).length;q("#evaluationHome").innerHTML='<div class="eval-summary"><div class="summary-card"><strong>'+total+'</strong><span>إجمالي الموظفين</span></div><div class="summary-card"><strong>'+linked+'</strong><span>مرتبطون بوصف وظيفي</span></div><div class="summary-card"><strong>'+(total-linked)+'</strong><span>يحتاجون إسناد مسمى</span></div></div>'}
  function initNewUI(){
    renderMainDepartments();
    document.querySelectorAll(".main-nav").forEach(n=>n.addEventListener("click",()=>showView(n.dataset.view)));
    q("#jobNav").addEventListener("click",()=>q("#jobDepartments").classList.toggle("collapsed"));
    q("#addEmployeeBtn").addEventListener("click",()=>populateEmployeeForm(""));
    q("#startEvaluationBtn").addEventListener("click",()=>window.openEvaluation());
    q("#employeeSearch").addEventListener("input",renderEmployeesPanel);
    q("#employeeDeptFilter").addEventListener("change",renderEmployeesPanel);
    q("#eDept").addEventListener("change",()=>fillEmployeeJobs(q("#eDept").value,""));
    q("#eJob").addEventListener("change",showLinkedJob);
    q("#employeeForm").addEventListener("submit",saveEmployeeForm);
    document.addEventListener("click",async ev=>{
      const d=ev.target.closest("[data-newdept]");if(d){activeDept=d.dataset.newdept;showView("jobs");if(typeof render==="function")render();renderMainDepartments();return}
      const f=ev.target.closest("[data-newfile]");if(f){openEmployeeFile2(f.dataset.newfile);return}
      const ed=ev.target.closest("[data-newedit]");if(ed){q("#fileModal")?.classList.add("hidden");populateEmployeeForm(ed.dataset.newedit);return}
      const de=ev.target.closest("[data-newdelete]");if(de){deleteEmployee2(de.dataset.newdelete);return}
      const ee=ev.target.closest("[data-neweval]");if(ee){q("#fileModal")?.classList.add("hidden");window.openEvaluation(ee.dataset.neweval);return}
      const fj=ev.target.closest("[data-file-job2]");if(fj){q("#fileModal").classList.add("hidden");if(window.showDetail)window.showDetail(fj.dataset.fileJob2);return}
    });
    showView("jobs");
  }
  window.openEmployeeForm=populateEmployeeForm;window.renderEmployeesPanel=renderEmployeesPanel;window.refreshMainDepartments=renderMainDepartments;
  setTimeout(async()=>{ await loadEmployees(); initNewUI(); },300);
})();
