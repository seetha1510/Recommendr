var gameCards = 0;
var displaygame = [];

function sortGames(searchBy){
    // console.log(searchBy);
		if (searchBy == 'a-z'){
			  console.log('a-z');
        let f = displaygame.sort(alph);
        for (let i = 0; i < gameCards; i++){
            const gh2 = document.getElementById('gh2'+ i.toString());
            const gdes = document.getElementById('gdes' + i.toString());
            gh2.textContent = f[i].name;
            gdes.textContent = f[i].summary;
        }
    }
    if (searchBy == 'z-a'){
				console.log('z-a');
        let f = displaygame.sort(alph);
				f.reverse();
        for (let i = 0; i < gameCards; i++){
            const gh2 = document.getElementById('gh2'+ i.toString());
            const gdes = document.getElementById('gdes' + i.toString());
            gh2.textContent = f[i].name;
            gdes.textContent = f[i].summary;
        }
    }
    if (searchBy == 'date'){
        console.log('date')
    }
		if (searchBy == 'h-l'){
        console.log('h-l')
        console.log(displaygame);
        for(let i = 0; i < displaygame.length; i++){
            if(!displaygame[i].hasOwnProperty('rating') || !displaygame[i].hasOwnProperty('total_rating')){
                displaygame[i].rating = -1;
            }
        }
        console.log(displaygame);
        let f = displaygame.sort(function (a,b) {
            let comparison = 0;
            if (b.rating > a.rating) {
                comparison = 1;
            } else if (b.rating < a.rating) {
                comparison = -1;
            }
            console.log(a.rating, b.rating);
            return comparison;
        });

        for (let i = 0; i < gameCards; i++){
            const gh2 = document.getElementById('gh2'+ i.toString());
            const gdes = document.getElementById('gdes' + i.toString());

            gh2.textContent = f[i].name;
            gdes.textContent = f[i].summary;
        }
    }
    if(searchBy == 'l-h'){
        console.log('h-l')
        console.log(displaygame);
        for(let i = 0; i < displaygame.length; i++){
            if(!displaygame[i].hasOwnProperty('rating') || !displaygame[i].hasOwnProperty('total_rating')){
                displaygame[i].rating = -1;
            }
        }
        console.log(displaygame);
        let f = displaygame.sort(function (a,b) {
            let comparison = 0;
            if (b.rating > a.rating) {
                comparison = 1;
            } else if (b.rating < a.rating) {
                comparison = -1;
            }
            console.log(a.rating, b.rating);
            return comparison;
        });
        f.reverse();
        for (let i = 0; i < gameCards; i++){
            const gh2 = document.getElementById('gh2'+ i.toString());
            const gdes = document.getElementById('gdes' + i.toString());

            gh2.textContent = f[i].name;
            gdes.textContent = f[i].summary;
        }
    }
}

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();

  // Set the text.
	msg.text = text;

  // Set the attributes.
	msg.volume = parseFloat(1);
	msg.rate = parseFloat(1);
	msg.pitch = parseFloat(1);

  // Set up Voice
	msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Alex'; })[0];

  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}

var recommendation = {};
comics_sort = [];
function removeElement(elementId) {
// Removes an element from the document.
  var element = document. getElementById(elementId);
  element. parentNode. removeChild(element);
}

