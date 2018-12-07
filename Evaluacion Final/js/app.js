var calculadora = {
	
	visor: document.getElementById("display"),
	pantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false, //  esto para poder hacer uso de  ingreso consecutivo
	
	init: (function(){
		
		this.Efectos();
		this.asignarEventosaFuncion();
	}),
	
	// Funcion que crea efecto de presionar el boton

Efectos: function(){
			var teclas = document.getElementsByClassName('tecla');
			// Eventos
				for(var i=0; i< teclas.length; i++){
				teclas[i].addEventListener('mousedown', function(event){
				event.target.style.transform = "scale(0.95,0.95)";
				}
				)
					teclas[i].addEventListener('mouseup',function(event)
				{
					event.target.style.transform = "scale(1,1)";
				}
				)
			}
		},	


	//Organizando los eventos de función de calculadora

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	
	
	//Funcion de teclas de calculadora
	
	borrarVisor: function(){ 

	    this.pantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateVisor();
	},
	
	cambiarSigno: function(){
		if (this.pantalla !="0") {
			var aux;
			if (this.pantalla.charAt(0)=="-") {
				aux = this.pantalla.slice(1);
			}	else {
				aux = "-" + this.pantalla;
			}
		this.pantalla = "";
		this.pantalla = aux;
		this.updateVisor();
		}
	},
	
	ingresoDecimal: function(){
		if (this.pantalla.indexOf(".")== -1) {
			if (this.pantalla == ""){
				this.pantalla = this.pantalla + "0.";
			} else {
				this.pantalla = this.pantalla + ".";
			}
			this.updateVisor();
		}
	},
	
	ingresoNumero: function(valor){
		if (this.pantalla.length < 8) {
		
			if (this.pantalla=="0") {
				this.pantalla = "";
				this.pantalla = this.pantalla + valor;
			} else {
				this.pantalla = this.pantalla + valor;
			}
		this.updateVisor();
		}
	},
	
	ingresoOperacion: function(oper){
		this.primerValor = parseFloat(this.pantalla);
		this.pantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},
	
	verResultado: function(){ // TECLA IGUAL

		if(!this.auxTeclaIgual){ //Primer vez que presiono igual
			this.segundoValor = parseFloat(this.pantalla);
			this.ultimoValor = this.segundoValor;
		
		//Calculo el resultado
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else { //Siguientes veces que presiono igual
		//Calculo el resultado
		this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		//Almaceno el resultado como primer valor para poder seguir operando
		this.primerValor = this.resultado;
	
		//Borro el visor y lo reemplazo por el resultado
		this.pantalla = "";
	
		//verifico el largo del resultado para recortarlo si hace falta

		if (this.resultado.toString().length < 9){
			this.pantalla = this.resultado.toString();
		} else {
			this.pantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor

		this.auxTeclaIgual = true;		
		this.updateVisor();
	
	},
	
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	
	updateVisor: function(){
		this.visor.innerHTML = this.pantalla;
	}
	
};

calculadora.init();