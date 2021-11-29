/*Función para crear una nueva base de datos indexDB
recibimos el nombre de la base de datos a crear y el nombre de la tabla*/
const contactobd=(nombrebd, tabla)=>{
    //Creando la bd con el nomvre recibido
    const bd=new Dexie(nombrebd);
    //Crea una tabla con el nombre recibido
    bd.version(1).stores(tabla);
    //Al crear una nueva bd se debe abrir
    bd.open();
    //retornamos el objeto db que dará acceso a base de datos
    return bd;

}


const guardar=(tabla, datos)=>{
  /*emptu valida que los datos enviados no estan vacios o nulos
  flag recibe true si contienen datos y false si estan vacios*/
    let flag=empty(datos);
    //si hay datos para guardar
    if(flag){
        //la función bulkadd realiza una inserción en la tabla
        tabla.bulkAdd([datos]);
        console.log("inserción realizada")
    }
    else{//si algun campo esta vacio
        console.log("No puedes dajar campos vacios")
    }
  /*retornamos la bandera si es true se usará para 
  limpiar el formulario*/
   return flag;
    
}


//Función para validar campos
const empty = object =>{
    let flag=false;
    //cada dato enviado del formulario se procesa
    for (const value in object){
        //si no nulo y contiene un valor
        if(object[value]!="" && object.hasOwnProperty(value)){
            //retornamos true para proceder con la insercion
            flag=true;
        }else{
            //retornamos true para enviar el error
            flag=false;
        }
    }
    //regresamos el valor que contenga flag (true o false)
    return flag;
}


/*Función que nos permitirá construir etiquetas html para incrustarlas
 en la vista indicamos la etiqueta que queremos agregar y el lugar 
de la página donde debe incrustarse*/
const crearEtiqueta=(etiqueta, agregarA, funcion)=>{
    //Función para crear la etiqueta que solicitemos
    const etiquetaACrear=document.createElement(etiqueta);
    if(etiquetaACrear){//si se pudo crear
        //Agregamos la nueva etiqueta al sitio donde debe ir
     agregarA.appendChild(etiquetaACrear);}
    if(funcion){
        /*Si se pudo crear se retorna la nueva etiqueta para
        agregar el contenido y estilos acorde a las necesidades */
        funcion(etiquetaACrear);
    }
}

//Retonamos el objeto de neustra bd para poderla manipular
export default contactobd;
//Cada función creada se retorna
export {guardar, crearEtiqueta }

/*Al exportar objetos y funciones puden ser usadas por los componentes
que importen este archivo*/ 