let sideMenu = $("#side");
let menu = $("#side-menu");
let menuWidth = menu.outerWidth();

sideMenu.css('left', `-${menuWidth}px`)

$(".menu-btn").click(function () {
    let leftValue = Number(sideMenu.css('left').replaceAll(/[a-z]/g, ''));

    if (leftValue < 0) {
        sideMenu.animate({ 'left': '0' }, 500);
    } else {
        sideMenu.animate({ 'left': `-${menuWidth}px` }, 500);
    }
})

$('.close-menu').click(function () {
    sideMenu.animate({ 'left': `-${menuWidth}px` }, 500);
})

/*----------------------------------------------------*/

$(".singer-conatiner h2").click(function () {
    let singerInfo = $(this).attr('data-info');
    $(`#${singerInfo}`).slideToggle();
    $('.singer-conatiner p').not(`#${singerInfo}`).slideUp();
})

/*----------------------------------------------------*/
let eventDate = new Date('July 1 2022 18:00:00');

//let dateDiff = Math.floor((eventDate - timeNow) / 1000);
// the differece between two objects is in "seconds*1000" so their may be fractions

function secondsToDHMS(seconds) {
    let diffArray = [];
    let requiredDays = Math.floor((seconds / (60 * 60 * 24)));
    let requiredHours = Math.floor((seconds / (60 * 60)) % 24);
    let requiredMinutes = Math.floor((seconds / 60) % 60);
    let requiredSeconds = Math.floor(seconds % 60);

    diffArray.push({ 'Days': requiredDays });
    diffArray.push({ 'Hours': requiredHours });
    diffArray.push({ 'Minutes': requiredMinutes });
    diffArray.push({ 'Seconds': requiredSeconds });

    return diffArray;
}

let eventPassed = false;

function setDay() {   
    let timeNow = new Date();
    // Difference between two dates in seconds
    let dateDiff = Math.floor((eventDate - timeNow) / 1000);

    let diffArray = secondsToDHMS(dateDiff);
    let remainDays = diffArray[0].Days;
    let remainHours = diffArray[1].Hours;
    let remainMinutes = diffArray[2].Minutes;
    let remainSeconds = diffArray[3].Seconds;

    $('.days span').html(remainDays.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })
    );
    $('.hours span').html(remainHours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    }));
    $('.minutes span').html(remainMinutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    }));
    $('.seconds span').html(remainSeconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    }));

    if (remainDays == 0 & remainHours == 0 & remainMinutes == 0 & remainSeconds == 0) {
        eventPassed = true;
    }
}

setDay();

let counter = setInterval(() => {
    setDay();

    if (eventPassed) {
        $('.durations').html('Sorry, Event has passed');
        clearInterval(counter);
    }
}, 1000);

/*----------------------------------------------------*/

let max = $('#characters span').html();

$('textarea').keydown(function(e) {
    let txtLength = $(this).val().length;
    if (txtLength >= max && e.key != "Backspace" && e.key != "Tab") {
        e.preventDefault();
        $('#warning').html("Sorry, you've reached the <strong>maximium characters!</strong>");
    }
})

$('textarea').on("input",function(e) {
    let txtLength = $(this).val().length;
    let valueHTML = max - txtLength;

    if (txtLength <= max) {
        $('#characters span').html(valueHTML);
        $('#warning').html("");
    }
})

/*----------------------------------------------------*/

