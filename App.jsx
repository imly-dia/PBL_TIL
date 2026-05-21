import { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useLions } from "./hooks/useLions";
import { getFilteredAndSortedLions } from "./utils/dataHandlers";

// 기존 6주차 컴포넌트 구조 100% 그대로 불러오기
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import OptionsPanel from "./components/OptionsPanel";
import AddForm from "./components/AddForm";
import SummaryGrid from "./components/SummaryGrid";
import DetailPage from "./components/DetailPage"; // 우리가 새로 만든 파일

import "./styles/style.css";

function App() {
  // 6주차 때 완성해둔 훅 호출
  const { members, status, isLoading, fetchLions, addMember, deleteLastMember, retryLastAction } = useLions();

  // [7주차 핵심] URL 쿼리 파라미터 연동
  const [searchParams, setSearchParams] = useSearchParams();
  const filterPart = searchParams.get("part") || "all";
  const sortOrder = searchParams.get("sort") || "latest";
  const searchKeyword = searchParams.get("search") || "";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  // 보기 옵션이 변경될 때 URL 주소창을 업데이트하는 핸들러
  const handleOptionChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (key === "part" && value === "all") newParams.delete("part");
    else if (key === "sort" && value === "latest") newParams.delete("sort");
    else if (key === "search" && value === "") newParams.delete("search");
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  // 실시간으로 필터링 및 정렬된 결과 리스트 추출
  const displayLions = getFilteredAndSortedLions(members, filterPart, sortOrder, searchKeyword);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") setIsFormOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      
      <Routes>
        {/* 1. 메인 목록 페이지 경로 (/) */}
        <Route path="/" element={
          <main>
            {/* ⚠️ 중요: 6주차 기존 컴포넌트가 내부에서 'members'를 참조하므로 props로 온전히 다 전달해줘야 해! */}
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
              /* 요약 카드 그리드 안에서 카드를 클릭하면 해당하는 상세 URL로 매끄럽게 SPA 이동! */
              <div onClick={(e) => {
                const card = e.target.closest(".member-card");
                if (card) {
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

        {/* 2. 개별 상세 프로필 페이지 경로 (/lions/:id) */}
        <Route path="/lions/:id" element={<DetailPage members={members} />} />
      </Routes>
    </div>
  );
}

export default App;