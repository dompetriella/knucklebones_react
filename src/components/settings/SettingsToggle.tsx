import { useState } from "react";
import { AppColors } from "../../AppColors";
import { motion } from "framer-motion";
import useGameState from "../../state/gameState";

export function SettingsToggle({
  settingsKey,
  title,
  offSubtitle = "Off",
  onSubtitle = "On",
}: {
  settingsKey: string;
  title: string;
  offSubtitle?: string;
  onSubtitle?: string;
}) {
  const settingValue = useGameState((state) => state.settings[settingsKey]);
  const toggleSettingAction = useGameState((state) => state.toggleSettings);

  const toggleWidth: number = 160;
  const toggleHeight: number = 60;

  const buttonWidth: number = toggleHeight / 1.5;
  const buttonHeight: number = toggleHeight / 1.5;

  const leftPadding: number = 8;
  const rightPadding: number = toggleWidth - buttonWidth - leftPadding * 2;

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl flex justify-center">{title}</h1>
      <motion.button
        onClick={() => toggleSettingAction(settingsKey)}
        initial={{ background: AppColors.OnTertiary }}
        animate={{
          background: settingValue ? AppColors.OnPrimary : AppColors.OnTertiary,
        }}
        style={{
          height: toggleHeight,
          width: toggleWidth,
        }}
        className="relative flex justify-center items-center p-2 m-4 bg-secondary w-40 h-20 rounded-full border-4 border-onSurface "
      >
        <motion.div
          animate={{
            left: settingValue ? rightPadding : leftPadding,
            background: settingValue ? AppColors.Primary : AppColors.Tertiary,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 35,
          }}
          style={{
            background: settingValue ? AppColors.Primary : AppColors.Tertiary,

            left: settingValue ? rightPadding : leftPadding,

            height: buttonHeight,
            width: buttonWidth,
          }}
          className="h-14 w-14 rounded-full absolute"
        ></motion.div>
      </motion.button>
      <h2 className="text-xl">{settingValue ? onSubtitle : offSubtitle}</h2>
    </div>
  );
}
