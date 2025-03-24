import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonPreview from "./pages/ButtonPreview";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<ButtonPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
