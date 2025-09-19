document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let runUsuario = params.get('run');
    if (!runUsuario) return;

    runUsuario = runUsuario.toUpperCase().replace(/\./g, '').replace(/-/g, '');
    const usuarioInfoDiv = document.getElementById('usuario-info');
    const editarBtn = document.getElementById('editar-btn');

    fetch('../assets/json/bd_usuarios.json')
        .then(res => res.json())
        .then(data => {
            const usuario = data.usuarios.find(u => {
                const runJSON = u.run.toUpperCase().replace(/\./g, '').replace(/-/g, '');
                return runJSON === runUsuario;
            });

            if (!usuario) {
                usuarioInfoDiv.innerHTML = '<p class="text-danger">Usuario no encontrado</p>';
                if (editarBtn) editarBtn.style.display = 'none';
                return;
            }

            document.getElementById('nombre-usuario').textContent = usuario.nombre + ' ' + usuario.apellidos;
            document.getElementById('run-usuario').textContent = usuario.run;
            document.getElementById('correo-usuario').textContent = usuario.correo;
            document.getElementById('fecha-usuario').textContent = usuario.fechaNacimiento || '-';
            document.getElementById('tipo-usuario').textContent = usuario.tipoUsuario;
            document.getElementById('region-usuario').textContent = usuario.region;
            document.getElementById('comuna-usuario').textContent = usuario.comuna;
            document.getElementById('direccion-usuario').textContent = usuario.direccion;

            editarBtn.addEventListener('click', () => {
                window.location.href = `editar_usuario.html?run=${usuario.run}`;
            });
        })
        .catch(err => {
            usuarioInfoDiv.innerHTML = '<p class="text-danger">Error cargando datos del usuario</p>';
            console.error(err);
        });
});