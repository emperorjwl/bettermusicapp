"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { Howl } from "howler";

const song = new Howl({ src: ["/anoti-audio.mp3"] });

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      song.pause();
    } else {
      song.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        const currentTime = song.seek();
        const totalTime = song.duration();
        const percentage = (currentTime / totalTime) * 100;
        setProgress(percentage || 0);
      }, 500);
    }

    return () => clearInterval(interval);
  });

  return (
    <div className="now-playing">
      <div className="albumart">
        <Image
          src="/wizkidalbumart.jpg"
          alt="Wizkid Album Art"
          width={300}
          height={300}
          className="albumart-img"
        />
      </div>

      <div className="album-info">
        <div className="artist">
          <div className="album-title">
            <div className="track-title">
              <p>Anoti </p>
            </div>
            <Image
              src="/explicit.png"
              height={15}
              width={15}
              alt="explicit"
              className="explicit-icon"
            />
          </div>
          <div className="artist-album">
            <div className="artist-name">
              <p>Wizkid </p>
            </div>
            <span> — </span>
            <div className="album-name">
              <p> Made In Lagos: Deluxe Edition</p>
            </div>
          </div>
        </div>
        <div className="favorite">
          <Image src="/star.png" height={20} width={20} alt="favorite" />
          <Image src="/threedots.png" height={20} width={20} alt="more" />
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        <div className="playing-next-img">
          <Image src="/menu-bar.png" height={20} width={20} alt="menu-bar" />
        </div>

        <div className="actual-controls">
          <div className="rewind">
            <Image src="/rewind.png" height={20} width={20} alt="rewind" />
          </div>

          <div className="play" onClick={togglePlay}>
            <Image
              src={isPlaying ? "/pause.png" : "/play.png"}
              height={10}
              width={10}
              alt="play-pause"
            />
          </div>

          <div className="forward">
            <Image
              src="/fast-forward.png"
              height={20}
              width={20}
              alt="forward"
            />
          </div>
        </div>

        <div className="lyrics-img">
          <Image src="/lyrics.png" height={25} width={25} alt="lyrics" />
        </div>
      </div>
    </div>
  );
}
