let formulario = document.getElementById('formulario');//post
let btnCorreo = document.getElementById('btnCorreo');
let btnEditar = document.getElementById('btnEditar');
let btnEliminar = document.getElementById('btnEliminar');

window.addEventListener('DOMContentLoaded', async () => {

    document.getElementById('id').style.display = 'none';
    document.getElementById('label-edit').style.display = 'none';
})

formulario.addEventListener('submit', async (e) => {  //escuchar el evento y concadenar una funcion para realizar las respectivas acciones dentro de la misma 
    e.preventDefault();// prevenir eventos por defectos

let name = document.getElementById('name').value; //obtenr el valor elemento y asignarlo a una varible 
let lastName = document.getElementById('lastName').value; //obtenr el valor elemento y asignarlo a una varible
let email = document.getElementById('email').value; //obtenr el valor elemento y asignarlo a una varible
        //inicio de peticiones 
    let resp = await fetch('http://localhost:4002/usuarios/',{      // vamos revisarla con postman 
        //definir las propiedades 
        //primera propiedad
    method: 'POST',
    
        body: JSON.stringify({  /*debemos armar un objeto con la informacion que estamos recibiendo y necesitamos
                                        que quede en una estructura json utilizamos la funcion stringify*/
            
            nombre: name,           /*vamos armar el objeto y  decimos aqui: lo que capturemos en la caja de texto se lo vamos asignar a las propiedade de un objeto  */
            apellido: lastName,
            correo: email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8" //aqui vamos a definir el header y establecer una configuracion que asignamos en postman y los caracteres especiales
        }
    }) 
    let data = resp.json();
    console.log(data) 
})

btnCorreo.addEventListener('click', async () => {
    document.getElementById('id').style.display = 'block';
    document.getElementById('label-edit').style.display = 'block';
    let email = document.getElementById('email').value;
    document.getElementById('email').readOnly = true;

    let resp = await fetch('http://localhost:4002/usuarios');
    let data = await resp.json();
    console.log(data);
    let modificar = data.find(user => user.correo === email)
    const {nombre, apellido, correo, id} = modificar;
    console.log(nombre, apellido, correo, id);
    document.getElementById('name').value = nombre;
    document.getElementById('lastName').value = apellido
    
    document.getElementById('email').value = correo;
    document.getElementById('id').value = id;
})

btnEditar.addEventListener('click', async() => {
    let idModificar = document.getElementById('id').value;
    let nameMod = document.getElementById('name').value;
    let lastNameMod = document.getElementById('lastName').value;
    let emailMod = document.getElementById('email').value;
  
    let resp = await fetch(`http://localhost:4002/usuarios/${idModificar}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificar,
            nombre: nameMod,
            apellido: lastNameMod,
            correo: emailMod
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }) 
    let data = resp.json();
    console.log(data); 
})

btnEliminar.addEventListener('click', async() => {

    let idModificar = document.getElementById(' ').value;
    let resp = await fetch(`http://localhost:4002/usuarios/${idModificar}`,{
        method: 'DELETE',
    })
    let data = resp.json();
    console.log(data); 
})