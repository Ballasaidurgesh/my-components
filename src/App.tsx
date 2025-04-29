import { useEffect, useState } from "react";
import useOnlineStatus from "./hooks/useOnlineStatus";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonPreview from "./pages/ButtonPreview";
import PageLayout from "./components/PageLayout";
import TablePreview from "./pages/TablePreview";
import SwitchPreview from "./pages/SwitchPreview";
import DialogPreview from "./pages/DialogPreview";
import TabsPreview from "./pages/TabsPreview";
import InputPreview from "./pages/InputPreview";

function App() {
  const isOnline = useOnlineStatus();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setOpen(true);
    } else {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [isOnline]);

  return (
    <>
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

      {open && (
        <div
          className="network-toast"
          style={{ backgroundColor: isOnline ? "#DCFCE7" : "#FEE2E2" }}
        >
          {isOnline ? (
            <IoMdCheckmarkCircleOutline size={25} color="#418944" style={{ marginTop: 5 }} />
          ) : (
            <IoAlertCircleOutline size={25} color="#D74242" style={{ marginTop: 5 }} />
          )}

          <div>
            <h3>{isOnline ? "Internet Connected" : "No Internet Connection"}</h3>
            <p>{isOnline ? "You're back online" : "Please check your network"}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
