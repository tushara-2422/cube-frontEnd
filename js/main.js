







const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");
  const icon = item.querySelector(".icon");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // Close all items
    accordionItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-content").style.maxHeight = null;
      i.querySelector(".icon").textContent = "+";
    });

    // Open clicked item
    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      icon.textContent = "+";
    }
  });
});






const statsSection = document.getElementById("statsBanner");
const statNumbers = statsSection.querySelectorAll("h3");

const animateStats = () => {
  statNumbers.forEach(stat => {
    const target = +stat.dataset.target;
    let current = 0;
    const duration = 1200;
    const step = target / (duration / 16);

    const update = () => {
      current += step;
      if (current < target) {
        stat.textContent = `${Math.floor(current)}%`;
        requestAnimationFrame(update);
      } else {
        stat.textContent = `${target}%`;
      }
    };

    update();
  });
};

const resetStats = () => {
  statNumbers.forEach(stat => {
    stat.textContent = "0%";
  });
};

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
      } else {
        resetStats();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(statsSection);



//**PRODUCT**//
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image");
  const leftBtn = document.querySelector(".nav-btn.left");
  const rightBtn = document.querySelector(".nav-btn.right");
  const dots = document.querySelectorAll(".dot");
  const thumbs = document.querySelectorAll(".gallery-thumbs img");
  const fragranceCards = document.querySelectorAll(".fragrance");
  
  const addToCartBtn = document.querySelector(".add-to-cart");

  /* IMAGE SETS */
  const images = {
    original: [
      "assets/images/big-pink.png",
      "assets/images/A.png",
      "assets/images/B.png",
      "assets/images/C.png",
      "assets/images/D.png"
    ],
    lily: [
      "assets/images/lily-1.png",
      "assets/images/lily-2.png",
      "assets/images/lily-3.png",
      "assets/images/lily-4.png"
    ],
    rose: [
      "assets/images/rose-1.png",
      "assets/images/rose-2.png",
      "assets/images/rose-3.png",
      "assets/images/rose-4.png"
    ]
  };

  let subscriptionType = "single";
  let selectedFragrance = "original";
  let secondFragrance = "lily";
  let activeFragrance = "original";
  let index = 0;

  function updateImage() {
    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = images[activeFragrance][index];
      mainImage.classList.remove("fade-out");

      dots.forEach(d => d.classList.remove("active"));
      dots[index]?.classList.add("active");
    }, 80);
  }

  updateImage();

  /* ARROWS */
  rightBtn.onclick = () => {
    index = (index + 1) % images[activeFragrance].length;
    updateImage();
  };

  leftBtn.onclick = () => {
    index =
      (index - 1 + images[activeFragrance].length) %
      images[activeFragrance].length;
    updateImage();
  };

  /* DOTS */
  dots.forEach((dot, i) => {
    dot.onclick = () => {
      index = i;
      updateImage();
    };
  });

  /* THUMBNAILS */
  thumbs.forEach((t, i) => {
    t.onclick = () => {
      index = i % images[activeFragrance].length;
      updateImage();
    };
  });


  /* ================================
   AUTO IMAGE SLIDER
================================ */

let autoSlideInterval = null;
const AUTO_SLIDE_DELAY = 1500; // 1.5 seconds (you can change)

/* start auto slide */
function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    const images = imagesMap[activeFragrance] || images[activeFragrance];
    if (!images) return;

    index = (index + 1) % images.length;
    updateImage();
  }, AUTO_SLIDE_DELAY);
}

/* stop auto slide */
function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

/* restart on user interaction */
[
  leftBtn,
  rightBtn,
  ...dots,
  ...thumbs,
  ...fragranceCards
].forEach(el => {
  el?.addEventListener("click", startAutoSlide);
});

/* pause on hover (desktop) */
document.querySelector(".gallery-main")?.addEventListener("mouseenter", stopAutoSlide);
document.querySelector(".gallery-main")?.addEventListener("mouseleave", startAutoSlide);

/* INIT */
startAutoSlide();


  /* SUBSCRIPTION TOGGLE */
subscriptionRadios.forEach(radio => {
  radio.addEventListener("change", e => {
    subscriptionType =
      e.target.closest(".subscription-option").dataset.type;

    subscriptionBlocks.forEach(b => b.classList.remove("active"));
    const activeBlock = document.querySelector(
      `.subscription-option[data-type="${subscriptionType}"]`
    );
    activeBlock.classList.add("active");

    activeFragrance = selectedFragrance;
    index = 0;
    updateImage();
  });
});



  /* FRAGRANCE LOGIC */
  fragranceCards.forEach(card => {
    const fragrance = card.dataset.fragrance;

    card.onmouseenter = () => {
      if (window.innerWidth > 768) {
        activeFragrance = fragrance;
        index = 0;
        updateImage();
      }
    };

    card.onmouseleave = () => {
      if (window.innerWidth > 768) {
        activeFragrance = selectedFragrance;
        index = 0;
        updateImage();
      }
    };

    card.onclick = () => {
      fragranceCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      if (subscriptionType === "single") {
        selectedFragrance = fragrance;
      } else {
        secondFragrance =
          selectedFragrance === fragrance ? "lily" : fragrance;
      }

      activeFragrance = fragrance;
      index = 0;
      updateImage();
    };
  });






  

  /* ADD TO CART */
  addToCartBtn.onclick = () => {
    const payload = {
      product: "GTG Perfumes",
      subscription: subscriptionType,
      fragrancePrimary: selectedFragrance,
      fragranceSecondary:
        subscriptionType === "double" ? secondFragrance : null,
      image: mainImage.src
    };

    console.log("ADD TO CART PAYLOAD:", payload);
  };
});






















const subscriptionRadios = document.querySelectorAll(
  'input[name="subscription"]'
);
const subscriptionOptions = document.querySelectorAll(".subscription-option");

subscriptionRadios.forEach(radio => {
  radio.addEventListener("change", e => {
    const selectedType =
      e.target.closest(".subscription-option").dataset.type;

    subscriptionOptions.forEach(option => {
      option.classList.remove("active");
    });

    const activeOption = document.querySelector(
      `.subscription-option[data-type="${selectedType}"]`
    );

    activeOption.classList.add("active");
  });
});













// *FOOTER* //
document.querySelector(".newsletter-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target.querySelector("input").value;
  console.log("Subscribed email:", email);
  e.target.reset();
});

