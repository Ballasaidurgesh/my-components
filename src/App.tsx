import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonPreview from "./pages/ButtonPreview";
import PageLayout from "./components/PageLayout";
import TablePreview from "./pages/TablePreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ButtonPreview />} />
          <Route path="table" element={<TablePreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
