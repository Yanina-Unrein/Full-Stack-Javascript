console.log('veterinarias')
const tipo = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaVeterinarias = document.getElementById('lista-veterinarias');

//Guardar las mascotas del boton nueva mascota en un array
let veterinarias = [
    {
        nombre: "Carolina",
        apellido: "Perez",
        pais: "Colombia",
        identificacion: "123456789"
    },
    {
        nombre: "Abby",
        apellido: "Unrein",
        pais: "Argentina",
        identificacion: "987654321"
    },
    {
        nombre: "Tomas",
        apellido: "Rio",
        pais: "Ecuador",
        identificacion: "4561218454"
    },
    {
        nombre: "Noemi",
        apellido: "Arevalos",
        pais: "Bolivia",
        identificacion: "78945121823"
    },    
];

//busca las mascotas dentro de nuestra aplicacion
function listarVeterinarias(){
    const htmlVeterianarias = veterinarias.map((veterinaria, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.identificacion}</td>
    <td>${veterinaria.pais}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`).join("");
  listaVeterinarias.innerHTML = htmlVeterianarias;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

//funcion para el formulario del modal
function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    pais: pais.value,
    identificacion: identificacion.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    //Editar
    case 'Editar':
      veterinarias[indice.value] = datos;
      break;
    default:
      //crear
      veterinarias.push(datos);
      break;
  }
  listarVeterinarias();
  resetModal();
}

//funcion para editar la mascota agregada
function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModal').modal('toggle');
    const veterinaria = veterinarias[index];
    indice.value = index;
    nombre.value = veterinaria.nombre;
    apellido.value = veterinaria.apellido;
    pais.value = veterinaria.pais;
    identificacion.value = veterinaria.identificacion;
  }
}

//funcion para resetear el Modal
function resetModal() {
    indice.value = '';
    nombre.value= '';
    apellido.value= '';
    pais.value= '';
    identificacion.value='';
    btnGuardar.innerHTML = 'Crear';
}

//funcion para eliminar mascota agregada
function eliminar(index) {
  return function clickEnEliminar() {
    veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria !== index);
    listarVeterinarias();
  }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
//Funcion para guardar los datos del fomulario del modal
btnGuardar.onclick = enviarDatos;