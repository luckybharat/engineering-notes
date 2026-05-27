import React, { useState, type JSX, type ReactNode } from "react";
import classes from "./multistep.module.css";

const Stepper = ({ stepList }: { stepList: JSX.Element[] }) => {
  const [currentActive, setCurrentActive] = useState<number>(0);
  const stepCount = stepList.length;
  const steps = [];
  for (let i = 0; i < stepCount; i++) {
    steps.push(
      <div className={`${classes.step} ${currentActive === i ? classes.active : ''}`} key={`step${i}`}>
        {(i + 1)}
      </div>
    )
  }

  const onPrev = () => {
    if (currentActive !== 0) {
      setCurrentActive(currentActive - 1);
    }
  }

  const onNext = () => {
    if (currentActive !== stepCount - 1) {
      setCurrentActive(currentActive + 1);
    }
  }

  const progress = (100 / (stepCount - 1)) * currentActive;

  return <section className="stepper">
    <div className={classes.stepsContainer}>
      <div className={classes.stepList}>{steps}</div>
      <div className={classes.progress} style={{ width: `${progress}%` }}></div>
    </div>
    <div>{React.cloneElement(stepList[currentActive], { onPrev, onNext })}</div>
  </section>
}

const Step = ({ children, onNext, onPrev }: { children: ReactNode, onNext?: () => void, onPrev?: () => void }) => {
  return <div>
    <div>
      {children}
    </div>
    <button onClick={onPrev}>Prev</button>
    <button onClick={onNext}>Next</button>
  </div>
}

export default function MultiStepFormDemo() {
  return (
    <div>
      <Stepper stepList={[
        <Step>Step 1</Step>,
        <Step>Step 2</Step>,
        <Step>Step 3</Step>,
        <Step>Summary component</Step>,
      ]} />
    </div>
  );
}
