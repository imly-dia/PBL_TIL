import { LIONS_DATA } from "./data/lions";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import OptionsPanel from "./components/OptionsPanel";
import AddForm from "./components/AddForm";
import SummaryGrid from "./components/SummaryGrid";
import DetailList from "./components/DetailList";
import "./styles/style.css"; // 여기서 CSS를 불러와야 디자인이 먹혀!

function App() {
  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <ControlPanel totalCount={LIONS_DATA.length} />
        <OptionsPanel />
        <AddForm />
        {/* 데이터를 아래 부품들에게 선물(Props)로 전달해! */}
        <SummaryGrid lions={LIONS_DATA} />
        <DetailList lions={LIONS_DATA} />
      </main>
    </div>
  );
}
export default App;
