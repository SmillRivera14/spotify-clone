import { useEffect, useState } from "react";
import { Slider } from "./Slider";

export const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const formaTime = (time) => {
    if (time == null) return `0:00`;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formaTime(currentTime)}
      </span>
      <Slider
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className="w-[300px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          audio.current.currentTime = newCurrentTime;
        }}
      />
      {duration ? (
        <span className="opacity-50 w-12">{formaTime(duration)}</span>
      ) : (
        <span className="opacity-50 w-12">0:00</span>
      )}
    </div>
  );
};
