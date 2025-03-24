import React from "react";
import "./styles.scss";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

type dialogProps = {
  open: boolean;
  children?: React.ReactNode;
  hideCancelIcon?: boolean;
  title?: string;
  width?: number | string;
  className?: string;
  isLoading?: boolean;
  buttonName?: string;
  buttonPosition?: "left" | "right" | "center";
  onClick?: () => void;
  onCancel?: () => void;
};

function Dialog({
  open = false,
  children,
  title = "",
  width = "",
  buttonName,
  buttonPosition = "right",
  isLoading = false,
  onCancel = () => null,
  onClick = () => null,
  className = "",
  hideCancelIcon = false,
}: dialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`dialog__container ${className}`}
            style={{ width: width }}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15 }}
          >
            {!hideCancelIcon && <CgClose className="dialog__cancel-icon" onClick={onCancel} />}

            {title && <h4 className="dialog__title">{title}</h4>}

            <div
              className="dialog__body"
              style={{ maxHeight: buttonName ? "calc(75vh - 60px)" : "75vh" }}
            >
              {children}
            </div>

            {buttonName && (
              <div
                className="dialog__button-container"
                style={{ justifyContent: buttonPosition === "left" ? "flex-start" : "flex-end" }}
              >
                <Button
                  isLoading={isLoading}
                  onClick={onClick}
                  fullWidth={buttonPosition === "center"}
                >
                  {buttonName}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
