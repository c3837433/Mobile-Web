// alert("JavaScript works!");

/* Angela Smith
   SDI 1306
   Project 4
   Library of Functions
*/
var myLibrary = function() {


    // String Functions
    // String Function 1: Does a string follow a 123-456-7890 pattern like a phone number?
    var isPhoneNum = function(myString) { // Makeup: Proper indentation
        var hyphen = myString.indexOf("-");
        var otherHyphen = myString.lastIndexOf("-");
            if ((myString.length === 12) && (hyphen === 3 && otherHyphen === 7) ) { // Make up: using && operator
                var remHyphens = myString.split("-").join("");
                if (!isNaN(remHyphens)) { // Make up: using ! operator
                    return true;
                } else { // if this is not numbers
                    return false;
                }
            } else { // if my string does not have these characteristics
                return false;
            }   
    }; // end function 




    // String function 2: Does a string follow an aaa@bbb.ccc pattern like an email address?
    var verifyEmail = function (email) {
        var atPosition = email.indexOf("@");
        var dotPosition = email.indexOf(".");
            if (atPosition < 1 || atPosition > dotPosition || (dotPosition+3 >= email.length) || (dotPosition < atPosition+2)) {
            //if the @  is less than the second character, or the @ is after the dot, ot the dot is within the last 2 characters, or the dot and at are too close
                return false;
            } else {
                return true; 
            }                  
    }; // end verifyEmail

    
    
    
    //String Function 3: Is the string a URL (Does it start with http:// or https://)?
    var isUrlValid = function (url) {
        var end = url.indexOf("/")+2; // stopping before the last / sign
        var mySubstring = url.substring(0,end);
            if (mySubstring === "http://" || mySubstring === "https://") {
                return true; 
            } else {
                    return false;
            }   
    };

    
    
    
    // String function 4: Title-case a string (split into words, then uppercase the first letter of each word).
    var changeCase = function(string){
        var stringArray = new Array();
        stringArray = string.split(" "); // splits the string into an array of separate words
        
            for (i = 0; i < stringArray.length; i ++) {
                stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].substring(1,stringArray.length).toLowerCase(); // changes the first letter in each word to a capital letter
                 
            }
        var myNewString = stringArray.join(" "); 
        return myNewString;
    }; // end changeCase

    
    
    
    
    // String Function 5: Given a string that is a list of things separated by a given string, as well as another string separator, return a string with the first separator changed to the second    
    var changeSeparator = function (string,separator, newSeparator) {
        var i;
            for (i = 0; i < string.length; i++) {
                var changedString = string.split(separator).join(newSeparator);
            }
            
            return changedString
    };

    
    
    
    
    
    // Number Functions
    // Number function 1: Format a number to use a specific number of decimal places as for money.
    var changeNum = function (number,decimalPlaces) {
        var div = Math.pow(10, decimalPlaces);
        number = Math.round(number * div) / div;
        return number;
    };

    
    
    // Number Function 2:Fuzzy-match a number: is the number above or below a number within a certain percent?
    var checkFuzzyMatch = function (firstNum, secNum, thirdNum) {
        if (firstNum < secNum) { // if first num is less than second number
            var percent = ((thirdNum / 100) * secNum);
            if (percent <= firstNum) {
                return true;
            } else {
                return false;            
        };// end if first number is less than second number
        } else { // if first number is greater than second number
            var percent = (((thirdNum / 100) * secNum) + secNum);
            if (firstNum <= percent) { // if first number is within the percent
                return true;
            } else { // if first number is not within percent
                return false; 
            }; 
        } // end if firstNum is not greater than second number
    }; // end check fuzzy match

    
    
    
    // Number Function 3: Find the number of hours or days difference between two dates.    
    var getTimeDifference = function (firstDate, secDate, timeString){
    
        var firstInMs = firstDate.getTime();
        var secInMs = secDate.getTime();
        var differenceInMs = secInMs - firstInMs;
        var oneDay = 1000*60*60*24;
        
        if (timeString === "days") {
            return Math.round(differenceInMs/oneDay);  
        } 
    
    }; // end getTimeDifference
    
    
    
    // Number Finction 4: Given a string version of a number, return the value as an actual Number data type.    
    var stringToNumber = function(numString) {
        if (isNaN(numString)) {
            parseFloat(numString);
        }
        return numString;  
    };

    
    
    
    
    //Array Functions
    //Array Function 1: Find the smallest value in an array than is greater than a given number.
    var getNextHiNum = function (array,keyNum) {
        var i;
        for ( var i = array.length; i > -1; i--) {
            if (array[i] < keyNum) {
                array.splice(i,1);
            } // end if
        } // end For loop looking for numbers lower than key number
        var nextHiNum = Math.min.apply(Math, array);
        return nextHiNum;
    }; // end getNextHiNum

    
    
    
    //Array function number 2: Find the total value of just the numbers in an array, even if some of the items are not numbers.    
    var addJustNumbers = function(mixArray) { // Makeup: Using an array property
        var total = 0;
        for (var i=0; i<mixArray.length; i++) {
            if (typeof mixArray[i] == 'number') {
               total += mixArray[i]
            } // end if
        
        }// end for
        return total;
    };// end addJustNumbers

    
    // Array Function 3: Given an array of objects and the name of a key, return the array sorted by the value of that key in each of the objects
    var sortThrough = function(objArray, key) {
        return objArray.sort(function(a,b) { // Makeup: return a (object) array
            var l = a[key]; var n = b[key];
                if (l < n) return -1;
                if (l > n) return 1;
                return 0;
        
        }// end sort function    
    )};// end sort throgh function


    
    return {
        "isPhoneNum" : isPhoneNum,
        "verifyEmail" : verifyEmail,
        "isUrlValid" : isUrlValid,
        "changeCase" : changeCase,
        "changeSeparator" : changeSeparator,
        "changeNum" : changeNum,
        "checkFuzzyMatch" : checkFuzzyMatch,
        "stringToNumber" : stringToNumber,
        "getTimeDifference": getTimeDifference,
        "getNextHiNum" : getNextHiNum,
        "addJustNumbers" : addJustNumbers,
        "sortThrough" : sortThrough
    }
};
//calling a function from a library
var newLib = new myLibrary();
console.log("The phone number is valid:" + newLib.isPhoneNum("123-456-7890"));
console.log("The email is valid: "+ newLib.verifyEmail("angessmith@fullsail.edu"));
console.log("The URL is valid: " + newLib.isUrlValid("http://www.fullsail.com"));
console.log("The changed string is: " + newLib.changeCase("mY nAmE iS aNgElA aNd tHiS wOrKs"));
console.log("The new string is: "+ newLib.changeSeparator("a,b,c,d",",","/"));
console.log("The number changed is: " + newLib.changeNum(123.4567, 2));
console.log("The number is within the percentage: " + newLib.checkFuzzyMatch(5, 10, 50));
console.log("The string as a number is: " + newLib.stringToNumber("1234"));
console.log("The number of days between the dates is: " + newLib.getTimeDifference(new Date (2013,0,1),new Date (2013,5,1), "days"));
console.log("The next highest number is: " + newLib.getNextHiNum([1,3,5,26,75,100], 34));
console.log("The total is " + newLib.addJustNumbers([15, "hello", 1, "24", 50, "bye"]));
console.log("The sorted object is ", newLib.sortThrough([{a:2},{a:5},{a:3},{a:1},{a:4}], "a"));