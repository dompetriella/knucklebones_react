export class DiceData {
  id: number;
  numberValue: number;

  constructor({ id, numberValue = 0 }: { id: number; numberValue?: number }) {
    this.id = id;
    this.numberValue = numberValue;
  }

  copyWith({
    id,
    numberValue,
  }: {
    id?: number;
    numberValue?: number;
  }): DiceData {
    return new DiceData({
      id: id ?? this.id,
      numberValue: numberValue ?? this.numberValue,
    });
  }
}
