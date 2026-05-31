import React from "react";

interface OptionsPanelProps {
  filterPart: string;
  sortOrder: string; 
  searchKeyword: string;
  onFilterChange: (val: string) => void;
  onSortChange: (val: string) => void; 
  onSearchChange: (val: string) => void;
}

function OptionsPanel({
  filterPart,
  sortOrder,
  searchKeyword,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: OptionsPanelProps) {
  return (
    <section className="options-panel">
      {/* 1. 파트 필터 카테고리 */}
      <div className="option-group">
        <label>파트 필터</label>
        <select
          value={filterPart}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* 🛠️ 2. 정렬 카테고리 복구 포인트 (이름순, 최신 추가순 select 태그 탑재!) */}
      <div className="option-group">
        <label>정렬 기준</label>
        <select
          value={sortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
        >
          <option value="latest">최신 추가순</option>
          <option value="name">이름순</option>
        </select>
      </div>

      {/* 3. 이름 검색 창 */}
      <div className="option-group search-group">
        <label>이름 검색</label>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={searchKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
      </div>
    </section>
  );
}

export default OptionsPanel;