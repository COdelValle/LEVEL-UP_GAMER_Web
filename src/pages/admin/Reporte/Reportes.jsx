import { useState } from 'react';
import { formatPrice } from '../../../utils/formatters';

const Reportes = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('hoy');
  const [reportData] = useState({
    ventasHoy: 1250000,
    ventasSemana: 8750000,
    ventasMes: 32500000,
    productosVendidosHoy: 25,
    productosVendidosSemana: 175,
    productosVendidosMes: 650,
    clientesNuevosHoy: 8,
    clientesNuevosSemana: 45,
    clientesNuevosMes: 180
  });

  const getData = (period) => {
    const data = {
      ventas: period === 'hoy' ? reportData.ventasHoy :
             period === 'semana' ? reportData.ventasSemana :
             reportData.ventasMes,
      productos: period === 'hoy' ? reportData.productosVendidosHoy :
                period === 'semana' ? reportData.productosVendidosSemana :
                reportData.productosVendidosMes,
      clientes: period === 'hoy' ? reportData.clientesNuevosHoy :
               period === 'semana' ? reportData.clientesNuevosSemana :
               reportData.clientesNuevosMes
    };
    return data;
  };

  const currentData = getData(selectedPeriod);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Reportes de Ventas</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedPeriod('hoy')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'hoy'
                ? 'bg-azul-electrico text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => setSelectedPeriod('semana')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'semana'
                ? 'bg-azul-electrico text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Esta Semana
          </button>
          <button
            onClick={() => setSelectedPeriod('mes')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'mes'
                ? 'bg-azul-electrico text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Este Mes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de Ventas */}
        <div className="card-gaming p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Ventas Totales</h3>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-azul-electrico mb-2">
            {formatPrice(currentData.ventas)}
          </p>
          <p className="text-sm text-gray-400">
            {selectedPeriod === 'hoy' ? 'Hoy' : 
             selectedPeriod === 'semana' ? 'Esta semana' : 
             'Este mes'}
          </p>
        </div>

        {/* Tarjeta de Productos */}
        <div className="card-gaming p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Productos Vendidos</h3>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-3xl font-bold text-azul-electrico mb-2">
            {currentData.productos}
          </p>
          <p className="text-sm text-gray-400">
            {selectedPeriod === 'hoy' ? 'Hoy' : 
             selectedPeriod === 'semana' ? 'Esta semana' : 
             'Este mes'}
          </p>
        </div>

        {/* Tarjeta de Clientes */}
        <div className="card-gaming p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Nuevos Clientes</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-azul-electrico mb-2">
            {currentData.clientes}
          </p>
          <p className="text-sm text-gray-400">
            {selectedPeriod === 'hoy' ? 'Hoy' : 
             selectedPeriod === 'semana' ? 'Esta semana' : 
             'Este mes'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reportes;