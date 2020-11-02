// Draw the dashboard's geometry and interfaces.

ATTR_RECT_W = 250;
ATTR_RECT_H = 473;
ATTR_TEXT_SPACING = 35;
// MAIN_RECT_W = 1090;
// MAIN_RECT_H = 540;
// BOT_RECT_H = 200;
// POP_BOX_W = 410;
// POP_BOX_H = 550;
// ZOOM_BOX_L = 40;


var svgLeft;
var zoomLevel = 1.0;

// Helper Functions
function toggleAttributeSelection () {
    var selectedBox = event.target;
    if (selectedBox.attributes.class.value == "leftHoverBoxesSelected") {
        selectedBox.attributes.class.value = "leftHoverBoxes";
    }
    else if (selectedBox.attributes.class.value == "leftHoverBoxes") {
        selectedBox.attributes.class.value = "leftHoverBoxesSelected";
    }
}

function coordsAverage (list) {
    let sum0 = 0;
    let sum1 = 0;
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        sum0 += list[i][0];
        sum1 += list[i][1];
    }
    sum0 /= list.length;
    sum1 /= list.length;    
    for (let i = 0; i < list.length; i++) {
        newList.push([list[i][0] - sum0, list[i][1] - sum1]);
    }
    return newList;
}


// Main Functions
function setupSVG () {
    svgLeft = d3.select(".svgLeft");
    svgMain = d3.select(".svgMain");
}

function drawLeftAttributeBox () {
    // Left Scrolling Box
    svgLeft.append("rect")
        .attr("fill", "white")
        .attr("x", 0).attr("y", 0)
        .attr("width", 325).attr("height", 1500);
    // Click-Boxes Within Scrolling Box
    for (var i = 0; i < leftSVGDataOptions.length; i++) {
        // Draw Highlighting Rect
        svgLeft.append("rect")
            .attr("class", "leftHoverBoxes")
            .attr("x", 7).attr("y", 1.5 + ATTR_TEXT_SPACING * i)
            .attr("width", 240).attr("height", 30)
            .on("click", toggleAttributeSelection);
        // Draw Text
        svgLeft.append("text")
            .attr("class", "leftText")
            .attr('x', ATTR_RECT_W / 2 + 4).attr('y', 22 + ATTR_TEXT_SPACING * i)
            .text(leftSVGDataOptions[i]);
    }
}

function loadGeoJSON () {
    d3.json("./data/json/nyCountyGeoData.json").then(function (data) {
        drawSelectableCountyObjects(data.features);
    });
}

function drawSelectableCountyObjects (data) {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].properties.NAME)
        console.log(data[i].geometry.coordinates[0]);
    }
    // TEST: Make a proper SVG Polygon coordinates string out of the GeoJSON data.
    // let alleganyCoordinates = allegany.features[0].geometry.coordinates[0];
    // alleganyCoordinates = coordsAverage(alleganyCoordinates);
    // let alleganyCoordsStr = "";
    // for (let i = 0; i < alleganyCoordinates.length; i++) {
    //     let coord = ((alleganyCoordinates[i][0] * 80) + 100).toFixed(1) + "," + ((alleganyCoordinates[i][1] * -100) + 100).toFixed(1) + " ";
    //     console.log(coord);
    //     alleganyCoordsStr = alleganyCoordsStr.concat(coord);
    // }

    // svgMain.append("polygon")
    // .attr("points", alleganyCoordsStr)
    // .style("fill", "green")
}

function zoomIn () {
    if (zoomLevel < 3) { zoomLevel *= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
}

function zoomOut () {
    if (zoomLevel > 1) { zoomLevel /= 1.33; }
    document.getElementById("nyCountyImg").style.transform = "scale(" + zoomLevel + ")";
}