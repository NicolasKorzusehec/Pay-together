/*considerar:
ingresoGasto llama updateExit que a su vez llama tanto a clerExit como a average e imprime la salida.

Primero la desarrollo con entradas manuales en consola, luego con imputs o promps.*/

/*Variables entrada*/
var users=[];
var paid=[];
/*Variables Salida*/
var fullAmount = 0;
var averagePerUser = 0;

//Evalua los inputs en dicho instante
function checkInput(){
    //Por alguna razon si declaro estas varibles con let me obliga a ingresar ambos valores el form.
    person = document.getElementById('users').value;
    console.log( 'Se ingreso el nombre: ' + person );

    originAmount = document.getElementById('paid').value;
    console.log( 'Se ingreso el gasto: $' + originAmount );

    amount = Number( originAmount );
    console.log(amount);  
};

/*Analiza si falta completar algun campo, de ser asi manda una alerta y termina de ejecutar; de lo contrario incluye losparametros en los arreglos y llama la funcion updateExit */
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

function tryAgain(){
    alert("It's necesary to complete both fields. Please try Again.");
    console.log ('js. tryAgain funciona correctamente.');
};

function updateExit(){
    average();
    printExit();
};

function average(){
    fullAmount = 0;
    
    for (let iterator of paid) {
        fullAmount += iterator;
    };
    console.log('total es ' + fullAmount);

    averagePerUser = fullAmount/ paid.length;
    console.log('promedio por persona es ' + averagePerUser);
};

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
    };
};

function clearExit(){
    let defaultshow = document.getElementById('default');
    defaultshow.innerHTML = "";

    let enteredData = document.getElementById('entereddata');
    enteredData.innerHTML = "";

    let results = document.getElementById('results');
    results.innerHTML = "";
    console.log('Salida teoricamente reseteada.');

    exitTable();
    exitResults(); 
};

function exitTable(){
    console.log('html. Tabla con los valores que se ingresaron lograda');
    let enteredData = document.getElementById('entereddata');

    for (let index = paid.length -1; index > -1; index--) {
        let usuario = users[index]
        let monto = paid[index]
            enteredData.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${usuario}: $${monto}</td>
            </tr>
        `);
    };
};

function exitResults(){
    console.log('html. Salida con los valores calculados lograda');
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
    printExit();
    console.log(users);
    console.log(paid);
};