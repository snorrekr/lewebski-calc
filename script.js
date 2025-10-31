function adjustPeopleCount(amount) {
    const input = document.getElementById('peopleCount');
    let currentValue = parseInt(input.value, 10) || 0;
    currentValue += amount;
    if (currentValue < 0) currentValue = 0; // Prevent negative values
    input.value = currentValue;

    updateIngredientAmounts();
}

function adjustDrinksPerPerson(amount) {
    const input = document.getElementById('drinksPerPerson');
    let currentValue = parseInt(input.value, 10) || 1;
    currentValue += amount;
    if (currentValue < 1) currentValue = 1; // Prevent values below 1
    input.value = currentValue;

    updateIngredientAmounts();
}

function updateIngredientAmounts() {
    const peopleCount = parseInt(document.getElementById('peopleCount').value, 10) || 0;
    const drinksPerPerson = parseInt(document.getElementById('drinksPerPerson').value, 10) || 1;

    const ingredients = [
        { name: "Vodka", baseAmount: 80, bottleSize: 1000 }, // Base amount per drink in ml, bottle size in ml
        { name: "Kahlúa", baseAmount: 40, bottleSize: 750 },
        { name: "Kremfløte", baseAmount: 40, bottleSize: 300 }
    ];

    const tableRows = document.querySelectorAll("#ingredientsTable tbody tr");
    tableRows.forEach((row, index) => {
        const amountCell = row.children[1]; // Second cell contains the amount
        const bottleCell = row.children[3]; // Fourth cell contains the bottle info
        const totalDrinks = peopleCount * drinksPerPerson;
        const newAmount = ingredients[index].baseAmount * totalDrinks;
        const bottlesNeeded = Math.ceil(newAmount / ingredients[index].bottleSize); // Calculate bottles needed
        amountCell.textContent = newAmount; // Update the amount in the table
        bottleCell.textContent = bottlesNeeded; // Update the bottle info (only the number)
    });
}

// Add event listeners to handle manual changes
document.getElementById('peopleCount').addEventListener('input', updateIngredientAmounts);
document.getElementById('drinksPerPerson').addEventListener('input', updateIngredientAmounts);
