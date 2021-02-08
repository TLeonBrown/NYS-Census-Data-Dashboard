// Draw the dashboard's geometry and interfaces.

ATTR_TEXT_SPACING = 35;

var svgLeft;
var svgMain;
var svgNYS;
var numSelectedAttributes = 0;


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


// Draw a county polygon to the screen.
function drawCountyPolygon (name, coords) {
    svgMain.append("polygon")
        .attr("countyName", name)
        .attr("class", "countyHitbox")
        .attr("points", coords)
        .attr("opacity", 0.0)
        .attr("stroke", "black")
        .on("mouseover", function(d) { countyMouseOver(d); })
        .on("mouseout", function(d) { countyMouseOut(d); })
        .on("mousedown", function(d) { clickOnACountyHitbox(d); });
}
function drawNYSRect () {
    svgNYS.append("polygon")
        .attr("countyName", "New York State")
        .attr("class", "countyHitbox")
        .attr("points", "3,3, 127,3, 127,45, 3,45")
        .attr("opacity", 0.0)
        .attr("stroke", "black")
        .on("mouseover", function(d) { countyMouseOver(d); })
        .on("mouseout", function(d) { countyMouseOut(d); })
        .on("mousedown", function(d) { clickOnACountyHitbox(d); });
    svgNYS.append("text")
        .attr("class", "viewEntireStateText")
        .text("New York State")
        .attr("x", "17px").attr("y", "28px")
        .attr("pointerEvents", "none")
}


// Draw all of the county objects in the screen through the GeoJSON coordinates.
function drawSelectableCountyObjects (data) {
    var regularCounties = [];
    var weirdCounties = [];
    // Fix all the polygon positions in the data dict.
    for (let i = 0; i < polygonPosRegular.length; i++) {
        polygonPosRegular[i][0] -= 17;
        polygonPosRegular[i][1] += 111;
    }
    for (let i = 0; i < polygonPosWeird.length; i++) {
        polygonPosWeird[i][0] -= 17;
        polygonPosWeird[i][1] += 111;
    }
    // Sort every county based on its coordinate properties.
    for (let i = 0; i < data.length; i++) {
        if (data[i].geometry.coordinates[0][0][0][0] === undefined) { regularCounties.push(data[i]); }
        else { weirdCounties.push(data[i]); }
    }

    // Handle regular counties.
    for (let i = 0; i < regularCounties.length; i++) {
        let countyCoords = coordsAverage(regularCounties[i].geometry.coordinates[0]);
        //  Append the coordinates into one long string.
        let countyCoordsStr = "";
        for (let j = 0; j < countyCoords.length; j++) {
            // Use translation numbers from Data list to move county into the proper position.
            let coord = ((countyCoords[j][0] * 80) + polygonPosRegular[i][0]).toFixed(1) + "," + ((countyCoords[j][1] * -100) + polygonPosRegular[i][1]).toFixed(1) + " ";
            countyCoordsStr = countyCoordsStr.concat(coord);
        }
        // Draw the object on screen.
        drawCountyPolygon(regularCounties[i].properties.NAME, countyCoordsStr);
    }

    // Handle weird counties.
    for (let i = 0; i < weirdCounties.length; i++) {
        let countyCoords = weirdCounties[i].geometry.coordinates;
        countyCoords = coordsAverage(countyCoords[countyCoords.length - 1][0]);
        let countyCoordsStr = "";
        for (let j = 0; j < countyCoords.length; j++) {
            // Use translation numbers from Data list to move county into the proper position.
            let coord = ((countyCoords[j][0] * 80) + polygonPosWeird[i][0]).toFixed(1) + "," + ((countyCoords[j][1] * -100) + polygonPosWeird[i][1]).toFixed(1) + " ";
            countyCoordsStr = countyCoordsStr.concat(coord);
        }
        // Draw the object on screen.
        drawCountyPolygon(weirdCounties[i].properties.NAME, countyCoordsStr);   
    }
    drawNYSRect();
}


// Instantiate SVG objects in the dashboard.
function setupSVG () {
    svgLeft = d3.select(".svgLeft");
    svgMain = d3.select(".svgMain");
    svgMain.on("mousemove", function(d) { updateTooltip(d); })
    svgNYS = d3.select("#svgNYS");
    svgNYS.on("mousemove", function(d) { updateTooltip(d); })

}


// Draw the scroll bar and other objects in the left-hand box.
function drawLeftAttributeBox () {
    // Left Scrolling Box
    svgLeft.append("rect")
        .attr("fill", "var(--background)")
        .attr("x", 0).attr("y", 0)
        .attr("width", 325).attr("height", 500);
    // Click-Boxes Within Scrolling Box
    for (var i = 0; i < attributes.length; i++) {
        // Handle dividers.
        if (attributes[i][0] === "!") {
            svgLeft.append("rect")
                .attr("class", "leftCategoryDivider")
            svgLeft.append("text")
                .attr("class", "leftCategoryDividerText")
                .attr('x', "145px").attr('y', 22 + ATTR_TEXT_SPACING * i)
                .text(attributes[i].substring(1));
        }
        else {
            // Draw Highlighting Rect
            svgLeft.append("rect")
                .attr("class", "leftHoverBoxes " + i)
                .attr("x", "0.45vmin").attr("y", 1.5 + ATTR_TEXT_SPACING * i)
                .attr("width", "29.5vmin").attr("height", 30)
                .on("click", toggleAttributeSelection);
            // Draw Text
            svgLeft.append("text")
                .attr("class", "leftText")
                .attr('x', "145px").attr('y', 22 + ATTR_TEXT_SPACING * i)
                .text(attributes[i]);
        }
    }
}
