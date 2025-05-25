document.addEventListener('DOMContentLoaded', () => {
    const plansContainer = document.getElementById('plansContainer');
    const filterButtons = document.querySelectorAll('.plans-filter .btn');
    const overallProgress = document.getElementById('overallProgress');
    const overallPercentage = document.getElementById('overallPercentage');
    
    let currentFilter = 'all';
    
    // Format date to English
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Load and display plans
    const renderPlans = () => {
        const plans = JSON.parse(localStorage.getItem('plans') || '[]');
        
        // Filter plans based on status
        let filteredPlans = plans;
        if (currentFilter === 'active') {
            filteredPlans = plans.filter(plan => !plan.completed);
        } else if (currentFilter === 'completed') {
            filteredPlans = plans.filter(plan => plan.completed);
        }
        
        // Update overall progress
        const progress = calculateProgress(plans);
        if (overallProgress && overallPercentage) {
            overallProgress.style.width = `${progress}%`;
            overallPercentage.textContent = progress;
        }
        
        // Clear container
        plansContainer.innerHTML = '';
        
        if (filteredPlans.length === 0) {
            plansContainer.innerHTML = '<p class="no-plans">No study plans registered.</p>';
            return;
        }
        
        // Sort plans by date
        filteredPlans.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Add plan cards
        filteredPlans.forEach(plan => {
            plansContainer.appendChild(createPlanCard(plan));
        });
    };
    
    // Create plan card element
    const createPlanCard = (plan) => {
        const card = document.createElement('div');
        card.className = 'plan-card';
        card.innerHTML = `
            <div class="plan-header">
                <h3>${plan.subject}</h3>
                <span class="plan-date">${formatDate(plan.date)}</span>
            </div>
            <p class="plan-goal">${plan.goal}</p>
            <div class="plan-actions">
                <label class="checkbox-container">
                    <input type="checkbox" ${plan.completed ? 'checked' : ''} 
                           onchange="togglePlanComplete(${plan.id})">
                    <span class="checkmark"></span>
                    Complete
                </label>
                <button class="btn" onclick="deletePlan(${plan.id})">Delete</button>
            </div>
        `;
        return card;
    };
    
    // Calculate overall progress
    function calculateProgress(plans) {
        if (plans.length === 0) return 0;
        const completedPlans = plans.filter(plan => plan.completed).length;
        return Math.round((completedPlans / plans.length) * 100);
    }
    
    // Toggle plan completion
    window.togglePlanComplete = (planId) => {
        const plans = JSON.parse(localStorage.getItem('plans') || '[]');
        const updatedPlans = plans.map(plan => {
            if (plan.id === planId) {
                return { ...plan, completed: !plan.completed };
            }
            return plan;
        });
        
        localStorage.setItem('plans', JSON.stringify(updatedPlans));
        renderPlans();
    };
    
    // Delete plan
    window.deletePlan = (planId) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            const plans = JSON.parse(localStorage.getItem('plans') || '[]');
            const updatedPlans = plans.filter(plan => plan.id !== planId);
            localStorage.setItem('plans', JSON.stringify(updatedPlans));
            renderPlans();
        }
    };
    
    // Add filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderPlans();
        });
    });
    
    // Initial render
    renderPlans();
}); 