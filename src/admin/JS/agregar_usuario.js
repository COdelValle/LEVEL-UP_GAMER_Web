document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    // Validaciones
    function validarRun(run) {
        if (!run) return false;
        run = run.toUpperCase().replace(/\./g, '').replace(/-/g, '');
        if (run.length < 7 || run.length > 9) return false;
        const cuerpo = run.slice(0, -1);
        const dv = run.slice(-1);
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += multiplo * parseInt(cuerpo[i], 10);
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const dvCalc = 11 - (suma % 11);
        const dvFinal = dvCalc === 11 ? '0' : dvCalc === 10 ? 'K' : dvCalc.toString();
        return dvFinal === dv.toUpperCase();
    }

    function validarCorreo(email) {
        if (!email) return false;
        const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return regex.test(email);
    }

    function mostrarError(input, mensaje) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv) errorDiv.textContent = mensaje;
    }

    function limpiarError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv) errorDiv.textContent = '';
    }

    // Cargar regiones y comunas
    fetch('../assets/json/bd_usuarios.json')
        .then(res => res.json())
        .then(data => {
            const regiones = data.regiones;
            regiones.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.nombre;
                opt.textContent = r.nombre;
                regionSelect.appendChild(opt);
            });

            regionSelect.addEventListener('change', e => {
                const seleccion = regiones.find(r => r.nombre === e.target.value);
                comunaSelect.innerHTML = '';
                if (seleccion) {
                    seleccion.comunas.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c;
                        opt.textContent = c;
                        comunaSelect.appendChild(opt);
                    });
                }
            });

            regionSelect.dispatchEvent(new Event('change'));
        });

    // Manejo submit
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valido = true;

        const run = form.run.value.trim();
        const nombre = form.nombre.value.trim();
        const apellidos = form.apellidos.value.trim();
        const correo = form.correo.value.trim();
        const direccion = form.direccion.value.trim();
        const fechaNacimiento = form.fechaNacimiento.value.trim();
        const tipoUsuario = form.tipoUsuario.value;
        const region = form.region.value;
        const comuna = form.comuna.value;

        // Validación RUN
        if (!run) {
            mostrarError(form.run, 'Debes ingresar el RUN del usuario (ej: 19011022K)');
            valido = false;
        } else if (!validarRun(run)) {
            mostrarError(form.run, 'RUN inválido: revisa que tenga 7 a 9 dígitos y el dígito verificador correcto');
            valido = false;
        } else {
            limpiarError(form.run);
        }

        // Validación Nombre
        if (!nombre) {
            mostrarError(form.nombre, 'Debes ingresar el nombre del usuario');
            valido = false;
        } else if (nombre.length > 50) {
            mostrarError(form.nombre, 'Nombre demasiado largo (máx 50 caracteres)');
            valido = false;
        } else {
            limpiarError(form.nombre);
        }

        // Validación Apellidos
        if (!apellidos) {
            mostrarError(form.apellidos, 'Debes ingresar los apellidos del usuario');
            valido = false;
        } else if (apellidos.length > 100) {
            mostrarError(form.apellidos, 'Apellidos demasiado largos (máx 100 caracteres)');
            valido = false;
        } else {
            limpiarError(form.apellidos);
        }

        // Validación Correo
        if (!correo) {
            mostrarError(form.correo, 'Debes ingresar el correo del usuario');
            valido = false;
        } else if (correo.length > 100) {
            mostrarError(form.correo, 'Correo demasiado largo (máx 100 caracteres)');
            valido = false;
        } else if (!validarCorreo(correo)) {
            mostrarError(form.correo, 'Correo inválido: debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
            valido = false;
        } else {
            limpiarError(form.correo);
        }

        // Validación Dirección
        if (!direccion) {
            mostrarError(form.direccion, 'Debes ingresar la dirección del usuario');
            valido = false;
        } else if (direccion.length > 300) {
            mostrarError(form.direccion, 'Dirección demasiado larga (máx 300 caracteres)');
            valido = false;
        } else {
            limpiarError(form.direccion);
        }

        // Validación Fecha de Nacimiento
        if (!fechaNacimiento) {
            mostrarError(form.fechaNacimiento, 'Debes ingresar la fecha de nacimiento');
            valido = false;
        } else {
            const fecha = new Date(fechaNacimiento);
            const hoy = new Date();
            if (fecha > hoy) {
                mostrarError(form.fechaNacimiento, 'La fecha de nacimiento no puede ser en el futuro');
                valido = false;
            } else {
                limpiarError(form.fechaNacimiento);
            }
        }

        // Validación Tipo de Usuario
        if (!tipoUsuario) {
            mostrarError(form.tipoUsuario, 'Debes seleccionar un tipo de usuario');
            valido = false;
        } else {
            limpiarError(form.tipoUsuario);
        }

        // Validación Región y Comuna
        if (!region) {
            mostrarError(form.region, 'Debes seleccionar una región');
            valido = false;
        } else {
            limpiarError(form.region);
        }

        if (!comuna) {
            mostrarError(form.comuna, 'Debes seleccionar una comuna');
            valido = false;
        } else {
            limpiarError(form.comuna);
        }

        if(valido){
            const nuevoUsuario = { run, nombre, apellidos, correo, fechaNacimiento: fechaNacimiento||null, tipoUsuario, region, comuna, direccion };
            console.log('Usuario agregado (simulado):', nuevoUsuario);
            alert('Usuario agregado (simulado) ✅');
            form.reset();
            regionSelect.dispatchEvent(new Event('change'));
        }
    });
});