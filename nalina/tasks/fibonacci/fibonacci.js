function generateFibonacci() {
    const n = parseInt(document.getElementById('number').value);
    
    if (isNaN(n) || n<=0)    
    {
        alert("please enter a valid positive number.");
        return;
    }
    let fibonacciseries=[];
    let a=0,b=1;

    for (let i=0;i<n;i++)
    {
        fibonacciseries.push(a);
        let temp=a;
        a=b;
        b=temp+b;
    }
    document.getElementById('result').innerHTML = fibonacciseries;
}