
const usuario= process.argv[2]
const numero= process.argv[3]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
  console.log(numeroAleatorioEntreZeroeDez)
  
  // const numeroAleatorioEntreUmeNove = getRndInteger(1, 9)
  // console.log(numeroAleatorioEntreUmeNove)
  
  // const numeroAleatorioEntreDezeQuinze = getRndInteger(10, 15)
  // console.log(numeroAleatorioEntreDezeQuinze)

  const soma = Number(numero) + Number(numeroAleatorioEntreZeroeDez)

  if(!usuario || !numero){
    console.log("Faltou digitar Par/Impar e/ou número")
  }else{
    if(soma%2 === 0 && usuario === "par"){
      console.log(`Você escolheu par e o seu computador escolheu impar. O resultado foi ${soma} Você ganhou!`)
    }else if(soma%2 === 1 && usuario === "par"){
      console.log(`Você escolheu par e o seu computador escolheu impar. O resultado foi ${soma} Você perdeu!`)
    }else if(soma%2 === 0 && usuario === "impar"){
      console.log(`Você escolheu par e o seu computador escolheu impar. O resultado foi ${soma} Você perdeu!`)
    }else if(soma%2 === 1 && usuario === "impar"){
      console.log(`Você escolheu par e o seu computador escolheu impar. O resultado foi ${soma} Você ganhou!`)
    }else{
      console.log("Acabou")
    }
  }

