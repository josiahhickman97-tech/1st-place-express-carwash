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

  // Contact form → Web3Forms (https://web3forms.com)
  const form = document.querySelector("#contact-form");
  if (form) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("contact-submit");
    const keyInput = document.getElementById("web3forms-key");

    const setStatus = (type, text) => {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.className = "form-status show " + type;
      statusEl.textContent = text;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const accessKey = (keyInput && keyInput.value ? keyInput.value : "").trim();
      if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        setStatus(
          "error",
          "Contact form is not configured yet. Please call (601) 798-6331 or message us on Facebook. (Owner: add your free Web3Forms access key in contact.html.)"
        );
        return;
      }

      if (!form.reportValidity()) return;

      const payload = {
        access_key: accessKey,
        subject: "New message from 1st Place Express website",
        from_name: "1st Place Express Website",
        name: (form.elements.namedItem("name") || {}).value || "",
        email: (form.elements.namedItem("email") || {}).value || "",
        phone: (form.elements.namedItem("phone") || {}).value || "",
        "Preferred location": (form.elements.namedItem("Preferred location") || {}).value || "",
        Topic: (form.elements.namedItem("Topic") || {}).value || "",
        message: (form.elements.namedItem("message") || {}).value || "",
        botcheck: form.querySelector('[name="botcheck"]')?.checked || false,
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      setStatus("info", "Sending your message…");

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          form.reset();
          // restore hidden defaults after reset
          if (keyInput) keyInput.value = accessKey;
          const subject = form.querySelector('input[name="subject"]');
          const fromName = form.querySelector('input[name="from_name"]');
          if (subject) subject.value = "New message from 1st Place Express website";
          if (fromName) fromName.value = "1st Place Express Website";
          setStatus(
            "success",
            "Thank you! Your message was sent. We’ll get back to you as soon as we can. For faster help, call (601) 798-6331."
          );
        } else {
          const detail =
            (data && (data.message || data.error)) ||
            "Something went wrong sending your message.";
          setStatus(
            "error",
            detail + " Please try again or call (601) 798-6331."
          );
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
