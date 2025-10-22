document.addEventListener('DOMContentLoaded', () => {

    // Mobile Nav
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing Effect
    const typingTarget = document.querySelector('.typing-effect');
    if (typingTarget) {
        //
        // ▼▼▼ THIS IS THE UPDATED TEXT ▼▼▼
        //
        const textToType = "Competitive Programmer | 500+ Problems Solved";
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingTarget.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 70);
            }
        }
        type();
    }

    // Fade-in on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Number Count-Up
    const ratingNumbers = document.querySelectorAll('.rating-number');

    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = +target.getAttribute('data-target');

                let currentValue = 0;
                const duration = 2000;
                const stepTime = 50;
                const steps = duration / stepTime;
                const increment = targetValue / steps;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        target.textContent = Math.floor(targetValue);
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue);
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    ratingNumbers.forEach(num => countUpObserver.observe(num));

    // Active Nav Link Highlighting
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        rootMargin: '-50% 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

});