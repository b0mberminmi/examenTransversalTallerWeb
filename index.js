document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmButton = document.getElementById('confirmButton');
    let formData;

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const fechaIngreso = new Date(document.getElementById('fechaIngreso').value);

        // Obtener elementos de error
        const nombreError = document.getElementById('nombreError');
        const apellidoError = document.getElementById('apellidoError');
        const fechaNacimientoError = document.getElementById('fechaNacimientoError');
        const emailError = document.getElementById('emailError');
        const fechaIngresoError = document.getElementById('fechaIngresoError');

        // Limpiar mensajes de error previos
        nombreError.textContent = '';
        apellidoError.textContent = '';
        fechaNacimientoError.textContent = '';
        emailError.textContent = '';
        fechaIngresoError.textContent = '';

        // Validar que el nombre y apellido solo contengan letras
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(nombre)) {
            nombreError.textContent = 'El nombre solo puede contener letras.';
            return;
        }
        if (!nameRegex.test(apellido)) {
            apellidoError.textContent = 'El apellido solo puede contener letras.';
            return;
        }

        // Validar que la persona sea mayor de 18 años
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        if (edad < 18) {
            fechaNacimientoError.textContent = 'La persona debe tener más de 18 años.';
            return;
        }

        // Validar correo único
        const correosExistentes = Array.from(document.querySelectorAll('#userGrid .email')).map(span => span.textContent);
        if (correosExistentes.includes(email)) {
            emailError.textContent = 'El correo electrónico ya está registrado.';
            return;
        }

        // Guardar los datos del formulario para confirmar después
        formData = { nombre, apellido, fechaNacimiento, email, cargo, fechaIngreso };

        // Mostrar modal de confirmación
        confirmationModal.style.display = 'flex';
    });

    confirmButton.addEventListener('click', function() {
        // Confirmar el registro del usuario
        const userGrid = document.getElementById('userGrid');
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.innerHTML = `<div class="grid-item-content">
                            <strong>Nombre y Apellido:</strong><br> ${formData.nombre} ${formData.apellido} <br>
                            <strong>Correo electrónico:</strong><br> <span class="email">${formData.email}</span> <br>
                            <strong>Cargo:</strong><br> ${formData.cargo} <br>
                            <strong>Fecha de Ingreso:</strong><br> ${formData.fechaIngreso.toLocaleDateString()}
                         </div>
                         <button class="delete-button">Eliminar</button>`;

        // Añadir evento para eliminar el usuario
        div.querySelector('.delete-button').addEventListener('click', function() {
            userGrid.removeChild(div);
        });

        userGrid.appendChild(div);

        // Limpiar el formulario después de registrar
        document.getElementById('registrationForm').reset();

        // Cerrar el modal
        confirmationModal.style.display = 'none';
    });

});
