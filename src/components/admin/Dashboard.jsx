import StatsCard from './StatsCard';

function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatsCard label="Usuarios registrados" value={128} />
      <StatsCard label="Productos activos" value={42} />
    </div>
  );
}

export default Dashboard;
