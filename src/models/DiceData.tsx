export class DiceData {
  id: number;
  numberValue: number;

  constructor(id: number, numberValue: number = 0) {
    this.id = id;
    this.numberValue = numberValue;
  }

  copyWith(id?: number, numberValue?: number): DiceData {
    return new DiceData(id ?? this.id, numberValue ?? this.numberValue);
  }
}
