// Handle user interaction with the dashboard.

var zoomLevel = 1.0;
var shift = false;
var selectedCounties = 0;
var countyInfoString = "";
var viewCounty = true;


function updateTabGUI (countyName, selectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString) {
    switch (selectedCounties) {
        case 2:
            // Show Data
            tabHeader2.innerHTML = countyName;
            tabHeader2.style.display = "block";
            tabBody2.innerHTML = countyInfoString;
            // Set Tab 2 to Active
            tabHeader1.classList.remove("active");
            tabBody1.classList.remove("active");
            tabHeader2.classList.add("active");
            tabBody2.classList.add("active");
            break;
        case 3:
            // Show Data
            tabHeader3.innerHTML = countyName;
            tabHeader3.style.display = "block";
            tabBody3.innerHTML = countyInfoString;
            // Set Tab 2 to Active
            tabHeader2.classList.remove("active");
            tabBody2.classList.remove("active");
            tabHeader3.classList.add("active");
            tabBody3.classList.add("active");
            break;
        default:
            tabHeader1.innerHTML = countyName;
            tabHeader2.style.display = "none";
            tabHeader3.style.display = "none";
            tabBody1.innerHTML = countyInfoString;
            // Set Tab 1 to Active
            tabHeader2.classList.remove("active");
            tabBody2.classList.remove("active");
            tabHeader3.classList.remove("active");
            tabBody3.classList.remove("active");
            tabHeader1.classList.add("active");
            tabBody1.classList.add("active");
            break;
    }
    return;
}


// Toggle between State View and County View.
function toggleStateOrCounty () {
    viewCounty = !viewCounty;
    // State View
    if (!viewCounty) {
        clearSelections();
        // For each selected attribute, display its respective value.
        for (let i = 0; i < selectedAttributes.length; i++) {
            let csvAttrName = attributesToCSV[selectedAttributes[i]];
            countyInfoString += `<p>` + selectedAttributes[i] + ": " + countyCSVInfo[countyName][csvAttrName] + `</p>`;
        }
        document.getElementById("nyCountyImg").style.filter = "contrast(500%) drop-shadow(3px 3px 0px black) brightness(70%)";
    }
    // County View
    else {
        document.getElementById("nyCountyImg").style.filter = "hue-rotate(180deg)";
        clearSelections();
    }
}


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

// Toggle the selection status of objects in the left-hand box.
function toggleAttributeSelection () {
    // Clear all selected counties to avoid user confusion.
    clearSelections();
    var selectedBox = event.target;
    var classVal = selectedBox.className.baseVal;
    var classValIndex = classVal.substring(classVal.indexOf(" "));
    // Deselect
    if (selectedBox.attributes.class.value.includes("leftHoverBoxesSelected")) {
        selectedBox.attributes.class.value = "leftHoverBoxes " + classValIndex;
        numSelectedAttributes--;
        selectedAttributes.splice(selectedAttributes.indexOf(attributes[Number(classValIndex)]), 1);
    }
    // Select
    else if (selectedBox.attributes.class.value.includes("leftHoverBoxes") && numSelectedAttributes < 16) {
        selectedBox.attributes.class.value = "leftHoverBoxesSelected " + classValIndex;
        numSelectedAttributes++;
        selectedAttributes.push(attributes[Number(classValIndex)]);
    }
    else if (numSelectedAttributes >= 16) {
        // Do something intuitive for when the user selects more than 16.
    }
}

// Clear all selections.
function clearSelections () {
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    d3.selectAll(".countyHitbox").style("opacity", 0.0);
    selectedCounties = 0;
    shift = false;
    // Reset Tabs
    let tabHeader1 = document.getElementById("tabHeader1");
    let tabHeader2 = document.getElementById("tabHeader2");
    let tabHeader3 = document.getElementById("tabHeader3");
    let tabBody1 = document.getElementById("tabBody1");
    let tabBody2 = document.getElementById("tabBody2");
    let tabBody3 = document.getElementById("tabBody3");
    tabHeader2.style.display = "none";
    tabHeader3.style.display = "none";
    tabHeader2.classList.remove("active");
    tabBody2.classList.remove("active");
    tabHeader3.classList.remove("active");
    tabBody3.classList.remove("active");
    tabHeader1.classList.add("active");
    tabBody1.classList.add("active");
    tabHeader1.innerHTML = "Select a County";
    tabBody1.innerHTML = "";
    // Reset County Info
    countyInfoString = "";
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
    if (viewCounty) {
        d3.selectAll(".mouseTooltip").remove();
        d3.selectAll(".mouseTooltipText").remove();
        drawMouseTooltip(event);
        if (!event.target.clicked) {
            event.target.style.fill = "transparent";
            event.target.style.strokeWidth = "3px";
            event.target.style.opacity = 1.0;
        }
        if (selectedCounties >= 3) {
            if (shift) { event.target.style.stroke = "grey"; }
            else { event.target.style.stroke = "black"; }
        }
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
    // Tab Stuff
    let tabHeader1 = document.getElementById("tabHeader1");
    let tabHeader2 = document.getElementById("tabHeader2");
    let tabHeader3 = document.getElementById("tabHeader3");
    let tabBody1 = document.getElementById("tabBody1");
    let tabBody2 = document.getElementById("tabBody2");
    let tabBody3 = document.getElementById("tabBody3");
    let countyName = event.target.attributes.countyName.nodeValue;
    countyInfoString = "";
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
        if (selectedCounties >= 3) {
            event.target.style.stroke = "black";
            selectedCounties = 0;
        }
        event.target.clicked = true;
        // For each selected attribute, display its respective value.
        for (let i = 0; i < selectedAttributes.length; i++) {
            let csvAttrName = attributesToCSV[selectedAttributes[i]];
            countyInfoString += `<p>` + selectedAttributes[i] + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + countyCSVInfo[countyName][csvAttrName] + `</p>`;
        }
        selectedCounties++;
        updateTabGUI(countyName, selectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString);
    }
    // Unselect county
    else {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "3px";
        event.target.clicked = false;
        tabHeader1.innerHTML = "Select a County";
        countyInfoString = "";
        if (shift) { selectedCounties--; }
        if (selectedCounties == 0) { countyName = "Select a County"; }
        updateTabGUI(countyName, selectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString);

    }
    event.target.style.opacity = 1.0;
    console.log("Number of selected counties: " + selectedCounties);
}

// Handle searching for a county.
function countySearch (event) {
    // Get the text in the search field.
    let searchText = document.getElementById("countySearchField").value;
    // Make sure we only search on enter press, or by clicking the search button.
    if (event.keyCode == 13 || event.type === "click") {
        // Handle empty search.
        if (searchText === "") {
            d3.selectAll(".countyHitbox").style("opacity", 0.0);
            return;
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
        d3.selectAll(".countyHitbox").style("opacity", 0.0);
        return;
    }
}
