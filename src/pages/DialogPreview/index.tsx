import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState } from "react";

function DialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      </div>

      <ConfirmDialog
        title="Delete"
        description="Are you sure want to delete this user?"
        isOpen={open}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export default DialogPreview;
