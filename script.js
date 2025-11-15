
// MyHotSlots Casino Affiliate Website JavaScript
// Handles interactivity, bonus filtering, contact form, and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initBonusFiltering();
    initSmoothScrolling();
    initAnimations();
    initModal();
    
    console.log('MyHotSlots loaded successfully!');
});




// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(39, 64, 70, 0.98)';
            } else {
                navbar.style.background = 'rgba(39, 64, 70, 0.95)';
            }
        });
    }
}

// Bonus filtering functionality
function initBonusFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const bonusCards = document.querySelectorAll('.bonus-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter bonus cards
            filterBonuses(category);
        });
    });
}

function filterBonuses(category) {
    const bonusCards = document.querySelectorAll('.bonus-card');
    
    bonusCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category || card.classList.contains(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animationElements = document.querySelectorAll('.bonus-card, .review-card, .category-card, .quick-pick-card');
    animationElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Bonus calculator functionality
function calculateBonusValue() {
    const bonusAmount = parseFloat(document.getElementById('bonusAmount')?.value) || 0;
    const wageringReq = parseFloat(document.getElementById('wageringReq')?.value) || 1;
    const resultDiv = document.getElementById('calculatorResult');
    
    if (!resultDiv) return;
    
    if (bonusAmount <= 0 || wageringReq <= 0) {
        resultDiv.innerHTML = '<p style="color: #e74c3c;">Please enter valid amounts greater than 0.</p>';
        return;
    }
    
    // Calculate real value (simplified calculation assuming 97% RTP)
    const totalWagering = bonusAmount * wageringReq;
    const expectedLoss = totalWagering * 0.03; // 3% house edge
    const realValue = Math.max(0, bonusAmount - expectedLoss);
    const valuePercentage = (realValue / bonusAmount * 100).toFixed(1);
    
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #10ac84, #1dd1a1); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0;">💰 Bonus Value Analysis</h4>
            <p><strong>Bonus Amount:</strong> $${bonusAmount.toLocaleString()}</p>
            <p><strong>Total Wagering Required:</strong> $${totalWagering.toLocaleString()}</p>
            <p><strong>Real Expected Value:</strong> $${realValue.toFixed(2)} (${valuePercentage}% of bonus)</p>
            <p><small>*Based on 97% RTP average. Actual results may vary.</small></p>
        </div>
    `;
}

// Bonus claiming functionality - Opens casino signup in new tab
function claimBonus(casinoName, bonusCode) {
    // In a real implementation, these would be affiliate links
    const casinoUrls = {
        'GreenLuck': 'https://greenluck.com',
        'BetMGM': 'https://casino.betmgm.com',
        'JackpotCity': 'https://www.jackpotcitycasino.com',
        'Metal Casino': 'https://metalcasino.com',
        'Caesars': 'https://www.caesarscasino.com',
        'Betway': 'https://casino.betway.com',
        'Tooniebet': 'https://tooniebet.com',
        'Spin': 'https://www.spincasino.com'
    };
    
    // Show bonus code reminder
    if (bonusCode && bonusCode !== 'N/A') {
        const reminder = document.createElement('div');
        reminder.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffffff;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 3000;
            text-align: center;
            border: 3px solid #10ac84;
        `;
        
        reminder.innerHTML = `
            <h3 style="color: #274046; margin-bottom: 1rem;">🎉 Don't Forget Your Bonus Code!</h3>
            <p style="margin-bottom: 1rem;">Use bonus code: <strong style="background: #f8f9fa; padding: 4px 8px; border-radius: 4px; color: #e74c3c; font-family: monospace;">${bonusCode}</strong></p>
            <p style="color: #666; margin-bottom: 1.5rem;">Opening ${casinoName} in a new tab...</p>
            <button onclick="this.parentElement.remove()" style="background: #10ac84; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Got it!</button>
        `;
        
        document.body.appendChild(reminder);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (reminder.parentElement) {
                reminder.remove();
            }
        }, 5000);
    }
    
    // Open casino (would be affiliate link in production)
    const url = casinoUrls[casinoName] || '#';
    if (url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    // Analytics tracking (placeholder)
    console.log(`Bonus claimed: ${casinoName} - ${bonusCode}`);
}

