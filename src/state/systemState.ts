import { create } from "zustand";
import { SettingsKeys } from "../global/settingsKeys";

interface DefaultSettingsState {
  [key: string]: boolean;
}

interface SoundFiles {
  [key: string]: string;
}

interface Sounds {
  [key: string]: HTMLAudioElement;
}

const defaultSettingsState = {
  [SettingsKeys.SoundEffects]: false,
  [SettingsKeys.GameAudio]: false,
  [SettingsKeys.GameMusicVersion]: false,
};

interface SystemState {
  //Snackbar
  snackbar: {
    isOpen: boolean;
    message: string;
    severity: "info" | "success" | "warning" | "error";
  };
  showSnackbar: (
    message: string,
    severity?: "info" | "success" | "warning" | "error"
  ) => void;
  hideSnackbar: () => void;

  settings: DefaultSettingsState;
  toggleSettings: (settingsKey: string) => void;

  soundEffects: Sounds;
  playSoundEffect: (soundName: string) => void;
  loadSoundEffects: (soundFiles: SoundFiles) => void;
}

const useSystemState = create<SystemState>((set, get) => ({
  snackbar: {
    isOpen: false,
    message: "",
    severity: "info",
  },

  showSnackbar: (message, severity = "info") => {
    set({
      snackbar: {
        isOpen: true,
        message,
        severity,
      },
    });
  },

  hideSnackbar: () => {
    set({
      snackbar: {
        isOpen: false,
        message: "",
        severity: "info",
      },
    });
  },

  settings: defaultSettingsState,

  toggleSettings: (settingsKey: string) => {
    let mutableSettings = get().settings;
    mutableSettings[settingsKey] = !mutableSettings[settingsKey];
    set({ settings: mutableSettings });
  },

  soundEffects: {},

  playSoundEffect: (soundName: string) => {
    console.log("attempting to play sound");
    const sounds = get().soundEffects;
    console.log("recieve sound effects");
    console.log(sounds);
    console.log(soundName);
    const sound = sounds[soundName];
    if (sound) {
      console.log("found sound");
      sound.currentTime = 0;
      sound.play();
    }
  },

  loadSoundEffects: (soundFiles: SoundFiles) => {
    const loadedSounds: Sounds = {};
    for (const [key, value] of Object.entries(soundFiles)) {
      loadedSounds[key] = new Audio(value);
    }
    set({ soundEffects: loadedSounds });
  },
}));

export default useSystemState;
