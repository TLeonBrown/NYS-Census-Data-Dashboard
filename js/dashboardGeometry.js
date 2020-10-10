ATTR_RECT_W = 250;
ATTR_RECT_H = 873;
MAIN_RECT_W = 1090;
MAIN_RECT_H = 540;
BOT_RECT_H = 200;
POP_BOX_W = 400;
POP_BOX_H = 550;

function drawDashboardBoxes () {
    var svg = d3.select("svg");

    // Left Box
    svg.append("rect")
        .attr("class", "border")
        .attr("x", 20)
        .attr("y", 20)
        .attr("width", ATTR_RECT_W)
        .attr("height", ATTR_RECT_H)

    // Bottom Box
    svg.append("rect")
        .attr("class", "border")
        .attr("x", 290)
        .attr("y", 693)
        .attr("width", MAIN_RECT_W)
        .attr("height", BOT_RECT_H)

    // Main Box
    svg.append("rect")
        .attr("class", "border")
        .attr("x", 290)
        .attr("y", 133)
        .attr("width", MAIN_RECT_W)
        .attr("height", MAIN_RECT_H)

    // Pop-Out Box
    svg.append("rect")
        .attr("class", "popOutBox")
        .attr("x", 1230)
        .attr("y", 50)
        .attr("width", POP_BOX_W)
        .attr("height", POP_BOX_H)
}