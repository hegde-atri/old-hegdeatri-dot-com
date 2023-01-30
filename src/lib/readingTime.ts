const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: String) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords: number = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  }