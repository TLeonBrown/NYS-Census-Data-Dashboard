// Handle mouse events for hovering on, hovering off, and moving.


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
    event.target.style.strokeWidth = "3px";
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


// Handle mousing onto the bottom right bar graph for the selected county.
function countyBarMouseOver () {
    let countyBar = svgBottomRight.select(".countyBar")._groups[0][0].attributes;
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    svgBottomRight.append("text")
        .attr("class", "countyBarHoverText")
        .text(countyBar.value.nodeValue)
        .attr("font-weight", "bold").attr("fill", "white")
        .attr("x", mouseX + 7).attr("y", mouseY + 2)
    svgBottomRight.select(".countyBar").attr("stroke-width", "3px");
}


// Update the position of the value text for the currently selected county bar.
function countyBarMouseMove (event) {
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    d3.select(".countyBarHoverText").attr("x", mouseX + 7).attr("y", mouseY + (mouseY > 100 ? 2 : 8));
}


// Handle mousing off of the bottom right bar graph for the selected county.
function countyBarMouseOut () {
    svgBottomRight.selectAll(".countyBarHoverText").remove();
    svgBottomRight.select(".countyBar").attr("stroke-width", "0px");
}


// Handle mousing onto the bottom right bar graph for new york state.
function stateBarMouseOver () {
    let stateBar = svgBottomRight.select(".stateBar")._groups[0][0].attributes;
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    svgBottomRight.append("text")
        .attr("class", "stateBarHoverText")
        .text(stateBar.value.nodeValue)
        .attr("font-weight", "bold").attr("fill", "white")
        .attr("x", mouseX + 7).attr("y", mouseY + 2)
    svgBottomRight.select(".stateBar").attr("stroke-width", "3px");
}


// Update the position of the value text for the currently selected state bar.
function stateBarMouseMove (event) {
    mouseX = d3.pointer(event)[0];
    mouseY = d3.pointer(event)[1];
    d3.select(".stateBarHoverText").attr("x", mouseX + 7).attr("y", mouseY + (mouseY > 100 ? 2 : 8));
}


// Handle mousing off of the bottom right bar graph for new york state.
function stateBarMouseOut () {
    svgBottomRight.selectAll(".stateBarHoverText").remove();
    svgBottomRight.select(".stateBar").attr("stroke-width", "0px");
}
