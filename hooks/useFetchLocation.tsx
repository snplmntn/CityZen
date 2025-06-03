import * as Location from "expo-location";
import { useEffect } from "react";

type Props = {
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObject | null>
  >;
  setLocationPermission:
    | ((value: boolean) => void)
    | React.Dispatch<React.SetStateAction<boolean>>;
};

export const useFetchLocation = ({
  setLocation,
  setLocationPermission,
}: Props) => {
  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount

    // Add a timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log("Location fetch timed out, using default location");
        // Set default location for Manila
        setLocation({
          coords: {
            latitude: 14.676,
            longitude: 121.0437,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        });
        setLocationPermission(true); // Assume permission granted
      }
    }, 8000); // 8 seconds timeout

    (async () => {
      try {
        // Check permissions first
        const { status } = await Location.requestForegroundPermissionsAsync();

        // Immediately set permission status
        if (isMounted) {
          setLocationPermission(status === "granted");
        }

        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        // Get location
        try {
          const newLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          if (isMounted) {
            clearTimeout(timeoutId);
            setLocation(newLocation);
            console.log("Location set successfully");
          }
        } catch (locationError) {
          console.error("Error getting location:", locationError);
          // Provide a fallback location
          if (isMounted) {
            setLocation({
              coords: {
                latitude: 14.676, // Manila
                longitude: 121.0437,
                altitude: 0,
                accuracy: 0,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
              timestamp: Date.now(),
            });
          }
        }
      } catch (err) {
        console.error("Permission request error:", err);
        if (isMounted) {
          setLocationPermission(false);
        }
      }
    })();

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);
};
