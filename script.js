// ============ Mobile Menu Toggle ============
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

   if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileMenu);
   }

   document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
   });
}

// ============ Project Navigation ============
let currentProject = 0;
const totalProjects = 5;

const imageContainers = document.querySelectorAll('.image-container');
const projectDetails = document.querySelectorAll('.project-details');
const progressDots = document.querySelectorAll('.progress-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateProject(index) {
   imageContainers.forEach((container, i) => {
      container.classList.toggle('active', i === index);
   });

   projectDetails.forEach((detail, i) => {
      detail.classList.toggle('active', i === index);
   });

   progressDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
   });

   currentProject = index;
}

prevBtn.addEventListener('click', () => {
   const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
   updateProject(newIndex);
   clearAutoPlay();
});

nextBtn.addEventListener('click', () => {
   const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
   updateProject(newIndex);
   clearAutoPlay();
});

progressDots.forEach((dot, index) => {
   dot.addEventListener('click', () => {
      updateProject(index);
      clearAutoPlay();
   });
});

document.addEventListener('keydown', (e) => {
   if (e.key === 'ArrowLeft') {
      const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
      updateProject(newIndex);
      clearAutoPlay();
   } else if (e.key === 'ArrowRight') {
      const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
      updateProject(newIndex);
      clearAutoPlay();
   }
});

// ============ Touch/Swipe Support ============
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
      const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
      updateProject(newIndex);
      clearAutoPlay();
   }
   if (touchEndX > touchStartX + 50) {
      const newIndex = currentProject > 0 ? currentProject - 1 : totalProjects - 1;
      updateProject(newIndex);
      clearAutoPlay();
   }
}

// ============ Auto-Play Slider ============
let autoPlay;

function startAutoPlay() {
   autoPlay = setInterval(() => {
      const newIndex = currentProject < totalProjects - 1 ? currentProject + 1 : 0;
      updateProject(newIndex);
   }, 6000);
}

function clearAutoPlay() {
   clearInterval(autoPlay);
   startAutoPlay();
}

// ============ Project Controls Visibility ============
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

// ============ Contact Form ============
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
   contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const subject = document.getElementById('subject')?.value;
      const message = document.getElementById('message')?.value;
      
      if (name && email && subject && message) {
         alert('Terima kasih! Pesan Anda telah diterima. Kami akan segera menghubungi Anda. 📧');
         contactForm.reset();
         contactForm.style.opacity = '0.5';
         setTimeout(() => {
            contactForm.style.opacity = '1';
         }, 500);
      }
   });
}

// ============ Smooth Scroll Navigation ============
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

// ============ Active Menu Highlighting ============
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

window.addEventListener('scroll', highlightActiveSection);
highlightActiveSection();

// ============ Scroll Reveal Animation ============
const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});

// ============ Parallax Mouse Effect ============
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    
    const activeImage = document.querySelector('.image-container.active .project-image');
    if(activeImage) {
        activeImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
});

// ============ Testimonial Submission ============
const testimonialForm = document.getElementById('submit-testimonial');
if (testimonialForm) {
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('testi-name').value.trim();
        const role = document.getElementById('testi-role').value.trim();
        const message = document.getElementById('testi-message').value.trim();
        
        if (!name || !role || !message) {
            alert('⚠️ Harap isi semua field!');
            return;
        }

        const initials = name.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        const newTestimonial = document.createElement('div');
        newTestimonial.className = 'testimonial-card';
        newTestimonial.style.animation = 'slideInUp 0.6s ease';
        
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

        const testimonialList = document.getElementById('testimonial-list');
        testimonialList.prepend(newTestimonial);

        this.reset();
        alert('✅ Terima kasih! Testimoni Anda telah ditambahkan.');
        document.getElementById('testi-name').focus();
    });
}

// ============ Scroll to Top Button ============
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #ff3366;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(255, 51, 102, 0.3);
    transition: all 0.3s ease;
    font-weight: bold;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#ff5580';
    scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#ff3366';
    scrollTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ============ Page Load Animation ============
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        startAutoPlay();
    }, 100);
});

// ============ Initialize ============
updateProject(0);

console.log('✅ All scripts loaded successfully!');