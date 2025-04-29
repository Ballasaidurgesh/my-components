import Tabs from "@/components/Tabs";
import { useState } from "react";

const tabsOptions = [
  { label: "Incoming", value: "tab1" },
  { label: "Reports", value: "tab2" },
  { label: "Internal", value: "tab3" },
  { label: "Trash", value: "tab4" },
];

function TabsPreview() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <Tabs
        activeTab={activeTab}
        options={tabsOptions}
        variant="underline"
        onChange={(val) => setActiveTab(val)}
      />
    </div>
  );
}

export default TabsPreview;
