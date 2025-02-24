import { usePlayerStore } from "@/store/playerStore";
import { useRef } from "react";
import { PlayerVolumeIconComponent } from "./PlayerVolumeIconComponent";
import { Slider } from "./Slider";

export const PlayerVolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previosVolumeRef = useRef(volume);
  const isVolumeSilenced = volume < 0.1;
  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previosVolumeRef.current);
    } else {
      previosVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button
        className="opacity-70 hover:opacity-100 transition"
        onClick={handleClickVolumen}
      >
        <PlayerVolumeIconComponent />
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newValue] = value;
          const volumeValue = newValue / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};
