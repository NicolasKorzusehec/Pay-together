/*considerar:
ingresoGasto llama updateExit que a su vez llama tanto a clerExit como a average e imprime la salida.

Primero la desarrollo con entradas manuales en consola, luego con imputs o promps.*/

/*Variables entrada*/
var users=[];
var paid=[];
/*Variables Salida*/
var gastoTotal;
var promedio;

/* Ejecutamos la salida predeterminada cuando no hay entradas.
 */
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
/*     printExit()
 */ 
};

function average(){

};

function printExit(){
    if(users === undefined && paid === undefined){
        console.log("no data loaded yet");
    } else {
    clearExit();   
    console.log('Salida sobreescrita')    
    }


};

function clearExit(){
    console.log('salida reseteada')
}

function reset(){
    users = [];
    paid = [];
    printExit();
}