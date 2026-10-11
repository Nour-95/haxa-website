document.addEventListener("DOMContentLoaded", () => {
  // Demo-only booking. Never log or transmit visitor data.
  const form = document.getElementById("booking-form");
  const feedback = document.getElementById("booking-feedback");
  if (form && feedback) {
    const date = document.getElementById("date");
    if (date) {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      date.min = localDate.toISOString().slice(0, 10);
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      feedback.textContent = "Demo complete — no reservation was made and no information was sent or saved.";
      feedback.hidden = false;
      form.reset();
    });
  }

  const galleries = {
    witch: ["Photos/2.jpg", "Photos/3.jpg", "Photos/8.jpg"],
    ritual: ["Photos/4.jpg", "Photos/5.jpg", "Photos/9.jpg"],
    forest: ["Photos/6.jpg", "Photos/7.jpg", "Photos/10.jpg"],
  };
  const currentIndex = { witch: 0, ritual: 0, forest: 0 };
  function showImage(theme) {
    const img = document.getElementById(theme);
    if (img && galleries[theme]) {
      img.src = galleries[theme][currentIndex[theme]];
      img.alt = `${theme.charAt(0).toUpperCase() + theme.slice(1)} experience — scene ${currentIndex[theme] + 1}`;
    }
  }
  window.nextImage = (theme) => {
    if (!galleries[theme]) return;
    currentIndex[theme] = (currentIndex[theme] + 1) % galleries[theme].length;
    showImage(theme);
  };
  window.prevImage = (theme) => {
    if (!galleries[theme]) return;
    currentIndex[theme] = (currentIndex[theme] - 1 + galleries[theme].length) % galleries[theme].length;
    showImage(theme);
  };
  Object.keys(galleries).forEach(showImage);

  const modal = document.getElementById("modal");
  const ctaButton = document.querySelector(".cta-button");
  const closeButton = modal?.querySelector(".close-button");
  let lastFocused = null;
  const getFocusable = () => [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter(el => !el.disabled && el.getClientRects().length);
  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton?.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocused?.focus();
  }
  if (modal && ctaButton && closeButton) {
    ctaButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    modal.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); closeModal(); }
      if (event.key !== "Tab") return;
      const focusables = getFocusable();
      if (!focusables.length) { event.preventDefault(); return; }
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
});
