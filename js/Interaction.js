// Handle user interaction with the dashboard.

var zoomLevel = 1.0;
var shift = false;
var selectedAttributes = [];
var numSelectedCounties = 0;
var selectedCounties = [];
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
}


// Toggle between State View and County View.
function toggleStateOrCounty () {
    viewCounty = !viewCounty;
    // State View
    if (!viewCounty) {
        // Grey out the NYS map & clear everything.
        document.getElementById("nyCountyImg").style.filter = "contrast(500%) drop-shadow(3px 3px 0px black) brightness(70%)";
        clearSelections();
        // De-Select all selected attributes.
        let selectedAttributeElements = document.getElementsByClassName("leftHoverBoxesSelected")
        for (let i = 0; i < selectedAttributeElements.length; i++) {
            let index = selectedAttributeElements[i].className.baseVal.slice(-1);
            selectedAttributeElements[i].className.baseVal = "leftHoverBoxes " + index;
            selectedAttributes.splice(selectedAttributes.indexOf(attributes[Number(index)]), 1);
            numSelectedAttributes--;
        }
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
    Math.round(zoomLevel * 100) / 100;
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";
}


// Zoom the map image out by one.
function zoomOut () {
    if (zoomLevel > 1) { zoomLevel /= 1.33; }
    Math.round(zoomLevel * 100) / 100;
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";
}


// Toggle the selection status of objects in the left-hand box.
function toggleAttributeSelection (event) {
    // Clear all selected counties to avoid user confusion.
    clearSelections();
    var selectedBox = event.target;
    var classVal = selectedBox.className.baseVal;
    var classValIndex = classVal.substring(classVal.indexOf(" "));
    // Deselect
    if (selectedBox.attributes.class.value.includes("leftHoverBoxesSelected")) {
        selectedBox.attributes.class.value = "leftHoverBoxes" + classValIndex;
        numSelectedAttributes--;
        selectedAttributes.splice(selectedAttributes.indexOf(attributes[Number(classValIndex)]), 1);
    }
    // Select
    else if (selectedBox.attributes.class.value.includes("leftHoverBoxes") && numSelectedAttributes < 16) {
        selectedBox.attributes.class.value = "leftHoverBoxesSelected" + classValIndex;
        numSelectedAttributes++;
        selectedAttributes.push(attributes[Number(classValIndex)]);
    }
    else if (numSelectedAttributes >= 16) {
        // Do something intuitive for when the user selects more than 16.
    }
    // If we're in state mode, immediately display the value.
    if (!viewCounty) {
        // For each selected attribute, display its respective value.
        for (let i = 0; i < selectedAttributes.length; i++) {
            // Build the string that displays the county's selected attribute.
            let csvAttrName = attributesToCSV[selectedAttributes[i]];
            countyInfoString += `<p>` + selectedAttributes[i] + " ";
            for (let j = 45; j >= (selectedAttributes[i].length + newYorkStateCSVInfo[csvAttrName].toString().length); j--) {
                countyInfoString += ". ";
            }
            countyInfoString += newYorkStateCSVInfo[csvAttrName] + `</p>`;
        }
        // Set the tab to display the right stuff.
        updateTabGUI("New York State", 1, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString);
    }
}


// Clear all selections.
function clearSelections () {
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    d3.selectAll(".countyHitbox").style("opacity", 0.0);
    numSelectedCounties = 0;
    selectedCounties = [];
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
    // let countyName = event.target.attributes.countyName.nodeValue;
    if (event.target.tagName == "polygon") {
        // Get mouse coordinates.
        mouseX = Math.round(d3.pointer(event)[0]);
        mouseY = Math.round(d3.pointer(event)[1]);
        // Update the tooltip position.
        d3.select(".mouseTooltip").attr("x", mouseX + 10).attr("y", mouseY - 10);
        d3.select(".mouseTooltipText").attr("x", mouseX + 13).attr("y", mouseY + 3);
    } 
    // Make tooltip a lighter grey if you cannot select the county.
    if (shift && numSelectedCounties >= 3 && selectedCounties.indexOf(d3.select(".mouseTooltipText").text()) == -1) {
        d3.select(".mouseTooltip").attr("fill", "grey");
    }
    else {
        d3.select(".mouseTooltip").attr("fill", "var(--background)");
    }
}


// Handle mousing over a county hitbox.
function countyMouseOver (event) {
    let countyName = event.target.attributes.countyName.nodeValue;
    event.target.style.stroke = "black";
    if (viewCounty) {
        d3.selectAll(".mouseTooltip").remove();
        d3.selectAll(".mouseTooltipText").remove();
        drawMouseTooltip(event);
        // If the county is selected, highlight it.
        if (selectedCounties.indexOf(countyName) == -1) {
            event.target.style.fill = "transparent";
            event.target.style.strokeWidth = "6px";
            event.target.style.opacity = 1.0;
        }
        if (numSelectedCounties >= 3) {
            if (shift && selectedCounties.indexOf(countyName) == -1) { event.target.style.stroke = "grey"; }
            else { event.target.style.stroke = "black"; }
        }
    }
}


// Handle mousing out of a county hitbox.
function countyMouseOut (event) {
    let countyName = event.target.attributes.countyName.nodeValue;
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    selectedCounties.indexOf(countyName) != -1 ? 'e' : event.target.style.opacity = 0.0;
}


// Handle pressing the shift key to select multiple counties.
document.onkeydown = function (event) { if (event.key === "Shift" && !event.repeat) shift = true; }
document.onkeyup = function (event) { if (event.key === "Shift") shift = false; }


// Handle clicking on a county hitbox.
function clickOnACountyHitbox (event) {
    // Tab stuff.
    let tabHeader1 = document.getElementById("tabHeader1");
    let tabHeader2 = document.getElementById("tabHeader2");
    let tabHeader3 = document.getElementById("tabHeader3");
    let tabBody1 = document.getElementById("tabBody1");
    let tabBody2 = document.getElementById("tabBody2");
    let tabBody3 = document.getElementById("tabBody3");
    // Get county's name.
    let countyName = event.target.attributes.countyName.nodeValue;
    countyInfoString = "";
    // Deselect all counties if shift key is not held.
    if (!shift) {
        d3.selectAll(".countyHitbox").style("opacity", 0.0);
        numSelectedCounties = 0;
    }
    // If you're trying to select a fourth county, don't do that.
    if (numSelectedCounties >= 3 && shift) { return; }
    // Select county
    if (selectedCounties.indexOf(countyName) == -1) {
        // If you're not shift-selecting an additional county, erase and re-add the singular selected county.
        if (!shift) { selectedCounties = []; }
        selectedCounties.push(countyName);
        // Style the county polygon properly.
        if (numSelectedCounties == 0) { event.target.style.fill = "var(--tab1)"; }
        else if (numSelectedCounties == 1) { event.target.style.fill = "var(--tab2)"; }
        else { event.target.style.fill = "var(--tab3)"; }
        if (numSelectedCounties >= 3) {
            event.target.style.stroke = "black";
            numSelectedCounties = 0;
        }
        // For each selected attribute, display its respective value.
        for (let i = 0; i < selectedAttributes.length; i++) {
            // Build the string that displays the county's selected attribute.
            let csvAttrName = attributesToCSV[selectedAttributes[i]];
            countyInfoString += `<p>` + selectedAttributes[i] + " ";
            for (let j = 45; j >= (selectedAttributes[i].length + countyCSVInfo[countyName][csvAttrName].toString().length); j--) {
                countyInfoString += ". ";
            }
            countyInfoString += countyCSVInfo[countyName][csvAttrName] + `</p>`;
        }
        // Set the tab to display the right stuff.
        numSelectedCounties++;
        updateTabGUI(countyName, numSelectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString);
    }
    // Unselect county
    else {
        selectedCounties.pop(countyName);
        // If you're not shift-selecting an additional county, clear all county selections.
        if (!shift) { selectedCounties = []; }
        // Un-style the county properly.
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "6px";
        // Set the tab to display properly.
        tabHeader1.innerHTML = "Select a County";
        countyInfoString = "";
        if (shift) { numSelectedCounties--; }
        if (numSelectedCounties == 0) { countyName = "Select a County"; }
        updateTabGUI(countyName, numSelectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString);

    }
    event.target.style.opacity = 1.0;
    // console.log("Number of selected counties: " + numSelectedCounties);
    // console.log("Selected counties: " + selectedCounties);
}


// Handle searching for a county.
function countySearch (event) {
    // If we're in state mode, do not allow search.
    if (!viewCounty) {
        document.getElementById("countyErrorText").innerHTML = "Cannot search in state mode.";
        return;
    }
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
