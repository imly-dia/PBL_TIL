import React from "react";
import { ILion } from "../types/lion";

interface ControlPanelProps {
  members: ILion[];
  totalCount: number;
  status: string;
  isLoading: boolean;
  onToggleForm: () => void;
  onDeleteLast: () => void;
  onFetchLions: (count: number, isRefresh?: boolean) => Promise<void> | void;
  onRetry: (() => void) | null;
}

function ControlPanel({
  members,
  totalCount,
  status,
  isLoading,
  onToggleForm,
  onDeleteLast,
  onFetchLions,
  onRetry,
}: ControlPanelProps) {
  return (
    <section className="control-panel">
      {/* 명단 직접 수동 조작 영역 */}
      <div className="control-wrapper">
        <button className="btn-white" onClick={onToggleForm}>
          아기 사자 추가
        </button>
        <button className="btn-white" onClick={onDeleteLast}>
          마지막 아기 사자 삭제
        </button>
        <span className="total-badge">
          총 <span id="total-count">{totalCount}</span>명
        </span>
      </div>
      
      {/* 외부 비동기 API 통신 및 로딩 중 중복 방지 비활성화 처리 */}
      <div className="api-controls">
        <button 
          className="btn-api" 
          disabled={isLoading} 
          onClick={() => onFetchLions(1)}
        >
          랜덤 1명 추가
        </button>
        <button 
          className="btn-api" 
          disabled={isLoading} 
          onClick={() => onFetchLions(5)}
        >
          랜덤 5명 추가
        </button>
        <button 
          className="btn-api" 
          disabled={isLoading} 
          onClick={() => onFetchLions(members.length, true)}
        >
          전체 새로고침
        </button>
      </div>

      {/* 비동기 요청 상태 시각화 및 실패 시 재시도 UI 조건부 렌더링 */}
      <div id="status-area" className="status-message">
        {status}
        {status.includes("실패") && onRetry && (
          <button className="btn-retry" onClick={onRetry} style={{ marginLeft: "10px" }}>
            🔄 재시도
          </button>
        )}
      </div>
    </section>
  );
}

export default ControlPanel;