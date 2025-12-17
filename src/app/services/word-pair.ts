import { Injectable, signal } from '@angular/core';
import { WordPair } from '../components/word-list/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordPairService {
  private readonly localStorageKey = 'wordList';

  mockedWordList: WordPair[] = [
    { language1: 'hund', language2: 'dog' },
    { language1: 'katze', language2: 'cat' },
    { language1: 'ratte', language2: 'rat' },
    { language1: 'vogel', language2: 'bird' },
    { language1: 'krokodil', language2: 'crocodile' },
    { language1: 'hamster', language2: 'hamster' },
  ];

  wordList = signal<WordPair[]>([]);

  constructor() {
    this._restoreSavedValues();
  }

  delete(wordPairToDelete: WordPair): void {
    const updatedWordList = this.wordList().filter((wordPair) => wordPair !== wordPairToDelete);

    this._updateWordList(updatedWordList);
  }

  add(newWordPair: WordPair): void {
    let oldList = this.wordList().slice();
    oldList.push({ ...newWordPair });
    this._updateWordList(oldList);
  }

  import(): void {
    this._updateWordList([...this.wordList(), ...this.mockedWordList]);
  }

  reset(): void {
    this._updateWordList([]);
  }

  private _updateWordList(newList: WordPair[]): void {
    this.wordList.set(newList);
    if (this.wordList().length < 1) {
      window.localStorage.removeItem(this.localStorageKey);
      return;
    }
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(newList));
  }

  private _restoreSavedValues(): void {
    const storedWordList = window.localStorage.getItem(this.localStorageKey);
    if (!storedWordList) return;

    try {
      const storedWordListJson = JSON.parse(storedWordList);
      this.wordList.set(storedWordListJson);
    } catch (error) {
      console.log(error);
    }
  }
}
