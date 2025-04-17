document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ navbar.js loaded");
  
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-menu");
  
    if (!toggle || !nav) {
      console.error("❌ 找不到 nav-toggle 或 nav-menu");
      return;
    }
  
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      toggle.classList.toggle("show-icon");
      console.log("✅ 已觸發選單展開");
    });
  });
  