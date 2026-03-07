// JavaScript Document

// Mobile menu toggle
const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');

function closeMobileMenu() {
   mobileNav.classList.remove('active');
}

function openMobileMenu() {
   mobileNav.classList.add('active');
}

if (menuIcon && mobileNav) {
   menuIcon.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
         closeMobileMenu();
      } else {
         openMobileMenu();
      }
   });

   // Close button
   if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileMenu);
   }

   // Close mobile menu when clicking a link
   document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
   });
}

let currentProject = 0;
const totalProjects = 5;

const imageContainers = document.querySelectorAll('.image-container');
const projectDetails = document.querySelectorAll('.project-details');
const progressDots = document.querySelectorAll('.progress-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateProject(index) {
   // Update images
   imageContainers.forEach((container, i) => {
      container.classList.toggle('active', i === index);
   });

   // Update details
   projectDetails.forEach((detail, i) => {
      detail.classList.toggle('active', i === index);
   });

   // Update progress dots
   progressDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
   });

   currentProject = index;
}

// Navigation arrows - continuous loop
prevBtn.addEventListener('click', () => {
   const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
   updateProject(newIndex);
});

nextBtn.addEventListener('click', () => {
   const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
   updateProject(newIndex);
});

// Progress dots navigation
progressDots.forEach((dot, index) => {
   dot.addEventListener('click', () => {
      updateProject(index);
   });
});

// Keyboard navigation - continuous loop
document.addEventListener('keydown', (e) => {
   if (e.key === 'ArrowLeft') {
      const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
      updateProject(newIndex);
   } else if (e.key === 'ArrowRight') {
      const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
      updateProject(newIndex);
   }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
   touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
   touchEndX = e.changedTouches[0].screenX;
   handleSwipe();
});

function handleSwipe() {
   if (touchEndX < touchStartX - 50) {
      // Swipe left - next project (loop)
      const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
      updateProject(newIndex);
   }
   if (touchEndX > touchStartX + 50) {
      // Swipe right - previous project (loop)
      const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
      updateProject(newIndex);
   }
}

// Initialize
updateProject(0);

// Hide project controls when scrolling past work section
const projectControls = document.querySelector('.project-controls');
const workSection = document.querySelector('#work');

function updateControlsVisibility() {
   const workBottom = workSection.offsetTop + workSection.offsetHeight;
   const scrollY = window.pageYOffset;

   if (scrollY > workBottom - 200) {
      projectControls.classList.add('hidden');
   } else {
      projectControls.classList.remove('hidden');
   }
}

window.addEventListener('scroll', updateControlsVisibility);
updateControlsVisibility();

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
   e.preventDefault();
   alert('Thank you for your message! I will get back to you soon.');
   e.target.reset();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

// Active menu highlighting on scroll
const sections = document.querySelectorAll('section[id], #work');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

function highlightActiveSection() {
   const scrollY = window.pageYOffset;

   sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
         navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
               link.classList.add('active');
            }
         });
      }
   });
}
// --- Animasi Scroll Reveal ---

// Fungsi untuk inisialisasi observer
const revealOnScroll = () => {
  const observerOptions = {
    threshold: 0.15 // Elemen akan muncul jika 15% bagiannya sudah terlihat
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambahkan class active untuk memicu animasi CSS
        entry.target.classList.add('active');
        // Berhenti memantau elemen jika sudah muncul (opsional, agar animasi hanya sekali)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Cari semua elemen yang ingin dianimasikan
  const targets = document.querySelectorAll('.reveal');
  targets.forEach(target => observer.observe(target));
};

// Jalankan fungsi setelah DOM siap
document.addEventListener('DOMContentLoaded', revealOnScroll);
// --- TAMBAHKAN KODE INI DI BAWAH KODE LAMA ANDA ---

const observerOptions = {
    threshold: 0.15 // Animasi jalan saat 15% elemen terlihat
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Jika ingin animasi hanya sekali, aktifkan baris di bawah:
            // revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Mengaktifkan pengamatan pada semua elemen dengan class 'reveal'
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});
// 1. Tambahkan fitur Auto-Play Slider
let autoPlay = setInterval(() => {
    const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
    updateProject(newIndex);
}, 5000); // Berganti setiap 5 detik

// Berhenti auto-play jika user mengklik tombol manual
[prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => clearInterval(autoPlay));
});

// 2. Efek Parallax Mouse (Foto bergerak mengikuti mouse)
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const activeImage = document.querySelector('.image-container.active .project-image');
    if(activeImage) {
        activeImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

window.addEventListener('scroll', highlightActiveSection);
highlightActiveSection();

document.getElementById('submit-testimonial').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman refresh

    // 1. Ambil data dari form
    const name = document.getElementById('testi-name').value;
    const role = document.getElementById('testi-role').value;
    const message = document.getElementById('testi-message').value;
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    // 2. Buat elemen kartu testimoni baru
    const newTestimonial = document.createElement('div');
    newTestimonial.className = 'testimonial-card';
    newTestimonial.style.border = '2px solid #ff3366'; // Highlight untuk yang baru
    
    newTestimonial.innerHTML = `
        <div class="quote-icon">"</div>
        <p class="testimonial-text">${message}</p>
        <div class="testimonial-author">
            <div class="author-avatar">${initials}</div>
            <div class="author-info">
                <h4>${name}</h4>
                <p>${role}</p>
            </div>
        </div>
    `;

    // 3. Masukkan ke dalam grid (di bagian paling atas)
    const testimonialList = document.getElementById('testimonial-list');
    testimonialList.prepend(newTestimonial);

    // 4. Reset form dan beri notifikasi
    this.reset();
    alert('Terima kasih! Testimoni Anda telah ditambahkan.');
});