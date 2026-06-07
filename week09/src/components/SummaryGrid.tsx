import React from "react";
import { ILion } from "../types/lion";
import ProfileCard from "./ProfileCard"; 


interface SummaryGridProps {
  lions: ILion[];
}

function SummaryGrid({ lions }: SummaryGridProps) {
  return (
    <section id="summary-grid" className="card-grid">
      {lions.map((lion) => (
        <ProfileCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}

export default SummaryGrid;
