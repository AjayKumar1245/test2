document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admissionsForm');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Clear previous validation messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Check required fields
        const requiredFields = [
            'first-name', 'last-name', 'birth-month', 'birth-day', 'birth-year',
            'gender', 'citizenship', 'phone', 'email', 'street-address', 'city',
            'state', 'postal-code', 'high-school-name', 'graduation-date', 'school-address',
            'school-city', 'school-state', 'school-country', 'mark-sheet', 'payment-method'
        ];

        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (field && !field.value) {
                isValid = false;
                showError(field, 'This field is required');
            }
        });

        // Validate phone number
        const phone = document.getElementById('phone').value;
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (phone && !phonePattern.test(phone)) {
            isValid = false;
            showError(document.getElementById('phone'), 'Phone number must be in the format (000) 000-0000');
        }

        // Validate email address
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            isValid = false;
            showError(document.getElementById('email'), 'Invalid email address');
        }

        // Validate file upload
        const markSheet = document.getElementById('mark-sheet').files[0];
        if (markSheet) {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(markSheet.type)) {
                isValid = false;
                showError(document.getElementById('mark-sheet'), 'Please upload a valid PDF, JPG, or PNG file');
            }
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(element, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        element.parentElement.appendChild(error);
    }
});
