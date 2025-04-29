import "./styles.scss";
import Button from "../Button";
import Dialog from "../Dialog";

type confirmDialogProps = {
  title?: string;
  description?: string;
  width?: number;
  confirmBtn?: string;
  cancelBtn?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
};

function ConfirmDialog({
  isOpen = false,
  title,
  description,
  width = 400,
  confirmBtn = "Confirm",
  cancelBtn = "Cancel",
  isLoading,
  onCancel,
  onConfirm,
}: confirmDialogProps) {
  return (
    <Dialog hideCancelIcon open={isOpen} width={width}>
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="confirm-dialog__buttons-container">
          <Button variant="outline" onClick={onCancel}>
            {cancelBtn}
          </Button>
          <Button isLoading={isLoading} onClick={onConfirm}>
            {confirmBtn}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;
