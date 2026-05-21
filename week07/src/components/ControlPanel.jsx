function ControlPanel({ totalCount, status, isLoading, onToggleForm, onDeleteLast, onFetchLions, onRetry }) {
  return (
    <section className="control-panel">
      <div className="control-wrapper">
        <button className="btn-white" onClick={onToggleForm}>아기 사자 추가</button>
        <button className="btn-white" onClick={onDeleteLast}>마지막 아기 사자 삭제</button>
        <span className="total-badge">총 <span id="total-count">{totalCount}</span>명</span>
      </div>
      
      <div className="api-controls">
        <button className="btn-api" disabled={isLoading} onClick={() => onFetchLions(1)}>랜덤 1명 추가</button>
        <button className="btn-api" disabled={isLoading} onClick={() => onFetchLions(5)}>랜덤 5명 추가</button>
        <button className="btn-api" disabled={isLoading} onClick={() => onFetchLions(members.length, true)}>전체 새로고침</button>
      </div>

      <div id="status-area" className="status-message">
        {status}
        {status.includes("실패") && onRetry && (
          <button className="btn-retry" onClick={onRetry}>재시도</button>
        )}
      </div>
    </section>
  );
}
export default ControlPanel;
