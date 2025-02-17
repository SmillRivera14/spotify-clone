import { Play, Pause } from "@/icons/PlayerIcons";
import { useRef, useState } from "react";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();
  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = `/music/1/01.mp3`;
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
    </div>
  );
}
