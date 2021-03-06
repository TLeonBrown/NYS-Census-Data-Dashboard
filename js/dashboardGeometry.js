// Draw the dashboard's geometry and interfaces.

ATTR_TEXT_SPACING = 32.5;

var svgLeft;
var svgMain;
var svgNYS;
var svgBottom;
var svgBottomRight;
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


// Draw all of the county objects in the screen through the GeoJSON coordinates.
function drawSelectableCountyObjects (data) {
    var regularCounties = [];
    var weirdCounties = [];
    // Fix all the polygon positions in the data dict.
    for (let i = 0; i < polygonPosRegular.length; i++) {
        polygonPosRegular[i][0] -= 17;
        polygonPosRegular[i][1] += 40;
    }
    for (let i = 0; i < polygonPosWeird.length; i++) {
        polygonPosWeird[i][0] -= 17;
        polygonPosWeird[i][1] += 40;
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
}


// Instantiate SVG objects in the dashboard.
function setupSVG () {
    svgLeft = d3.select(".svgLeft");
    svgMain = d3.select(".svgMain");
    svgMain.on("mousemove", function(d) { updateTooltip(d); })
    svgBottom = d3.select(".svgBottom");
    svgBottomRight = d3.select(".svgBottomRight");
}


// Draw the scroll bar and other objects in the left-hand box.
function drawLeftAttributeBox () {
    // Left scrolling box
    svgLeft.append("rect")
        .attr("fill", "var(--background)")
        .attr("x", 0).attr("y", 0)
        .attr("width", 325).attr("height", 845);
    // Clickable boxes within scrolling box
    for (var i = 0; i < Object.keys(attributesToCSV).length; i++) {
        // Handle dividers.
        if (Object.keys(attributesToCSV)[i][0] === "!") {
            svgLeft.append("rect")
                .attr("class", "leftCategoryDivider")
            svgLeft.append("text")
                .attr("class", "leftCategoryDividerText")
                .attr('x', "154px").attr('y', 22 + ATTR_TEXT_SPACING * i)
                .text(Object.keys(attributesToCSV)[i].substring(1));
        }
        else {
            // Draw highlighting rect
            svgLeft.append("rect")
                .attr("class", "leftHoverBoxes " + i)
                .attr("x", "0.45vmin").attr("y", 1.5 + ATTR_TEXT_SPACING * i)
                .attr("width", "31.5vmin").attr("height", 28)
                    .on("click", toggleAttributeSelection);
            // Draw text
            svgLeft.append("text")
                .attr("class", "leftText")
                .attr('x', "154px").attr('y', 21 + ATTR_TEXT_SPACING * i)
                .attr("font-size", "14px").attr("text-anchor", "middle")
                .text(Object.keys(attributesToCSV)[i]);
        }
    }
}


// Draw the parallel coordinates display bars and text.
function drawPCDGeometry () {
    // Draw vertical lines and text
    for (let i = 0; i < 6; i++) {
        svgBottom.append("rect")
            .attr("fill", "var(--mainLight)")
            .attr("x", (i * 169) + 110).attr("y", 0)
            .attr("width", ".15vw").attr("height", "20.275vh")
        svgBottom.append("text")
            .text((i === 5) ? "2019" : (1970 + (10 * i))).attr("fill", "var(--mainLight")  
            .attr("class", "pcdText")
            .attr("x", (i * 169) + 111).attr("y", 210)
            .attr("font-size", "14px").attr("text-anchor", "middle");
    }
}


// Draw the bar graph geometry in the bottom right box.
function drawBarGraphGeometry () {
    // Rectangle that highlights title.
    svgBottomRight.append("rect")
        .attr("class", "bottomRightHighlightRect")
        .attr("fill", "transparent")
        .attr("x", 25).attr("y", 10).attr("rx", "4px").attr("ry", "4px")
        .attr("width", 450).attr("height", 60)
    // Bar graph title.
    svgBottomRight.append("text")
        .attr("class", "bottomRightGraphTitle")
        .attr("fill", "var(--mainLight)").attr("font-size", "18px").attr("text-anchor", "middle")
        .attr("x", 250).attr("y", 46)
    // Render vertical lines to signify y axis and markings.
    for (let i = 0; i < NUM_BAR_GRAPH_TICKS; i++) {
        svgBottomRight.append("rect")
            .attr("class", "barGraphAxisMarks")
            .attr("x", (62.5 * i) + 62.5).attr("y", 110)
            .attr("width", ".05vw").attr("height", 200)
            .attr("fill", "transparent")
    }
    svgBottomRight.append("rect")
        .attr("class", "barGraphAxisMarks")
        .attr("x", 249).attr("y", 97.5)
        .attr("width", ".15vw").attr("height", 225)
        .attr("fill", "transparent")
}