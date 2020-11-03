// Handle user interaction.

var zoomLevel = 1.0;


// Zoom the map image in by one.
function zoomIn () {
    console.log("e");
    if (zoomLevel < 3) { zoomLevel *= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
}

// Zoom the map image out by one.
function zoomOut () {
    if (zoomLevel > 1) { zoomLevel /= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
}

// Handle mousing over a county hitbox.
function countyMouseOver (event) {
    if (!event.target.clicked) {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "3px";
        event.target.style.opacity = 1.0;
    }
    
}

// Handle mousing out of a county hitbox.
function countyMouseOut (event) {
    event.target.clicked ? 'e' : event.target.style.opacity = 0.0;
}

// Handle clicking on a county hitbox.
function countyClick (event) {
    d3.selectAll(".countyHitbox").style("opacity", 0.0);
    if (event.target.clicked == false || event.target.clicked == undefined) {
        event.target.style.fill = "blue";
        event.target.stroke = "blue";
        event.target.style.strokeWidth = "1px";
        event.target.clicked = true;
    }
    else {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "3px";
        event.target.clicked = false;
    }
    event.target.style.opacity = 1.0;
}

// Handle searching for a county.
function countySearch (event) {
    // Get the text in the search field.
    let searchText = document.getElementById("countySearchField").value;
    // Make sure we only search on enter press.
    if (event.keyCode == 13) {
        // Search through each county object and look for matching names.
        let counties = d3.selectAll(".countyHitbox")._groups[0];
        for (let i = 0; i < counties.length; i++) {
            if (searchText.toUpperCase() == counties[i].attributes[0].value.toUpperCase()) {
                console.log(searchText);
            }
        }  
    }
}