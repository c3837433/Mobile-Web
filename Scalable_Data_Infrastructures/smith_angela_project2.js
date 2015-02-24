//alert("JavaScript works!");


// Procedure

var firstNumber;
var secondNumber;
var brushTeeth;
var shower;
var outcome;

function myMorningProcedure(firstNumber, secondNumber) {
    outcome = firstNumber + secondNumber;
    
    if (outcome >=12) {
        console.log("The boys spent " + outcome + " minutes getting ready this morning, they did a good job.")
    }       else if (outcome <12) {
                 console.log("The boys spent " + outcome + " minutes getting ready this morning, they must have rushed.")
            }
}
myMorningProcedure(2,10);



// Boolean Function

var fruits;
var vegetables;

var smoothie = function (fruits, vegetables) {
    
    var outcome;
    
    outcome = fruits + vegetables;

    
    if (outcome >= 7) {
    console.log("We are having smoothies for breakfast.") 
        return true;
    } else {
        console.log("We don't have enough fruit and veggies, so we will have cereal for breakfast.") 
             return false;
    }

}

var myBreakfast = smoothie(4,5);


// Number Function

var pickUp = function(numOfLegos) {
    var color = "blue";
    var otherColor = "red";
    
    while (numOfLegos > 0 ) {
        console.log("There are " + numOfLegos + " Legos on the floor. Let's get them all picked up.");
        var half = numOfLegos / 2;        
        numOfLegos = numOfLegos - 4;
        console.log( half +" are " + otherColor + ", " + half + " are " + color + ".");
        console.log("Let's pick them up two by two.");

        if (numOfLegos > 0 ) {
            console.log(numOfLegos + " are left.");
        } else { 
            console.log("Great job! You picked them all up!");
        } //if 
        
    }//while
return numOfLegos;
}// buildup
var myPickUp = pickUp(40);



// String Function

var weather = function(temp, moisture) {
    var myCurrentWeather = temp + " and " + moisture;

var d = new Date()
        var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
        var weekday = (dayNames[d.getDay()])
        console.log("Today is " + weekday + ", and we want to play outside.");
/* Regardless as to what the logic statement says, my console keeps saying the second statement.
 * I am wondering if my logic is wrong, if my arguments are not allowed in the statement or if my
 * var myCurrentWeather  variable is causing the issue. Regardless I have not found a solution.
 */
    if (moisture === "raining" || moisture ==="snowing") {
        console.log("Since the weather is " + myCurrentWeather + ", it might be a good day to stay inside.")
    } else  {
        console.log("The weather is " + myCurrentWeather + ", looks like a nice day to play outside.")
    }
    
return myCurrentWeather;

};
var myWeather = weather("warm", "dry");



                 


//Array Funciton

var raceLaps = function(carNames, milesPerRace) {


var j = milesPerRace
var racers = carNames;

console.log("Now we are going to play Cars and race around the world! " + racers + " are racing today!");
carNames.push(" Mater");
    console.log("Wait! Mater just entered the race!")

    for (var i = 0; i <= j; i ++) {
        var carName = carNames[i];
        var nations = ["America", "Italy", "Spain", "Japan", "Radiator Springs"];
        var carNations = nations[i];
        
        if (i < 5) {
            console.log("Around the track they go, and" + carName + " from " + carNations + " takes the lead! ");
            console.log(j - i + " laps to go!");        
    
            } else {
                console.log("We finished the race!");
            }// end if
     
     }// end For
    return i;    
} // end raceLaps

var finalLaps = raceLaps([" Lightning", " Franchesco", " Miguel", " Shu"], 5);


console.log("We had a great day today.");
console.log("It was " + myBreakfast + " that we had smoothies for breakfast." );
console.log("After picking them up, we had " + myPickUp + " Legos left on the floor.")
console.log("We had " + myWeather + " weather.");
console.log("We also raced " + finalLaps + " laps with racers from around the world!");