async function game_query(movie){
    //const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const request = new XMLHttpRequest();
    const twitch_ID = 'm5uh3wi1a7k773wdqjcsfdij61fmgs';
    const access_token = 'Bearer p4w9shm0guevd2sojnf2odmsf5t2k9';
    let igdb_url = proxyurl+ 'https://api.igdb.com/v4/games';
    console.log(movie);
    let movie_name = movie.Title;
    let data = '';
    document.getElementById('status_').innerHTML = igdb_url;

    const gamePromise = new Promise((resolve, reject) => {
    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', igdb_url, true);
    request.setRequestHeader('Client-ID',twitch_ID);
    request.setRequestHeader('Authorization',access_token);
    var games =[];
    request.onload = function () {
        // Begin accessing JSON data here
        document.getElementById('status_').innerHTML = "Processing requested json data";

        data = JSON.parse(this.responseText);
          if (request.status >= 200 && request.status < 400) {
              console.log(data);

              document.getElementById('status_').innerHTML = "Printing results for Games";
              const result = document.getElementById("games");
              const title = document.createElement('div');
              title.setAttribute('class', 'title_tag');
              title.setAttribute('id', 'gTitle');
              title.textContent = "Recommended Game";
              result.appendChild(title);

							//sort dropdown
              const sort = document.createElement('select');
              sort.setAttribute('class', 'sort');
              sort.onchange = function() {
                  sortGames(sort.value);
              };
              var option = document.createElement("option");
              option.text = "Sort Games";
              option.value = '0';
              option.setAttribute('disabled','disabled');
              option.setAttribute('selected','selected');
              sort.add(option);
							sort.add(new Option('A-Z', 'a-z'));
              sort.add(new Option('Z-A', 'z-a'));
              // sort.add(new Option('Rating', 'rate'));
							sort.add(new Option('Highest-Lowest Rated', 'h-l'));
              sort.add(new Option('Lowest-Highest Rated', 'l-h'));
              title.appendChild(sort);


              if(data.length>0){
                  //sort function inline
                let f = data.sort(function(a,b){
                    return a.name.toUpperCase() - b.name.toUpperCase();
                });

                console.log(f);
                let limit = 3;
                if (data.length < limit){
                    limit = data.length;
                }
                for(let i = 0; i < limit; i++){
                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');
                    card.setAttribute('id', 'gcard'+i.toString());
                    const h2 = document.createElement('h2');
										h2.setAttribute('id','gh2'+ i.toString());

                    const des = document.createElement('div');
                    des.setAttribute('class', 'des');
                    des.setAttribute('id','gdes'+i.toString());
                    //
                    const textButton = document.createElement('button');
                    textButton.innerHTML = 'Read Content';

                    textButton.onclick = function(){
                        if (h2.textContent.length + des.textContent.length > 0) {
                            speak(h2.textContent + '. ' + des.textContent);
                        }
                    };
                    //
                    result.appendChild(card);
                    card.appendChild(h2);
                    card.appendChild(des);
                    displaygame.push(f[i]);
                    gameCards ++;
                    card.append(textButton);
                    h2.textContent = f[i].name;
                    des.textContent = f[i].summary;
                    var game = {};
                    game.gametitle = f[i].name;
                    game.gamedesc = f[i].summary;
                    games.push(game);
                }
                recommendation.games = games;
              }

              else{
                document.getElementById('status_').innerHTML ="Current Status: No results" ;
              }
              document.getElementById('status_').innerHTML = "Current Status: All done! Your recommendations are below";
              resolve(data);
          }
          else{
              document.getElementById('status_').innerHTML = this.responseText;
              reject(data);
          }
        }

      // Send request
      //console.log("Sending your request for Games");

      const body = "fields *; search:\""+ movie_name + "\"; limit: 10;";
      request.send(body);
    });
    console.log(gamePromise);
    return gamePromise;
}


