import * as React from "react";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
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
import TextareaForCreatePost, {
  UnstyledInputBasic,
} from "../components/TextareaForCreatePost";
import ImagesUpload from "../components/ImagesUpload";
import { NewPost } from "../types";
import { addPost } from "../server/userAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleModal } from "../store/newPost/newPost";

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
  const postRef = useRef<NewPost>({
    title: "",
    description: "",
    pictures: [],
  });
  const navigate = useNavigate();
  const post = postRef.current;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal(false));
  };

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
  const createPost = async () => {
    const id = await addPost(post);
    navigate(`/post/${id}`);
    handleClose();
  };

  const getButtons = (index: number, length: number) => (
    <div>
      {index !== length ? (
        <Button
          variant="contained"
          onClick={nextStepHandler}
          sx={{ mt: 1, mr: 1 }}
        >
          Continue
        </Button>
      ) : (
        <Button variant="contained" onClick={createPost} sx={{ mt: 1, mr: 1 }}>
          Finish
        </Button>
      )}
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
        <React.Fragment>
          <UnstyledInputBasic post={post} />
          <TextareaForCreatePost post={post} />
          {getButtons(1, 3)}
        </React.Fragment>
      ),
    },
    {
      title: translationContext(TranslationKeys.AddPhoto),
      stepNumber: 2,
      icon: <AddPhotoAlternateOutlinedIcon />,
      stepComponent: (
        <Grid>
          <ImagesUpload post={post} />
          {getButtons(2, 3)}
        </Grid>
      ),
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
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      spacing={4}
      direction={"column"}
    >
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
      <Grid sx={{ display: "flex", flexDirection: "column", flexGrow: 4 }}>
        {activeStep === 0 ? (
          <React.Fragment>{steps[0].stepComponent}</React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>{steps[1].stepComponent}</React.Fragment>
        ) : (
          <React.Fragment>{steps[2].stepComponent}</React.Fragment>
        )}
      </Grid>
    </Grid>
  );
}
