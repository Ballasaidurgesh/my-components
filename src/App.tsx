import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonPreview from "./pages/ButtonPreview";
import PageLayout from "./components/PageLayout";
import TablePreview from "./pages/TablePreview";
import SwitchPreview from "./pages/SwitchPreview";
import DialogPreview from "./pages/DialogPreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ButtonPreview />} />
          <Route path="table" element={<TablePreview />} />
          <Route path="switch" element={<SwitchPreview />} />
          <Route path="dialog" element={<DialogPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
