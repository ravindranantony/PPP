document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generateBtn');
    const numSeriesInput = document.getElementById('numSeries');
    const output = document.getElementById('output');

    generateBtn.addEventListener('click', function () {
        const numSeries = parseInt(numSeriesInput.value);

        if (!isNaN(numSeries)) {
            output.innerHTML = generateFibonacciSeries(numSeries);
        } else {
            output.innerHTML = 'Please enter a valid number.';
        }
    });

    function generateFibonacciSeries(n) {
        let series = [];
        let a = 0, b = 1;

        for (let i = 0; i < n; i++) {
            series.push(a);
            let temp = a + b;
            a = b;
            b = temp;
        }

        return series.join(', ');
    }
});