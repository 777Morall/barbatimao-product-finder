
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { PlayIcon, SkipForward } from "lucide-react";

interface VideoPresentationProps {
  onComplete: () => void;
}

const VideoPresentation: React.FC<VideoPresentationProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.addEventListener('ended', onComplete);
      videoElement.addEventListener('canplay', () => setIsLoaded(true));
      
      return () => {
        videoElement.removeEventListener('ended', onComplete);
        videoElement.removeEventListener('canplay', () => setIsLoaded(true));
      };
    }
  }, [onComplete]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="video-presentation-container mb-10 animate-fade-in">
      <div className="relative rounded-lg overflow-hidden shadow-xl bg-black">
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-10">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">
              Conheça mais sobre o poder do Barbatimão
            </h2>
            <Button 
              onClick={handlePlayClick} 
              size="lg" 
              className="flex items-center gap-2 px-6 py-6 rounded-full transition-all hover:scale-105"
              disabled={!isLoaded}
            >
              <PlayIcon className="w-5 h-5" />
              {isLoaded ? "Assistir Apresentação" : "Carregando vídeo..."}
            </Button>
          </div>
        )}
        
        <video 
          ref={videoRef}
          className="w-full rounded-lg"
          src="https://linkproibido.com/hpv.cura.mp4"
          playsInline
          preload="auto"
        />

        {isPlaying && (
          <div className="absolute bottom-4 right-4 z-10">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSkip}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Pular Vídeo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPresentation;
