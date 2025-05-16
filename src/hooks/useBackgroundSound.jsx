import Sound from "react-native-sound";
import { useEffect } from "react";

Sound.setCategory('Playback');

/**
 * Custom hook to play background music
 * @param {string} soundFileName - The name of the sound file in assets folder
 * @param {boolean} loop - Whether to loop the sound (default: true)
 * @param {boolean} autoPlay - Whether to automatically play the sound (default: true)
 */
export function useBackgroundSound(soundFileName = 'background_music.mp3', loop = true, autoPlay = true) {
  useEffect(() => {
    let backgroundMusic = null;
    
    backgroundMusic = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(`Failed to load the sound ${soundFileName}`, error);
        return;
      }
      
      if (loop) {
        backgroundMusic.setNumberOfLoops(-1); // -1 means infinite loop
      }
      
      if (autoPlay) {
        backgroundMusic.play((success) => {
          if (!success) {
            console.log('Playback failed due to audio decoding errors');
          }
        });
      }
    });
    
    return () => {
      if (backgroundMusic) {
        backgroundMusic.release();
      }
    };
  }, [soundFileName, loop, autoPlay]); 
}