function clock() {
    var hours = document.getElementById("display-hours");
    var minutes = document.getElementById("display-minutes");
    var seconds = document.getElementById("display-seconds");
    var period = document.getElementById("display-period");

    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();

    // Determine AM or PM
    if (h >= 12) {
        period.innerHTML = "PM";
    } else {
        period.innerHTML = "AM";
    }

    // Convert to 12-hour format
    if (h > 12) {
        h = h - 12;
    }

    // Add leading zero if needed
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (h < 10) {
        h = "0" + h;
    }

    // Update the HTML
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
}

// Call the clock function every second
setInterval(clock, 1000);
