import { useEffect } from "react";
import * as Location from "expo-location";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Location.LocationObject | null>>;
  setLocationPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFetchLocation = ({ setLocation, setLocationPermission }: Props) => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermission(false);
        return;
      }

      const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
      setPermission(true);
    })();
  }, []);
}