// Contact form handling - Opens Gmail compose
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const subject = formData.get('subject') || '';
    const message = formData.get('message') || '';
    const newsletter = formData.get('newsletter') ? 'Yes' : 'No';
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Compose Gmail URL
    const emailSubject = encodeURIComponent(`MyHotSlots Contact: ${subject}`);
    const emailBody = encodeURIComponent(`
Name: ${name}
Email: ${email}
Subject: ${subject}
Newsletter Subscription: ${newsletter}

Message:
${message}

---
Sent via MyHotSlots.com contact form
    `.trim());
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=pdiddyrobert@gmail.com&su=${emailSubject}&body=${emailBody}`;
    
    // Show confirmation message
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        border: 3px solid #10ac84;
        max-width: 400px;
    `;
    
    confirmation.innerHTML = `
        <h3 style="color: #274046; margin-bottom: 1rem;">📧 Opening Gmail...</h3>
        <p style="margin-bottom: 1rem;">Your message is ready to send!</p>
        <p style="color: #666; margin-bottom: 1.5rem;">Gmail will open in a new tab with your message pre-filled.</p>
        <button onclick="this.parentElement.remove()" style="background: #10ac84; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Got it!</button>
    `;
    
    document.body.appendChild(confirmation);
    
    // Open Gmail
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
    // Clear form
    form.reset();
    
    // Auto-remove confirmation after 5 seconds
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 5000);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
}

function showModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const content = getModalContent(type);
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}




function getModalContent(type) {
    const contents = {
        'terms': `
            <h2>Terms of Service</h2>
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing MyHotSlots.com, you agree to these terms and conditions.</p>
            
            <h3>2. Use of Information</h3>
            <p>The information provided on this website is for informational purposes only. We do not operate any casinos or gambling services.</p>
            
            <h3>3. Age Requirement</h3>
            <p>You must be 18 years or older (21+ in some jurisdictions) to use this website and access gambling services.</p>
            
            <h3>4. Affiliate Disclosure</h3>
            <p>MyHotSlots may earn commission from casino operators when users sign up through our links. This does not affect our reviews or recommendations.</p>
            
            <h3>5. Limitation of Liability</h3>
            <p>MyHotSlots is not responsible for any losses incurred from gambling activities. Please gamble responsibly.</p>
            
            <p><em>Last updated: November 14, 2025</em></p>
        `,
        'privacy': `
            <h2>Privacy Policy</h2>
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide through our contact form and newsletter signup.</p>
            
            <h3>2. How We Use Information</h3>
            <p>We use your information to respond to inquiries and send promotional emails (if subscribed).</p>
            
            <h3>3. Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties.</p>
            
            <h3>4. Cookies</h3>
            <p>Our website may use cookies to enhance user experience and track website usage.</p>
            
            <h3>5. Third-Party Links</h3>
            <p>Our website contains links to casino operators. We are not responsible for their privacy practices.</p>
            
            <h3>6. Contact Us</h3>
            <p>For privacy concerns, please contact us through our contact form.</p>
            
            <p><em>Last updated: November 14, 2025</em></p>
        `,
        'responsible': `
            <h2>Responsible Gambling</h2>
            <h3>🛡️ Gambling Responsibly</h3>
            <p>Gambling should be fun and entertaining. If it stops being fun, it's time to take a break.</p>
            
            <h3>⚠️ Warning Signs</h3>
            <ul>
                <li>Gambling more money than you can afford to lose</li>
                <li>Chasing losses with bigger bets</li>
                <li>Lying about gambling activities</li>
                <li>Neglecting work, family, or other responsibilities</li>
                <li>Feeling depressed or anxious about gambling</li>
            </ul>
            
            <h3>🆘 Get Help</h3>
            <p><strong>USA:</strong></p>
            <ul>
                <li>National Council on Problem Gambling: 1-800-522-4700</li>
                <li>Gamblers Anonymous: <a href="https://www.gamblersanonymous.org" target="_blank">gamblersanonymous.org</a></li>
            </ul>
            
            <p><strong>Canada:</strong></p>
            <ul>
                <li>Problem Gambling Helpline: 1-888-391-1111</li>
                <li>Gambling Therapy: <a href="https://www.gamblingtherapy.org" target="_blank">gamblingtherapy.org</a></li>
            </ul>
            
            <h3>🔧 Self-Help Tools</h3>
            <ul>
                <li>Set deposit limits before you play</li>
                <li>Set time limits for gambling sessions</li>
                <li>Use casino self-exclusion tools</li>
                <li>Take regular breaks</li>
                <li>Never gamble when upset or under the influence</li>
            </ul>
            
            <p><strong>Remember: The house always has an edge. Only gamble with money you can afford to lose.</strong></p>
        `,
        'affiliate': `
            <h2>Affiliate Disclosure</h2>
            <h3>💰 How We Make Money</h3>
            <p>MyHotSlots is a casino affiliate website. We may earn commission when you:</p>
            <ul>
                <li>Click on our casino links</li>
                <li>Sign up for a new casino account</li>
                <li>Make your first deposit</li>
                <li>Continue playing at recommended casinos</li>
            </ul>
            
            <h3>🎯 Our Promise</h3>
            <p>Commission does not influence our reviews or rankings. We base our recommendations on:</p>
            <ul>
                <li>Real testing and personal experience</li>
                <li>Player feedback and reviews</li>
                <li>Casino licensing and safety</li>
                <li>Bonus terms and fairness</li>
                <li>Payout speed and customer service</li>
            </ul>
            
            <h3>🏆 Quality Standards</h3>
            <p>We only recommend casinos that meet our strict criteria:</p>
            <ul>
                <li>Licensed by recognized gaming authorities</li>
                <li>Proven track record of fair play</li>
                <li>Fast, reliable payouts</li>
                <li>Responsive customer support</li>
                <li>Secure banking options</li>
            </ul>
            
            <h3>🔍 Transparency</h3>
            <p>We clearly mark affiliate links and disclose our relationships with casino operators. Our goal is to help you find the best casinos while maintaining complete transparency about how we operate.</p>
            
            <p><strong>Questions?</strong> Contact us through our contact form for more information about our affiliate relationships.</p>
        `
    };
    
    return contents[type] || '<p>Content not found.</p>';
}

