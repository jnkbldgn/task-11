import  { FirstSearch, SecondSearch } from './search.js';
import data from './streets.js';

const firstSearch = new FirstSearch(data);
const firstResult = document.querySelector('.firstResult');

const secondSearch = new SecondSearch(data);
const secondResult = document.querySelector('.secondResult');

document.querySelector('#first').addEventListener('input', (event) => {
  if(event.target.value){
    const resultSearch = firstSearch.suggest(event.target.value);
    firstResult.innerHTML = resultSearch.join(';<br>');
  } else {
    firstResult.innerHTML = '';
  }
})

document.querySelector('#second').addEventListener('input', (event) => {
  if(event.target.value){
    const resultSearch = secondSearch.suggest(event.target.value);
    secondResult.innerHTML = resultSearch.join(';<br>');
  } else {
    secondResult.innerHTML = '';
  }
})