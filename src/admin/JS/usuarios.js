document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('users-table');

    fetch('../assets/json/bd_usuarios.json')
        .then(res => res.json())
        .then(data => {
            const usuarios = data.usuarios;

            usuarios.forEach(u => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${u.run}</td>
                    <td>${u.nombre}</td>
                    <td class="d-hide-md d-hide-sm">${u.apellidos}</td>
                    <td class="d-hide-md d-hide-sm">${u.correo}</td>
                    <td class="d-hide-md d-hide-sm">${u.fechaNacimiento || '-'}</td>
                    <td class="d-hide-md d-hide-sm">${u.tipoUsuario}</td>
                    <td class="d-hide-md d-hide-sm">${u.region}</td>
                    <td class="d-hide-md d-hide-sm">${u.comuna}</td>
                    <td class="d-hide-md d-hide-sm">${u.direccion}</td>
                    <td>
                        <div class="btn-group-table">
                            <button class="btn btn-info btn-sm" onclick="verUsuario('${u.run}')">👁 Ver</button>
                            <button class="btn btn-warning btn-sm" onclick="editarUsuario('${u.run}')">✏ Editar</button>
                        </div>
                    </td>
                `;
                usersTable.appendChild(tr);
            });
        })
        .catch(err => console.error('Error cargando usuarios:', err));

    // Funciones globales
    window.verUsuario = function(run) {
        window.location.href = `ver_usuario.html?run=${run}`;
    }

    window.editarUsuario = function(run) {
        window.location.href = `editar_usuario.html?run=${run}`;
    }

    window.logout = function() {
        alert('Sesión cerrada (simulado)');
        window.location.href = '../index.html';
    }
});
