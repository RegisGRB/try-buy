
 export function getrandomInt (max)  {
    return Math.floor(Math.random() * Math.floor(max));
  }
  export function randomizeArray (array) {
    var i, j, tmp;
    for (i = array.length - 1; i > 0; i--) {
      j = getrandomInt(i + 1);
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }
  export function generateKey (prefix) {
   return [
      `${prefix}`,
      getrandomInt(100),
      getrandomInt(100),
      getrandomInt(100),
      getrandomInt(100),
      getrandomInt(100),
     
    ].join('')
   
  }

  export function normalizeValue (val, max, min){
    return (val - min) / (max - min);
  }
 export function lerp(start, end, t){
    return start * ( 1 - t ) + end * t;
}
  export function getElements (data)  {
      const elements = {}
      for (const [key, entry] of Object.entries(data)) {
        if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
          elements[key] = entry
        } else {
          elements[key] = document.querySelectorAll(entry)
          if (elements[key].length === 0) {
            elements[key] = null
          } else if (elements[key].length === 1) {
            elements[key] = document.querySelector(entry)
          }
        }
      }

      return elements
}

