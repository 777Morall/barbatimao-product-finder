
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { PlayIcon, PauseIcon, SkipForward, Volume2, VolumeX } from "lucide-react";
import { PlayButton } from "./ui/play-button";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoPresentationProps {
  onComplete: () => void;
}

const VideoPresentation: React.FC<VideoPresentationProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.addEventListener('ended', onComplete);
      videoElement.addEventListener('canplay', () => setIsLoaded(true));
      videoElement.addEventListener('timeupdate', updateProgress);
      
      // Force video reload on mobile to ensure proper loading
      if (isMobile) {
        videoElement.load();
      }
      
      return () => {
        videoElement.removeEventListener('ended', onComplete);
        videoElement.removeEventListener('canplay', () => setIsLoaded(true));
        videoElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [onComplete, isMobile]);

  const updateProgress = () => {
    if (videoRef.current) {
      const value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(value);
    }
  };

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      // Play on mobile often requires user interaction first
      try {
        video.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Error playing video:", error);
            // On some mobile browsers, autoplay is not allowed without user gesture
            if (isMobile) {
              setIsMuted(true);
              video.muted = true;
              video.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Still can't play:", e));
            }
          });
      } catch (error) {
        console.error("Error attempting to play:", error);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const position = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    videoRef.current.currentTime = position * videoRef.current.duration;
  };

  return (
    <div className="video-presentation-container mb-8 animate-fade-in">
      <div className="relative rounded-lg overflow-hidden shadow-xl bg-black">
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-10">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-6 px-4 text-center">
              Conheça mais sobre o poder do Barbatimão para a saúde
            </h2>
            <PlayButton 
              onClick={handlePlayClick} 
              size="lg" 
              variant="primary"
              className="transition-all hover:scale-105"
              disabled={!isLoaded}
            />
            <p className="text-white/80 mt-4 text-sm">
              {isLoaded ? "Clique para assistir" : "Carregando vídeo..."}
            </p>
          </div>
        )}
        
        <video 
          ref={videoRef}
          className="w-full rounded-lg"
          src="https://linkproibido.com/hpv.cura.mp4"
          playsInline
          preload="metadata"
          poster="https://barbatimaodealagoas.com.br/wp-content/uploads/2022/08/HPV-CURA-LOGO-FINAL2-1024x755.png"
          controls={false}
          muted={isMuted}
        />

        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 z-10 flex flex-col">
            {/* Progress bar */}
            <div 
              className="w-full h-2 bg-gray-700 rounded-full cursor-pointer mb-2" 
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePlayClick}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>
              
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
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPresentation;
