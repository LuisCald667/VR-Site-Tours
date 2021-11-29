//importamos el achivo de funciones y accedemos al objeto de la bd y funciones
import contactobd, {guardar, crearEtiqueta} from './funciones.js';

/*Al cargar por primera vez el sitio debemos crear la bd,
empleamos la función de tindabd para crear la base de datos tienda
y la tabla de productos, para crear la tabla debemos indicar los atributos
++id indica que el id es auto incremental*/
let bd=contactobd("Contactanos", {contacto:`++id, nombre, email, consulta`});

//Objetos para acceder a lso input del formulario
const nombre_cont = document.getElementById("nombre");
const email_cont = document.getElementById("email");
/*Objeto para acceder a etiqueta que nos mostrará un mesaje en la 
tabla cuando no tengamos productos para mostrar*/
const consulta_cont = document.getElementById("consulta");
const mesajeSinRegistros = document.getElementById("siRegistros");
//Objeto para acceder al boton de enviar
const btEnviar=document.getElementById("enviar");


//Evento que se ejecuta al abrir la página
window.onload=() =>{
/*Ejecutamos la función de cargar tabla para que se muestren los productos
que actualmente estan en la BD*/
cargarTabla();
}



/*Evento click para guardar, se activa al presionar el 
boton guardar del formulario*/
btEnviar.onclick=(evento)=>{
    /*Ejecutamos la función guardar de el archivo de funciones
    indicamos que gaurdaremos un producto y que los datos a enviar
    son el nombre, precio y descripción (el id no por que es autoincremental)
    asignamos a cada campo el valor recuperado del formulario
    Nota: Recordar que flag retorna true si se gaurdo el registro y flase si no*/
     let flag =guardar(bd.contacto, {
     nombre:nombre_cont.value,
     email:email_cont.value,
     consulta:consulta_cont.value
 });
 
 if(flag){//Si se guardo limpiamo el formulario
   nombre_cont.value="";
   email_cont.value=""
   consulta_cont.value="";
  //recargamos la tabla para viasulizar el nuevo regsitro
   cargarTabla();
}
}

/*Función que agrega a la tabla cada producto registrado */
function cargarTabla(){
    //Recuperamos el objeto de la tabla que modificaremos
    const tbody =document.getElementById("tbody");
    /*Si la tabla ya tiene algo, la limpiamo de lo 
    contrario se duplicarían los registros*/
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    /*Ejecutamos la función de consultar del archivo de funciones
    la cual recibe la lista de productos*/
    consultar(bd.contacto,(contacto)=>{
       //Si existen productos
        if (contacto){
            /*Esta variable muesta el texto cuando no hay productos
            cuando hay debemos limpiar el mensaje*/
            mesajeSinRegistros.textContent="";
            /*Empleamos la función crearEtiqueta del archivo de funciones
            crearemos una nueva fila para la tabla*/
            crearEtiqueta("tr",tbody, (tr)=>{
                //Recorremos cada producto consultado
              for(const atributo in contacto){
                //Crearemos una  columna para cada atributo de el producto evaluado por el for
                crearEtiqueta("td",tr, (td)=>{
                /*Asignamos el valor de cada atributo del producto a la nueva columna
                la validación indica que si el campo es el de precio se le agrege un signo de $*/
                  td.textContent =contacto.precio===contacto[atributo]?`$ ${contacto[atributo]}`:contacto[atributo];
                })
            }
        })
        }
})
}