// 코드 복사 기능
document.addEventListener('DOMContentLoaded', function() {
    const codeItems = document.querySelectorAll('.code-item');
    const featuredCode = document.querySelector('.featured-code');
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    const sectionIdsForNav = Array.from(quickNavItems).map(item => item.dataset.target);
    
    codeItems.forEach(item => {
        item.addEventListener('click', function() {
            const codeText = this.querySelector('.code-text');
            const code = codeText.textContent.trim();
            
            // 클립보드에 복사
            navigator.clipboard.writeText(code).then(() => {
                // 복사 성공 피드백
                const originalBg = this.style.background;
                this.style.background = 'rgba(233, 69, 96, 0.3)';
                
                // 임시 메시지 표시
                const message = document.createElement('div');
                message.textContent = '코드가 복사되었습니다! ✓';
                message.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #e94560;
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 1000;
                    font-weight: 700;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(message);
                
                setTimeout(() => {
                    this.style.background = originalBg;
                    message.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => message.remove(), 300);
                }, 2000);
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('코드를 수동으로 복사해주세요: ' + code);
            });
        });
    });

    if (featuredCode) {
        featuredCode.addEventListener('click', () => {
            const code = featuredCode.textContent.trim();
            navigator.clipboard.writeText(code).then(() => {
                featuredCode.classList.add('copied');
                setTimeout(() => featuredCode.classList.remove('copied'), 1500);
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('코드를 수동으로 복사해주세요: ' + code);
            });
        });
    }
    
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

    // 초기 활성화 상태 설정
    setActiveNav(sectionIdsForNav[0]);
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