//Movie Search by user input
async function movie_query(search_term, recommendation){
    var movie_name = search_term;

    const OMDBID = '/?apikey=f08b8211';
    const OMDB_URL = 'http://www.omdbapi.com';
    const OMDB_request_url = OMDB_URL +  OMDBID + '&t=' + search_term;

    var request = new XMLHttpRequest();

    const moviePromise = new Promise((resolve, reject) => {
      //console.log(OMDB_request_url);
      // Open a new connection, using the GET request on the URL endpoint
      document.getElementById('status_').innerHTML = "Current Status: Formulating your request for Movies";

      request.open('GET', OMDB_request_url, true);

      request.onload = function() {
          // Begin accessing JSON data here
          document.getElementById('status_').innerHTML ="Current Status: Processing results for Movies";
          var data = JSON.parse(this.responseText);
          var textstring = "Release date: " + data.Released + "\n" + "Plot: " + data.Plot;

          if(request.status >= 200 && request.status < 400){
            const result = document.getElementById("movies");
            const title = document.createElement('div');
            title.setAttribute('class', 'title_tag');
            title.textContent = "Movie Selected";
            result.appendChild(title);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h2 = document.createElement('h2');
            h2.textContent = data.Title;
            movie_name = data.Title;
            const des = document.createElement('div');
            des.setAttribute('class', 'des');
            des.textContent = textstring;

            const textButton = document.createElement('button');
            textButton.innerHTML = 'Read Content';

            textButton.onclick = function(){
                if (h2.textContent.length + des.textContent.length > 0) {
                  speak(h2.textContent + '. ' + des.textContent);
                }
            };

            const desPoster = document.createElement('div');
            desPoster.setAttribute('class', 'des');
            const moviePoster = document.createElement('img');
            moviePoster.src = data.Poster;
            desPoster.appendChild(moviePoster);

            recommendation.movietitle = data.Title;
            recommendation.moviedesc = textstring;

            result.appendChild(card);
            card.appendChild(h2);
            card.appendChild(des);
            card.appendChild(desPoster);
            card.appendChild(textButton);

            document.getElementById('status_').innerHTML ="Current Status: Result for Movie is below";
            console.log(data);
            resolve(data);
          }
          else {
            document.getElementById('status_').innerHTML ="Current Status: We ran into an error. Try again.";
            reject(data);
          }
        }

        // Send request
        document.getElementById('status_').innerHTML ="Current Status: Sending requests for Movie";
        request.send();
      });
    console.log(movie_name);
    return await moviePromise;
}

async function comic_query(movie, recommendation){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const ComicVineID = '/?api_key=0419a722827efd68e37a229d58ee79d8c914a7a2';
  const ComicVine_URL = 'https://comicvine.gamespot.com/api';
  movie_name = movie.Title;


  const ComicVine_request_url = proxyurl + ComicVine_URL + '/issues' + ComicVineID + '&format=json' + '&filter=name:' +movie_name+ '&field_list=name,cover_date,site_detail_url,image';// + '&sort=cover_date:desc';
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  document.getElementById('status_').innerHTML ="Current Status: Formulating your request for Comics";
  const comicPromise = new Promise((resolve, reject) => {
		request.open('GET', ComicVine_request_url, true);
	  request.onload = function () {
	    // Begin accessing JSON data here
	    document.getElementById('status_').innerHTML ="Current Status: Processing results for Comics";
	    var data = JSON.parse(this.responseText);

	    if (request.status >= 200 && request.status < 400) {
	      document.getElementById('status_').innerHTML ="Current Status: Printing results for Comics";
	      const result = document.getElementById("comics");
	      const title = document.createElement('div');
	      title.setAttribute('class', 'title_tag');
	      title.textContent = "Recommended Comic";
	      result.appendChild(title);
        const sort2 = document.createElement('select');
        sort2.setAttribute('class', 'sort');
        sort2.onchange = function() {
            sortComics(sort2.value);
        };
        var option = document.createElement("option");
        option.text = "Sort Comics";
        option.value = '0';
        option.setAttribute('disabled','disabled');
        option.setAttribute('selected','selected');
        sort2.add(option);
        sort2.add(new Option('A-Z', 'alph'));
        sort2.add(new Option('Z-A', 'rev_alph'));
        sort2.add(new Option('Latest first', 'latest'));
        sort2.add(new Option('Oldest first', 'oldest'));
        title.appendChild(sort2);

        //label.htmlFor = "pets";

        //result.appendChild(label).appendChild(select);

        //comicCover.src = data.Poster; need to extract link
        //desCover.appendChild(comicCover);
        comics = [];
        cnt = 0;
	      if(data.results.length>0){
	        for (var i = 0; i < (3 || data.results.length) ; i++) {
            cnt ++;
            const card = document.createElement('div');
    	      card.setAttribute('class', 'card');
            card.setAttribute('id','ccard'+ i.toString());
    	      const h2 = document.createElement('h2');
            h2.setAttribute('id','ch2'+ i.toString());
    	      const des = document.createElement('div');
    	      des.setAttribute('class', 'des');
            des.setAttribute('id','cdes'+ i.toString());

    	      const textButton = document.createElement('button');
    	      textButton.innerHTML = 'Read Content';

    	      textButton.onclick = function(){
    	        if (h2.textContent.length + des.textContent.length > 0) {
    	            speak(h2.textContent + '. ' + des.textContent);
    	          }
    	      };

            const desCover = document.createElement('div');
            desCover.setAttribute('class', 'des');
            desCover.setAttribute('id','cimg'+ i.toString());
            const comicCover = document.createElement('img');
	          var comic = data.results[i];
            comics_sort.push(comic);
            var image = comic.image;
            comicCover.src = image.original_url;
            desCover.appendChild(comicCover);
	          var textstring = "Release date: " + comic.cover_date + " \r\n Read more here: ";
	          h2.textContent = comic.name;
	          des.textContent = textstring;

	          var a = document.createElement('a');
	          var link = document.createTextNode(comic.site_detail_url);
	          a.target = '_blank'
	          a.appendChild(link);
	          a.href = comic.site_detail_url;
	          des.appendChild(a);
            textstring += comic.site_detail_url;
            c={};
            c.comictitle = comic.name;
	          c.comicdesc = textstring;
            comics.push(c);
            result.appendChild(card);
    	      card.appendChild(h2);
    	      card.appendChild(des);
            card.appendChild(desCover);
    	      card.appendChild(textButton);
	        }
          if(cnt <3){
            //search by genre
          }
          recommendation.comics = comics;
					resolve(data);
	        document.getElementById('status_').innerHTML ="Current Status: All done! Your recommendations are below";
	      }
	      else{
	        document.getElementById('status_').innerHTML ="Current Status: No results for comics" ;
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const h2 = document.createElement('h2');
          const des = document.createElement('div');
          des.setAttribute('class', 'des');
          const textButton = document.createElement('button');
          textButton.innerHTML = 'Read Content';

          textButton.onclick = function(){
            if (h2.textContent.length + des.textContent.length > 0) {
                speak(h2.textContent + '. ' + des.textContent);
              }
          };
          h2.textContent = "NO RESULTS";
          des.textContent = "We are sorry! We could not find any good comic matches for this movie.";
          result.appendChild(card);
          card.appendChild(h2);
          card.appendChild(des);
          card.appendChild(textButton);
	      }
	    }
	    else{
	      document.getElementById('status_').innerHTML ="Current Status: We run into an error. Try again.";
				reject(data);
	    }
	  }

	  // Send request
	  document.getElementById('status_').innerHTML ="Current Status:Sending your request for Comics";
	  request.send();

  });
  return await comicPromise;
}


