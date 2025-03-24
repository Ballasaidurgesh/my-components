import "./styles.scss";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

type stepperProps = {
  steps: string[];
  completedSteps: number[];
};

function Stepper({ steps = [], completedSteps = [] }: stepperProps) {
  const stepRef = useRef<HTMLDivElement[]>([]);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const progressWidth = (completedSteps.length / (steps.length - 1)) * 100;

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2,
      marginRight: stepRef.current[steps?.length - 1]?.offsetWidth / 2,
    });
  }, [stepRef.current]);

  function RenderIcon({ step }: { step: number }) {
    const isCompleted = completedSteps.includes(step);
    const isNextStep = completedSteps.length + 1 === step;

    return isCompleted ? (
      <GoCheckCircleFill className="stepper__icon" />
    ) : isNextStep ? (
      <IoIosRadioButtonOn className="stepper__icon" size={28} />
    ) : (
      <FaCircle color="#B4B4B8" size={22} />
    );
  }

  function titleColor(step: number): string {
    const isCompleted = completedSteps.includes(step);
    const isNextStep = completedSteps.length + 1 === step;

    return isCompleted || isNextStep ? "#000" : "#B4B4B8";
  }

  return (
    <div className="stepper">
      <div className="stepper__steps-container">
        {steps.map((item, index) => (
          <div
            key={index}
            className="stepper__step"
            ref={(el) => (stepRef.current[index] = el as HTMLDivElement)}
          >
            <div className="stepper__icon-container">
              <RenderIcon step={index + 1} />
            </div>
            <h3 style={{ color: titleColor(index + 1) }}>{item}</h3>
          </div>
        ))}

        {steps.length !== 0 && (
          <div
            className="stepper__progress-bar"
            style={{
              width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
              marginLeft: margins.marginLeft,
            }}
          >
            <div
              className="stepper__active-progress-bar"
              style={{ width: progressWidth > 100 ? "100%" : `${progressWidth}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stepper;
