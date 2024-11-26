import { chunk, debounce } from 'es-toolkit';

const debouncedLog = debounce(message => {
  console.log(message);
}, 300);

debouncedLog('はろーはろー');

const array = [1, 2, 3, 4, 5, 6];
const chunkedArray = chunk(array, 2);

console.log(chunkedArray);
