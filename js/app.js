/*
 app.js
 application script for the JavaScript and Forms Demo
 */

"use strict";

/* onReady()
 * The addEventListener() call just below this function will tell the browser to
 * call this function when the DOM is loaded and ready for manipulation.
 * This is where we should get a reference to the form and add an event listener for the form's
 * submit event, passing our onSubmit function as the event handler function
 * */
function onReady() {
    //get a reference to the form
    var ageForm = document.getElementById('age-form');

    var nameField = ageForm.elements['name'];
    if (window.localStorage) {
        nameField.value = window.localStorage.getItem('defaultName');
    }// is local storage available? If it is, it'll return true
    //add an event listener for the 'submit' event passing onSubmit as the event handler function
    ageForm.addEventListener('submit', onSubmit);
    //add an event listener for the 'click' event on the exit button
    //for this one we will use an inline anonymous function so that you can get used to those
    var exitButton = document.getElementById('exit-button');
    exitButton.addEventListener('click', function() {
        if (window.confirm("Are you really sure you want to leave? I worked really hard on this... Don't you love me?")) {
            window.location = "http://www.google.com"; //redirects user to google
        }
    });

    nameField.addEventListener('change', function() {
       if(window.localStorage) {
           window.localStorage.setItem('defaultName', this.value); // this refers to element raised event, the actual input field
       }
    });
} //onReady()

//call onReady() when the DOMContentLoaded event is raised
document.addEventListener('DOMContentLoaded', onReady);

/* onSubmit()
 * Called when the user attempts to submit the form
 * This happens either when the user clicks a <button type="submit"> or when the user hits the Enter key
 * while in a form field.
 * We want to override the browser's default behavior so that it doesn't try to submit the form
 * and we want to calculate and display the user's age based on the value in the birthdate field
 *
 * parameters:
 *   eventObject - [object] information and capabilities related to the event, passed in by the browser
 * */
function onSubmit(eventObject) {
    //remember that 'this' refers to the object that raised the event (i.e., the form) ageForm

    //get the name and the date-of-birth value
    var name = this.elements['name'].value;    //reference to all fields within a form by using elements collector,
                                               // used like an array
    var dob = this.elements['dob'].value;

    console.log(dob);
    //calculate the age


    try {
         var age = calculateAge(dob);
         //display the name and age
         displayAge(name, age);
     }
     catch(exception) {
        displayError(exception); // if something bad happens, catch it, and display it
     }


    //if the event object has a method called preventDefault,
    //call it to stop the browser from submitting the form
    //this method is now part of the standard, but it's new, so older browsers
    //will not expose this method on the event object
    if (eventObject.preventDefault) { // in old browsers, preventDefault() isn't there. If it isn't, don't call.
        eventObject.preventDefault(); // functions will coerce to true if it's there
    }

    //some older browsers will look at the returnValue property of the event object
    //while other older browsers will pay attention to the value returned from
    //the event handler function itself
    //to catch both cases, we will set the returnValue property to false and return false from the function
    eventObject.returnValue = false;
    return false;
} //onSubmit()

/* calculateAge()
 * This function returns the age in years given a date of birth (dob)
 *
 * parameters:
 *   dob - [Date or String] the date of birth
 *
 * returns:
 *   age in years [number]
 */
function calculateAge(dob) {
    if (!dob) {
        throw new Error('Please enter your birthdate');
    }
    return moment().diff(dob, 'years'); // diff calcs difference between dob and. 'years' has special handling, check to make sure
    // that the date is before or after, etc.
    /*
    //calculate the person's age based on the date-of-birth
    dob = new Date(dob); //Date constructs from either a string or a date GRENWICH TIME
    var today = new Date(); //Creates current date and time at the moment the code is executed LOCAL TIME
    // WHEN working with dates, use UTC time

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }


    return yearsDiff;

    */
} //calculateAge()

/* displayAge()
 * Displays the user's name and age in the #age-message element
 *
 * parameters:
 *   name - [string] name of person
 *   age - [number or string] age of person
 * */
function displayAge(name, age) {
    if (!name) {
        throw new Error('Please enter your name!');
    }
    //use displayMessage() to display the name and age
    displayMessage(name + ', you are ' + age + ' years old!'); //javascript passes undefined if a paramater isn't passed
} //displayAge()

/* displayAge()
 * Displays an error in the #age-message element
 *
 * parameters:
 *   error - [object or string] error to display
 * */
function displayError(error) {
    //use displayMessage to display the error
    displayMessage(error, true);
} //displayError()

/* displayMessage()
 * Displays a message in the #age-message element, optionally setting a style class
 *
 * parameters:
 *   message - [string] message to display
 *   isError - [boolean, default=false] set to true if this is an error message
 * */
function displayMessage(message, isError) {
    var msgElem = document.getElementById('age-message');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success'; // ternary operator, assign to the className
    // if isError is false, set it to ^  if it's true, set it to ^
    msgElem.style.display = 'block';
} //displayMessage()