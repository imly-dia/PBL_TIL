import { useState } from "react";
import { LIONS_DATA } from "../data/lions";
import { transformApiData } from "../utils/dataHandlers";

export function useLions() {
  const [members, setMembers] = useState(LIONS_DATA);
  const [status, setStatus] = useState("준비 완료");
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null); // 재시도용 백업 작업

  const fetchLions = async (count, isRefresh = false) => {
    setIsLoading(true);
    setStatus("불러오는 중...");
    setLastAction(() => () => fetchLions(count, isRefresh));

    try {
      const url = `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("네트워크 응답 실패");
      
      const data = await response.json();
      const newLions = transformApiData(data.results);

      if (isRefresh) {
        const me = members.find((m) => m.isMe);
        setMembers(me ? [me, ...newLions] : [...newLions]);
      } else {
        setMembers((prev) => [...prev, ...newLions]);
      }
      
      setStatus("완료!");
      setTimeout(() => setStatus("준비 완료"), 2000);
    } catch (error) {
      setStatus(`불러오기 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  const deleteLastMember = () => {
    if (members.length > 1) {
      setMembers((prev) => prev.slice(0, -1));
    } else {
      alert("최소 한 명의 명단은 유지해야 합니다.");
    }
  };

  return {
    members,
    status,
    isLoading,
    fetchLions,
    addMember,
    deleteLastMember,
    retryLastAction: lastAction,
  };
}
