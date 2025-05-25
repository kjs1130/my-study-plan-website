// Common utility functions
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// LocalStorage management
const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

// Progress calculation
const calculateProgress = (plans) => {
    if (!plans || plans.length === 0) return 0;
    
    const completedPlans = plans.filter(plan => plan.completed).length;
    return Math.round((completedPlans / plans.length) * 100);
};

// Update progress bar
const updateProgressBar = (percentage) => {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressBar && progressPercentage) {
        progressBar.style.width = `${percentage}%`;
        progressPercentage.textContent = percentage;
    }
};

// Initialize common elements
document.addEventListener('DOMContentLoaded', () => {
    // Update progress if on home page
    if (document.getElementById('progressBar')) {
        const plans = storage.get('plans') || [];
        const progress = calculateProgress(plans);
        updateProgressBar(progress);
    }
}); 