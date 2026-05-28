import { HocModalContainer, CompoundModal, BasicModal } from "./components";
import "./App.css";

function App() {
  return (
    <div className="container">
      <HocModalContainer />
      <CompoundModal />
      <BasicModal />
    </div>
  );
}

export default App;
