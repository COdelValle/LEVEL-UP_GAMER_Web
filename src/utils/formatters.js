export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatRun = (run) => {
  const cleanRun = run.replace(/[.-]/g, '');
  if (cleanRun.length >= 8) {
    const numbers = cleanRun.slice(0, -1);
    const dv = cleanRun.slice(-1);
    const formattedNumbers = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedNumbers}-${dv}`;
  }
  return run;
};