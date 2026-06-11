document.addEventListener('DOMContentLoaded', () => {
    // ---------------- THEME SWITCHER ----------------
    const themeBtn = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
    } else if (!systemPrefersDark.matches) {
        document.body.classList.add('light-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', currentTheme);
        });
    }

    // ---------------- MOBILE NAVIGATION ----------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scrolling
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // ---------------- ACTIVE NAV HIGHLIGHTING ----------------
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Match home or deep links
        if (linkHref === currentFile || 
            (currentFile === '' && linkHref === 'index.html') ||
            (currentPath.includes('/projects/') && linkHref === 'index.html#projects') ||
            (currentPath.includes('/writings/') && linkHref === 'writings.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ---------------- SCROLL REVEAL ANIMATIONS ----------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // trigger px above the bottom of viewport
        
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger check on load

    // ---------------- CUSTOM CURSOR (DESKTOP) ----------------
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (cursor && cursorDot && window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const hoverables = document.querySelectorAll('a, button, .copy-btn, .project-card, .writing-card');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    
    // ---------------- EMAIL CLIPBOARD COPY ----------------
    const copyButton = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-address');

    if (copyButton && emailText) {
        copyButton.addEventListener('click', () => {
            const email = emailText.textContent.trim();
            
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                copyButton.classList.add('tooltip', 'show');
                const originalText = copyButton.innerHTML;
                
                // Change button state
                copyButton.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
                    Copied!
                `;
                
                setTimeout(() => {
                    copyButton.classList.remove('show');
                    setTimeout(() => {
                        copyButton.classList.remove('tooltip');
                        copyButton.innerHTML = originalText;
                    }, 300);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});
