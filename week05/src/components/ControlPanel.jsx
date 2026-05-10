function ControlPanel({ totalCount }) {
    return (
      <section className="control-panel">
        <div className="control-wrapper">
          <button className="btn-white">아기 사자 추가</button>
          <button className="btn-white">마지막 아기 사자 삭제</button>
          <span className="total-badge">총 <span id="total-count">{totalCount}</span>명</span>
        </div>
        <div className="api-controls">
          <button className="btn-api">랜덤 1명 추가</button>
          <button className="btn-api">랜덤 5명 추가</button>
          <button className="btn-api">전체 새로고침</button>
        </div>
        <div className="status-message">준비 완료</div>
      </section>
    );
  }
  export default ControlPanel;