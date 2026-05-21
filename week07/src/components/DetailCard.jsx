function DetailCard({ lion }) {
    return (
      <article className="detail-card">
        <div className="detail-header">
          <img 
            src={lion.profileImg} 
            className="detail-img" 
            alt={lion.name}
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
          />
          <div>
            <h3 style={{ color: "#ff6b00" }}>{lion.name}</h3>
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
    );
  }
  export default DetailCard;