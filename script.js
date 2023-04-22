document.addEventListener('DOMContentLoaded', function() {
    // Calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const unpaidAmount = document.getElementById('unpaid-amount');
    const timeSpent = document.getElementById('time-spent');
    const hourlyRate = document.getElementById('hourly-rate');
    const calculationResult = document.getElementById('calculation-result');
    const totalLoss = document.getElementById('total-loss');
    const timeLoss = document.getElementById('time-loss');

    calculateBtn.addEventListener('click', function() {
        // Calculate time cost
        const timeCost = (parseFloat(timeSpent.value) * parseFloat(hourlyRate.value)) / 8;
        // Calculate total loss
        const total = parseFloat(unpaidAmount.value) + timeCost;
        
        // Update the DOM
        timeLoss.textContent = Math.round(timeCost);
        totalLoss.textContent = Math.round(total);
        calculationResult.classList.remove('hidden');
    });

    // CTA buttons functionality
    const ctaPrimary = document.getElementById('cta-primary');
    const ctaPricing = document.querySelector('.cta-pricing');
    const leadForm = document.getElementById('lead-form');
    const formMessage = document.getElementById('form-message');

    // Scroll to lead form when CTA buttons are clicked
    function scrollToLeadForm() {
        leadForm.scrollIntoView({ behavior: 'smooth' });
        // Focus on email input after scrolling
        setTimeout(() => {
            document.getElementById('email').focus();
        }, 800);
    }

    ctaPrimary.addEventListener('click', scrollToLeadForm);
    
    if (ctaPricing) {
        ctaPricing.addEventListener('click', scrollToLeadForm);
    }

    // Form submission handling
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Email validation
        if (!validateEmail(email)) {
            showFormMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Traitement en cours...', 'info');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Success scenario
            showFormMessage('Merci ! Vous êtes maintenant sur notre liste d'attente. Nous vous contacterons dès que l\'accès anticipé sera disponible.', 'success');
            leadForm.reset();
            
            // Track conversion (would be replaced with actual analytics)
            console.log('Lead captured:', email);
        }, 1500);
    });

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper function to show form messages
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = ''; // Reset classes
        formMessage.classList.add(type);
        formMessage.classList.remove('hidden');
    }

    // Animate benefits on scroll
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // Simple animation on scroll
    window.addEventListener('scroll', function() {
        benefitCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize cards with opacity 0
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger scroll event to check initial positions
    window.dispatchEvent(new Event('scroll'));
});