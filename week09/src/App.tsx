import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useLions } from "./hooks/useLions";
import { useAuth } from "./hooks/useAuth"; 
import { getFilteredAndSortedLions } from "./utils/dataHandlers";

import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import OptionsPanel from "./components/OptionsPanel"; 
import AddForm from "./components/AddForm";
import SummaryGrid from "./components/SummaryGrid";
import DetailPage from "./components/DetailPage";
import { LoginPage } from "./pages/LoginPage"; 

import "./styles/style.css";

function App() {
  const { members, status, isLoading, fetchLions, addMember, deleteLion } = useLions();
  const { user, signOut } = useAuth(); 
  
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

  const displayLions = getFilteredAndSortedLions(members as any, filterPart, sortOrder, searchKeyword);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === "Escape") setIsFormOpen(false); 
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLoggedIn = !!user;

  return (
    <div className="dashboard-container">
      <div className="main-header-wrapper" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Header />
        <div className="header-auth-zone" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 20px" }}>
          {isLoggedIn ? (
            <>
              <span className="user-email" style={{ fontSize: "14px", fontWeight: "bold" }}>Lions {user?.email}</span>
              <button onClick={() => signOut()} className="logout-btn" style={{ cursor: "pointer" }}>로그아웃</button>
            </>
          ) : (
            <Link to="/login" className="login-link-btn" style={{ textDecoration: "none", fontWeight: "bold" }}>로그인</Link>
          )}
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={
          <main>
            <ControlPanel
              members={members as any}
              totalCount={members.length}
              status={isLoggedIn ? "로그인 완료" : "게스트 모드"}
              isLoading={isLoading}
              onToggleForm={() => {
                if (!isLoggedIn) {
                  alert("아기 사자를 등록하려면 로그인이 필요합니다.");
                  navigate("/login");
                  return;
                }
                setIsFormOpen((prev) => !prev);
              }}
              onDeleteLast={() => {
                if (!isLoggedIn) {
                  alert("아기 사자를 삭제하려면 로그인이 필요합니다.");
                  return;
                }
                if (members.length > 0) {
                  const lastMember = members[members.length - 1]; 
                  if (lastMember?.id) {
                    deleteLion(Number(lastMember.id));
                  }
                }
              }}
              onFetchLions={fetchLions}
              onRetry={fetchLions}
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

            {isLoading ? (
              <div className="loading-state" style={{ textAlign: "center", padding: "40px" }}>데이터를 불러오는 중입니다...</div>
            ) : displayLions.length === 0 ? (
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
                <SummaryGrid lions={displayLions as any} />
              </div>
            )}
          </main>
        } />

        <Route path="/lions/:id" element={<DetailPage members={members as any} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;