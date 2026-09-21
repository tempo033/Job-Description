const SUPABASE_URL="https://pdkdvaisggntdrvpxuur.supabase.co";
const SUPABASE_KEY="sb_publishable_S-xxocuLz-FX_6HLaYhb0A_Avnr01AW";
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
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
 const qualifications=arr("مؤهل علمي مناسب لطبيعة الوظيفة.","خبرة عملية مناسبة لمستوى الوظيفة ومسؤولياتها.");
 const skills=arr("التنظيم وإدارة الوقت.","الدقة والمتابعة.","التواصل والعمل الجماعي.","إجادة استخدام الحاسب والبرامج المرتبطة بالوظيفة.");
 const kpi=arr("نسبة إنجاز المهام في المواعيد المحددة.","دقة واكتمال السجلات والمستندات.","نسبة إغلاق الملاحظات والمعاملات المفتوحة.","الالتزام بالإجراءات والتعليمات.");
 const compliance=arr("الالتزام بسياسات الشركة واللوائح والتعليمات الداخلية.","المحافظة على سرية معلومات العمل والمستندات.","الالتزام بساعات العمل ومتطلبات الانضباط.","عدم تجاوز الصلاحيات المعتمدة.");
 return {name,department,manager,purpose,responsibilities,routine,authorities,qualifications,skills,kpi,compliance,updated_at:new Date().toISOString()};
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
function render(){renderDepts();const q=$("#search").value.trim().toLowerCase();let list=jobs.filter(j=>(activeDept==="الكل"||j.department===activeDept)&&[j.name,j.department,j.manager,j.purpose].join(" ").toLowerCase().includes(q));list.sort((a,b)=>$("#sort").value==="dept"?a.department.localeCompare(b.department,"ar")||a.name.localeCompare(b.name,"ar"):a.name.localeCompare(b.name,"ar"));$("#jobs").innerHTML=list.map(card).join("");$("#empty").classList.toggle("hidden",list.length>0)}
function card(j){return'<article class="job-card"><span class="tag">'+esc(j.department)+'</span><h3>'+esc(j.name)+'</h3><div class="manager">الرئيس المباشر: '+esc(j.manager||"—")+'</div><p class="purpose">'+esc(j.purpose||"لا يوجد وصف مختصر.")+'</p><div class="card-bottom"><button class="open" data-open="'+j.id+'">فتح الوصف</button><button class="edit-link" data-edit="'+j.id+'">تعديل</button></div></article>'}
function section(title,value,full=false,printHidden=false){const ls=lines(value);return'<div class="section '+(full?"full ":"")+(printHidden?"print-hidden":"")+'"><h3>'+title+'</h3>'+(ls.length?'<ul>'+ls.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':'<p>لا توجد بيانات مضافة.</p>')+'</div>'}
function showDetail(id){const j=jobs.find(x=>x.id===id);if(!j)return;currentId=id;$("#detail").innerHTML='<div class="print-header"><div class="print-company">شركة البنية الأساسية</div><div class="print-subcompany">إدارة الموارد البشرية</div><div class="print-doc">الوصف الوظيفي</div><div class="print-meta"><span>القسم: '+esc(j.department)+'</span><span>رقم الوثيقة: JD-'+esc(String(j.id||"").slice(0,8).toUpperCase())+'</span></div></div><div class="detail-top"><span class="tag">'+esc(j.department)+'</span><h2>'+esc(j.name)+'</h2><p>الرئيس المباشر: '+esc(j.manager||"—")+' • آخر تحديث: '+esc((j.updated_at||"").slice(0,10)||"—")+'</p><div class="detail-actions"><button class="btn gold" onclick="window.print()">طباعة / حفظ PDF</button><button class="btn ghost" style="color:var(--navy)" onclick="editJob(currentId)">تعديل</button><button class="btn ghost" style="color:var(--danger)" onclick="deleteJob(currentId)">حذف</button></div></div><div class="detail-grid"><div class="section full"><h3>الهدف العام من الوظيفة</h3><p>'+esc(j.purpose||"لا يوجد")+'</p></div>'+section("المهام والمسؤوليات الرئيسية",j.responsibilities,true)+section("المهام اليومية / الدورية",j.routine,false,true)+section("الصلاحيات والمسؤوليات",j.authorities)+section("المؤهلات",j.qualifications,false,true)+section("الخبرات والمهارات",j.skills,false,true)+section("مؤشرات الأداء KPI",j.kpi,false,true)+section("متطلبات الالتزام والانضباط",j.compliance,true,true)+'</div>';$("#detailModal").classList.remove("hidden")}
function editJob(id){const j=jobs.find(x=>x.id===id);if(!j)return;$("#jobId").value=j.id;$("#fName").value=j.name;$("#fDept").value=j.department;$("#fManager").value=j.manager||"";$("#fDate").value=(j.updated_at||today).slice(0,10);$("#fPurpose").value=j.purpose||"";$("#fResponsibilities").value=lines(j.responsibilities).join("\n");$("#fRoutine").value=lines(j.routine).join("\n");$("#fAuthorities").value=lines(j.authorities).join("\n");$("#fQualifications").value=lines(j.qualifications).join("\n");$("#fSkills").value=lines(j.skills).join("\n");$("#fKpi").value=lines(j.kpi).join("\n");$("#fCompliance").value=lines(j.compliance).join("\n");$("#formTitle").textContent="تعديل الوصف الوظيفي";$("#detailModal").classList.add("hidden");$("#formModal").classList.remove("hidden")}
async function deleteJob(id){const j=jobs.find(x=>x.id===id);if(!j)return;if(!confirm("هل أنت متأكد من حذف وصف وظيفة «"+j.name+"»؟"))return;const {error}=await db.from("job_descriptions").delete().eq("id",id);if(error){alert("تعذر حذف الوظيفة.");return}jobs=jobs.filter(x=>x.id!==id);$("#detailModal").classList.add("hidden");render()}
function addJob(){$("#jobForm").reset();$("#jobId").value="";$("#fDate").value=today;$("#formTitle").textContent="إضافة وصف وظيفي";$("#formModal").classList.remove("hidden")}
document.addEventListener("click",e=>{const d=e.target.closest("[data-dept]");if(d){activeDept=d.dataset.dept;render();return}if(e.target.id==="allDeptBtn"){activeDept="الكل";render();return}const o=e.target.closest("[data-open]");if(o)showDetail(o.dataset.open);const ed=e.target.closest("[data-edit]");if(ed)editJob(ed.dataset.edit);if(e.target.dataset.close)$(e.target.dataset.close).classList.add("hidden")});
$("#search").addEventListener("input",render);$("#sort").addEventListener("change",render);$("#addBtn").addEventListener("click",addJob);
$("#jobForm").addEventListener("submit",async e=>{e.preventDefault();const id=$("#jobId").value;const payload={name:$("#fName").value.trim(),department:$("#fDept").value.trim(),manager:$("#fManager").value.trim(),purpose:$("#fPurpose").value.trim(),responsibilities:lines($("#fResponsibilities").value),routine:lines($("#fRoutine").value),authorities:lines($("#fAuthorities").value),qualifications:lines($("#fQualifications").value),skills:lines($("#fSkills").value),kpi:lines($("#fKpi").value),compliance:lines($("#fCompliance").value),updated_at:new Date().toISOString()};let result;if(id)result=await db.from("job_descriptions").update(payload).eq("id",id).select().single();else result=await db.from("job_descriptions").insert(payload).select().single();if(result.error){alert("تعذر حفظ التعديل في قاعدة البيانات.");console.error(result.error);return}if(id){jobs=jobs.map(j=>j.id===id?result.data:j)}else jobs.push(result.data);$("#formModal").classList.add("hidden");render()});
$("#exportBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(jobs,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="job-description-library.json";a.click();URL.revokeObjectURL(a.href)});
$("#importInput").addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=async()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x))throw 0;const rows=x.map(j=>({...j,id:j.id||crypto.randomUUID()}));const {data,error}=await db.from("job_descriptions").upsert(rows).select();if(error)throw error;jobs=data;render();alert("تم استيراد البيانات وحفظها في Supabase.")}catch(err){console.error(err);alert("ملف البيانات غير صالح أو تعذر حفظه.")}};r.readAsText(file)});
window.editJob=editJob;window.deleteJob=deleteJob;window.currentId=null;
loadJobs();