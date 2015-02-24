
//alert("JavaScript works!");

//Project Javascript START

// Global Variables. FlowChart color = GREY
var identity = "family";
var day = "today";

var myFamily = {
    name: "Smith",
    love: true,
    numBoys: 4,
    numGirls: 4,
    city: "Chaska",
    state: "MN",
    parents: ["Steve", "Ange"],
    arrBoys: [" Ilias", " Jeddy", " Joshua"],
    arrGirls: [" Kena", " Lila", " Eliina"],
    
    saying: function() {
        console.log("Change the world, start at home.");
    },
    activities: {   "name": "hiking",
                    "time": 60,
                    "mph":  2,
                    "distance": function(){
                        var totDistance = (this.time / 60 ) * this.mph; // method accessor
                        return totDistance;
                    }, // end distance method
                    "setTime" : function(newTime){
                        myFamily.activities.time = newTime;
                    } // end setTime

    } // end activity object
   
};



// Object and Function Calls

// Method Function getAllKids: Array arguments, array return, FlowChart = PINK
var getAllKids = function(arrGirls, arrBoys) { 

    var arrayKids = [myFamily.arrGirls + myFamily.arrBoys];
    
    return arrayKids;
    
}; // end getAllKids


// Method Function haveLove: Boolean argument, Boolean return, FlowChart = YELLOW
var haveLove = function (love) { 
 
    var f = 0;
    var g = 0;
    var k = 0;

    if (myFamily.love === true) {
    console.log("We love being a " + identity + ".");    
        while (f < 2) {   // while loop
            console.log( myFamily.parents[f] + " is an awesome parent.");
            f++;
            while (g < 3) { // nested while loop
                console.log( myFamily.arrGirls[g] + " is an cherished daughter.");
                g++;
                while (k < 3) {  // nested while loop
                    console.log(myFamily.arrBoys[k] + " is a mighty son.");
                    k++;
                } // end while boys
            } // end while girls
        } // end while parent
        return true;
    } else {//end if
        console.log("Our " + identity + " is not feeling very loving " + day + ".");
        return false;
        } // Boolean return

};// end haveLove


//  Method Function: string arguments, String return, FlowChart = ORANGE
var getHomeTown = function (city, state) {
    var homeTown = myFamily.city + ", " + myFamily.state;

return homeTown; // return string

}; // end getHomeTown





// Function famRatio: number arguments, conditional, number return, Flowchart colot =  GREEN
var famRatio = function (numBoys, numGirls) {

    var numGender = (numBoys + numGirls) / 2;
    if (numBoys === numGirls) {
        console.log("We have " + numBoys + " boys, and " + numGirls + " girls in our " + identity + ". It is true that we have the same number of each gender in our family.");
    } else if (numBoys < numGirls || numBoys > numGirls) {
        console.log("It is not true that we have the same number of boys and girls in our " + identity + ".");
    } // end if
    return numGender;
}; // end myFamRatio



// JSON Object function gameData: object argument, nested conditional, object return, FlowChart = BLUE
var gameData = function(gameDataObj){
    console.log("We like to play all sorts of games.");
    console.log("Some games need a lot of players, others we need to take turns.");
    for (var i = 0; i < jsonPlay.games.length; i++) {
        var game = jsonPlay.games[i];       
        if (game.players > 7) { // when players is more than 7
           
            if (game.players === 8) { // when players = 8
                console.log(game.name + " is a good game for us, since it takes " + game.players + " players we can all play together.");
            } else {
                console.log("When we want to play " + game.name + " we need to find more people, because we don't have " + game.players + " people in our family.");    
            }
                
        } else {
                    
        }
            if (game.players >1 && game.players <=7) { // when players does not equal 1
                console.log("Since " + game.name + " can have " + game.players + " players, some of us can play, but not all of us.");
            } else if   ( game.players === 1) {
                console.log("Since " + game.name + " only takes " + game.players +" player, it is a good game when one of us wants to play by themselves.");     
            }
    
    }
return jsonPlay.games[3];

};  // END JSON Object Method function with nested conditional  // BLUE



// Main Code
var listMyKids = getAllKids(myFamily.arrBoys, myFamily.arrGirls);
    console.log("We have lots of children in our " + identity + ". Their names are: " + listMyKids + ".");

var ourLove = haveLove(myFamily.love);


// Method Accessor: FlowChart: PURPLE
console.log("The " + myFamily.name + " " + identity +" likes the saying:");

myFamily["saying"]();  
    console.log("But we wanted to make it more our own, so we changed it a bit.");

// Method Procedure: FlowChart BURNT ORANGE
myFamily.saying = function(){  
    console.log("Changing the world, starts " + day + " with our " + identity + "."); 
};
myFamily["saying"]();
console.log("This saying fits our " + identity + " better.");


var myHomeTown = getHomeTown(myFamily.city,myFamily.state);
    console.log("We live in " + myHomeTown + ".");

var ourFamRatio = famRatio(4,4);

var ourFavGame = gameData(jsonPlay.games[3]);

//  Method Function FlowChart = BURNT PINK
var theDistance =  myFamily.activities.distance();

    console.log("As a family, we like to do activities together.");
    console.log("We went " + myFamily.activities.name + " for " + myFamily.activities.time + " minutes " + day + ", so we traveled about "+ theDistance + " miles.");
    

// Method Mutator: Flowchart WHITE GREY
myFamily.activities.setTime(45); 

var newDistance = myFamily.activities.distance();

    console.log("Tomorrow we plan on " + myFamily.activities.name + " for " + myFamily.activities.time + " minutes, so we will cover about " +  newDistance + " miles.");



// Outputs FlowChart = GREY
console.log("We love having all our kids:" + listMyKids + "."); // array
console.log("It is " + ourLove + " that we are loving each other today."); // boolean
console.log("We enjoy living in " + myHomeTown + "."); // string
console.log("We have an even " + identity + " with "+ ourFamRatio + " people of each gender."); // number
console.log("This is our favorite game to play as a " + identity + ".", ourFavGame ); // object
console.log("We enjoyes " + myFamily.activities.name + " for " + theDistance + " miles " + day + ".");


// END
