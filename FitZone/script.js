// Function to handle the calculation and display of results
function calculateCalories() {
    // Hide results by default in case of validation failure
    document.getElementById('result-output').style.display = 'none';
    document.getElementById('target-output').style.display = 'none';

    // 1. Get input values
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value); 
    const height = parseFloat(document.getElementById('height').value); 
    const activityLevel = document.getElementById('active').value;
    
    // **FIX: Use querySelector to reliably find the selected gender radio button**
    const selectedGender = document.querySelector('input[name="gender"]:checked');

    // 2. Stronger Validation: Check if gender is selected and inputs are valid numbers
    if (!selectedGender) {
        alert('Please select your gender.');
        return;
    }

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
        alert('Please ensure all fields (Age, Weight, Height) are filled with positive numbers.');
        return;
    }
    
    // Determine if the selected gender is Male
    const genderMale = (selectedGender.value === 'male');


    // 3. Define Activity Multipliers
    let activityMultiplier = 1.0;
    switch (activityLevel) {
        case 'inactive':
            activityMultiplier = 1.2;
            break;
        case 'light exercise':
            activityMultiplier = 1.375;
            break;
        case 'moderate exercise':
            activityMultiplier = 1.55;
            break;
        case 'heavy exercise':
            activityMultiplier = 1.725;
            break;
        case 'athlete':
            activityMultiplier = 1.9;
            break;
    }

    // 4. Calculate Basal Metabolic Rate (BMR)
    let bmr = 0;
    if (genderMale) {
        // Mifflin-St Jeor for Men
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        // Mifflin-St Jeor for Women
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 5. Calculate Maintenance Calories (TDEE)
    const maintenanceCalories = Math.round(bmr * activityMultiplier);

    // 6. Calculate Target Calories for Loss and Gain
    const lossTarget = Math.round(maintenanceCalories - 500); 
    const gainTarget = Math.round(maintenanceCalories + 500); 

    // 7. Display Results in Both Boxes

    // Maintenance Box
    document.getElementById('maintenance-cals').textContent = maintenanceCalories.toLocaleString();
    
    // Target Box
    document.getElementById('loss-cals').textContent = lossTarget.toLocaleString();
    document.getElementById('gain-cals').textContent = gainTarget.toLocaleString();
    
    // 8. Make the results sections visible!
    document.getElementById('result-output').style.display = 'block';
    document.getElementById('target-output').style.display = 'block';
}

// Attach the function to the "Calculate" button
document.getElementById('calculate-btn').addEventListener('click', calculateCalories);