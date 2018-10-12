export function parse(input) {
  console.log('Parsing...');
  let sentences = [];
  input
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .forEach((line, index) => {
      const regex = /([A-Z]+)\s*(.*)/;
      const matches = line.match(regex);
      if (matches) {
        const [_, author, text] = matches; //eslint-disable-line no-unused-vars
        sentences.push({ author, text });
      } else {
        console.error('Failed to parse the following line', line);
      }
    });
  return sentences;
}
