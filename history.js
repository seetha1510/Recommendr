function removeElement(elementId) {
    // Removes an element from the document.
    var element = document. getElementById(elementId);
    element. parentNode. removeChild(element);
 }
removeElement("results");
const r1 = document.getElementById('r1');
const results = document.createElement('div');
results.setAttribute('id', 'results');
r1.appendChild(results);
// let keys = Object.keys(sessionStorage);

// for(let key of keys) {
for(let key in sessionStorage) {
    if (!sessionStorage.hasOwnProperty(key)) {
        continue; // skip keys like "setItem", "getItem" etc
    }
    if(key == "count" || key == "moviename"){
      continue;
    }
    let rec = JSON.parse(sessionStorage.getItem(key));
    console.log(rec);
    //rec.forEach(function(obj) { console.log(obj.movietitle);

    const result = document.getElementById("results");
    const title = document.createElement('div');
    title.setAttribute('class', 'title_tag');
    title.textContent = "Movie Selected";
    result.appendChild(title);
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h2 = document.createElement('h2');
    h2.textContent = rec.movietitle;
    const des = document.createElement('div');
    des.setAttribute('class', 'des');
    des.textContent = rec.moviedesc;

    result.appendChild(card);
    card.appendChild(h2);
    card.appendChild(des);

    var g = rec.games;
    console.log(g);
    const title2 = document.createElement('div');
    title2.setAttribute('class', 'title_tag');
    title2.textContent = "Recommended Game";
    result.appendChild(title2);
    for (let i=0; i<g.length; i++){
      const card2 = document.createElement('div');
      card2.setAttribute('class', 'card');
      const h2_2 = document.createElement('h2');
      const des_2 = document.createElement('div');
      des_2.setAttribute('class', 'des');

      result.appendChild(card2);
      card2.appendChild(h2_2);
      card2.appendChild(des_2);
      h2_2.textContent = g[i].gametitle;
      des_2.textContent = g[i].gamedesc;
    }

    var c = rec.comics;
    console.log(c);

    const title3 = document.createElement('div');
    title3.setAttribute('class', 'title_tag');
    title3.textContent = "Recommended Comic";
    result.appendChild(title3);
    for (let i=0; i<c.length; i++){
      const card3 = document.createElement('div');
      card3.setAttribute('class', 'card');
      const h2_3 = document.createElement('h2');
      const des_3 = document.createElement('div');
      des_3.setAttribute('class', 'des');

      result.appendChild(card3);
      card3.appendChild(h2_3);
      card3.appendChild(des_3);
      h2_3.textContent = c[i].comictitle;
      des_3.textContent = c[i].comicdesc;
    }

    var x = document.createElement("HR");
    result.appendChild(x);
}
