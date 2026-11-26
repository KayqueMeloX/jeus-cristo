(function (w, d) {
  // The quiz iframe shares the parent seal; standalone quiz pages load their own.
  try {
    if (w !== w.top && w.top.mundpayStickerLoaded) return;
  } catch (error) { /* Cross-origin embeds keep their own seal. */ }
  if (w.mundpayStickerLoaded) return;
  w.mundpayStickerLoaded = true;

  var config = {
    secureLabel: "SECURE PURCHASE",
    logoUrl: "https://scripts.mundpay.com/logo.svg",
    worldColor: "#A9D342",
    privacyPolicyUrl: "https://www.mundpay.com.br/en/privacy-policy",
    termsUrl: "https://www.mundpay.com.br/en/terms-of-use",
    contactUrl: "https://orders.mundpay.com/",
    modalHeadline: "Mundpay is responsible for this purchase!",
    modalText:
      "You can buy with confidence, knowing that Mundpay’s customer support is here to help you throughout the process if needed.",
  };

  function createSticker() {
    var sticker = d.createElement("div");
    sticker.id = "mundpay-sticker";
    sticker.style.position = "fixed";
    sticker.style.left = "0";
    sticker.style.bottom = "78px";
    sticker.style.width = "0";
    sticker.style.height = "0";
    sticker.style.zIndex = "10001";
    sticker.style.pointerEvents = "auto";
    sticker.style.userSelect = "none";

    function adjustStickerBottom() {
      if (window.innerWidth <= 320) {
        sticker.style.bottom = "100px";
      } else if (window.innerWidth <= 722) {
        sticker.style.bottom = "90px";
      } else {
        sticker.style.bottom = "78px";
      }
    }
    adjustStickerBottom();
    window.addEventListener("resize", adjustStickerBottom);

    sticker.innerHTML = `
  <style>
    /* The static quiz resets inline transforms; keep this vendor seal intact. */
    #mundpay-sticker #mundpay-sticker-inner {
      transform: rotate(45deg) translate(-64px, 64px) !important;
    }
    @media (max-width: 600px) {
      #mundpay-sticker #mundpay-sticker-inner {
        width: 210px !important;
        font-size: 13px !important;
        padding: 3px 8px !important;
        transform: rotate(45deg) translate(-24px, 40px) !important;
      }
      #mundpay-sticker-inner img {
        width: 70px !important;
      }
      #mundpay-sticker-inner span {
        font-size: 8px !important;
      }
      #mundpay-sticker-inner svg {
        width: 12px !important;
        height: 12px !important;
      }
    }
  </style>
  <div id="mundpay-sticker-inner" style="
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(45deg) translate(-64px, 64px);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 4px 12px;
    width: 330px;
    font-family: 'Inter', -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #222;
    box-sizing: border-box;
    cursor: pointer;
    letter-spacing: 0.01em;
    border: 1.5px solid #E5E7EB;
  ">
    <div style="display:flex;align-items:center;gap:4px;flex-direction:column;">
      <img src="${config.logoUrl}" alt="Mundpay" style="height:auto;width:120px;">
      <span style="font-size:12px;color:#888;font-weight:500;">${config.secureLabel}</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${config.worldColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
`;
    d.body.appendChild(sticker);

    var stickerInner = sticker.querySelector("#mundpay-sticker-inner");
    if (stickerInner) {
      stickerInner.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)";
      });
      stickerInner.addEventListener("mouseleave", function () {
        this.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
      });
      stickerInner.addEventListener("click", openModal);
    }
  }

  function createModal() {
    var modal = d.createElement("div");
    modal.id = "mundpay-modal";
    modal.innerHTML = `
      <div id="mundpay-modal-overlay" style="
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.38);
        z-index: 99999999;
        display: none;
        justify-content: center;
        align-items: center;
      ">
        <div id="mundpay-modal-content" style="
          background: #fff;
          border-radius: 16px;
          padding: 36px 32px 28px 32px;
          max-width: 420px;
          width: 90vw;
          box-shadow: 0 12px 40px rgba(0,0,0,0.13);
          position: relative;
          font-family: 'Inter', -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
        ">
          <button id="mundpay-close-btn" style="
            position: absolute;
            top: 18px;
            right: 18px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #888;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
          " aria-label="Close">&times;</button>
          <img src="${
            config.logoUrl
          }" alt="Mundpay" style="height:auto;width:150px;">
          <h2 style="margin: 18px 0; color: #222; font-size: 20px; font-weight: 700;">${
            config.modalHeadline
          }</h2>
          <p style="color: #444; line-height: 1.6; margin-bottom: 22px; font-size: 16px;">
            ${config.modalText}
          </p>
          <a href="${
            config.contactUrl
          }" target="_blank" style="display: block; text-align: center; border: 2px solid #A9D342; color: #A9D342; width: 100%; background: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-weight: 600;">Click here to help</a>
          <div style="margin-top: 10px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #aaa; text-align: center;">
            &copy; ${new Date().getFullYear()} Mundpay. All rights reserved.
          </div>
        </div>
      </div>
    `;
    d.body.appendChild(modal);

    var overlay = modal.querySelector("#mundpay-modal-overlay");
    var closeBtn = modal.querySelector("#mundpay-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("mouseenter", function () {
        this.style.background = "#f5f5f5";
      });
      closeBtn.addEventListener("mouseleave", function () {
        this.style.background = "none";
      });
      closeBtn.addEventListener("click", closeModal);
    }
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
      });
    }
  }

  function openModal() {
    var modal = d.getElementById("mundpay-modal");
    if (modal) {
      var overlay = modal.querySelector("#mundpay-modal-overlay");
      if (overlay) overlay.style.display = "flex";
    }
  }

  function closeModal() {
    var modal = d.getElementById("mundpay-modal");
    if (modal) {
      var overlay = modal.querySelector("#mundpay-modal-overlay");
      if (overlay) overlay.style.display = "none";
    }
  }

  function createFooter() {
    var footer = d.createElement("div");
    footer.id = "mundpay-footer";
    footer.style.position = "fixed";
    footer.style.left = "0";
    footer.style.bottom = "0";
    footer.style.width = "100vw";
    footer.style.background = "#fff";
    footer.style.fontFamily =
      "'Inter', -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif";
    footer.style.fontSize = "12px";

    function adjustToResponsive() {
      if (window.innerWidth <= 600) {
        footer.style.fontSize = "10px";
      } else {
        footer.style.fontSize = "12px";
      }
    }
    adjustToResponsive();
    window.addEventListener("resize", adjustToResponsive);

    footer.style.color = "#888";
    footer.style.textAlign = "center";
    footer.style.padding = "8px 12px";
    footer.style.zIndex = "99999";
    footer.style.borderTop = "1.5px solid #E5E7EB";

    footer.innerHTML = `
      ${new Date().getFullYear()} &copy; Mund USA LLC. (United States) Review legal <a href="${
        config.termsUrl
      }" target="_blank" style="color:#A9D342;text-decoration:none;font-weight:600;">Terms Of User</a>
      and <a href="${
        config.privacyPolicyUrl
      }" target="_blank" style="color:#A9D342;text-decoration:none;font-weight:600;">Privacy Policy</a>. <a href="${
      config.contactUrl
    }" target="_blank" style="color:#A9D342;text-decoration:none;font-weight:600;">Contact Us</a>.
    `;
    d.body.appendChild(footer);
  }

  function loadInterFont() {
    if (!d.getElementById("mundpay-inter-font")) {
      var link = d.createElement("link");
      link.id = "mundpay-inter-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      d.head.appendChild(link);
    }
  }

  function init() {
    loadInterFont();
    createSticker();
    createModal();
    createFooter();
  }

  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);