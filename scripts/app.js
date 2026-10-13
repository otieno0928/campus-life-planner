import { state } from './state.js';
import { ui } from './ui.js';
import { validators } from './validators.js';
import { storage } from './storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  //  Feature to fetch seed data if localStorage is empty
  let defaultData = [];
  try {
    const res = await fetch('seed.json');
    if (res.ok) {
      defaultData = await res.json();
    }
  } catch (err) {
    console.warn('Could not load seed.json automatically:', err);
  }

  state.init(defaultData);

  // Setting of the initial settings inputs
  document.getElementById('unit-preference').value = state.settings.unit;
  document.getElementById('duration-cap').value = state.settings.cap;

  ui.renderAll();

  // Event Listeners Functions
  const form = document.getElementById('event-form');
  const btnCancel = document.getElementById('btn-cancel');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const duration = document.getElementById('event-duration').value;
    const tag = document.getElementById('event-tag').value;

    const { isValid, errors } = validators.validateEvent(title, date, duration, tag);

    // Displaying  inline errors
    document.getElementById('err-title').textContent = errors.title || '';
    document.getElementById('err-date').textContent = errors.date || '';
    document.getElementById('err-duration').textContent = errors.duration || '';
    document.getElementById('err-tag').textContent = errors.tag || '';

    if (!isValid) return;

    if (state.editingId) {
      state.updateRecord(state.editingId, {
        title: title.trim(),
        dueDate: date,
        duration: Number(duration),
        tag: tag.trim()
      });
      state.editingId = null;
      btnCancel.hidden = true;
      document.getElementById('btn-save').textContent = 'Save Event';
    } else {
      const newRecord = {
        id: `rec_${Date.now()}`,
        title: title.trim(),
        dueDate: date,
        duration: Number(duration),
        tag: tag.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.addRecord(newRecord);
    }

    form.reset();
    ui.renderAll();
  });

//   Table action clicks ie Edit/delete
  document.getElementById('records-body').addEventListener('click', (e) => {
    const target = e.target;
    const id = target.getAttribute('data-id');

    if (!id) return;

    if (target.classList.contains('btn-delete')) {
      if (confirm('Are you sure you want to delete this event?')) {
        state.deleteRecord(id);
        ui.renderAll();
      }
    } else if (target.classList.contains('btn-edit')) {
      const record = state.records.find(r => r.id === id);
      if (record) {
        state.editingId = id;
        document.getElementById('event-id').value = record.id;
        document.getElementById('event-title').value = record.title;
        document.getElementById('event-date').value = record.dueDate;
        document.getElementById('event-duration').value = record.duration;
        document.getElementById('event-tag').value = record.tag;

        document.getElementById('btn-save').textContent = 'Update Event';
        btnCancel.hidden = false;
        document.getElementById('planner-heading').scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  btnCancel.addEventListener('click', () => {
    state.editingId = null;
    form.reset();
    btnCancel.hidden = true;
    document.getElementById('btn-save').textContent = 'Save Event';
  });

  // Live Regex Search Listeners
  document.getElementById('search-regex').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    ui.renderTable();
  });

  document.getElementById('search-case-toggle').addEventListener('change', (e) => {
    state.isCaseInsensitive = e.target.checked;
    ui.renderTable();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    ui.renderTable();
  });

  // Settings & Unit Conversion Listeners
  document.getElementById('unit-preference').addEventListener('change', (e) => {
    state.settings.unit = e.target.value;
    storage.saveSettings(state.settings);
    ui.renderAll();
  });

  document.getElementById('duration-cap').addEventListener('input', (e) => {
    state.settings.cap = Number(e.target.value) || 0;
    storage.saveSettings(state.settings);
    ui.renderStats();
  });

  // Export JSON
  document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "campus_planner_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import JSON
  document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (Array.isArray(importedData)) {
          state.records = importedData;
          storage.saveRecords(state.records);
          ui.renderAll();
          alert('Planner records imported successfully!');
        } else {
          alert('Invalid format: JSON file must contain an array of records.');
        }
      } catch (err) {
        alert('Failed to parse uploaded JSON file.');
      }
    };
    reader.readAsText(file);
  });
});