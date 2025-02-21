import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef, useState } from "react";

export function Player() {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current.src = `/music/1/01.mp3`;
  }, []);
  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div className="">CurrentSong..</div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
      <div className="grid place-content-center"></div>
      <audio ref={audioRef} />
      {/* guardando el elemento html "audio" en una referencia que apunte al mismo */}
    </div>
  );
}
