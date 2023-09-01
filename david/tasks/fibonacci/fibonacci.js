function generateFibonacci() {
    const n = parseInt(document.getElementById('number').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    let fibonacciSeries = [];
    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        fibonacciSeries.push(a);
        let temp = a;
        a = b;
        b = temp + b;
    }

    document.getElementById('result').innerText = "Fibonacci Series: " + fibonacciSeries.join(',');
}
