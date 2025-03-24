import "./styles.scss";
import Popup from "../Dialog";
import { GoCheckCircleFill } from "react-icons/go";

function SuccessDialog({ isOpen = false }) {
  return (
    <Popup isOpen={isOpen} disableHeader>
      <div className="success-dialog">
        <div className="check-icon">
          <GoCheckCircleFill
            size={60}
            color="#41B06E"
            style={{ backgroundColor: "#fff", borderRadius: "50%" }}
          />
        </div>
        <h3>Well Done!</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
    </Popup>
  );
}

export default SuccessDialog;
