import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useLions } from "./hooks/useLions";
import { getFilteredAndSortedLions } from "./utils/dataHandlers";

import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import OptionsPanel from "./components/OptionsPanel"; 
import AddForm from "./components/AddForm";
import SummaryGrid from "./components/SummaryGrid";
import DetailPage from "./components/DetailPage";

import "./styles/style.css";

function App() {
  const { members, status, isLoading, fetchLions, addMember, deleteLastMember, retryLastAction } = useLions();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterPart = searchParams.get("part") || "all";
  const sortOrder = searchParams.get("sort") || "latest"; 
  const searchKeyword = searchParams.get("search") || "";

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const navigate = useNavigate();

 
  const handleOptionChange = (key: "part" | "sort" | "search", value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (key === "part" && value === "all") newParams.delete("part");
    else if (key === "sort" && value === "latest") newParams.delete("sort");
    else if (key === "search" && value === "") newParams.delete("search");
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  
  const displayLions = getFilteredAndSortedLions(members, filterPart, sortOrder, searchKeyword);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === "Escape") setIsFormOpen(false); 
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <main>
            <ControlPanel
              members={members}
              totalCount={members.length}
              status={status}
              isLoading={isLoading}
              onToggleForm={() => setIsFormOpen((prev) => !prev)}
              onDeleteLast={deleteLastMember}
              onFetchLions={fetchLions}
              onRetry={retryLastAction}
            />

    
            <OptionsPanel
              filterPart={filterPart}
              sortOrder={sortOrder} 
              searchKeyword={searchKeyword}
              onFilterChange={(val) => handleOptionChange("part", val)}
              onSortChange={(val) => handleOptionChange("sort", val)} 
              onSearchChange={(val) => handleOptionChange("search", val)}
            />

            <AddForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onAdd={addMember} />

            {displayLions.length === 0 ? (
              <div className="empty-state">표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)</div>
            ) : (
              <div onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.target as HTMLElement;
                const card = target.closest(".member-card");
                if (card && card.parentNode) {
                  const index = Array.from(card.parentNode.children).indexOf(card);
                  const clickedLion = displayLions[index];
                  if (clickedLion) navigate(`/lions/${clickedLion.id}`);
                }
              }} style={{ cursor: "pointer" }}>
                <SummaryGrid lions={displayLions} />
              </div>
            )}
          </main>
        } />

        <Route path="/lions/:id" element={<DetailPage members={members} />} />
      </Routes>
    </div>
  );
}

export default App;