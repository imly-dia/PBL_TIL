function ProfileCard({ lion }) {
    return (
      <article className={`member-card ${lion.isMe ? 'my-card' : ''}`}>
        <div className="image-wrapper">
          <span className="tech-badge">{lion.skills[0]}</span>
          <img 
            src={lion.profileImg} 
            alt={lion.name} 
            className="card-img" 
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
          />
        </div>
        <div className="card-info">
          <p className="card-name"><strong>{lion.name} {lion.isMe ? '(나)' : ''}</strong></p>
          <p className="card-part">{lion.part}</p>
          <p className="card-one-line">{lion.oneLine}</p>
        </div>
      </article>
    );
  }
  export default ProfileCard;
