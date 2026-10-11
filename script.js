// --- Booking Form Logic ---
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const booking = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        teamSize: document.getElementById("team-size").value,
        experience: document.getElementById("experience").value,
        date: document.getElementById("date").value,
      };

      console.log("New booking:", booking);
      alert(
        "Booking submitted! Thank you, " +
          booking.name +
          ". We'll contact you shortly."
      );

      this.reset();
    });
  }

  // --- Image Gallery Logic ---
  const galleries = {
    witch: ["Photos/2.jpg", "Photos/3.jpg","Photos/8.jpg"],
    ritual: ["Photos/4.jpg", "Photos/5.jpg", "Photos/9.jpg"],
    forest: ["Photos/6.jpg", "Photos/7.jpg", "Photos/10.jpg"],
  };

  let currentIndex = {
    witch: 0,
    ritual: 0,
    forest: 0,
  };

  function showImage(theme) {
    const imgElement = document.getElementById(theme);
    if (imgElement) {
      imgElement.src = galleries[theme][currentIndex[theme]];
    }
  }

  window.nextImage = function (theme) {
    if (currentIndex[theme] < galleries[theme].length - 1) {
      currentIndex[theme]++;
    } else {
      currentIndex[theme] = 0;
    }
    showImage(theme);
  };

  window.prevImage = function (theme) {
    if (currentIndex[theme] > 0) {
      currentIndex[theme]--;
    } else {
      currentIndex[theme] = galleries[theme].length - 1;
    }
    showImage(theme);
  };

  // Initialize if the image exists
  ["witch", "ritual", "forest"].forEach((theme) => {
    if (document.getElementById(theme)) {
      showImage(theme);
    }
  });

  // --- Modal Logic ---
  const modal = document.getElementById("modal");
  const ctaButton = document.querySelector(".cta-button");
  const closeButton = document.querySelector(".close-button");

  // Show the modal only when the "Discover Now" button is clicked
  ctaButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    modal.style.display = "flex"; // Show the modal
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", function () {
    modal.style.display = "none"; // Hide the modal
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none"; // Hide the modal
    }
  });
});
