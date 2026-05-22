// Umbrella interaction
document.querySelectorAll('.umbrella').forEach(umbrella => {
    umbrella.addEventListener('click', function(e) {
        const isAvailable = this.classList.contains('available');

        // Simple toggle for demo purposes
        if (isAvailable) {
            this.classList.remove('available');
            this.classList.add('occupied');

            // Show a simple notification
            showNotification('Ombrellone prenotato! 🎉');
        } else {
            this.classList.remove('occupied');
            this.classList.add('available');
            showNotification('Prenotazione cancellata');
        }
    });

    // Add hover effect with tooltip
    umbrella.addEventListener('mouseenter', function() {
        const status = this.classList.contains('available') ? 'Disponibile' : 'Occupato';
        this.setAttribute('data-status', status);
    });
});

// Facility card interactions
document.querySelectorAll('.facility-card').forEach(card => {
    card.addEventListener('click', function() {
        const name = this.querySelector('.facility-name').textContent;
        showNotification(`${name} - Coming Soon! 🏖️`);
    });
});

// Facility zone buttons interaction
document.querySelectorAll('.facility').forEach(facility => {
    facility.addEventListener('click', function(e) {
        const name = this.textContent;
        showNotification(`${name} - Info`);
    });
});

// Notification system
function showNotification(message) {
    // Remove any existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
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
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Initial load animation
window.addEventListener('load', function() {
    // Animate header
    const header = document.querySelector('.header');
    header.style.animation = 'slideDown 0.6s ease-out';

    const style = document.createElement('style');
    if (!document.querySelector('style[data-load-animation]')) {
        style.setAttribute('data-load-animation', 'true');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'I' to get info about available umbrellas
    if (e.key.toLowerCase() === 'i') {
        const available = document.querySelectorAll('.umbrella.available').length;
        const occupied = document.querySelectorAll('.umbrella.occupied').length;
        showNotification(`Disponibili: ${available} | Occupati: ${occupied} 🏖️`);
    }
});

// Stats function for console
window.getBeachStats = function() {
    const total = document.querySelectorAll('.umbrella').length;
    const available = document.querySelectorAll('.umbrella.available').length;
    const occupied = document.querySelectorAll('.umbrella.occupied').length;
    const occupancyRate = ((occupied / total) * 100).toFixed(1);

    return {
        total,
        available,
        occupied,
        occupancyRate: `${occupancyRate}%`
    };
};

console.log('%c🏖️ Spiaggia le Cureze - Beach Resort', 'font-size: 16px; color: #00a8cc; font-weight: bold;');
console.log('Tip: Type getBeachStats() to see occupancy information');
