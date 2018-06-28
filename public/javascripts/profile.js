var logID = 'log',
  log = $('<div id="'+logID+'"></div>');
$('body').append(log);
  $('[type*="radio"]').change(function () {
    var me = $(this);
    log.html(me.attr('value'));
  });
var avg = 0;
// calculate the total ratings
function calculateTotalRatings() {
    var total = 0;
    var avg = 0;
    var usersRating = document.querySelectorAll("#usersRating");
    for (var i=0; i<usersRating.length; i++) {
        value = parseInt(document.querySelectorAll("#usersRating")[i].innerHTML);
        total += value; 
    }
    if (usersRating.length === 0) {
        avg = 0
    }
    else {
        avg = (total / usersRating.length).toFixed(1);
        document.getElementById("averageRating").innerHTML = avg;
    }
}
calculateTotalRatings();

// check whether if it's a verified user
function verified(){
    var count = 0; // to count the num of '5/5' ratings. [condition: must hv 10 '5/5' ratings and an average of 4.5/5]
    var usersRating = document.querySelectorAll("#usersRating");
    for (var i=0; i<usersRating.length; i++) {
        value = parseInt(document.querySelectorAll("#usersRating")[i].innerHTML);
        if (value === 5){
            console.log(value);
            count += 1;
        }
    }
    var averageRating = document.getElementById("averageRating").innerHTML;
    console.log("average rating:",averageRating);
    if (count >= 10 && averageRating >= 4.5 ) {
        console.log("YAYYYYY! YOU'RE VERIFIED!!! :D")
        var i = document.createElement("i");
        i.className = "fa fa-check";
        i.style.cssText = "font-size:24px;color:blue";
        var verified = document.getElementById("verified");
        verified.appendChild(i);
    } else if (document.getElementsByClassName("fa fa-check").length === 1) { // remove the rating if user drop their ratings
        var check = document.getElementsByClassName("fa fa-check");
        var verified = document.getElementById("verified");
        verified.remove();
    }
}

verified();

// display final avg stars

// Initial Ratings
avg = document.getElementById("averageRating").innerHTML
const ratings = {
    average: avg
  }

  // Total Stars
  const starsTotal = 5;

  // Run getRatings when DOM loads
  document.addEventListener('DOMContentLoaded', getRatings);

  // Form Elements
  const productSelect = document.getElementById('product-select');
  const ratingControl = document.getElementById('rating-control');

  // Init product
  let product;


  // Get ratings
  function getRatings() {
    for (let rating in ratings) {
      // Get percentage
      const starPercentage = (ratings[rating] / starsTotal) * 100;

      // Round to nearest 10
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      // Set width of stars-inner to percentage
      document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

      // Add number rating
    //   document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
       document.querySelector(`.${rating} #averageRating`).innerHTML = ratings[rating]
    }
  }