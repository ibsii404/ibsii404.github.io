document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
  });

  // Dark Mode Toggle
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      toggle.innerHTML = '<span class="btn-content"><i class="fas fa-sun"></i> Light Mode</span>';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      toggle.innerHTML = '<span class="btn-content"><i class="fas fa-moon"></i> Dark Mode</span>';
    }
  });

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggle.innerHTML = '<span class="btn-content"><i class="fas fa-sun"></i> Light Mode</span>';
  }

  // Typewriter Effect
  const text = "Hi, I'm Ibsii 👋";
  const typewriter = document.getElementById('typewriter');
  let index = 0;
  
  function type() {
    typewriter.innerHTML = text.slice(0, index++);
    if (index <= text.length) {
      setTimeout(type, 100);
    } else {
      // Add cursor blink after typing completes
      typewriter.classList.add('cursor');
    }
  }
  
  // Start typing after a slight delay
  setTimeout(type, 500);

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  }
  
  // Initialize particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#4CAF50"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#4CAF50",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Scroll to section when nav item is clicked
  document.querySelectorAll('.floating-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll indicator click
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: document.querySelector('main').offsetTop,
        behavior: 'smooth'
      });
    });
  }

  // Animate elements when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Initialize EmailJS
  emailjs.init("YqhQLuZntwhWTymdv"); // Your Public Key

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      emailjs.sendForm('service_z1u9hfb', 'template_3kydbmb', this)
        .then(() => { 
          // Success
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 2000);
          
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success';
          successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
          contactForm.appendChild(successMsg);
          
          setTimeout(() => {
            successMsg.remove();
          }, 3000);
        }, (error) => { 
          // Error
          submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
          console.error('Failed:', error);
          
          // Show error message
          const errorMsg = document.createElement('div');
          errorMsg.className = 'form-error';
          errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
          contactForm.appendChild(errorMsg);
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            errorMsg.remove();
          }, 3000);
        });
    });
  }

  // Animate skill bars when skills section is in view
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    skillsObserver.observe(skillsSection);
  }
});