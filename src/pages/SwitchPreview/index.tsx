import Switch from "@/components/Switch";
import { useState } from "react";

function SwitchPreview() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch label="Switch" checked={checked} onChange={(value) => setChecked(value)} />
    </div>
  );
}

export default SwitchPreview;
