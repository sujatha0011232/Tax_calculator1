$(document).ready(function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    function calculateTax() {
        const income = parseFloat($('#income').val()) || 0;
        const extraIncome = parseFloat($('#extraIncome').val()) || 0;
        const deductions = parseFloat($('#deductions').val()) || 0;
        const age = $('#age').val();
        let taxRate = 0;
        let netIncome = income + extraIncome - deductions;
        let tax = 0;

        if (netIncome > 800000) { 
            if (age === '<40') {
                taxRate = 0.30;
            } else if (age === '≥40 & <60') {
                taxRate = 0.40;
            } else if (age === '≥60') {
                taxRate = 0.10;
            }

            let taxableIncome = netIncome - 800000; 
            tax = taxableIncome * taxRate;

            $('#taxResult').text(`Tax is ${tax.toLocaleString()} units.`);
        } 
        else {
            $('#taxResult').text("No tax due.");
        }
        $('#taxModal').modal('show');
    }
    $('#submitBtn').click(function(event) {
        event.preventDefault();

        if ($('#age').val() === '') {
            console.error('Please select an age group.');
            return false;
        } 
        else {
            calculateTax();
        }
    });

    $('#close-btn').click(function() {
        $('#taxModal').modal('hide');
        $('#taxForm')[0].reset();
        var tooltipList = bootstrap.Tooltip.getInstance(document.querySelector('[data-bs-toggle="tooltip"]'));
        if (tooltipList) {
            $('[data-bs-toggle="tooltip"]').each(function() {
                var tooltipInstance = bootstrap.Tooltip.getInstance(this);
                if (tooltipInstance) {
                    tooltipInstance.hide();
                }
            });
        }
        $('.error-indicator').hide();
    });

    $('.error-icon').each(function() {
        const inputField = $(this).prev('.form-control');

        inputField.on('input', function() {
            const value = $(this).val();
            const errorIndicator = $(this).next('.error-icon');
            
            if (isNaN(value) || value === '') {
                errorIndicator.css('display', 'block');
                $(errorIndicator).attr('data-original-title', 'Please enter a valid number').tooltip('show');
            } else {
                errorIndicator.css('display', 'none');
                $(errorIndicator).tooltip('hide');
            }
        });

        inputField.on('mouseout', function() {
            $('.error-icon').tooltip('hide');
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const numberInputs = document.querySelectorAll('.error-icon input[type="number"]');

    numberInputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorIndicator = input.nextElementSibling.querySelector('.error-indicator');
            if (input.value === '' || isNaN(input.value)) {
                errorIndicator.style.display = 'block';
                $(errorIndicator).attr('data-original-title', 'Please enter a valid number').tooltip('show');
            } else {
                errorIndicator.style.display = 'none';
            }
        });
        input.addEventListener('mouseout', () => {
            $('.error-indicator').tooltip('hide');
        });
    });

    $('#submitBtn').click(function() {
        if ($('#age').val() === '') {
            $('.error-icon').css('display', 'inline-block');
            return false;
        }

    });
});

