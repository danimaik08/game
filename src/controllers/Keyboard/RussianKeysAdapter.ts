export default class RussianKeysAdapter {
  private static readonly RUS_TO_ENG_KEYS_MAP = {
    Й: 'Q',
    Ц: 'W',
    У: 'E',
    К: 'R',
    Е: 'T',
    Н: 'Y',
    Г: 'U',
    Ш: 'I',
    Щ: 'O',
    З: 'P',
    Ф: 'A',
    Ы: 'S',
    В: 'D',
    А: 'F',
    П: 'G',
    Р: 'H',
    О: 'J',
    Л: 'K',
    Д: 'L',
    Я: 'Z',
    Ч: 'X',
    С: 'C',
    М: 'V',
    И: 'B',
    Т: 'N',
    Ь: 'M',
  };

  public convertKeyToEngFromSameButton(key: string) {
    return RussianKeysAdapter.RUS_TO_ENG_KEYS_MAP[key as keyof typeof RussianKeysAdapter.RUS_TO_ENG_KEYS_MAP] ?? key;
  }
}
