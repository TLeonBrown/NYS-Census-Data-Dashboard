// Handle user interaction with the dashboard.

var MAX_ATTRIBUTE_SELECTIONS = 8;
var LOG_SCALE_FACTOR = 70;

var zoomLevel = 1.0;
var shift = false;
var selectedAttributes = [];
var numSelectedCounties = 0;
var selectedCounties = [];
var countyInfoString = "";
// Set up attribute error text.
let attributeErrorText = undefined;


function updateTabGUI (countyName, numSelectedCounties, tabHeader1, tabHeader2, tabHeader3, tabBody1, tabBody2, tabBody3, countyInfoString) {
    switch (numSelectedCounties) {
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
            // Set Tab 3 to Active
            tabHeader1.classList.remove("active");
            tabBody1.classList.remove("active");
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


// Zoom the map image in by one.
function zoomIn () {
    if (zoomLevel < 1.5) { zoomLevel *= 1.33; }
    Math.round(zoomLevel * 100) / 100;
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";
}


// Zoom the map image out by one.
function zoomOut () {
    if (zoomLevel > 0.75) { zoomLevel /= 1.33; }
    Math.round(zoomLevel * 100) / 100;
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
    document.getElementById("svgMain").style.transform = "scale(" + zoomLevel + ")";

}


// Toggle the selection status of objects in the left-hand box.
function toggleAttributeSelection (event) {
    // Declare attribute error text.
    attributeErrorText = document.getElementById("attributeSelectErrorText");
    attributeErrorText.innerHTML = "Cannot select more than " + MAX_ATTRIBUTE_SELECTIONS + " attributes.";
    // Clear all selected counties to avoid user confusion.
    clearSelections();
    var selectedBox = event.target;
    var classVal = selectedBox.className.baseVal;
    var classValIndex = classVal.substring(classVal.indexOf(" "));
    // Deselect
    if (selectedBox.attributes.class.value.includes("leftHoverBoxesSelected")) {
        selectedBox.attributes.class.value = "leftHoverBoxes" + classValIndex;
        numSelectedAttributes--;
        selectedAttributes.splice(selectedAttributes.indexOf(Object.keys(attributesToCSV)[Number(classValIndex)]), 1);
        attributeErrorText.style.display = "none";
    }
    // Select
    else if (selectedBox.attributes.class.value.includes("leftHoverBoxes") && numSelectedAttributes < MAX_ATTRIBUTE_SELECTIONS) {
        selectedBox.attributes.class.value = "leftHoverBoxesSelected" + classValIndex;
        numSelectedAttributes++;
        selectedAttributes.push(Object.keys(attributesToCSV)[Number(classValIndex)]);
        attributeErrorText.style.display = "none";
    }
    else if (numSelectedAttributes >= MAX_ATTRIBUTE_SELECTIONS) {
        // Show error text if user is trying to select more attributes than they are allowed to.
        attributeErrorText.style.display = "block";
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
    // Clear SVG elements on the bottom panel.
    svgBottom.selectAll("*").remove();
    drawPCDGeometry();
}


// Handle pressing the shift key to select multiple counties.
document.onkeydown = function (event) { if (event.key === "Shift" && !event.repeat) shift = true; }
document.onkeyup = function (event) { if (event.key === "Shift") shift = false; }


// Handle clicking on a county hitbox.
function clickOnACountyHitbox (event) {
    // Remove attribute error text, if it is visible.
    if (attributeErrorText != undefined) {
        attributeErrorText.style.display = "none";
    }
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
        if (!shift) { 
            selectedCounties = [];
        }
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
            countyInfoString += `<p class="dataText" onClick="drawComparisonGraph()">` + selectedAttributes[i] + " ";
            for (let j = 50; j >= (selectedAttributes[i].length + countyCSVInfo[countyName][csvAttrName].toString().length); j--) {
                countyInfoString += "\xa0\xa0";
            }
            if (countyCSVInfo[countyName][csvAttrName] === "Z") {
                countyInfoString += "?" + `</p>`;
            }
            else {
                countyInfoString += countyCSVInfo[countyName][csvAttrName] + `</p>`;
            }
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
    drawPCDLines();
    // console.log("Number of selected counties: " + numSelectedCounties);
    // console.log("Selected counties: " + selectedCounties);
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
        // Clear any previous selections.
        for (let i = 0; i < counties.length; i++) {
            counties[i].style.fill = "transparent";
        }
        for (let i = 0; i < counties.length; i++) {
            // Case 1: Text matches a county name.
            if (searchText.toUpperCase() == counties[i].attributes[0].value.toUpperCase()) {
                counties[i].style.fill = "red";
                counties[i].style.strokeWidth = "0px";
                counties[i].style.opacity = 1.0;
                return;
            }
        }  
    }
}


// Clear the search field.
function clearCountySearchText () {
    let counties = d3.selectAll(".countyHitbox")._groups[0];
    // Clear any previous selections.
    for (let i = 0; i < counties.length; i++) {
        counties[i].style.fill = "transparent";
    }
    // Clear search field.
    document.getElementById("countySearchField").value = "";
}


// Format the county search results to be in the proper dictionary format.
function formatCountySearchResults () {
    for (let i = 0; i < Object.keys(countyCSVInfo).length; i++) {
        searchResultCountyNames.push({"title": Object.keys(countyCSVInfo)[i]});
    }
}


// Re-draw the lines on the parallel coordinates display to reflect the selected counties.
function drawPCDLines () {
    // Establish svg and its boundaries on the screen.
    let svgBottom = d3.select(".svgBottom");
    let svgBottomY = 190;
    let populationsByYear = [[], [], []];
    let countyMinMaxPops = [];
    let countyMax = 1;
    // Get the population of each selected county, by decade.
    for (let i = 0; i < numSelectedCounties; i++) {
        for (let j = 0; j < 6; j++) {
            populationsByYear[i].push(Number(countyPopulationEstimates[selectedCounties[i]][j][(j === 0) ? "2019" : (2020 - (10 * j))]));
        }
    }
    // Put the min and max of each county into a new array.
    for (let i = 0; i < numSelectedCounties; i++) {
        countyMinMaxPops.push(Math.min(...populationsByYear[i]));
        countyMinMaxPops.push(Math.max(...populationsByYear[i]));
    }
    // Get the min and max of all selected counties.
    if (numSelectedCounties > 1) { countyMin = Math.min(...countyMinMaxPops); }
    countyMax = Math.max(...countyMinMaxPops);
    // Take the log of the absolute min and max, and translate that into a scale that fits within the SVG window.
    let logmaxPerc = ((Math.log(countyMax) / Math.log(10)));
    // Draw the decade dividing lines to the SVG window.
    svgBottom.selectAll("*").remove();
    drawPCDGeometry();
    // Draw each county's points, and their text labels on the right of the PCD.
    for (let i = 0; i < numSelectedCounties; i++) {
        // Circle points
        for (let j = 0; j < 6; j++) {
            let svgYPos = (svgBottomY + 10) - ((((Math.log(populationsByYear[i][j]) / Math.log(10)) / logmaxPerc) * svgBottomY * 2.1) - 210);
            svgBottom.append("circle")
                .attr("fill", "var(--tab" + (i + 1) + ")")
                .attr("popValue", populationsByYear[i][j])
                .attr("index", j)
                .attr("r", "5px").attr("cx", 112.25 + (172 * j)).attr("cy", svgYPos)
                .attr("stroke", "black").attr("stroke-width", "0px")
                .on("mouseover", function(d) { pcdDotMouseOver(d); })
                .on("mouseout", function(d) { pcdDotMouseOut(d); })
                .on("mousemove", function(d) { updatePcdDot(d); });
        }
        // Right-hand-side labels
        let countyRightPoints = [];
        for (let j = 0; j < svgBottom.selectAll("circle")._groups[0].length; j++) {
            if (svgBottom.selectAll("circle")._groups[0][j].attributes.index.nodeValue === "0") {
                countyRightPoints.push(svgBottom.selectAll("circle")._groups[0][j]);
            }
        }
        // County name label text on the left-hand side
        svgBottom.append("text")
            .text(selectedCounties[i])
            .attr("class", "pcdTextLabel " + i)
            .attr("fill", "var(--mainLight)")
            .attr("stroke", "black").attr("stroke-width", "0px")
            .attr("x", 105).attr("y", parseFloat(countyRightPoints[i].attributes.cy.nodeValue) + 4)
            .attr("text-anchor", "end")
    }
    // Draw lines connecting each county's points in the PCD.
    let dotObjects = svgBottom.selectAll("circle")._groups[0];
    for (let i = 0; i < dotObjects.length - 1; i++) {
        if ((i + 1) % 6 !== 0) {
            let strokeColor = (i > 5) ? ((i > 11) ? "var(--tab3)" : "var(--tab2)") : "var(--tab1)";
            svgBottom.append("line")
                .attr("pointer-events", "none")
                .attr("stroke", strokeColor).attr("stroke-width", 2)
                .attr("x1", dotObjects[i].attributes.cx.nodeValue).attr("y1", dotObjects[i].attributes.cy.nodeValue)
                .attr("x2", dotObjects[i+1].attributes.cx.nodeValue).attr("y2", dotObjects[i+1].attributes.cy.nodeValue);
        } 
    }
}


// MOUSE EVENTS ------------------------------------------------ MOUSE EVENTS ------------------------------------------------- MOUSE EVENTS


// Handle mousing over a county hitbox.
function countyMouseOver (event) {
    let countyName = event.target.attributes.countyName.nodeValue;
    event.target.style.stroke = "black";
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    drawMouseTooltip(event);
    // If the county is selected, highlight it.
    if (selectedCounties.indexOf(countyName) == -1) {
        event.target.style.fill = "transparent";
        event.target.style.strokeWidth = "6px";
        event.target.style.opacity = 1.0;
    }
}


// Handle mousing out of a county hitbox.
function countyMouseOut (event) {
    let countyName = event.target.attributes.countyName.nodeValue;
    d3.selectAll(".mouseTooltip").remove();
    d3.selectAll(".mouseTooltipText").remove();
    selectedCounties.indexOf(countyName) != -1 ? 'e' : event.target.style.opacity = 0.0;
}


// Draw county name tooltip that hovers by the mouse.
function drawMouseTooltip (event) {
    // Get the name of the county we're hovering over.
    let countyName = event.target.attributes.countyName.nodeValue;
    if (countyName === "New York State") { return; }
    svgMain = d3.select(".svgMain");
    // Get mouse position.
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    // Generate the tooltip box.
    svgMain.append("rect")
        .attr("class", "mouseTooltip")
        .attr("x", mouseX + 10).attr("y", mouseY - 10)
        .attr("width", countyName.length * 10);
    svgMain.append("text")
        .text(countyName)
        .attr("class", "mouseTooltipText")
        .attr("x", mouseX + 13).attr("y", mouseY + 3)
        .attr("font-weight", "bold").attr("fill", "white");
}


// Update the hovering tooltip that stays near the mouse when it is above a county.
function updateTooltip (event) {
    // Get the county's name, if possible.
    let countyName = undefined;
    if (event.target.attributes.countyName === undefined) { return; }
    else { countyName = event.target.attributes.countyName.nodeValue; }
    // Update tooltip position.
    if (event.target.tagName == "polygon") {
        // Get mouse coordinates.
        mouseX = Math.round(d3.pointer(event)[0]);
        mouseY = Math.round(d3.pointer(event)[1]);
        // Update the tooltip position.
        d3.select(".mouseTooltip").attr("x", mouseX + 10).attr("y", mouseY - 10);
        d3.select(".mouseTooltipText").attr("x", mouseX + 13).attr("y", mouseY + 3);

    } 
    // Make tooltip a lighter grey if you cannot select the county.
    if (shift && numSelectedCounties >= 3 && selectedCounties.indexOf(countyName) == -1) {
        // Make county outline grey if it cannot be selected.
        if (selectedCounties.indexOf(countyName) == -1) { event.target.style.stroke = "grey"; }
        d3.select(".mouseTooltip").attr("fill", "grey");
    }
    else {
        // Keep tooltip & county color normal if you can select it.
        d3.select(".mouseTooltip").attr("fill", "var(--background)");
        event.target.style.stroke = "black";
    }
}


// Handle mousing over a value point in the parallel coordinates display.
function pcdDotMouseOver (event) {
    d3.selectAll(".pcdToolTipText").remove();
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    svgBottom.append("text")
        .text(parseFloat(event.target.attributes.popValue.value).toLocaleString('en'))
        .attr("class", "pcdTooltipText")
        .attr("x", mouseX + 7).attr("y", mouseY + (mouseY > 100 ? 2 : 8))
        .attr("font-weight", "bold").attr("fill", "white");
    // Outline the selected point in black.
    event.target.style.strokeWidth = "4px";
    // Make the county name label text the highlighted color.
    let countyCount = (event.target.attributes.fill.value.slice(-2, -1));
    document.getElementsByClassName("pcdTextLabel " + (countyCount - 1))[0].style.fill = "var(--tab" + countyCount + ")";
}


// Handle mousing off of a value point in the parallel coordinates display.
function pcdDotMouseOut () {
    d3.selectAll(".pcdTooltipText").remove();
    svgBottom.selectAll("circle").style("stroke-width", "0px");
    // Make the county name label text white.
    let countyCount = (event.target.attributes.fill.value.slice(-2, -1));
    document.getElementsByClassName("pcdTextLabel " + (countyCount - 1))[0].style.fill = "white";
}


// Update the position of the value text for the currently selected PCD dot.
function updatePcdDot (event) {
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    d3.select(".pcdTooltipText").attr("x", mouseX + 7).attr("y", mouseY + (mouseY > 100 ? 2 : 8));
}


// Show the comparison graph for a certain attribute in the bottom right corner.
function drawComparisonGraph () {
    console.log("show comparison graph");
}
