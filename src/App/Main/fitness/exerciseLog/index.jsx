import Log from "./Log";
import { FitnessProvider } from "../Context/fitnessContext";

const ExerciseLog = () => {
  return (
    <FitnessProvider>
      <Log />
    </FitnessProvider>
  );
};

export default ExerciseLog;
