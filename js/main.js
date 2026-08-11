(() => {
  // Vercel Web Analytics queue (must run before insights script processes events)
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Desktop header CTA visibility
  const headerCta = document.getElementById("header-cta");
  if (headerCta) {
    const syncCta = () => {
      headerCta.style.display = window.innerWidth > 820 ? "inline-flex" : "none";
    };
    syncCta();
    window.addEventListener("resize", syncCta);
  }

  // Year in footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Contact form (client-only notice; does not transmit data)
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = document.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        // textContent only — never inject raw user input as HTML
        success.textContent =
          "Thanks for reaching out. This form does not send email yet. Please call (601) 798-6331 or message us on Facebook.";
      }
      form.reset();
    });
  }

  // Harden external links opened in a new tab
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute("rel") || "").toLowerCase().split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });
})();