async function results(){
  if (sessionStorage.getItem("count") === null) {
    sessionStorage.setItem("count", "0");
  }
  else{
    var a = Number(sessionStorage.getItem("count"));
    a +=1;
    sessionStorage.setItem("count", a.toString());
  }
  removeElement("results");
  const r1 = document.getElementById('r1');
  const results = document.createElement('div');
  results.setAttribute('id', 'results');
  r1.appendChild(results);
  const movies = document.createElement('div');
  movies.setAttribute('id', 'movies');
  const comics = document.createElement('div');
  comics.setAttribute('id', 'comics');
  const games = document.createElement('div');
  games.setAttribute('id', 'games');
  results.appendChild(movies);
  results.appendChild(games);
  results.appendChild(comics);
  console.log("eh");
  let mov = await movie_query(sessionStorage.getItem("moviename"), recommendation);
  // console.log(mov.Title);
  let gam = await game_query(mov, recommendation);
  // console.log(gam);
  let com = await comic_query(mov, recommendation);
  console.log(com);
  count = sessionStorage.getItem("count");
  // console.log(count);
  sessionStorage.setItem(count, JSON.stringify(recommendation));
}

results();

function alph(a, b) {
  // Use toUpperCase() to ignore character casing
  console.log(a);
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
function latest(a, b) {
  console.log(a);
  const dateA = a.cover_date;
  const dateB = b.cover_date;

  let comparison = 0;
  if (dateA < dateB) {
    comparison = 1;
  } else if (dateA > dateB) {
    comparison = -1;
  }
  return comparison;
}

function sortComics(input){
  console.log(comics_sort);
  if(input == "alph"){
    comics_sort.sort(alph);
    console.log(comics_sort);

    for(let i=0; i<comics_sort.length;i++){
          //h2.setAttribute('id','gh2'+ i.toString());
          const card = document.getElementById('ccard'+ i.toString());
          const des = document.getElementById('cdes'+ i.toString());
          const h2 = document.getElementById('ch2'+ i.toString());
          const desCover = document.getElementById('cimg'+ i.toString());
          desCover.innerHTML = "";
          const comicCover = document.createElement('img');
          var comic = comics_sort[i];
          var image = comic.image;
          comicCover.src = image.original_url;
          desCover.appendChild(comicCover);
          var textstring = "Release date: " + comic.cover_date + " \r\n Read more here: ";
          h2.textContent = comic.name;
          des.textContent = textstring;

          var a = document.createElement('a');
          var link = document.createTextNode(comic.site_detail_url);
          a.target = '_blank'
          a.appendChild(link);
          a.href = comic.site_detail_url;
          des.appendChild(a);
    }
  }
  else if(input == "rev_alph"){
    comics_sort.sort(alph);
    comics_sort.reverse();
    console.log(comics_sort);

    for(let i=0; i<comics_sort.length;i++){
          //h2.setAttribute('id','gh2'+ i.toString());
          const card = document.getElementById('ccard'+ i.toString());
          const des = document.getElementById('cdes'+ i.toString());
          const h2 = document.getElementById('ch2'+ i.toString());
          const desCover = document.getElementById('cimg'+ i.toString());
          desCover.innerHTML = "";
          const comicCover = document.createElement('img');
          var comic = comics_sort[i];
          var image = comic.image;
          comicCover.src = image.original_url;
          desCover.appendChild(comicCover);
          var textstring = "Release date: " + comic.cover_date + " \r\n Read more here: ";
          h2.textContent = comic.name;
          des.textContent = textstring;

          var a = document.createElement('a');
          var link = document.createTextNode(comic.site_detail_url);
          a.target = '_blank'
          a.appendChild(link);
          a.href = comic.site_detail_url;
          des.appendChild(a);
      }
  }
  else if(input == "latest"){
    comics_sort.sort(latest);
    console.log(comics_sort);

    for(let i=0; i<comics_sort.length;i++){
          //h2.setAttribute('id','gh2'+ i.toString());
          const card = document.getElementById('ccard'+ i.toString());
          const des = document.getElementById('cdes'+ i.toString());
          const h2 = document.getElementById('ch2'+ i.toString());
          const desCover = document.getElementById('cimg'+ i.toString());
          desCover.innerHTML = "";
          const comicCover = document.createElement('img');
          var comic = comics_sort[i];
          var image = comic.image;
          comicCover.src = image.original_url;
          desCover.appendChild(comicCover);
          var textstring = "Release date: " + comic.cover_date + " \r\n Read more here: ";
          h2.textContent = comic.name;
          des.textContent = textstring;

          var a = document.createElement('a');
          var link = document.createTextNode(comic.site_detail_url);
          a.target = '_blank'
          a.appendChild(link);
          a.href = comic.site_detail_url;
          des.appendChild(a);
      }
  }
  else if(input == "oldest"){
    comics_sort.sort(latest);
    comics_sort.reverse();
    console.log(comics_sort);

    for(let i=0; i<comics_sort.length;i++){
          //h2.setAttribute('id','gh2'+ i.toString());
          const card = document.getElementById('ccard'+ i.toString());
          const des = document.getElementById('cdes'+ i.toString());
          const h2 = document.getElementById('ch2'+ i.toString());
          const desCover = document.getElementById('cimg'+ i.toString());
          desCover.innerHTML = "";
          const comicCover = document.createElement('img');
          var comic = comics_sort[i];
          var image = comic.image;
          comicCover.src = image.original_url;
          desCover.appendChild(comicCover);
          var textstring = "Release date: " + comic.cover_date + " \r\n Read more here: ";
          h2.textContent = comic.name;
          des.textContent = textstring;

          var a = document.createElement('a');
          var link = document.createTextNode(comic.site_detail_url);
          a.target = '_blank'
          a.appendChild(link);
          a.href = comic.site_detail_url;
          des.appendChild(a);
      }
  }
}
