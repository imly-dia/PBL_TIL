import React from "react";
import { ILion } from "../types/lion";
import DetailCard from "./DetailCard";

interface DetailListProps {
  members: ILion[]; 
}

function DetailList({ members }: DetailListProps) {
  return (
    <section id="detail-list" className="detail-section">
      {members.map((lion) => (
        <DetailCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}

export default DetailList;
