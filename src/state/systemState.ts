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
  loadSoundEffects: (soundFiles: SoundFiles) => Promise<void>;

  backgroundMusicTracks: Sounds;
  playBackgroundMusic: (soundName: string, resetMusic: boolean) => void;
  loadBackgroundMusic: (soundFiles: SoundFiles) => Promise<void>;
  pauseBackgroundMusic: (soundName: string, resetMusic: boolean) => void;
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
    if (get().settings[SettingsKeys.SoundEffects]) {
      const sounds = get().soundEffects;
      const sound = sounds[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
    }
  },

  async loadSoundEffects(soundFiles: SoundFiles) {
    const loadedSounds: Sounds = {};
    for (const [key, value] of Object.entries(soundFiles)) {
      loadedSounds[key] = new Audio(value);
    }
    set({ soundEffects: loadedSounds });
  },

  backgroundMusicTracks: {},

  playBackgroundMusic: (soundName: string, resetMusic: boolean) => {
    if (get().settings[SettingsKeys.BackgroundMusic]) {
      const sounds = get().backgroundMusicTracks;
      const sound = sounds[soundName];
      if (sound) {
        if (resetMusic) {
          sound.currentTime = 0;
        }
        sound.loop = true;
        sound.play();
      }
    }
  },

  pauseBackgroundMusic: (soundName: string, resetMusic: boolean) => {
    const sounds = get().backgroundMusicTracks;
    const sound = sounds[soundName];
    if (sound) {
      if (resetMusic) {
        sound.currentTime = 0;
      }
      sound.pause();
    }
  },

  async loadBackgroundMusic(soundFiles: SoundFiles) {
    const loadedSounds: Sounds = {};
    for (const [key, value] of Object.entries(soundFiles)) {
      loadedSounds[key] = new Audio(value);
    }
    set({ backgroundMusicTracks: loadedSounds });
  },
}));

export default useSystemState;
