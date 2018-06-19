// Movie Spoiler App

//***"This product uses the TMDb API but is not endorsed or certified by TMDb."***

//imported npms
var request = require ('request');
var cheerio = require ('cheerio');

const movieTitle = String(process.argv[2]);
const waitTime = Number(process.argv[3]);


//function that takes in movie title and how long the user wants to wait before getting a spoiler
function movieSpoil(movie, wait) {
    movie = movieTitle;
    wait = waitTime;
        if (movie === 'undefined') {
            console.log('* * * Hey! Listen! * * * Please enter a Movie Title and the amount of time (in seconds), you would like to wait for the spoiler \n An example would be: "Fight Club" 8  ');
            process.exit();
        } else if (movie === 'Jaws') {
            console.log('~ ~ ~ We\'re Gonna need a Bigger Spoiler ~ ~ ~');
        } else {
        console.log('**SPOILER WARNING!!!** about to spoil the plot for the movie ' + movie + ' in ' + wait + ' seconds');
        }
}; //end movieSpoil

//TimeOut
let delay = (wait) => {
    wait= waitTime;
    if (wait <= 0) {
        console.log('* * * Hey! Listen! * * * You need to enter a wait time higher then zero!');
        process.exit();
    } else {
       let dummy = ' Spoiler : They\'re about to Sean Bean your favourite character';
        setTimeout((wait) => {
            plotGrab();
            }, wait * 1000);
    }
};//end Delay

//Scrap Web
function webGet(movie) {
    movie = movieTitle;
    console.log("*** While you're waiting, here's the lastest on " + movie +"! ***")    
    //url for webscrapping
    var url = 'https://www.google.ca/search?q=' + movie;

    request(url, function(error, response, body){
        if (error) {
            console.log('Error, could not pull url');
        } 
            let title = [];
            var $ = cheerio.load(body); //pulls content from url
            search = $('h3.r');
                // pull the .r class from google
                search.each(function(){
                    title.push($(this).text());
                        for (let i = 1; i < title.length; i++) {
                            console.log(' ~ ' + title[i]);
                        }
            });
    })
}//End WebGet

function plotGrab(movie){
    movie= movieTitle;
    let key = 'you\'re api key here';
    var options = 
    { method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
        qs:{
            query: movie,
            api_key: key
        },
    body: '{}' };

request(options, function (error, response, body) {
 if (!error) {
    let obj = JSON.parse(body);
    let obj2 = obj.results;
    let filter = obj2[0].overview;

    //if(json.parse(body).total_results > 0 ){
    console.log("********************\n" + "The plot for the movies is: \n " + filter + "\n********************")
    } else {
        console.log('*Waves hand* This is not the Movie you are looking for');
    }
    });
};// end PlotGrab

function spoil(movieTitle, waitTime) {
        movieSpoil();
        delay();
        webGet(); 
}
spoil();