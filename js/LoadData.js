// Helper functions to load data from files.

NUM_USEFUL_CSV_ROWS = 62;


// Load a GeoJSON from a file.
function loadGeoJSONData () {
    d3.json("./data/json/nyCountyGeoData.json").then(function (data) {
        drawSelectableCountyObjects(data.features);
    });
}

// Load the data from all CSV files.
let v = [];
function loadAllCSVData () {
        // "Delaware-Fulton",
        // "Genesee-Kings",
        // "Lewis-Nassau",
        // "New York-Orange",
        // "Orleans-Rensselaer",
        // "Richmond-Schuyler",
        // "Seneca-Tioga",
        // "Tompkins-Westchester",
        // "Wyoming-Yates",
    d3.csv("./data/csv/Albany-Cayuga.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Albany"][data[i]["Fact"]] = data[i]["Albany County, New York"];
                countyCSVInfo["Allegany"][data[i]["Fact"]] = data[i]["Allegany County, New York"];
                countyCSVInfo["Bronx"][data[i]["Fact"]] = data[i]["Bronx County (Bronx Borough), New York"];
                countyCSVInfo["Broome"][data[i]["Fact"]] = data[i]["Broome County, New York"];
                countyCSVInfo["Cattaraugus"][data[i]["Fact"]] = data[i]["Cattaraugus County, New York"];
                countyCSVInfo["Cayuga"][data[i]["Fact"]] = data[i]["Cayuga County, New York"];
            }
        });
    d3.csv("./data/csv/Chautauqua-Cortland.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Chautauqua"][data[i]["Fact"]] = data[i]["Chautauqua County, New York"];
                countyCSVInfo["Chemung"][data[i]["Fact"]] = data[i]["Chemung County, New York"];
                countyCSVInfo["Chenango"][data[i]["Fact"]] = data[i]["Chenango County, New York"];
                countyCSVInfo["Clinton"][data[i]["Fact"]] = data[i]["Clinton County, New York"];
                countyCSVInfo["Columbia"][data[i]["Fact"]] = data[i]["Columbia County, New York"];
                countyCSVInfo["Cortland"][data[i]["Fact"]] = data[i]["Cortland County, New York"];
            }
        });
    console.log(countyCSVInfo);
    
}