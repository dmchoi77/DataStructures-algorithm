function HashTableSeparateChaining(){

  let table = [];

  let ValuePair = function(key, value){
      this.key = key;
      this.value = value;

      this.toString = function() {
          return '[' + this.key + ' - ' + this.value + ']';
      }
  };

  let loseloseHashCode = function (key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
      }
      return hash % 37;
  };

  let hashCode = function(key){
      return loseloseHashCode(key);
  };

  this.put = function(key, value){
      let position = hashCode(key);
      console.log(position + ' - ' + key);

      if (table[position] == undefined) {
          table[position] = new LinkedList();
      }
      table[position].append(new ValuePair(key, value)); //append는 LinkedList에서 정의한 메서드
  };

  this.get = function(key) {
      let position = hashCode(key);

      if (table[position] !== undefined  && !table[position].isEmpty()){

          //키/값을 찾기 위해 연결 리스트를 순회한다
          let current = table[position].getHead();

          while(current.next){
              if (current.element.key === key){
                  return current.element.value;
              }
              current = current.next;
          }

          //처음이나 마지막 원소일 경우
          if (current.element.key === key){
              return current.element.value;
          }
      }
      return undefined;
  };

  this.remove = function(key){

      let position = hashCode(key);

      if (table[position] !== undefined){

          //키/값을 찾기 위해 연결 리스트를 순회한다
          let current = table[position].getHead();

          while(current.next){
              if (current.element.key === key){
                  table[position].remove(current.element);
                  if (table[position].isEmpty()){
                      table[position] = undefined;
                  }
                  return true;
              }
              current = current.next;
          }

          //처음이나 마지막 원소일 경우
          if (current.element.key === key){
              table[position].remove(current.element);
              if (table[position].isEmpty()){
                  table[position] = undefined;
              }
              return true;
          }
      }

      return false;
  };

  this.print = function() {
      for (let i = 0; i < table.length; ++i) {
          if (table[i] !== undefined) {
             console.log(table[i].toString());
          }
      }
  };
}