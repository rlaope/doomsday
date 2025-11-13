// 코드 복사 기능
document.addEventListener('DOMContentLoaded', function() {
    const codeItems = document.querySelectorAll('.code-item');
    
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

