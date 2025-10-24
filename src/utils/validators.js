export const validarRun = (run) => {
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
};

export const validarCorreo = (email) => {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regex.test(email);
};

export const validarPassword = (password) => {
  return password && password.length >= 6;
};