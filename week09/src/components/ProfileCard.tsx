import React from "react";
import { ILion } from "../types/lion";

interface ProfileCardProps {
  lion: ILion;
}

function ProfileCard({ lion }: ProfileCardProps) {
  return (
    <article className="member-card" style={{ backgroundColor: "#ffffff", border: "1px solid #e1e1e1" }}>
      {/* 요약 카드 프로필 이미지 영역 */}
      <div className="card-image-wrapper">
        <img
          src={lion.profileImg}
          className="card-img"
          alt={lion.name}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
          }}
        />
      </div>

      <div className="card-content">
        {/* 이름과 내 정보 표시 */}
        <h3 className="card-name" style={{ color: "#222222", fontWeight: 600 }}>
          {lion.name}
        </h3>

        <span 
          className="part-badge" 
          style={{ 
            backgroundColor: "#f5f5f5", 
            color: "#555555",           
            border: "1px solid #dddddd", 
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            display: "inline-block",
            marginTop: "6px"
          }}
        >
          {lion.part}
        </span>

        {/* 한 줄 소개 */}
        <p className="card-headline" style={{ color: "#666666", fontSize: "13px", marginTop: "10px" }}>
          {lion.oneLine}
        </p>
      </div>
    </article>
  );
}

export default ProfileCard;
