/* =====================================================
   Motiur Tech — script.js
   Handles: WhatsApp order links, service rendering,
   search + platform filter, mobile nav, header state.
===================================================== */

(function () {
  "use strict";

  /* ---------- Config ---------- */
  const WHATSAPP_NUMBER = "8801910966783"; // international format, no + or 0

  const PLATFORM_META = {
    Facebook: { icon: "fa-brands fa-facebook", color: "#1877F2" },
    TikTok: { icon: "fa-brands fa-tiktok", color: "#69C9D0" },
    Instagram: { icon: "fa-brands fa-instagram", color: "#E1306C" },
    YouTube: { icon: "fa-brands fa-youtube", color: "#FF0000" },
  };

  /* ---------- Service data ---------- */
  const SERVICES = [
    // Facebook
    { platform: "Facebook", name: "Facebook Followers" },
    { platform: "Facebook", name: "Facebook Page Likes" },
    { platform: "Facebook", name: "Facebook Post Likes" },
    { platform: "Facebook", name: "Facebook Post Comments" },
    { platform: "Facebook", name: "Facebook Post Shares" },
    { platform: "Facebook", name: "Facebook Video Views" },
    { platform: "Facebook", name: "Facebook Reel Views" },
    { platform: "Facebook", name: "Facebook Live Views" },
    { platform: "Facebook", name: "Facebook Story Views" },
    { platform: "Facebook", name: "Facebook Group Members" },
    { platform: "Facebook", name: "Facebook Group Post Engagement" },
    { platform: "Facebook", name: "Facebook Page Engagement" },
    { platform: "Facebook", name: "Facebook Watch Time" },
    { platform: "Facebook", name: "Facebook Monetization Support" },
    { platform: "Facebook", name: "Facebook Page Promotion" },
    { platform: "Facebook", name: "Facebook Page Growth" },
    { platform: "Facebook", name: "Facebook Followers Growth" },
    { platform: "Facebook", name: "Facebook Video Promotion" },
    { platform: "Facebook", name: "Facebook Reel Promotion" },

    // TikTok
    { platform: "TikTok", name: "TikTok Followers" },
    { platform: "TikTok", name: "TikTok Likes" },
    { platform: "TikTok", name: "TikTok Video Views" },
    { platform: "TikTok", name: "TikTok Comments" },
    { platform: "TikTok", name: "TikTok Shares" },
    { platform: "TikTok", name: "TikTok Saves" },
    { platform: "TikTok", name: "TikTok Live Views" },
    { platform: "TikTok", name: "TikTok Live Followers" },
    { platform: "TikTok", name: "TikTok Profile Views" },
    { platform: "TikTok", name: "TikTok Video Promotion" },
    { platform: "TikTok", name: "TikTok Account Growth" },
    { platform: "TikTok", name: "TikTok Engagement" },

    // Instagram
    { platform: "Instagram", name: "Instagram Followers" },
    { platform: "Instagram", name: "Instagram Likes" },
    { platform: "Instagram", name: "Instagram Video Views" },
    { platform: "Instagram", name: "Instagram Reel Views" },
    { platform: "Instagram", name: "Instagram Comments" },
    { platform: "Instagram", name: "Instagram Shares" },
    { platform: "Instagram", name: "Instagram Saves" },
    { platform: "Instagram", name: "Instagram Story Views" },
    { platform: "Instagram", name: "Instagram Profile Visits" },
    { platform: "Instagram", name: "Instagram Engagement" },
    { platform: "Instagram", name: "Instagram Account Growth" },
    { platform: "Instagram", name: "Instagram Reel Promotion" },
    { platform: "Instagram", name: "Instagram Post Promotion" },

    // YouTube
    { platform: "YouTube", name: "YouTube Subscribers" },
    { platform: "YouTube", name: "YouTube Views" },
    { platform: "YouTube", name: "YouTube Likes" },
    { platform: "YouTube", name: "YouTube Comments" },
    { platform: "YouTube", name: "YouTube Watch Time" },
    { platform: "YouTube", name: "YouTube Shorts Views" },
    { platform: "YouTube", name: "YouTube Live Views" },
    { platform: "YouTube", name: "YouTube Channel Promotion" },
    { platform: "YouTube", name: "YouTube Video Promotion" },
    { platform: "YouTube", name: "YouTube Channel Growth" },
    { platform: "YouTube", name: "YouTube Engagement" },
  ];

  const PLATFORM_ORDER = ["Facebook", "TikTok", "Instagram", "YouTube"];

  /* ---------- WhatsApp link builder ---------- */
  function buildWhatsappLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  function serviceMessage(serviceName) {
    return `Hello Motiur Tech, I want to order ${serviceName}.`;
  }

  /* ---------- Set generic WhatsApp buttons (hero, nav, contact, footer) ---------- */
  function wireGenericWhatsappButtons() {
    const genericLink = buildWhatsappLink("Hello Motiur Tech, I would like to know more about your services.");
    const ids = ["heroWhatsapp", "navWhatsapp", "contactWhatsapp", "footerWhatsapp"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute("href", genericLink);
    });
  }

  /* ---------- Render services grouped by platform ---------- */
  const container = document.getElementById("servicesContainer");
  const noResultsEl = document.getElementById("noResults");

  function iconMarkup(platform) {
    const meta = PLATFORM_META[platform];
    return `<i class="${meta.icon}"></i>`;
  }

  function createServiceCard(service) {
    const card = document.createElement("article");
    card.className = "service-card";
    card.dataset.platform = service.platform;
    card.dataset.name = service.name.toLowerCase();

    card.innerHTML = `
      <div class="service-card-icon">${iconMarkup(service.platform)}</div>
      <h4>${service.name}</h4>
      <button type="button" class="service-card-btn" data-service="${service.name}">
        <i class="fa-brands fa-whatsapp"></i>
        <span>Order Now</span>
      </button>
    `;

    const btn = card.querySelector(".service-card-btn");
    btn.addEventListener("click", () => {
      const link = buildWhatsappLink(serviceMessage(service.name));
      window.open(link, "_blank", "noopener");
    });

    return card;
  }

  function renderServices() {
    container.innerHTML = "";

    PLATFORM_ORDER.forEach((platform) => {
      const items = SERVICES.filter((s) => s.platform === platform);
      const group = document.createElement("div");
      group.className = "platform-group";
      group.dataset.platform = platform;

      const head = document.createElement("div");
      head.className = "platform-group-head";
      head.innerHTML = `
        ${iconMarkup(platform)}
        <h3>${platform} Services</h3>
        <span class="count">(${items.length})</span>
      `;

      const grid = document.createElement("div");
      grid.className = "service-grid";
      items.forEach((service) => grid.appendChild(createServiceCard(service)));

      group.appendChild(head);
      group.appendChild(grid);
      container.appendChild(group);
    });
  }

  /* ---------- Search + filter ---------- */
  const searchInput = document.getElementById("serviceSearch");
  const filterTabs = document.getElementById("filterTabs");
  let activeFilter = "all";

  function applyFiltering() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    document.querySelectorAll(".platform-group").forEach((group) => {
      const groupPlatform = group.dataset.platform;
      const platformMatches = activeFilter === "all" || activeFilter === groupPlatform;

      let visibleInGroup = 0;

      group.querySelectorAll(".service-card").forEach((card) => {
        const nameMatches = !query || card.dataset.name.includes(query);
        const visible = platformMatches && nameMatches;
        card.style.display = visible ? "" : "none";
        if (visible) visibleInGroup++;
      });

      group.style.display = visibleInGroup > 0 ? "" : "none";
      if (visibleInGroup > 0) anyVisible = true;
    });

    noResultsEl.hidden = anyVisible;
  }

  function wireControls() {
    searchInput.addEventListener("input", applyFiltering);

    filterTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-tab");
      if (!btn) return;

      filterTabs.querySelectorAll(".filter-tab").forEach((tab) => {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      activeFilter = btn.dataset.filter;
      applyFiltering();
    });
  }

  /* ---------- Mobile nav ---------- */
  function wireMobileNav() {
    const hamburger = document.getElementById("hamburgerBtn");
    const menu = document.getElementById("mobileMenu");

    hamburger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  function wireHeaderScrollState() {
    const header = document.getElementById("siteHeader");
    let lastState = false;

    function update() {
      const scrolled = window.scrollY > 12;
      if (scrolled !== lastState) {
        header.style.boxShadow = scrolled ? "0 10px 30px -18px rgba(0,0,0,0.6)" : "none";
        lastState = scrolled;
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    wireGenericWhatsappButtons();
    renderServices();
    wireControls();
    wireMobileNav();
    wireHeaderScrollState();
  });
})();
