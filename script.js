document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Pricing toggle logic
    const btnMonthly = document.getElementById('btnMonthly');
    const btnAnnual = document.getElementById('btnAnnual');
    const proPrice = document.getElementById('proPrice');
    const bizPrice = document.getElementById('bizPrice');

    if (btnMonthly && btnAnnual) {
        btnMonthly.addEventListener('click', () => {
            btnMonthly.classList.add('active');
            btnAnnual.classList.remove('active');
            proPrice.innerHTML = '$250<small class="fs-6">/month</small>';
            bizPrice.innerHTML = '$500<small class="fs-6">/month</small>';
        });

        btnAnnual.addEventListener('click', () => {
            btnAnnual.classList.add('active');
            btnMonthly.classList.remove('active');
            proPrice.innerHTML = '$187<small class="fs-6">/month</small>';
            bizPrice.innerHTML = '$375<small class="fs-6">/month</small>';
        });
    }

    // Testimonial Slider logic
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtns = document.querySelectorAll('.next-slide');
    const prevBtns = document.querySelectorAll('.prev-slide');
    let currentSlide = 0;

    function showSlide(index) {
        // First, fade out current active slide
        const currentActive = document.querySelector('.testimonial-slide.active');
        if (currentActive) {
            currentActive.style.opacity = '0';
            currentActive.style.transform = 'translateX(-20px)';
            currentActive.style.transition = '0.5s cubic-bezier(0.7, 0, 0.3, 1)';
        }

        setTimeout(() => {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '';
                slide.style.transform = '';
                slide.style.transition = '';
            });
            
            slides[index].classList.add('active');
            
            // Update counter
            const currentIndexSpan = document.querySelector('.current-index');
            if (currentIndexSpan) {
                currentIndexSpan.textContent = (index + 1).toString().padStart(2, '0');
            }

            // Re-trigger AOS for the new slide
            AOS.refresh();
        }, currentActive ? 300 : 0);
    }

    // Magnetic Button Effect for Nav Arrows
    const magneticBtns = document.querySelectorAll('.btn-premium-nav');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
            btn.querySelector('svg').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.querySelector('svg').style.transform = '';
        });
    });

    if (nextBtns) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        });
    }

    if (prevBtns) {
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        });
    }

    // Simple parallax effect for hero shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 2;
            shape.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });
});
