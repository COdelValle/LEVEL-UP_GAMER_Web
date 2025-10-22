function StatsCard({ label, value }) {
  return (
    <div className="bg-negro border border-azul-claro p-4 rounded text-center">
      <h3 className="text-lg font-bold">{label}</h3>
      <p className="text-2xl text-verde-neon">{value}</p>
    </div>
  );
}

export default StatsCard;
