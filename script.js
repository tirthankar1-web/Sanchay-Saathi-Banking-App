document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }
    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileMenuBtn && !mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
});

if (document.getElementById('portfolioChart')) {
    const ctx = document.getElementById('portfolioChart');
    if (ctx) {
        const portfolioData = [92500, 93200, 94800, 94200, 96100, 97300, 98750];
        const labels = ['1 Week Ago', '', '', '', '', 'Yesterday', 'Today'];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data: portfolioData,
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.8)',
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '₹' + context.parsed.y.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            borderDash: [2, 4],
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN', { 
                                    maximumFractionDigits: 0,
                                    notation: 'compact'
                                });
                            }
                        }
                    }
                }
            }
        });
    }
}

if (document.querySelector('.selector-btn')) {
    const selectorBtns = document.querySelectorAll('.selector-btn');
    selectorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parentGroup = this.parentElement;
            parentGroup.querySelectorAll('.selector-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            
            const optionHeader = parentGroup.closest('.roundup-option').querySelector('.option-value');
            if (optionHeader) {
                optionHeader.textContent = this.textContent;
            }
        });
    });
}