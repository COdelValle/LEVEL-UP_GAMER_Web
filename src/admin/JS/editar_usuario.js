document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let runUsuario = params.get('run');
    if (!runUsuario) return;

    runUsuario = runUsuario.toUpperCase().replace(/\./g,'').replace(/-/g,'');

    const form = document.getElementById('edit-form');
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

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
    function mostrarError(input,mensaje){ const errorDiv=input.nextElementSibling;if(errorDiv) errorDiv.textContent=mensaje;}
    function limpiarError(input){ const errorDiv=input.nextElementSibling;if(errorDiv) errorDiv.textContent='';}

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
                const seleccion = regiones.find(r => r.nombre===e.target.value);
                comunaSelect.innerHTML = '';
                if(seleccion){
                    seleccion.comunas.forEach(c=>{
                        const opt=document.createElement('option');
                        opt.value=c;
                        opt.textContent=c;
                        comunaSelect.appendChild(opt);
                    });
                }
            });

            // Cargar datos del usuario
            const usuario = data.usuarios.find(u=>u.run.toUpperCase().replace(/\./g,'').replace(/-/g,'')===runUsuario);
            if(usuario){
                form.run.value = usuario.run;
                form.nombre.value = usuario.nombre;
                form.apellidos.value = usuario.apellidos;
                form.correo.value = usuario.correo;
                form.fechaNacimiento.value = usuario.fechaNacimiento || '';
                form.tipoUsuario.value = usuario.tipoUsuario;
                form.region.value = usuario.region;
                regionSelect.dispatchEvent(new Event('change'));
                form.comuna.value = usuario.comuna;
                form.direccion.value = usuario.direccion;
            } else {
                alert('Usuario no encontrado');
            }

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

        if (!run) { mostrarError(form.run,'RUN obligatorio'); valido=false;}
        else if(!validarRun(run)){ mostrarError(form.run,'RUN inválido'); valido=false;}
        else limpiarError(form.run);

        if(!nombre){ mostrarError(form.nombre,'Nombre obligatorio'); valido=false;}
        else if(nombre.length>50){ mostrarError(form.nombre,'Máx 50 caracteres'); valido=false;}
        else limpiarError(form.nombre);

        if(!apellidos){ mostrarError(form.apellidos,'Apellidos obligatorios'); valido=false;}
        else if(apellidos.length>100){ mostrarError(form.apellidos,'Máx 100 caracteres'); valido=false;}
        else limpiarError(form.apellidos);

        if(!correo){ mostrarError(form.correo,'Correo obligatorio'); valido=false;}
        else if(correo.length>100){ mostrarError(form.correo,'Máx 100 caracteres'); valido=false;}
        else if(!validarCorreo(correo)){ mostrarError(form.correo,'Dominio inválido'); valido=false;}
        else limpiarError(form.correo);

        if(!direccion){ mostrarError(form.direccion,'Dirección obligatoria'); valido=false;}
        else if(direccion.length>300){ mostrarError(form.direccion,'Máx 300 caracteres'); valido=false;}
        else limpiarError(form.direccion);

        if(valido){
            const usuarioEditado = { run, nombre, apellidos, correo, fechaNacimiento: fechaNacimiento||null, tipoUsuario, region, comuna, direccion };
            console.log('Usuario editado (simulado):', usuarioEditado);
            alert('Usuario editado (simulado) ✅');
        }
    });
});
