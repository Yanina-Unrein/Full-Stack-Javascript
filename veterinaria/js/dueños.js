console.log('dueños')
const tipo = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaDuenos = document.getElementById('lista-duenos');

//Guardar las mascotas del boton nueva mascota en un array
let duenos = [
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
function listarDuenos() {
  const htmlDuenos = duenos.map((dueno, index)=>`<tr>
      <th scope="row">${index}</th>
      <td>${dueno.identificacion}</td>
      <td>${dueno.pais}</td>
      <td>${dueno.nombre}</td>
      <td>${dueno.apellido}</td>
      <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`).join("");
  listaDuenos.innerHTML = htmlDuenos;
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
      duenos[indice.value] = datos;
      break;
    default:
      //Crear
      duenos.push(datos);
      break;
  }
  listarDuenos();
  resetModal();
}

//funcion para editar la mascota agregada
function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const dueno = duenos[index];
    indice.value = index;
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    pais.value = dueno.pais;
    identificacion.value = dueno.identificacion;
  }
}


//funcion para resetear el Modal
function resetModal() {
  indice.value = '';
  nombre.value = '';
  apellido.value = '';
  pais.value = '';
  identificacion.value = '';
  btnGuardar.innerHTML = 'Crear'
}

//funcion para eliminar mascota agregada
function eliminar(index) {
  return function clickEnEliminar() {
    duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
    listarDuenos();
  }
}

listarDuenos();

form.onsubmit = enviarDatos;

//Funcion para guardar los datos del fomulario del modal
btnGuardar.onclick = enviarDatos;