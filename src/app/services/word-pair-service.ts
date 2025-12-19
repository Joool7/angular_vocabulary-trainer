import { Injectable, signal } from '@angular/core';
import { WordPair } from './word-pair.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class WordPairService {
  private readonly localStorageKey = 'wordList';

  private readonly _mockedWordList: WordPair[] = [
    { id: uuidv4(), language1: 'hund', language2: 'dog' },
    { id: uuidv4(), language1: 'katze', language2: 'cat' },
    { id: uuidv4(), language1: 'ratte', language2: 'rat' },
    { id: uuidv4(), language1: 'vogel', language2: 'bird' },
    { id: uuidv4(), language1: 'krokodil', language2: 'crocodile' },
    { id: uuidv4(), language1: 'hamster', language2: 'hamster' },
  ];

  wordList = signal<WordPair[]>([]);

  constructor() {
    this._restoreSavedValues();
  }

  delete(id: string): void {
    const updatedWordList = this.wordList().filter((wordPair) => wordPair.id !== id);

    this._updateWordList(updatedWordList);
  }

  add(newWordPair: WordPair): void {
    const newList = this.wordList().slice();
    const index = newList.findIndex((wordPair) => wordPair.language1 === newWordPair.language1);
    if (index > -1) return;
    newList.push({ ...newWordPair, id: uuidv4() });
    this._updateWordList(newList);
  }

  import(): void {
    this._mockedWordList.forEach((wordPair) => this.add(wordPair));
  }

  reset(): void {
    this._updateWordList([]);
  }

  update(updatedWordPair: WordPair): void {
    const newList = this.wordList().map((wordPair) =>
      wordPair.id === updatedWordPair.id ? { ...updatedWordPair } : wordPair
    );
    this._updateWordList(newList);
  }

  private _updateWordList(newList: WordPair[]): void {
    this.wordList.set(newList);

    if (this.wordList().length < 1) {
      window.localStorage.removeItem(this.localStorageKey);
      return;
    }
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.wordList()));
  }

  private _restoreSavedValues(): void {
    const storedWordList = window.localStorage.getItem(this.localStorageKey);
    if (!storedWordList) return;

    try {
      const storedWordListJson = JSON.parse(storedWordList);
      this.wordList.set(storedWordListJson);
    } catch (error) {
      console.error(error);
    }
  }
}
