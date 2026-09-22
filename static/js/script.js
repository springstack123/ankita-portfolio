document.addEventListener("DOMContentLoaded", () => {

    /* ================= PAGE LOADER ================= */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) loader.classList.add("hidden");
            document.body.classList.add("loaded");
        }, 400);
    });


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .achievement-card, .contact-section, footer"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });


    /* ================= NAVBAR SHRINK ON SCROLL ================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.style.padding = "14px 7%";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            navbar.style.padding = "22px 7%";
            navbar.style.boxShadow = "none";
        }
    });


    /* ================= PROJECT CARD TILT ================= */

    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y - rect.height / 2) / rect.height) * -6;
            const rotateY = ((x - rect.width / 2) / rect.width) * 6;

            card.style.transform =
                `translateY(-12px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    /* ================= CONTACT MODAL ================= */

    const sayHelloBtn = document.getElementById("sayHelloBtn");
    const overlay = document.getElementById("contactOverlay");
    const closeBtn = document.getElementById("modalCloseBtn");
    const form = document.getElementById("contactForm");
    const successBox = document.getElementById("modalSuccess");
    const submitBtn = form ? form.querySelector(".modal-submit") : null;

    function openModal() {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";

        setTimeout(() => {
            form.style.display = "flex";
            successBox.classList.remove("show");
            form.reset();
            submitBtn.classList.remove("loading");
        }, 350);
    }

    if (sayHelloBtn) sayHelloBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            submitBtn.classList.add("loading");

            // Simulated send — swap this for a real fetch() to your Flask backend,
            // e.g. POST to '/send-message' with Flask-Mail on the server side.
            setTimeout(() => {
                form.style.display = "none";
                successBox.classList.add("show");
            }, 1200);
        });
    }


    /* ================= PARTICLE BACKGROUND ================= */

    const canvas = document.getElementById("particleCanvas");

    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.documentElement.scrollHeight;
        }

        function createParticles() {
            const count = Math.min(70, Math.floor((width * height) / 25000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.6 + 0.4,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                alpha: Math.random() * 0.5 + 0.15
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(77, 227, 193, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        resize();
        createParticles();
        draw();

        window.addEventListener("resize", () => {
            resize();
            createParticles();
        });
    }

});