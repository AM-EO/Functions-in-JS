function factorial(num) {
    if (num <= 1) {
        return 1;
    }
    return num * factorial(num - 1);
}

//alert("Факториал числа 5 равен: " + factorial(5));

//alert("Факториал числа 10000 равен: " + factorial(10000));

//alert("Факториал числа 100000 равен: " + factorial(100000));