// /src/pages/admin/Reporte/Reportes.jsx
import { useState, useEffect } from 'react';
import BackButton from '../../../components/common/BackButton';

const Reportes = () => {
  const [reportData, setReportData] = useState({
    totalVentas: 0,
    productosVendidos: 0,
    usuariosRegistrados: 0,
    ingresosTotales: 0
  });

  useEffect(() => {
    // Simular datos de reportes
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    setReportData({
      totalVentas: Math.floor(Math.random() * 1000),
      productosVendidos: products.length,
      usuariosRegistrados: users.length,
      ingresosTotales: Math.floor(Math.random() * 10000000)
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Reportes Generales</h1>
              <p className="text-gray-300">Estadísticas y métricas de la plataforma</p>
            </div>
            <BackButton to="/admin" text="Volver al Panel" />
          </div>

          {/* Tarjetas de Métricas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <div className="text-2xl font-bold text-white mb-2">{reportData.totalVentas}</div>
              <div className="text-gray-300">Ventas Totales</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <div className="text-2xl font-bold text-white mb-2">{reportData.productosVendidos}</div>
              <div className="text-gray-300">Productos en Stock</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <div className="text-2xl font-bold text-white mb-2">{reportData.usuariosRegistrados}</div>
              <div className="text-gray-300">Usuarios Registrados</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <div className="text-2xl font-bold text-white mb-2">${reportData.ingresosTotales.toLocaleString()}</div>
              <div className="text-gray-300">Ingresos Totales</div>
            </div>
          </div>

          {/* Gráficos Simulados */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <h3 className="text-xl font-bold text-white mb-4">Ventas Mensuales</h3>
              <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-400">Gráfico de ventas simuladas</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-azul-electrico/30">
              <h3 className="text-xl font-bold text-white mb-4">Productos Más Vendidos</h3>
              <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-400">Gráfico de productos simulados</p>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex space-x-4 mt-8">
            <button className="bg-azul-electrico hover:bg-azul-claro px-6 py-3 rounded-lg text-black font-bold transition duration-300">
              Exportar Reporte PDF
            </button>
            <button className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg text-white font-bold transition duration-300">
              Generar Reporte Detallado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;