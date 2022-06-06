/*considerar:
ingresoGasto llama updateExit que a su vez llama tanto a clerExit como a average e imprime la salida.

Primero la desarrollo con entradas manuales en consola, luego con imputs o promps.*/

/*Variables entrada*/
var users=[];
var paid=[];
/*Variables Salida*/
var fullAmount = 0;
var averagePerUser = 0;

/* Ejecutamos la salida predeterminada cuando no hay entradas. */
printExit();

function ingresoGasto(person, amount){
    if (person === undefined || amount === undefined) {
        tryAgain();
    } else {
    users.push(person);
        console.log(users);
    paid.push(amount);
        console.log(paid);
    updateExit();
    };  
};

function tryAgain(){
    alert("It's necesary to complete both fields. Please try Again.");
    return;
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
    } else {
        clearExit();   
        exitTable();
        exitResults();
    };
};

function clearExit(){
    console.log('html. Salida teoricamente reseteada. se borro todo del div salida')
}

function exitTable(){
    console.log('html. Tabla con los valores que se ingresaron lograda');
};

function exitResults(){
    console.log('html. Salida con los valores calculados lograda');
};

function reset(){
    users = [];
    paid = [];
    printExit();
    console.log(users);
    console.log(paid);
};