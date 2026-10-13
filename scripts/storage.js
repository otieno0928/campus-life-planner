const STORAGE_KEY = 'campus_planner_records_v1';
const SETTINGS_KEY = 'campus_planner_settings_v1';

export const storage = {
  loadRecords() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error reading records from localStorage:', err);
      return null;
    }
  },

  saveRecords(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (err) {
      console.error('Error saving records to localStorage:', err);
    }
  },

  loadSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { unit: 'minutes', cap: 600 };
    } catch (err) {
      return { unit: 'minutes', cap: 600 };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error('Error saving settings to localStorage:', err);
    }
  }
};