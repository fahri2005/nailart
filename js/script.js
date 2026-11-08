/**
 * LUMINA NAILS & CO. - Interactive Features Script
 * Handles: WhatsApp Booking Generator, Gallery Filter & Lightbox,
 * FAQ Accordion, Mobile Menu, Sticky Navigation, and Toast notifications.
 */

// Configuration: Ubah nomor WhatsApp studio di sini
const STUDIO_PHONE = "6285772028609"; // Nomor WhatsApp Niwi
const STUDIO_NAME = "Niwi Nail Studio";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initGalleryFilter();
  initLightbox();
  initFaqAccordion();
  initBookingModal();
  initServiceSelectButtons();
  initBackToTop();
  initPromoCopy();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById("main-nav");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileDrawerClose = document.getElementById("mobile-drawer-close");
  const mobileDrawerBackdrop = document.getElementById("mobile-drawer-backdrop");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("bg-white/95", "shadow-sm", "py-3");
      navbar.classList.remove("bg-white/80", "py-4");
    } else {
      navbar.classList.remove("bg-white/95", "shadow-sm", "py-3");
      navbar.classList.add("bg-white/80", "py-4");
    }
  });

  const openDrawer = () => {
    mobileDrawer.classList.remove("translate-x-full");
    mobileDrawerBackdrop.classList.remove("hidden");
    setTimeout(() => {
      mobileDrawerBackdrop.classList.remove("opacity-0");
    }, 10);
    document.body.classList.add("overflow-hidden");
  };

  const closeDrawer = () => {
    mobileDrawer.classList.add("translate-x-full");
    mobileDrawerBackdrop.classList.add("opacity-0");
    setTimeout(() => {
      mobileDrawerBackdrop.classList.add("hidden");
    }, 300);
    document.body.classList.remove("overflow-hidden");
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener("click", closeDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener("click", closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   2. GALLERY FILTER & CATEGORIES
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state button
      filterButtons.forEach((b) => {
        b.classList.remove("bg-stone-900", "text-white", "shadow-md");
        b.classList.add("bg-white", "text-stone-700", "border-stone-200");
      });
      btn.classList.add("bg-stone-900", "text-white", "shadow-md");
      btn.classList.remove("bg-white", "text-stone-700", "border-stone-200");

      const category = btn.getAttribute("data-category");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
          item.classList.remove("hidden");
          item.classList.add("fade-in");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. GALLERY LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxBookBtn = document.getElementById("lightbox-book-btn");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");

  const openLightbox = (imgSrc, title, category, desc) => {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
    lightboxDesc.textContent = desc;

    // Set WA link for this specific design
    const waText = encodeURIComponent(
      `Halo ${STUDIO_NAME}, saya tertarik untuk reservasi dengan referensi desain nail art: *${title}* (${category}). Apakah masih tersedia slot untuk minggu ini?`
    );
    lightboxBookBtn.href = `https://wa.me/${STUDIO_PHONE}?text=${waText}`;

    lightboxModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };

  const closeLightbox = () => {
    lightboxModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  document.querySelectorAll(".gallery-view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = btn.closest(".gallery-item");
      const img = parent.querySelector("img").src;
      const title = parent.getAttribute("data-title") || "Nail Art Design";
      const category = parent.getAttribute("data-category-label") || "Koleksi Eksklusif";
      const desc = parent.getAttribute("data-desc") || "Desain kuku estetik dengan detail presisi dan ketahanan hingga 4-5 minggu.";
      openLightbox(img, title, category, desc);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    trigger.addEventListener("click", () => {
      const isOpen = !content.classList.contains("hidden");

      // Close all first (optional: accordion behavior)
      faqItems.forEach((other) => {
        const otherContent = other.querySelector(".faq-content");
        const otherIcon = other.querySelector(".faq-icon");
        otherContent.classList.add("hidden");
        if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        content.classList.remove("hidden");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE WHATSAPP BOOKING MODAL & GENERATOR
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const bookingModal = document.getElementById("booking-modal");
  const bookingBackdrop = document.getElementById("booking-backdrop");
  const bookingClose = document.getElementById("booking-close");
  const openBookingBtns = document.querySelectorAll(".open-booking-modal-btn");
  const bookingForm = document.getElementById("booking-form");

  // Set min date to today
  const dateInput = document.getElementById("booking-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  const openModal = (preselectedService = null) => {
    if (preselectedService) {
      const serviceSelect = document.getElementById("booking-service");
      if (serviceSelect) {
        serviceSelect.value = preselectedService;
      }
    }
    bookingModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    bookingModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  openBookingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const service = btn.getAttribute("data-service");
      openModal(service);
    });
  });

  if (bookingClose) bookingClose.addEventListener("click", closeModal);
  if (bookingBackdrop) bookingBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !bookingModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Handle Form Submit and Generate WhatsApp Link
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("booking-name").value.trim();
      const phone = document.getElementById("booking-phone").value.trim();
      const date = document.getElementById("booking-date").value;
      const time = document.getElementById("booking-time").value;
      const service = document.getElementById("booking-service").value;
      const notes = document.getElementById("booking-notes").value.trim();

      // Collect checked add-ons
      const addons = [];
      document.querySelectorAll('input[name="booking-addon"]:checked').forEach((box) => {
        addons.push(box.value);
      });
      const addonsText = addons.length > 0 ? addons.join(", ") : "Tidak ada";

      // Format WhatsApp Message
      const message = `Halo *${STUDIO_NAME}*, saya ingin reservasi jadwal appointment:
      
🌸 *Data Pelanggan:*
• Nama: ${name}
• WhatsApp: ${phone || "-"}

💅 *Rincian Layanan:*
• Layanan Utama: ${service}
• Layanan Tambahan (Add-on): ${addonsText}

📅 *Jadwal yang Diinginkan:*
• Tanggal: ${formatDateIndo(date)}
• Jam: ${time} WIB

📝 *Catatan / Request Desain:*
${notes ? notes : "Sesuai rekomendasi saat kedatangan"}

Mohon konfirmasi ketersediaan slotnya ya. Terima kasih! ✨`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodedMsg}`;

      // Open in new tab
      window.open(waUrl, "_blank");
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   6. CONNECT SERVICE CARDS DIRECTLY TO BOOKING MODAL
   -------------------------------------------------------------------------- */
function initServiceSelectButtons() {
  document.querySelectorAll(".select-service-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceName = btn.getAttribute("data-service-name");
      const serviceSelect = document.getElementById("booking-service");
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      const bookingModal = document.getElementById("booking-modal");
      if (bookingModal) {
        bookingModal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.add("opacity-100", "translate-y-0");
    } else {
      backToTopBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.remove("opacity-100", "translate-y-0");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   8. PROMO CODE CLIPBOARD COPY & TOAST
   -------------------------------------------------------------------------- */
function initPromoCopy() {
  const promoBadge = document.getElementById("promo-copy-badge");
  if (!promoBadge) return;

  promoBadge.addEventListener("click", () => {
    const code = promoBadge.getAttribute("data-code") || "NIWI20";
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Kode "${code}" berhasil disalin! Dapatkan diskon 20% saat reservasi.`);
    }).catch(() => {
      showToast(`Gunakan kode promo: ${code}`);
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-stone-900/90 backdrop-blur-md text-white text-xs md:text-sm font-medium shadow-2xl transition-all duration-300 opacity-0 translate-y-4 pointer-events-none flex items-center gap-2 border border-rose-200/30";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.remove("opacity-0", "translate-y-4");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3500);
}

// Helper: Format tanggal Indonesia
function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", options);
}