function showTerms(casinoName) {
    const termsContent = getCasinoTerms(casinoName);
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalBody) {
        modalBody.innerHTML = termsContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function getCasinoTerms(casinoName) {
    const terms = {
        'greenLuck': `
            <h2>Green Luck Casino - $25 No Deposit Bonus Terms</h2>
            <h3>Bonus Details</h3>
            <ul>
                <li><strong>Bonus Code:</strong> HOTSLOTS25</li>
                <li><strong>Bonus Amount:</strong> $25 Free Play</li>
                <li><strong>Wagering Requirement:</strong> 15x bonus amount ($375 total)</li>
                <li><strong>Maximum Win:</strong> $1,000</li>
                <li><strong>Valid For:</strong> 7 days</li>
            </ul>
            
            <h3>Game Restrictions</h3>
            <ul>
                <li>Slots: 100% contribution</li>
                <li>Blackjack: 10% contribution</li>
                <li>Roulette: 5% contribution</li>
                <li>Live dealer games: Excluded</li>
            </ul>
            
            <h3>Important Terms</h3>
            <ul>
                <li>18+ only, new customers only</li>
                <li>One bonus per household</li>
                <li>Maximum bet: $5 per spin/hand while bonus is active</li>
                <li>Bonus funds cannot be withdrawn directly</li>
                <li>Must verify account before withdrawal</li>
            </ul>
        `,
        'Boho': `
            <h2>Boho Casino - Welcome Bonus Terms</h2>
            <h3>Bonus Details</h3>
            <ul>
                <li><strong>Bonus:</strong> 100% Deposit Match up to $1,000 + 500 Free Spins</li>
                <li><strong>Wagering Requirement:</strong> 1x (Industry's Best!)</li>
                <li><strong>Minimum Deposit:</strong> $10</li>
                <li><strong>Valid For:</strong> 30 days</li>
            </ul>
            
            <h3>Free Spins Details</h3>
            <ul>
                <li>500 spins on selected slots</li>
                <li>$0.10 per spin value</li>
                <li>Given as 50 spins per day for 10 days</li>
                <li>1x wagering on winnings</li>
            </ul>
            
            <h3>General Terms</h3>
            <ul>
                <li>21+ only in NJ, PA, MI, WV</li>
                <li>New customers only</li>
                <li>Valid government ID required</li>
                <li>Responsible gambling tools available</li>
            </ul>
        `,
        'Gamblingo': `
            <h2>Gamblingo Casino - Welcome Package Terms</h2>
            <h3>Bonus Structure</h3>
            <ul>
                <li><strong>1st Deposit:</strong> 100% up to C$400</li>
                <li><strong>2nd Deposit:</strong> 100% up to C$400</li>
                <li><strong>3rd Deposit:</strong> 100% up to C$400</li>
                <li><strong>4th Deposit:</strong> 100% up to C$400</li>
                <li><strong>Total Package:</strong> Up to C$1,600</li>
            </ul>
            
            <h3>Terms & Conditions</h3>
            <ul>
                <li><strong>Wagering:</strong> 35x (bonus + deposit)</li>
                <li><strong>Minimum Deposit:</strong> C$10</li>
                <li><strong>Maximum Bet:</strong> C$6.25 per spin</li>
                <li><strong>Valid For:</strong> 30 days per bonus</li>
            </ul>
            
            <h3>Game Contributions</h3>
            <ul>
                <li>Slots & Scratch Cards: 100%</li>
                <li>Roulette & Blackjack: 10%</li>
                <li>Video Poker: 2%</li>
                <li>Progressive Jackpots: Excluded</li>
            </ul>
        `,
        'MetalCasino': `
            <h2>Metal Casino - Bonus Terms</h2>
            <h3>Welcome Offer</h3>
            <ul>
                <li><strong>Lossback:</strong> Get up to $1,000 back on losses (first 24 hours)</li>
                <li><strong>Free Spins:</strong> 500 bonus spins</li>
                <li><strong>Dynasty Rewards:</strong> Earn Crown rewards</li>
            </ul>
            
            <h3>Lossback Details</h3>
            <ul>
                <li>Play any casino games in first 24 hours</li>
                <li>If you lose, get up to $1,000 back as bonus funds</li>
                <li>15x wagering requirement on bonus funds</li>
                <li>7 days to use lossback bonus</li>
            </ul>
            
            <h3>Additional Terms</h3>
            <ul>
                <li>21+ in eligible states</li>
                <li>New customers only</li>
                <li>Crown rewards never expire</li>
                <li>VIP tiers available</li>
            </ul>
        `,
        'caesars': `
            <h2>Caesars Palace Casino - No Deposit Bonus</h2>
            <h3>Bonus Details</h3>
            <ul>
                <li><strong>No Deposit Bonus:</strong> $10 Free</li>
                <li><strong>Welcome Bonus:</strong> 100% up to $1,000</li>
                <li><strong>Bonus Code:</strong> CAESAR10</li>
                <li><strong>Wagering:</strong> 1x (no deposit), 15x (welcome)</li>
            </ul>
            
            <h3>Caesars Rewards</h3>
            <ul>
                <li>Earn Tier Credits and Reward Credits</li>
                <li>Use rewards at 50+ destinations</li>
                <li>Complimentary room offers</li>
                <li>Priority customer service</li>
            </ul>
            
            <h3>Terms</h3>
            <ul>
                <li>21+ in legal states</li>
                <li>Maximum withdrawal from no deposit: $500</li>
                <li>Account verification required</li>
                <li>Bonus expires in 30 days</li>
            </ul>
        `,
        'betway': `
            <h2>Betway Casino - Welcome Bonus Terms</h2>
            <h3>Bonus Package</h3>
            <ul>
                <li><strong>Casino Bonus:</strong> 100% up to C$1,800</li>
                <li><strong>Sports Integration:</strong> Combined rewards</li>
                <li><strong>Wagering:</strong> 50x bonus amount</li>
                <li><strong>Valid For:</strong> 30 days</li>
            </ul>
            
            <h3>Payment Methods</h3>
            <ul>
                <li>Interac e-Transfer (all provinces)</li>
                <li>PayPal (Ontario only)</li>
                <li>Credit/Debit cards</li>
                <li>Bank transfers</li>
            </ul>
            
            <h3>General Terms</h3>
            <ul>
                <li>19+ across Canada (18+ in Alberta, Quebec)</li>
                <li>Licensed by Malta Gaming Authority</li>
                <li>eCOGRA certified</li>
                <li>24/7 customer support</li>
            </ul>
        `
    };
    
    return terms[casinoName] || '<p>Terms and conditions not available for this casino.</p>';
}

// Utility Functions

// Format currency based on locale
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#10ac84'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 2000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(39, 64, 70, 0.98);
            padding: 1rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
    
    // In production, implement actual analytics tracking:
    // gtag('event', eventName, eventData);
    // fbq('track', eventName, eventData);
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
                
                // Track performance metrics
                trackEvent('page_performance', {
                    load_time: loadTime,
                    dom_content_loaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                    first_paint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
                });
            }, 0);
        });
    }
}

measurePerformance();

// Export functions for global access
window.claimBonus = claimBonus;
window.calculateBonusValue = calculateBonusValue;
window.handleContactSubmit = handleContactSubmit;
window.showModal = showModal;
window.closeModal = closeModal;
window.showTerms = showTerms;
window.filterBonuses = filterBonuses;
