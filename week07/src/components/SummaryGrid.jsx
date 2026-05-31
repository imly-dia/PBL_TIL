import ProfileCard from "./ProfileCard";

function SummaryGrid({ lions }) {
  return (
    <section id="summary-grid" className="card-grid">
      {lions.map((lion) => (
        <ProfileCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}
export default SummaryGrid;
