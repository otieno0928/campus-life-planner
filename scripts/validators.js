export const validators = {
  titleRegex: /^\S+(?:\s\S+)*$/,

  durationRegex: /^(0|[1-9]\d*)(\.\d{1,2})?$/,

  dateRegex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  tagRegex: /^@[A-Za-z0-9_-]+$/,
  
  duplicateWordRegex: /\b(\w+)\s+\1\b/i,

  validateEvent(title, date, duration, tag) {
    const errors = {};

    if (!title || !this.titleRegex.test(title.trim())) {
      errors.title = 'Title must not have leading/trailing or double spaces.';
    } else if (this.duplicateWordRegex.test(title)) {
      errors.title = 'Title contains duplicated consecutive words (e.g., "lecture lecture").';
    }

    if (!date || !this.dateRegex.test(date)) {
      errors.date = 'Select a valid date in YYYY-MM-DD format.';
    }

    if (!duration || !this.durationRegex.test(String(duration))) {
      errors.duration = 'Duration must be a positive integer.';
    }

    if (!tag || !this.tagRegex.test(tag.trim())) {
      errors.tag = 'Tag must start with @ followed by letters/numbers (e.g., @study).';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};