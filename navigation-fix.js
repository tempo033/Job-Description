(function(){
  "use strict";

  function showMainView(name){
    document.querySelectorAll(".view").forEach(function(v){v.classList.add("hidden");});
    var view=document.getElementById(name+"View");
    if(view) view.classList.remove("hidden");
    document.querySelectorAll(".main-nav").forEach(function(n){
      n.classList.toggle("active", n.getAttribute("data-view")===name);
    });
    if(name==="employees" && typeof window.renderEmployeesPanel==="function"){
      if(typeof window.loadEmployees==="function"){
        Promise.resolve(window.loadEmployees()).then(function(){window.renderEmployeesPanel();});
      }else{
        window.renderEmployeesPanel();
      }
    }
    if(name==="evaluation" && typeof window.renderEvaluationPanel==="function"){
      window.renderEvaluationPanel();
    }
  }

  function wire(){
    if(window.__navigationFixReady) return;
    window.__navigationFixReady=true;

    document.addEventListener("click",function(ev){
      var nav=ev.target.closest(".main-nav");
      if(nav){
        ev.preventDefault();
        ev.stopPropagation();
        var view=nav.getAttribute("data-view");
        if(view) showMainView(view);
        if(view==="jobs"){
          var sub=document.getElementById("jobDepartments");
          if(sub) sub.classList.toggle("collapsed");
        }
        return;
      }

      var dept=ev.target.closest("[data-newdept]");
      if(dept){
        ev.preventDefault();
        ev.stopPropagation();
        document.querySelectorAll(".view").forEach(function(v){v.classList.add("hidden");});
        var jobs=document.getElementById("jobsView");
        if(jobs) jobs.classList.remove("hidden");
        document.querySelectorAll(".main-nav").forEach(function(n){
          n.classList.toggle("active",n.getAttribute("data-view")==="jobs");
        });
        if(typeof window.refreshMainDepartments==="function") window.refreshMainDepartments();
        return;
      }

      var addEmployee=ev.target.closest("#addEmployeeBtn");
      if(addEmployee && typeof window.openEmployeeForm==="function"){
        ev.preventDefault();
        window.openEmployeeForm("");
        return;
      }

      var startEval=ev.target.closest("#startEvaluationBtn");
      if(startEval && typeof window.openEvaluation==="function"){
        ev.preventDefault();
        window.openEvaluation();
        return;
      }
    },true);

    document.addEventListener("change",function(ev){
      if(ev.target && ev.target.id==="employeeDeptFilter" && typeof window.renderEmployeesPanel==="function"){
        window.renderEmployeesPanel();
      }
    });

    showMainView("jobs");
    if(typeof window.refreshMainDepartments==="function") window.refreshMainDepartments();
    /* تأكد من تحميل مكتبة الوظائف قبل بناء القائمة الجانبية، ثم أعد رسمها بعد اكتمال الطلب. */
    if(typeof window.loadJobs==="function"){
      Promise.resolve(window.loadJobs()).then(function(){
        if(typeof window.refreshMainDepartments==="function") window.refreshMainDepartments();
      }).catch(function(err){console.error("Job library load failed:",err);});
    }
    (function refreshJobMenu(attempt){
      if(typeof window.refreshMainDepartments==="function") window.refreshMainDepartments();
      if(attempt < 20) setTimeout(function(){refreshJobMenu(attempt+1);},250);
    })(0);
    if(typeof window.loadEmployees==="function"){
      Promise.resolve(window.loadEmployees()).then(function(){
        if(typeof window.renderEmployeesPanel==="function") window.renderEmployeesPanel();
        if(typeof window.renderEvaluationPanel==="function") window.renderEvaluationPanel();
      });
    }
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",wire);
  else wire();
})();