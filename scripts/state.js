import { storage } from './storage.js';

export const state = {
  records: [],
  settings: { unit: 'minutes', cap: 600 },
  searchQuery: '',
  isCaseInsensitive: true,
  sortBy: 'dueDate-asc',
  editingId: null,

  init(defaultRecords = []) {
    const loadedRecords = storage.loadRecords();
    this.records = loadedRecords ? loadedRecords : defaultRecords;
    this.settings = storage.loadSettings();
    storage.saveRecords(this.records);
  },

  addRecord(record) {
    this.records.push(record);
    storage.saveRecords(this.records);
  },

  updateRecord(id, updatedFields) {
    const index = this.records.findIndex(r => r.id === id);
    if (index !== -1) {
      this.records[index] = {
        ...this.records[index],
        ...updatedFields,
        updatedAt: new Date().toISOString()
      };
      storage.saveRecords(this.records);
    }
  },

  deleteRecord(id) {
    this.records = this.records.filter(r => r.id !== id);
    storage.saveRecords(this.records);
  }
};