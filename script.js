document.addEventListener('DOMContentLoaded', function() {
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    const sectionIdsForNav = Array.from(quickNavItems).map(item => item.dataset.target);
    const countdownEl = document.querySelector('.countdown');

    // 빠른 이동 리모컨 클릭 시 스무스 스크롤
    quickNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const setActiveNav = (sectionId) => {
        if (!sectionIdsForNav.includes(sectionId)) return;
        quickNavItems.forEach(item => {
            item.classList.toggle('active', item.dataset.target === sectionId);
        });
    };

    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                setActiveNav(entry.target.id);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    if (countdownEl) {
        const targetDate = new Date(countdownEl.dataset.targetDate);
        const valueEls = countdownEl.querySelectorAll('.countdown-value');

        const updateCountdown = () => {
            const now = new Date();
            let diff = targetDate - now;

            if (diff < 0) {
                diff = 0;
            }

            const seconds = Math.floor(diff / 1000) % 60;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            valueEls.forEach(el => {
                const unit = el.dataset.unit;
                let value = '--';
                if (diff > 0 || unit === 'seconds') {
                    value = unit === 'days' ? days
                        : unit === 'hours' ? hours
                        : unit === 'minutes' ? minutes
                        : seconds;
                }
                el.textContent = String(value).padStart(2, '0');
            });
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 초기 활성화 상태 설정
    setActiveNav(sectionIdsForNav[0]);
});
