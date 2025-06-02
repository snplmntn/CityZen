import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, useTheme } from "react-native-paper";

const Onboarding = () => {
  const { colors } = useTheme();

  const router = useRouter();

  const handleFinish = async () => {
    await AsyncStorage.setItem("onboarding-complete", "true");
    router.replace("/"); // go to home after onboarding
  };

  return <Button onPress={handleFinish}>Finish Onboarding</Button>;
};

export default Onboarding;
