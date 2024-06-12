import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import {
  TranslationFC,
  TranslationKeys,
} from "../Translation/TranslationComponent";
import { CurrentLanguageContext } from "../App";
import { Button, Grid } from "@mui/material";
import { Post } from "../server/types";
import TextareaForCreatePost, {
  UnstyledInputBasic,
} from "../components/TextareaForCreatePost";
import ImagesUpload from "../components/ImagesUpload";

type StepType = {
  stepNumber: number;
  title: string;
  stepComponent: React.ReactElement;
  icon: React.ReactElement;
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [post, setPost] = React.useState<Post>({
    id: 0,
    title: "",
    description: "",
    owner: null,
    pictures: [],
  });
  const translationContext: TranslationFC = React.useContext(
    CurrentLanguageContext
  );
  const nextStepHandler = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const setStepHandler = (step: number) => {
    setActiveStep(step);
  };
  const previosStepHandler = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const getButtons = (index: number, length: number) => (
    <div>
      <Button
        variant="contained"
        onClick={nextStepHandler}
        sx={{ mt: 1, mr: 1 }}
      >
        {index === length ? "Finish" : "Continue"}
      </Button>
      <Button
        disabled={index === 0}
        onClick={previosStepHandler}
        sx={{ mt: 1, mr: 1 }}
      >
        Back
      </Button>
    </div>
  );
  const steps: StepType[] = [
    {
      title: translationContext(TranslationKeys.AddMainInfo),
      stepNumber: 1,
      icon: <SettingsIcon />,
      stepComponent: (
        <Grid>
          <UnstyledInputBasic post={post} setPost={setPost} />
          <TextareaForCreatePost post={post} setPost={setPost} />
          {getButtons(1, 3)}
        </Grid>
      ),
    },
    {
      title: translationContext(TranslationKeys.AddPhoto),
      stepNumber: 2,
      icon: <AddPhotoAlternateOutlinedIcon />,
      stepComponent: <Grid>
        <ImagesUpload/>
        {getButtons(2, 3)}</Grid>,
    },
    {
      title: translationContext(TranslationKeys.AddLocation),
      stepNumber: 3,
      icon: <AddLocationAltOutlinedIcon />,
      stepComponent: <Grid>{getButtons(3, 3)}</Grid>,
    },
  ];

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    const unknowShit: number = Number.parseInt(
      props.icon?.valueOf().toString() ?? "0"
    );
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {steps[unknowShit - 1].icon}
      </ColorlibStepIconRoot>
    );
  }
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((stepInfo) => (
          <Step key={stepInfo.stepNumber}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              onClick={() => setStepHandler(stepInfo.stepNumber - 1)}
            >
              {stepInfo.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid>
        {activeStep === 0 ? (
          <React.Fragment>{steps[0].stepComponent}</React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>{steps[1].stepComponent}</React.Fragment>
        ) : (
          <React.Fragment>{steps[2].stepComponent}</React.Fragment>
        )}
      </Grid>
    </Stack>
  );
}
