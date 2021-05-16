declare const VALID_FONT: readonly ['sans', 'serif', 'mono'];
declare type FontChoice = typeof VALID_FONT[number];
declare const VALID_COLOR: readonly ['red-orange', 'teal', 'violet'];
declare type ColorChoice = typeof VALID_COLOR[number];
export interface SettingsType {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  font: FontChoice;
  color: ColorChoice;
}
