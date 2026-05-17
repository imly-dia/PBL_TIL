import { useState, useEffect } from "react";
import { useLions } from "./hooks/useLions";
import { getFilteredAndSortedLions } from "./utils/dataHandlers";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import OptionsPanel from "./components/OptionsPanel";
import AddForm from "./components/AddForm";
import SummaryGrid from "./components/SummaryGrid";
import DetailList from "./components/DetailList";
import "./styles/style.css";

function App() {
  const {
    members,
    status,
    isLoading,
    fetchLions,
    addMember,
    deleteLastMember,
    retryLastAction,
  } = useLions();

  
  const [filterPart, setFilterPart] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const displayLions = getFilteredAndSortedLions(members, filterPart, sortOrder, searchKeyword);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFormOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // 클린업 필수!
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <ControlPanel
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
          onFilterChange={setFilterPart}
          onSortChange={setSortOrder}
          onSearchChange={setSearchKeyword}
        />

        <AddForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAdd={addMember}
          updateStatusText={status}
        />

        {displayLions.length === 0 ? (
          <div id="empty-message" className="empty-state">
            표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)
          </div>
        ) : (
          <>
            <SummaryGrid lions={displayLions} />
            <DetailList lions={displayLions} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;