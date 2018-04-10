class Search {
  constructor(data, limit){
    this.data = data;
    this.limit = limit || 10;
  }
}

class FirstSearch extends Search {
  constructor(data, limit){
    super(data, limit);
  }
  suggest(searchStr){
    const result = [];

    this.data && this.data.length && this.data.some( item => {
      item.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) >= 0 && result.push(item);
      return result.length === this.limit;
    });

    return result;
  }
}

class SecondSearch extends Search {
  constructor(data, limit){
    super(data, limit);
    this.dataMap = this.init();
  }
  init(){
    const dataMap = new Map();
    this.data && this.data.length && this.data.forEach( item => {
      const setKeys = this.getKeys(item.toLocaleLowerCase());
      setKeys.forEach( setItem => {
        let mapItem = dataMap.get(setItem);
        if(mapItem && mapItem.length){
          mapItem.push(item);
          dataMap.set(setItem ,mapItem);
        } else {
          dataMap.set(setItem, [item]);
        }
      });
    });
    return dataMap;
  }

  suggest(searchStr){
    const result = this.dataMap.get(searchStr.toLocaleLowerCase());
    return result ? result.slice(0, this.limit) : [];
  }

  getKeys(string){
    const stringSet = new Set();
    for ( let start = 0; start <= (string.length - 1); start++) {
      for (let i = start; i < string.length; i++) {
          for (let length = 1; i + length <= string.length; length++) {
            stringSet.add(string.substr(i, length));
          }
      }
    }
    return stringSet;
  }
}

export {
  FirstSearch,
  SecondSearch
}