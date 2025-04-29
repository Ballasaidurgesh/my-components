import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonPreview from "./pages/ButtonPreview";
import PageLayout from "./components/PageLayout";
import TablePreview from "./pages/TablePreview";
import SwitchPreview from "./pages/SwitchPreview";
import DialogPreview from "./pages/DialogPreview";
import TabsPreview from "./pages/TabsPreview";
import InputPreview from "./pages/InputPreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ButtonPreview />} />
          <Route path="table" element={<TablePreview />} />
          <Route path="switch" element={<SwitchPreview />} />
          <Route path="dialog" element={<DialogPreview />} />
          <Route path="tabs" element={<TabsPreview />} />
          <Route path="inputs" element={<InputPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
