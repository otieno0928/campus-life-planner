export function compileSafeRegex(pattern, isCaseInsensitive = true) {
  if (!pattern) return null;
  try {
    const flags = isCaseInsensitive ? 'gi' : 'g';
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}

export function highlightText(text, regex) {
  if (!text || !regex) return text;
  // Reset lastIndex for global regex instance safety
  regex.lastIndex = 0;
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}