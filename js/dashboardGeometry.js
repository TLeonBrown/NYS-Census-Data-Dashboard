ATTR_RECT_W = 250;
ATTR_RECT_H = 473;
ATTR_TEXT_SPACING = 35;
MAIN_RECT_W = 1090;
MAIN_RECT_H = 540;
BOT_RECT_H = 200;
POP_BOX_W = 410;
POP_BOX_H = 550;
ZOOM_BOX_L = 40;



function drawDashboardBoxes () {
    var svgLeft = d3.selectAll("svg").attr("class", "svgLeft");

    // Left Scrolling Box
    svgLeft.append("rect")
        .attr("fill", "white")
        .attr("x", 0).attr("y", 0)
        .attr("width", 325).attr("height", 1500);

    for (var i = 0; i < leftSVGDataOptions.length; i++) {
        svgLeft.append("text")
            .attr("class", "leftText")
            .attr('x', ATTR_RECT_W / 2).attr('y', 20 + ATTR_TEXT_SPACING * i)
            .text(leftSVGDataOptions[i]);
        svgLeft.append("line")
            .attr("class", "leftLine")
            .attr('x1', (ATTR_RECT_W / 2) - 120).attr('x2', (ATTR_RECT_W / 2) + 120)
            .attr('y1', 32 + (ATTR_TEXT_SPACING * i)).attr('y2', 32 + (ATTR_TEXT_SPACING * i))
    }
    

    // // Bottom Box
    // svg.append("rect")
    //     .attr("class", "border")
    //     .attr("x", 290)
    //     .attr("y", 693)
    //     .attr("width", MAIN_RECT_W)
    //     .attr("height", BOT_RECT_H)

    // // Main Box
    // svg.append("rect")
    //     .attr("class", "border")
    //     .attr("x", 290)
    //     .attr("y", 133)
    //     .attr("width", MAIN_RECT_W)
    //     .attr("height", MAIN_RECT_H)

    // // Zoom Out Box
    // svg.append("rect")
    //     .attr("class", "zoomBox")
    //     .attr("x", 300)
    //     .attr("y", 623)
    //     .attr("width", ZOOM_BOX_L)
    //     .attr("height", ZOOM_BOX_L)
    // // Zoom In Box
    // svg.append("rect")
    //     .attr("class", "zoomBox")
    //     .attr("x", 300)
    //     .attr("y", 573)
    //     .attr("width", ZOOM_BOX_L)
    //     .attr("height", ZOOM_BOX_L)
    // // Plus Sign
    // svg.append("polygon")
    //     .attr("class", "zoomShape")
    //     .attr("points", " 305,589 316,589 316,578 324,578 324,589 335,589 335,597 324,597 324,608 316,608 316,597 305,597")
    // // Minus Sign
    // svg.append("rect")
    //     .attr("class", "zoomShape")
    //     .attr("x", 305).attr("y", 639)
    //     .attr("width", 30).attr("height", 8)

    // // Pop-Out Box
    // svg.append("rect")
    //     .attr("class", "popOutBox")
    //     .attr("x", 1245)
    //     .attr("y", 50)
    //     .attr("width", POP_BOX_W)
    //     .attr("height", POP_BOX_H)


}