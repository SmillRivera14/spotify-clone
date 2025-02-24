import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { PlayerVolumeControl } from "./PlayerVolumeControl";
import { PlayerCurrentSong } from "./PlayerCurrentSong";

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button
            className="bg-white rounded-full p-2 text-black"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <audio ref={audioRef} />
          {/* guardando el elemento html "audio" en una referencia que apunte al mismo */}
        </div>
      </div>
      <div className="grid place-content-center">
        <PlayerVolumeControl />
      </div>
    </div>
  );
}
