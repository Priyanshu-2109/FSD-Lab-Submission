// Portfolio Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  // Form validation patterns
  const validationRules = {
    name: {
      required: true,
      pattern: /^[a-zA-Z\s]{2,50}$/,
      message: "Name must be 2-50 characters and contain only letters",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100,
      message: "Subject must be between 5-100 characters",
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      message: "Message must be between 10-1000 characters",
    },
  };

  // Real-time validation
  Object.keys(validationRules).forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (field) {
      field.addEventListener("input", () =>
        validateField(field, validationRules[fieldName])
      );
      field.addEventListener("blur", () =>
        validateField(field, validationRules[fieldName])
      );
    }
  });

  // Validate individual field
  function validateField(field, rules) {
    const value = field.value.trim();
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    // Clear previous errors
    formGroup.classList.remove("error");

    // Required validation
    if (rules.required && !value) {
      showFieldError(formGroup, errorElement, "This field is required");
      return false;
    }

    // Pattern validation
    if (value && rules.pattern && !rules.pattern.test(value)) {
      showFieldError(formGroup, errorElement, rules.message);
      return false;
    }

    // Length validation
    if (value && rules.minLength && value.length < rules.minLength) {
      showFieldError(formGroup, errorElement, rules.message);
      return false;
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      showFieldError(formGroup, errorElement, rules.message);
      return false;
    }

    // Field is valid
    formGroup.classList.remove("error");
    return true;
  }

  // Show field error
  function showFieldError(formGroup, errorElement, message) {
    formGroup.classList.add("error");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  // Validate entire form
  function validateForm() {
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const field = document.getElementById(fieldName);
      if (field && !validateField(field, validationRules[fieldName])) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Show form message
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    // Auto-hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }

  // Set loading state
  function setLoadingState(loading) {
    if (loading) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      btnText.style.opacity = "0";
      btnLoading.style.opacity = "1";
    } else {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      btnText.style.opacity = "1";
      btnLoading.style.opacity = "0";
    }
  }

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Hide previous messages
    formMessage.style.display = "none";

    // Validate form
    if (!validateForm()) {
      showMessage("Please fix the errors above and try again.", "error");
      return;
    }

    // Set loading state
    setLoadingState(true);

    // Prepare form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      subject: formData.get("subject").trim(),
      message: formData.get("message").trim(),
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage(
          "Thank you! Your message has been sent successfully. I'll get back to you soon.",
          "success"
        );
        contactForm.reset();

        // Remove any error states
        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("error");
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage(
        error.message || "Failed to send message. Please try again later.",
        "error"
      );
    } finally {
      setLoadingState(false);
    }
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".service-card, .portfolio-item, .skill-item")
    .forEach((el) => {
      observer.observe(el);
    });

  // Typing effect for hero text (optional enhancement)
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add particle effect to hero section (optional)
  function createParticles() {
    const hero = document.querySelector(".hero");
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
      hero.appendChild(particle);
    }
  }

  // Add float animation for particles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.5;
            }
        }
    `;
  document.head.appendChild(style);

  // Initialize particles (uncomment if you want particle effect)
  // createParticles();

  // Back to top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.classList.add("back-to-top");
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.transform = "translateY(0)";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.transform = "translateY(20px)";
    }
  });

  // Back to top functionality
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect to back to top button
  backToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)";
  });

  backToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });

  // Form field character counters (for textarea)
  const messageField = document.getElementById("message");
  if (messageField) {
    const counter = document.createElement("div");
    counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: var(--text-light);
            margin-top: 0.5rem;
        `;
    messageField.parentNode.appendChild(counter);

    messageField.addEventListener("input", function () {
      const current = this.value.length;
      const max = validationRules.message.maxLength;
      counter.textContent = `${current}/${max}`;

      if (current > max * 0.9) {
        counter.style.color = "var(--warning-color)";
      } else {
        counter.style.color = "var(--text-light)";
      }
    });

    // Initialize counter
    counter.textContent = `0/${validationRules.message.maxLength}`;
  }

  // Preloader (optional)
  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    }
  });

  console.log("Portfolio website initialized successfully!");
});
