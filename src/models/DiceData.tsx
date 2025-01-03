export class DiceData {
  id: string;
  numberValue: number;

  constructor({ id, numberValue = 0 }: { id: string; numberValue?: number }) {
    this.id = id;
    this.numberValue = numberValue;
  }

  copyWith({
    id,
    numberValue,
  }: {
    id?: string;
    numberValue?: number;
  }): DiceData {
    return new DiceData({
      id: id ?? this.id,
      numberValue: numberValue ?? this.numberValue,
    });
  }
}
