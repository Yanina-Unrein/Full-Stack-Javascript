console.log('mascotas')
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueño = document.getElementById('dueño');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btnGuardar');
const listaMascotas = document.getElementById('lista-mascotas');

//Guardar las mascotas del boton nueva mascota en un array
let mascotas = [
    {
        tipo : "Gato",
        nombre: "manchas",
        dueño: "Esteban"
    },
    {
      tipo : "Perro",
      nombre: "mia",
      dueño: "Jorge"
  }
];

//busca las mascotas dentro de nuestra aplicacion
function listarMascotas(){
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueño}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`).join("");
  listaMascotas.innerHTML = htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

//funcion para el formulario del modal
function enviarDatos(evento){
  evento.preventDefault();
  const datos = {
      tipo : tipo.value,
      nombre : nombre.value,
      dueño : dueño.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion){
    case 'Editar':
      //editar
      mascotas[indice.value] = datos;
     break;
    default:
       //crear
       mascotas.push(datos);
       break;
  }
    listarMascotas();
    resetModal();
}

//funcion para editar la mascota agregada
function editar(index){
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModal').modal('toggle');
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    nombre.dueño = mascota.dueño;
    tipo.value = mascota.tipo;
    indice.value = index;
  }
}

//funcion para resetear el Modal
function resetModal() {
  nombre.value = '';
  nombre.dueño = '';
  tipo.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear';
}

//funcion para eliminar mascota agregada
function eliminar(index) {
  return function clickEnEliminar() {
    mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
    listarMascotas();
  }
}

listarMascotas();

form.onsubmit = enviarDatos;

//Funcion para guardar los datos del fomulario del modal
btnGuardar.onclick = enviarDatos;