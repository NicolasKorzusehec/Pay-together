/*considerar:
ingresoGasto llama updateExit que a su vez llama tanto a clerExit como a average e imprime la salida.

Primero la desarrollo con entradas manuales en consola, luego con imputs o promps.*/

/*Variables entrada*/
var users=[];
var paid=[];
/*Variables Salida*/
var fullAmount = 0;
var averagePerUser = 0;

/*Analiza si falta completar algun campo, de ser asi manda una alerta y termina de ejecutar; de lo contrario incluye losparametros en los arreglos y llama la funcion updateExit */
function ingresoGasto(){
    let person = document.getElementById('users').value;
    let amount = parseFloat( document.getElementById('paid').value );
    
    if ( person == [] || amount == [] ){
        tryAgain();
    } else {
    users.push(person);
        console.log(users);
    paid.push(amount);
        console.log(paid);
    updateExit(person, amount);
    };  
};

function tryAgain(){
    alert("It's necesary to complete both fields. Please try Again.");
    console.log ('tryAgain funciona correctamente.');
};

function updateExit(i, cash){
    average();
    printExit(i, cash);
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

function printExit(i, cash){
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
        clearExit(i, cash);   
    };
};

function clearExit(i, cash){
    let defaultshow = document.getElementById('default');
    defaultshow.innerHTML = "";

    let enteredData = document.getElementById('entereddata');
    enteredData.innerHTML = "";

    let results = document.getElementById('results');
    results.innerHTML = "";
    console.log('Salida teoricamente reseteada.');

    exitTable(i, cash);
    exitResults(); 
};

 function exitTable(i, cash){
    console.log('html. Tabla con los valores que se ingresaron lograda');
    let enteredData = document.getElementById('entereddata');
    enteredData.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${i}: $${cash}</td>
        </tr>
    `)
};


/* function exitTable(i, cash){
    console.log('html. Tabla con los valores que se ingresaron lograda');
/*     let enteredData = document.getElementById('entereddata');
    let printTable;
    
    for (let index = paid.length; index > -1; index--){
        printTable += <tr>
        <td>${users[index]}: $${paid[index]}</td>
    </tr>
    }
    
    enteredData.innerHTML = `${printTable}`
 };
 */


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
    `
};

function reset(){
    users = [];
    paid = [];
    printExit();
    console.log(users);
    console.log(paid);
};