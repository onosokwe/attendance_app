import { useEffect, useState } from "react";

const usePosition = () => {
  const [position, setPosition] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  
  const onError = (error) => {
    setErrorMsg(error.code);
  };
  
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setErrorMsg("Geolocation is not supported");
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  
  return { ...position, errorMsg };

};

export default usePosition;


