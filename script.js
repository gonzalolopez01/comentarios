const apiUrl = 'https://api.jsonbin.io/v3/b/66914c86e41b4d34e410dc28';
const apiKey = '$2a$10$sNZLYjuLxN.hrL29yzXdle31WS4a/q7cFSwcwduy382aB11WfnSZO';

const contenedor = document.getElementById("contenedor");

// cargo los comentarios
async function loadComment() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();   
        console.log(data);
       
        let comentarios = [];
   
        data.record.forEach(comentario => {
            // Crea elementos HTML para mostrar cada atributo
            const div = document.createElement('div');
            div.classList.add('comment-box');

            const emailElement = document.createElement('p');
            emailElement.textContent = `Email: ${comentario.email}`;

            const fechaElement = document.createElement('p');
            fechaElement.textContent = `Fecha: ${comentario.fecha}`;

            const calificacionElement = document.createElement('p');
            calificacionElement.textContent = `Calificación: ${comentario.calificacion}`;

            const comentarioElement = document.createElement('p');
            comentarioElement.textContent = `Comentario: ${comentario.comentario}`;

            // Agrega los elementos al contenedor principal
            div.appendChild(emailElement);
            div.appendChild(fechaElement);
            div.appendChild(calificacionElement);
            div.appendChild(comentarioElement);

            contenedor.appendChild(div);
        });           
        //contenedor.innerHTML = comentarios;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

//agregar comentario

async function addComment(comentario) {
    const response = await fetch(binUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify(comentario)
    });

    if (response.ok) {
        fetchData(); // Actualizar los comentarios después de agregar uno nuevo
    } else {
        console.error('Error al agregar el comentario');
    }
}

document.getElementById('formComentario').addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoComentario = {
        email: document.getElementById('email').value,
        fecha: document.getElementById('fecha').value,
        calificacion: document.getElementById('calificacion').value,
        comentario: document.getElementById('comentario').value
    };

    agregarComentario(nuevoComentario);
});

loadComment();