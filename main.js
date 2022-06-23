//Variables entrada, permanentes
var users=[];
var paid=[];

var lastData=[];
//Variables Salida, temporales
var idinputs = []; 
var fullAmount = 0;
var originAverage = 0;



//Analiza si falta completar algun campo, de ser asi manda una alerta y termina de ejecutar; de lo contrario incluye los parametros en los arreglos y llama la funcion updateExit 
function ingresoGasto(person, amount){
    console.log( 'Se ingreso el nombre: ' + person );
    console.log( 'Se ingreso el gasto: $' + Number(amount) );

    
    //El profe me habia mencionado que no era correcto escribir la logica del siguiente if de esta manera para definir que no hay input.
    if ( person == '' ){
        tryAgain();
    } else {
    users.push(person);
    console.log('Inputs usuarios actual:')
        console.log(users);
    paid.push( Number(amount) );
        console.log('Inputs gastos actual:')
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
    listarIds();
    average();
    printExit();
};

//Completa el array con los ids de cada input
function listarIds(){
    idinputs = []; //Lo seteamos

    let xid = 0;
    for (let iterator of users) {
        idinputs.push('entrada' + xid);
        xid++;
    }
    console.log( 'Lista de ID existentes: ');
    console.log( idinputs )
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
        let id = idinputs[index];

        console.log('Se imprimio una celda');
        console.log('El id es ' + id);

        enteredData.insertAdjacentHTML("beforeend", `
            <tr>
                <td>
                    <span>${usuario}: $${monto}</span>
                    <button onclick="erase('${id}')" class="btn-close ms-1" aria-label="Close"></button>
                </td> 
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
        <button onclick="reset()" class="btn btn-secondary btn-sm">Reset</button>
    </div>
    `;
};

//Imprime la consola en default
//A partir del id, busca el index y elimina los elementos de los arrays permanentes. Luego reinicia la salida como si fuera un nuevo ingreso de informacion.
function erase(entry){
    let noIndex = idinputs.indexOf(entry);
    users.splice(noIndex, 1);
    paid.splice(noIndex, 1);
    updateExit();
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


//Guardar en un JSON unos resultados
function saveData(){
    lastData=[];
    for (let index = 0; index < users.length; index++) {
        lastData.push({"userName": users[index], "amount": paid[index]})
    }
    lastData.push({"totalAmount": fullAmount,"average": averagePerUser})
    console.clear()
    console.log(JSON.parse(JSON.stringify(lastData)))
};


// Trae la ultima informacion guardada en JSON de resultados anteriores
function bringData(){
    users=[];
    paid=[];
    for (let index = 0; index < lastData.length-1; index++) {
        users.push(lastData[index]["userName"])
        paid.push(lastData[index]["amount"])

    };

    console.clear()
    console.log(users, paid);

    updateExit()
};

//Descargar un JSON
function downloadData(){
    var link = document.createElement('a')
    let json = JSON.stringify(lastData)
    var blob = new Blob([json], {type: 'application/json'});
    let url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'sesion.json';
    link.click();
};

//Sube un JSON con datos anteriormente calculados
//Se rompe por la referencia que toma json
function uploadData(){
    console.clear()
    console.log('probando carga')
    users=[];
    paid=[];
    fetch('sesion.json')
    //Probe lo siguiente
    //fetch('file:///C:/Users/Usuario/Downloads/sesion%20(6).json')
    /*Me salto esto:
    Not allowed to load local resource
    Uncaught (in promise) TypeError: Failed to fetch
    at uploadData (main.js:228:5)
    at HTMLButtonElement.onclick (index.html:112:97*/
        .then( response => response.json())
        .then( data => {
            console.log(data);
            for (let i = 0; i < data.length-1; i++) {
                console.log( data[i].userName, data[i].amount );
                ingresoGasto( data[i].userName, data[i].amount )
            }
        })
}

