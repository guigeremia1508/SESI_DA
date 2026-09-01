function calcular() {
    const campo1 = document.getElementById("campo1");
    const campo2 = document.getElementById("campo2");
    const operacao = document.getElementById("operacao");
    const resultado = document.getElementById("resultado");

    const num1 = Number(campo1.value);
    const num2 = Number(campo2.value);
    
    const sinal = operacao.value;
    
    let total = 0;

    switch (sinal) {
        case "+":
            total = num1 + num2;
            break;
        case "-":
            total = num1 - num2;
            break;
        case "*":
            total = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                resultado.innerHTML = "Erro: Divisão por 0";
                return; 
            }
            total = num1 / num2;
            break;
    }
    
    resultado.innerHTML = "Resultado: " + total;
}