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

  // Contact form → FormSubmit (delivers to business Gmail)
  const form = document.querySelector("#contact-form");
  if (form) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("contact-submit");
    const toEmail =
      (form.getAttribute("data-form-email") || "1stplaceexpresscarwash@gmail.com").trim();

    const setStatus = (type, text) => {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.className = "form-status show " + type;
      statusEl.textContent = text;
    };

    const fieldValue = (name) => {
      const el = form.elements.namedItem(name);
      return el && "value" in el ? String(el.value || "").trim() : "";
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Honeypot: real users leave this empty
      if (fieldValue("_honey")) {
        setStatus("success", "Thank you! Your message was sent.");
        form.reset();
        return;
      }

      const payload = {
        name: fieldValue("name"),
        email: fieldValue("email"),
        phone: fieldValue("phone"),
        preferred_location: fieldValue("preferred_location"),
        topic: fieldValue("topic"),
        message: fieldValue("message"),
        _subject: "New message from 1st Place Express website",
        _template: "table",
        _captcha: "false",
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      setStatus("info", "Sending your message…");

      try {
        const res = await fetch(
          "https://formsubmit.co/ajax/" + encodeURIComponent(toEmail),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await res.json().catch(() => ({}));

        if (res.ok && (data.success === "true" || data.success === true)) {
          form.reset();
          setStatus(
            "success",
            "Thank you! Your message was sent. We’ll get back to you as soon as we can. For faster help, call (601) 798-6331."
          );
        } else {
          // First-time FormSubmit activation often needs inbox confirmation
          const detail =
            (data && (data.message || data.error)) ||
            "Message may need activation — check 1stplaceexpresscarwash@gmail.com for a FormSubmit confirmation email, click Activate, then try again.";
          setStatus("error", detail + " Or call (601) 798-6331.");
        }
      } catch (err) {
        setStatus(
          "error",
          "Network error — please check your connection or call (601) 798-6331."
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send message";
        }
      }
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
