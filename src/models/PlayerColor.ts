export class PlayerColor {
  primary: string;
  secondary: string;
  tertiary: string;
  onPrimary: string;
  onSecondary: string;
  onTertiary: string;

  constructor({
    primary,
    secondary,
    tertiary,
    onPrimary,
    onSecondary,
    onTertiary,
  }: {
    primary: string;
    secondary: string;
    tertiary: string;
    onPrimary: string;
    onSecondary: string;
    onTertiary: string;
  }) {
    this.primary = primary;
    this.secondary = secondary;
    this.tertiary = tertiary;
    this.onPrimary = onPrimary;
    this.onSecondary = onSecondary;
    this.onTertiary = onTertiary;
  }

  copyWith({
    primary,
    secondary,
    tertiary,
    onPrimary,
    onSecondary,
    onTertiary,
  }: Partial<PlayerColor>): PlayerColor {
    return new PlayerColor({
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      tertiary: tertiary ?? this.tertiary,
      onPrimary: onPrimary ?? this.onPrimary,
      onSecondary: onSecondary ?? this.onSecondary,
      onTertiary: onTertiary ?? this.onTertiary,
    });
  }
}
