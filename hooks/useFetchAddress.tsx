import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useFetchAddress = (latitude: number, longitude: number) => {
  const [address, setAddress] = useState("...");
  useEffect(() => {
    (async() => {
      try {
        const rawAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (address.length > 0) {
          const { street, name, city, region, postalCode, country } = rawAddress[0];
          setAddress(`${street ?? name}, ${city}, ${region}`);
        }
      } catch (error) {
        console.error("Reverse geocoding error!", error);
      }
    })();
  });
  return address;
}
