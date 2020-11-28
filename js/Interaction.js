// Handle user interaction with the dashboard.

var zoomLevel = 1.0;
var shift = false;
var selectedCounties = 0;


// Zoom the map image in by one.
function zoomIn () {
    if (zoomLevel < 3) { zoomLevel *= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";
}

// Zoom the map image out by one.
function zoomOut () {
    if (zoomLevel > 1) { zoomLevel /= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";
}

// Clear all selections.
function clearSelections () {
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    d3.selectAll(".countyHitbox").style("opacity", 0.0);
    selectedCounties = 0;
    document.getElementById("countyDisplayTextTitle").innerHTML = "";
}

// Draw county name tooltip that hovers by the mouse.
function drawMouseTooltip (event) {
    svgMain = d3.select(".svgMain");
    // Get mouse position.
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    // Get the name of the county we're hovering over.
    let countyName = event.target.attributes.countyName.nodeValue;
    // Generate the tooltip box.
    svgMain.append("rect")
        .attr("class", "mouseTooltip")
        .attr("x", mouseX + 10).attr("y", mouseY - 10)
        .attr("width", countyName.length * 10)
    svgMain.append("text")
        .text(countyName)
        .attr("class", "mouseTooltipText")
        .attr("x", mouseX + 13).attr("y", mouseY + 3)
        .attr("font-weight", "bold").attr("fill", "white")
}

// Update the hovering tooltip that stays near the mouse when it is above a county.
function updateTooltip (event) {
    if (event.target.tagName == "polygon") {
        // Get mouse coordinates.
        mouseX = Math.round(d3.pointer(event)[0]);
        mouseY = Math.round(d3.pointer(event)[1]);
        // Update the tooltip position.
        d3.select(".mouseTooltip").attr("x", mouseX + 10).attr("y", mouseY - 10);
        d3.select(".mouseTooltipText").attr("x", mouseX + 13).attr("y", mouseY + 3);
    } 
}

// Handle mousing over a county hitbox.
function countyMouseOver (event) {
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    drawMouseTooltip(event);
    if (!event.target.clicked) {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "3px";
        event.target.style.opacity = 1.0;
    }  
}

// Handle mousing out of a county hitbox.
function countyMouseOut (event) {
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    event.target.clicked ? 'e' : event.target.style.opacity = 0.0;
}

// Handle pressing the shift key to select multiple counties.
document.onkeydown = function (event) { if (event.key === "Shift" && !event.repeat) shift = true; }
document.onkeyup = function (event) { if (event.key === "Shift") shift = false; }

// Handle clicking on a county hitbox.
function clickOnACountyHitbox (event) {
    let countyName = event.target.attributes.countyName.nodeValue;
    let countyInfoString = "";
    if (!shift) {
        d3.selectAll(".countyHitbox").style("opacity", 0.0);
        selectedCounties = 0;
    }
    if (selectedCounties >= 3) {
        return;
    }
    // Select county
    if (event.target.clicked == false || event.target.clicked == undefined) {
        event.target.style.fill = "#4dffc3";
        event.target.clicked = true;
        document.getElementById("countyDisplayTextTitle").innerHTML = countyName + " County";
        // For each selected attribute, display its respective value.
        for (let i = 0; i < selectedAttributes.length; i++) {
            let csvAttrName = attributesToCSV[selectedAttributes[i]];
            countyInfoString += `<p>` + selectedAttributes[i] + ".........." + countyCSVInfo[countyName][csvAttrName] + `</p>`;
        }
        document.getElementById("countyDisplayTextInfo").innerHTML = countyInfoString;
        selectedCounties++;
    }
    // Unselect county
    else {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "3px";
        event.target.clicked = false;
        document.getElementById("countyDisplayTextTitle").innerHTML = "";
        countyInfoString = "";
        document.getElementById("countyDisplayTextInfo").innerHTML = countyInfoString;
        selectedCounties--;
    }
    event.target.style.opacity = 1.0;
}

// Handle searching for a county.
function countySearch (event) {
    // Get the text in the search field.
    let searchText = document.getElementById("countySearchField").value;
    // Make sure we only search on enter press, or by clicking the search button.
    if (event.keyCode == 13 || event.type === "click") {
        if (searchText === "") {
            d3.selectAll(".countyHitbox").style("opacity", 0.0);
        }
        // Search through each county object and look for matching names.
        let counties = d3.selectAll(".countyHitbox")._groups[0];
        for (let i = 0; i < counties.length; i++) {
            // Case 1: Text matches a county name.
            if (searchText.toUpperCase() == counties[i].attributes[0].value.toUpperCase()) {
                d3.selectAll(".countyHitbox").style("opacity", 0.0);
                counties[i].style.fill = "red";
                counties[i].style.strokeWidth = "0px";
                counties[i].clicked = true;
                counties[i].style.opacity = 1.0;
                document.getElementById("countyErrorText").innerHTML = "";
                return;
            }
        }  
        // Case 2: Text does not match any county names.
        document.getElementById("countyErrorText").innerHTML = "Invalid county name.";
        return;
    }
}