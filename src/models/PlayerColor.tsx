export class PlayerColor {
  primary: string;
  secondary: string;
  tertiary: string;
  onPrimary: string;
  onSecondary: string;
  onTertiary: string;

  constructor(
    primary: string,
    secondary: string,
    tertiary: string,
    onPrimary: string,
    onSecondary: string,
    onTertiary: string
  ) {
    this.primary = primary;
    this.secondary = secondary;
    this.tertiary = tertiary;
    this.onPrimary = onPrimary;
    this.onSecondary = onSecondary;
    this.onTertiary = onTertiary;
  }

  // CopyWith method for immutability
  copyWith({
    primary,
    secondary,
    tertiary,
    onPrimary,
    onSecondary,
    onTertiary,
  }: Partial<PlayerColor>): PlayerColor {
    return new PlayerColor(
      primary ?? this.primary,
      secondary ?? this.secondary,
      tertiary ?? this.tertiary,
      onPrimary ?? this.onPrimary,
      onSecondary ?? this.onSecondary,
      onTertiary ?? this.onTertiary
    );
  }
}
