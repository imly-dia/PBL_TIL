import { useParams, useNavigate } from "react-router-dom";

function DetailPage({ members }) {
  const { id } = useParams(); // 주소창의 :id 값 가로채기
  const navigate = useNavigate();

  // 전체 명단에서 주소창 id와 똑같은 아기사자 1명 찾기
  const lion = members.find((m) => String(m.id) === String(id));

  if (!lion) {
    return (
      <div className="empty-state">
        <p>존재하지 않는 아기사자입니다. 😢</p>
        <button className="btn-white" style={{ marginTop: "20px" }} onClick={() => navigate("/")}>목록으로 돌아가기</button>
      </div>
    );
  }

  return (
    <section className="detail-section" style={{ display: "block", padding: "20px 40px" }}>
      {/* 뒤로 가기 및 목록 이동 버튼 */}
      <button className="btn-white" style={{ marginBottom: "20px" }} onClick={() => navigate(-1)}>
        ⬅️ 목록으로 돌아가기
      </button>

      <article className="detail-card">
        <div className="detail-header">
          <img 
            src={lion.profileImg} 
            className="detail-img" 
            alt={lion.name}
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
          />
          <div>
            <h3 style={{ color: "#ff6b00" }}>{lion.name} {lion.isMe ? "(나)" : ""}</h3>
            <p style={{ fontSize: "12px", color: "#888" }}>{lion.part} | LIKELION 14th</p>
          </div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>자기소개</p>
          <p style={{ fontSize: "14px", color: "#555" }}>{lion.bio}</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>관심 기술</p>
          <ul style={{ listStyle: "none", display: "flex", gap: "10px", fontSize: "13px", color: "#ff4d7d" }}>
            {lion.skills.map((skill, index) => (
              <li key={index}>#{skill}</li>
            ))}
          </ul>
        </div>
        <div style={{ fontSize: "13px", borderTop: "1px dashed #ddd", paddingTop: "10px" }}>
          <p>📧 {lion.email} | 📱 {lion.phone}</p>
          <p>🔗 <a href={lion.website} target="_blank" rel="noreferrer" style={{ color: "#666", textDecoration: "none" }}>{lion.website}</a></p>
        </div>
        <p style={{ marginTop: "10px", fontWeight: "bold", color: "#ff4d7d" }}>"{lion.resolution}"</p>
      </article>
    </section>
  );
}

export default DetailPage;
