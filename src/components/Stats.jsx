export default function Stats() {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Total Assets", value: "12K+" },
    { label: "Daily Downloads", value: "5K+" },
    { label: "Premium Authors", value: "1.5K+" },
  ];
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i} className="text-white">
            <h4 className="text-4xl font-black mb-2">{s.value}</h4>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}