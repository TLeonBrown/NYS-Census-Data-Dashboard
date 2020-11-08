// Draw the dashboard's geometry and interfaces.

// import { countyMouseOver, countyMouseOut, countyClick } from "./Interaction.js";
// import { leftSVGDataOptions, polygonPos } from "./Data.js";

ATTR_RECT_W = "12vmin";
ATTR_RECT_H = 473;
ATTR_TEXT_SPACING = 35;

var svgLeft;
var svgMain;



// Helper Functions ---------------------------------------------------------------------------

// Toggle the selection status of objects in the left-hand box.
function toggleAttributeSelection () {
    var selectedBox = event.target;
    if (selectedBox.attributes.class.value == "leftHoverBoxesSelected") {
        selectedBox.attributes.class.value = "leftHoverBoxes";
    }
    else if (selectedBox.attributes.class.value == "leftHoverBoxes") {
        selectedBox.attributes.class.value = "leftHoverBoxesSelected";
    }
}

// Load a GeoJSON from a file.
function loadGeoJSON () {
    d3.json("./data/json/nyCountyGeoData.json").then(function (data) {
        drawSelectableCountyObjects(data.features);
    });
}

// Take the average of a list of coordinates and subtract each value from the average.
function coordsAverage (list) {
    // Find average.
    let sum0 = 0;
    let sum1 = 0;
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        sum0 += list[i][0];
        sum1 += list[i][1];
    }
    sum0 /= list.length;
    sum1 /= list.length; 
    // Take the difference of each value to the average.   
    for (let i = 0; i < list.length; i++) {
        newList.push([list[i][0] - sum0, list[i][1] - sum1]);
    }
    return newList;
}



// Main Functions ------------------------------------------------------------------------------

// Instantiate SVG objects in the dashboard.
function setupSVG () {
    svgLeft = d3.select(".svgLeft");
    svgMain = d3.select(".svgMain");
}

// Draw the scroll bar and other objects in the left-hand box.
function drawLeftAttributeBox () {
    // Left Scrolling Box
    svgLeft.append("rect")
        .attr("fill", "#506262")
        .attr("x", 0).attr("y", 0)
        .attr("width", 325).attr("height", 1500);
    // Click-Boxes Within Scrolling Box
    for (var i = 0; i < leftSVGDataOptions.length; i++) {
        // Draw Highlighting Rect
        svgLeft.append("rect")
            .attr("class", "leftHoverBoxes")
            .attr("x", "0.5vmin").attr("y", 1.5 + ATTR_TEXT_SPACING * i)
            .attr("width", "23vmin").attr("height", 30)
            .on("click", toggleAttributeSelection);
        // Draw Text
        svgLeft.append("text")
            .attr("class", "leftText")
            .attr('x', ATTR_RECT_W).attr('y', 22 + ATTR_TEXT_SPACING * i)
            .text(leftSVGDataOptions[i]);
    }
}

// Draw all of the county objects in the screen through the GeoJSON coordinates.
function drawSelectableCountyObjects (data) {
    // Fix all the polygon positions in the data dict.
    for (let i = 0; i < polygonPos.length; i++) {
        polygonPos[i][0] -= 68;
        polygonPos[i][1] += 97;
    }
    // Iterate through each element in the GeoJSON.
    for (let i = 0; i < data.length; i++) {
        // Some of the coordinates are nested within 4 lists, some are nested within 3.
        let countyCoords;
        // console.log(data[i].properties.NAME);
        if (data[i].geometry.coordinates[0][0][0][0] == undefined) {
            countyCoords = coordsAverage(data[i].geometry.coordinates[0]);
        }
        else {
            // console.log("----------no-------------");
            countyCoords = coordsAverage(data[i].geometry.coordinates[0][0]);
        }
        // Append the coordinates into one long string.
        let countyCoordsStr = "";
        for (let j = 0; j < countyCoords.length; j++) {
            // Use translation numbers from Data list to move county into the proper position.
            let coord = ((countyCoords[j][0] * 80) + polygonPos[i][0]).toFixed(1) + "," + ((countyCoords[j][1] * -100) + polygonPos[i][1]).toFixed(1) + " ";
            countyCoordsStr = countyCoordsStr.concat(coord);
        }
        // console.log(countyCoordsStr);

        // Draw the object on screen.
        svgMain.append("polygon")
            .attr("countyName", data[i].properties.NAME)
            .attr("class", "countyHitbox")
            .attr("points", countyCoordsStr)
            .attr("opacity", 0.0)
            .attr("stroke", "black")
            .on("mouseover", function(d) { countyMouseOver(d); })
            .on("mouseout", function(d) { countyMouseOut(d); })
            .on("mousedown", function(d) { countyClick(d); });
    }
}