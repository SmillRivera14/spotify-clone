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
      setVolume(previosVolumeRef.current); // Restaurar el volumen anterior
    } else {
      previosVolumeRef.current = volume || 1; // Guardar volumen antes de silenciar (si es 0, usar 1 como fallback)
      setVolume(0); // Silenciar
    }
  };

  const handleSliderChange = (value) => {
    const [newValue] = value;
    const volumeValue = newValue / 100;
    previosVolumeRef.current = volumeValue; // Actualizar volumen previo al mover el slider
    setVolume(volumeValue);
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
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={handleSliderChange} // Usar la nueva función para actualizar `previosVolumeRef`
      />
    </div>
  );
};
