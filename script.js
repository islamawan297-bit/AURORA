// Theme toggle, smooth scroll, reveal animations, accordion behavior, and contact validation.
const themeToggle = document.querySelector('.theme-toggle');
const rootElement = document.documentElement;
const persistedTheme = localStorage.getItem('preferred-theme');

if (persistedTheme) {
  rootElement.setAttribute('data-theme', persistedTheme);
  themeToggle.textContent = persistedTheme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
  const currentTheme = rootElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  rootElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('preferred-theme', nextTheme);
  themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', toggleTheme);

// Smooth scrolling for anchor links.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      event.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reveal elements on scroll.
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// FAQ accordion behavior.
document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) {
          other.removeAttribute('open');
        }
      });
    }
  });
});

// Simple form validation.
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      formMessage.textContent = 'Please complete all fields before sending your message.';
      return;
    }

    formMessage.textContent = 'Message sent successfully. We will respond soon!';
    formMessage.style.color = 'var(--accent-2)';
    contactForm.reset();
  });
}
