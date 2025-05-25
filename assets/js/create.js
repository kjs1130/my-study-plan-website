document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studyPlanForm');
    const dateInput = document.getElementById('startDate');
    
    // Set date input language to English and format
    dateInput.setAttribute('lang', 'en');
    dateInput.setAttribute('type', 'date');
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const subject = document.getElementById('planTitle').value;
        const goal = document.getElementById('planDescription').value;
        const date = document.getElementById('startDate').value;
        
        // Create new plan object
        const plan = {
            id: Date.now(),
            subject: subject,
            goal: goal,
            date: date,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Get existing plans
        const plans = JSON.parse(localStorage.getItem('plans') || '[]');
        
        // Add new plan
        plans.push(plan);
        
        // Save to localStorage
        localStorage.setItem('plans', JSON.stringify(plans));
        
        // Show success message
        alert('Plan created successfully!');
        
        // Reset form
        form.reset();
        
        // Set date back to today
        dateInput.value = today;
        
        // Redirect to plans page
        window.location.href = 'plans.html';
    });
}); 