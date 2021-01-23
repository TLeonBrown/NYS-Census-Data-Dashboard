// Helper functions to load data from files.

NUM_USEFUL_CSV_ROWS = 62;


// Load the GeoJSON data from the specified file.
function loadGeoJSONData () {
    d3.json("./data/json/nyCountyGeoData.json").then(function (data) {
        drawSelectableCountyObjects(data.features);
    });
}

// Load the data from the CSV files.
function loadAllCSVData () {
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
    d3.csv("./data/csv/Delaware-Fulton.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Delaware"][data[i]["Fact"]] = data[i]["Delaware County, New York"];
                countyCSVInfo["Dutchess"][data[i]["Fact"]] = data[i]["Dutchess County, New York"];
                countyCSVInfo["Erie"][data[i]["Fact"]] = data[i]["Erie County, New York"];
                countyCSVInfo["Essex"][data[i]["Fact"]] = data[i]["Essex County, New York"];
                countyCSVInfo["Franklin"][data[i]["Fact"]] = data[i]["Franklin County, New York"];
                countyCSVInfo["Fulton"][data[i]["Fact"]] = data[i]["Fulton County, New York"];
            }
        });
    d3.csv("./data/csv/Genesee-Kings.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Genesee"][data[i]["Fact"]] = data[i]["Genesee County, New York"];
                countyCSVInfo["Greene"][data[i]["Fact"]] = data[i]["Greene County, New York"];
                countyCSVInfo["Hamilton"][data[i]["Fact"]] = data[i]["Hamilton County, New York"];
                countyCSVInfo["Herkimer"][data[i]["Fact"]] = data[i]["Herkimer County, New York"];
                countyCSVInfo["Jefferson"][data[i]["Fact"]] = data[i]["Jefferson County, New York"];
                countyCSVInfo["Kings"][data[i]["Fact"]] = data[i]["Kings County (Brooklyn Borough), New York"];
            }
        });
    d3.csv("./data/csv/Lewis-Nassau.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Lewis"][data[i]["Fact"]] = data[i]["Lewis County, New York"];
                countyCSVInfo["Livingston"][data[i]["Fact"]] = data[i]["Livingston County, New York"];
                countyCSVInfo["Madison"][data[i]["Fact"]] = data[i]["Madison County, New York"];
                countyCSVInfo["Monroe"][data[i]["Fact"]] = data[i]["Monroe County, New York"];
                countyCSVInfo["Montgomery"][data[i]["Fact"]] = data[i]["Montgomery County, New York"];
                countyCSVInfo["Nassau"][data[i]["Fact"]] = data[i]["Nassau County, New York"];
            }
        });
    d3.csv("./data/csv/New York-Orange.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["New York"][data[i]["Fact"]] = data[i]["New York County (Manhattan Borough), New York"];
                countyCSVInfo["Niagara"][data[i]["Fact"]] = data[i]["Niagara County, New York"];
                countyCSVInfo["Oneida"][data[i]["Fact"]] = data[i]["Oneida County, New York"];
                countyCSVInfo["Onondaga"][data[i]["Fact"]] = data[i]["Onondaga County, New York"];
                countyCSVInfo["Ontario"][data[i]["Fact"]] = data[i]["Ontario County, New York"];
                countyCSVInfo["Orange"][data[i]["Fact"]] = data[i]["Orange County, New York"];
            }
        });
    d3.csv("./data/csv/Orleans-Rensselaer.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Orleans"][data[i]["Fact"]] = data[i]["Orleans County, New York"];
                countyCSVInfo["Oswego"][data[i]["Fact"]] = data[i]["Oswego County, New York"];
                countyCSVInfo["Otsego"][data[i]["Fact"]] = data[i]["Otsego County, New York"];
                countyCSVInfo["Putnam"][data[i]["Fact"]] = data[i]["Putnam County, New York"];
                countyCSVInfo["Queens"][data[i]["Fact"]] = data[i]["Queens County (Queens Borough), New York"];
                countyCSVInfo["Rensselaer"][data[i]["Fact"]] = data[i]["Rensselaer County, New York"];
            }
        });
    d3.csv("./data/csv/Richmond-Schuyler.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Richmond"][data[i]["Fact"]] = data[i]["Richmond County (Staten Island Borough), New York"];
                countyCSVInfo["Rockland"][data[i]["Fact"]] = data[i]["Rockland County, New York"];
                countyCSVInfo["Saratoga"][data[i]["Fact"]] = data[i]["Saratoga County, New York"];
                countyCSVInfo["Schenectady"][data[i]["Fact"]] = data[i]["Schenectady County, New York"];
                countyCSVInfo["Schoharie"][data[i]["Fact"]] = data[i]["Schoharie County, New York"];
                countyCSVInfo["Schuyler"][data[i]["Fact"]] = data[i]["Schuyler County, New York"];
            }
        });
    d3.csv("./data/csv/Seneca-Tioga.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Seneca"][data[i]["Fact"]] = data[i]["Seneca County, New York"];
                countyCSVInfo["St. Lawrence"][data[i]["Fact"]] = data[i]["St. Lawrence County, New York"];
                countyCSVInfo["Steuben"][data[i]["Fact"]] = data[i]["Steuben County, New York"];
                countyCSVInfo["Suffolk"][data[i]["Fact"]] = data[i]["Suffolk County, New York"];
                countyCSVInfo["Sullivan"][data[i]["Fact"]] = data[i]["Sullivan County, New York"];
                countyCSVInfo["Tioga"][data[i]["Fact"]] = data[i]["Tioga County, New York"];
            }
        });
    d3.csv("./data/csv/Tompkins-Westchester.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Tompkins"][data[i]["Fact"]] = data[i]["Tompkins County, New York"];
                countyCSVInfo["Ulster"][data[i]["Fact"]] = data[i]["Ulster County, New York"];
                countyCSVInfo["Warren"][data[i]["Fact"]] = data[i]["Warren County, New York"];
                countyCSVInfo["Washington"][data[i]["Fact"]] = data[i]["Washington County, New York"];
                countyCSVInfo["Wayne"][data[i]["Fact"]] = data[i]["Wayne County, New York"];
                countyCSVInfo["Westchester"][data[i]["Fact"]] = data[i]["Westchester County, New York"];
            }
        });
    d3.csv("./data/csv/Wyoming-Yates.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["Wyoming"][data[i]["Fact"]] = data[i]["Wyoming County, New York"];
                countyCSVInfo["Yates"][data[i]["Fact"]] = data[i]["Yates County, New York"];
            }
        });
    // CSV data for New York State.
    d3.csv("./data/csv/New-York-State.csv")
        .then(function(data) {
            for (let i = 0; i < NUM_USEFUL_CSV_ROWS; i++) {
                countyCSVInfo["New York State"][data[i]["Fact"]] = data[i]["New York"];
            }
        });
}