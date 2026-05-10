import DetailCard from "./DetailCard";

function DetailList({ lions }) {
  return (
    <section className="detail-section">
      <h2 className="sub-title">📌 상세 자기소개 목록</h2>
      <div id="detail-list" className="detail-list">
        {lions.map((lion) => (
          <DetailCard key={lion.id} lion={lion} />
        ))}
      </div>
    </section>
  );
}
export default DetailList;