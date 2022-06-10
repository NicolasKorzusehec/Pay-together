//Variables entrada
var users=[];
var paid=[];
//Variables Salida
var fullAmount = 0;
var originAverage = 0;

//Evalua el valor de los inputs en dicho instante en que se convoca esta funcion. 
function checkInput(){
    //Por alguna razon si declaro estas varibles con let me obliga a ingresar ambos valores el form.
    person = document.getElementById('users').value;
    console.log( 'Se ingreso el nombre: ' + person );

    amount = Number( document.getElementById('paid').value );
    console.log( 'Se ingreso el gasto: $' + amount );
};

//Analiza si falta completar algun campo, de ser asi manda una alerta y termina de ejecutar; de lo contrario incluye losparametros en los arreglos y llama la funcion updateExit 
function ingresoGasto(){
    checkInput();

    //No entiendo por que no me acepta el siguiente if, si tiene que ver con que amount viene de un parsefloat indefinido.
/*  if ( amount == NaN ) {
        amount = 0;
    }; */

    //El profe me habia mencionado que no era corecto escribir la logica del siguiente if de esta manera para definir que no hay input.
    if ( person == [] ){
        tryAgain();
    } else {
    users.push(person);
        console.log(users);
    paid.push(amount);
        console.log(paid);
    updateExit();
    console.log('Total de datos ingresados: ' + paid.length);
    };  
};

//Protege que se ingrese un monto sin  su responsable
function tryAgain(){
    alert("It's necesary to complete both fields. Please try Again.");
    console.log ('js. tryAgain funciona correctamente.');
};

//Bloque para mandar de manera ordenada a calcular los resultados y a que se impriman
function updateExit(){
    average();
    printExit();
};

//Calcula los resultados en funcion de los datos almacenados.
function average(){
    fullAmount = 0;
    
    for (let iterator of paid) {
        fullAmount += iterator;
    };
    console.log('Gasto total: $' + fullAmount);

    originAverage = fullAmount/ paid.length;
    
    //Este condicional permite que el promedio imprima decimales solo si tiene resto distinto de 0.
    if ( fullAmount % paid.length !== 0 ) {
        averagePerUser = originAverage.toFixed(2);
    } else { averagePerUser = originAverage };

    console.log('Gasto promedio por persona: $' + averagePerUser);
};

//Cuando se resetean las listas de datos vuelve a imprimir la pantalla por default al entrar a la webpage sin recargar la webpage.
//Por otro lado, si se ingreso un nuevo dato simplemente borra todo el contenido del div de salida actual y llama a imprimir la tabla de datos y los resultados.
function printExit(){
    if( users == false && paid == false ){
        console.log("html. ventana base en la que figure no data loaded yet");

        let defaultshow = document.getElementById('default');
        defaultshow.innerHTML = `
        <p>No data loaded yet</p> 
        `;

        let enteredData = document.getElementById('entereddata');
        enteredData.innerHTML = "";
        let results = document.getElementById('results');
        results.innerHTML = "";

    } else {
        clearExit();

        exitTable();
        exitResults(); 
    };
};

//Limpia todo el div de salida.
function clearExit(){
    let defaultshow = document.getElementById('default');
    defaultshow.innerHTML = "";

    let enteredData = document.getElementById('entereddata');
    enteredData.innerHTML = "";

    let results = document.getElementById('results');
    results.innerHTML = "";

    console.log('Div de salida reiniciado.');
};

//Imprime la tabla con los datos actuales en el div de Salida.
function exitTable(){
    console.log('html. Impresion de la Tabla con los valores que se ingresaron lograda.');
    let enteredData = document.getElementById('entereddata');

    for (let index = paid.length -1; index > -1; index--) {
        let usuario = users[index];
        let monto = paid[index];

        enteredData.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${usuario}: $${monto}</td>
            </tr>
        `);
    };
};

//Imprime los resultados actuales en el div de Salida.
function exitResults(){
    console.log('html. Impresion de los resultados calculados lograda.');
    let results = document.getElementById('results');
    results.innerHTML = `                            
    <div class="col-8">
        <p class="m-0">Total: $${fullAmount}</p>
        <p class="m-0">Everyone must pay: $${averagePerUser}</p>                      
    </div>
    <div class="col-4">
        <button onclick="reset()">Reset</button>
    </div>
    `;
};

function reset(){
    users = [];
    paid = [];

    //Limpio la consola para sacar todas las confirmaciones en consola de los ingresos anteriores.
    console.clear();

    printExit();

    console.log( 'Cantidad de nombres actual: ' + Number( users ) );
    console.log( 'Cantidad de gastos actual: ' + Number( paid ) );
};