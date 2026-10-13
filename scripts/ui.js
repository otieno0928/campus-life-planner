import { state } from '../scripts/state.js';
import { compileSafeRegex, highlightText } from './search.js';

export const ui = {
  renderAll() {
    this.renderStats();
    this.renderTable();
    this.updateUnitLabels();
  },

  updateUnitLabels() {
    const labels = document.querySelectorAll('.unit-label');
    const labelText = state.settings.unit === 'hours' ? 'hrs' : 'mins';
    labels.forEach(el => el.textContent = labelText);
  },

  renderStats() {
    const totalCount = state.records.length;
    let totalMinutes = state.records.reduce((sum, r) => sum + Number(r.duration || 0), 0);

    // Tag frequency counter
    const tagCounts = {};
    state.records.forEach(r => {
      if (r.tag) {
        tagCounts[r.tag] = (tagCounts[r.tag] || 0) + 1;
      }
    });

    let topTag = 'N/A';
    let maxFreq = 0;
    for (const [tag, count] of Object.entries(tagCounts)) {
      if (count > maxFreq) {
        maxFreq = count;
        topTag = tag;
      }
    }

    const displayDuration = state.settings.unit === 'hours'
      ? (totalMinutes / 60).toFixed(1)
      : totalMinutes;

    document.getElementById('stat-total-count').textContent = totalCount;
    document.getElementById('stat-total-duration').textContent = displayDuration;
    document.getElementById('stat-top-tag').textContent = topTag;
    const capAlert = document.getElementById('cap-alert-region');
    const cap = Number(state.settings.cap) || 0;

    if (cap > 0) {
      if (totalMinutes > cap) {
        capAlert.className = 'alert-box warning';
        capAlert.textContent = `Warning: Total duration (${totalMinutes} mins) exceeds weekly target cap (${cap} mins)!`;
      } else {
        capAlert.className = 'alert-box info';
        capAlert.textContent = `Remaining limit capacity: ${cap - totalMinutes} mins (Cap: ${cap} mins).`;
      }
    } else {
      capAlert.className = 'alert-box info';
      capAlert.textContent = 'No active weekly duration cap set.';
    }
  },

  getFilteredAndSortedRecords() {
    let result = [...state.records];
    const regex = compileSafeRegex(state.searchQuery, state.isCaseInsensitive);

    if (regex) {
      result = result.filter(r => 
        regex.test(r.title) || regex.test(r.tag) || regex.test(r.dueDate)
      );
    }

    const [field, direction] = state.sortBy.split('-');
    result.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (field === 'duration') {
        valA = Number(valA);
        valB = Number(valB);
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  },

  renderTable() {
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = '';

    const recordsToDisplay = this.getFilteredAndSortedRecords();
    const regex = compileSafeRegex(state.searchQuery, state.isCaseInsensitive);

    if (recordsToDisplay.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No matching planner tasks found.</td></tr>`;
      return;
    }

    recordsToDisplay.forEach(record => {
      const tr = document.createElement('tr');

      const displayDuration = state.settings.unit === 'hours'
        ? (record.duration / 60).toFixed(1)
        : record.duration;

      const titleHtml = regex ? highlightText(record.title, regex) : record.title;
      const tagHtml = regex ? highlightText(record.tag, regex) : record.tag;
      const dateHtml = regex ? highlightText(record.dueDate, regex) : record.dueDate;

      tr.innerHTML = `
        <td>${titleHtml}</td>
        <td>${dateHtml}</td>
        <td>${displayDuration}</td>
        <td><code>${tagHtml}</code></td>
        <td>
          <button class="btn btn-secondary btn-sm btn-edit" data-id="${record.id}">Edit</button>
          <button class="btn btn-danger btn-sm btn-delete" data-id="${record.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
};