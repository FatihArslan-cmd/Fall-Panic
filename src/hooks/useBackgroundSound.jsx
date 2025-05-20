import Sound from "react-native-sound";
import { useEffect } from "react";
import { storage } from "../../../../src/utils/storage";

Sound.setCategory('Playback');

export function useBackgroundSound(soundFileName = 'background_music.mp3', loop = true, autoPlay = true) {
  useEffect(() => {
    let backgroundMusic = null;

    const musicEnabledFromStorage = storage.getBoolean('musicEnabled');

    const shouldPlay = autoPlay && (musicEnabledFromStorage === undefined || musicEnabledFromStorage === true);

    if (shouldPlay) {
        backgroundMusic = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log(`Failed to load the sound ${soundFileName}`, error);
            return;
          }

          if (loop) {
            backgroundMusic.setNumberOfLoops(-1);
          }

          backgroundMusic.play((success) => {
            if (!success) {
              console.log('Playback failed due to audio decoding errors');
            }
          });
        });
    } else {
        if (!autoPlay) {
             console.log(`Music not auto-playing for ${soundFileName}`);
        } else if (musicEnabledFromStorage === false) {
             console.log(`Music disabled by user settings for ${soundFileName}`);
        }
    }

    return () => {
      if (backgroundMusic) {
        backgroundMusic.release();
      }
    };
  }, [soundFileName, loop, autoPlay]);
}