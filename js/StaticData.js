// Store large data structures and other miscellaneous information that does not change.

var attributes = [
    "Population",
    "Population % Change (10 yrs)",
    "Population per Square Mile",
    "------------------",
    "% Female",
    "% American Indian",
    "% Asian American",
    "% African American",
    "% Hispanic",
    "% Caucasian",
    "% Foreign Born",
    "% With a Disability Under 65",
    "% of Pop. Under 5",
    "% of Pop. Under 18",
    "% of Pop. 65 And Over",
    "------------------",
    "Number of Households",
    "Persons per Household",
    "Median Household Income",
    "Income Per Capita",
    "Median Gross Rent",
    "% In Poverty",
    "% w/o Insurance Under 65",
    "Total Employment",
    "Total Empl. % Change (1 year)",
    "Number of Firms",
    "Number of Minority-Owned Firms",
    "------------------",
    "Average Commute Time",
    "Land Area (sq. mi.)",
    "Number of Veterans",
    "% w/ High School Degree",
    "% w/ Bachelor's Degree",
];

var attributesToCSV = {
    "Population": "Population estimates, July 1, 2019,  (V2019)",
    "Population % Change (10 yrs)": "Population, percent change - April 1, 2010 (estimates base) to July 1, 2019,  (V2019)",
    "Population per Square Mile": "Population per square mile, 2010",
    "Land Area (sq. mi.)": "Land area in square miles, 2010",
    "% of Pop. Under 5": "Persons under 5 years, percent",
    "% of Pop. Under 18": "Persons under 18 years, percent",
    "% of Pop. 65 And Over": "Persons 65 years and over, percent",
    "% Female": "Female persons, percent",
    "% American Indian": "American Indian and Alaska Native alone, percent",
    "% Asian American": "Asian alone, percent",
    "% African American": "Black or African American alone, percent",
    "% Hispanic": "Hispanic or Latino, percent",
    "% Caucasian": "White alone, percent",
    "% Foreign Born": "Foreign born persons, percent, 2014-2018",
    "Number of Veterans": "Veterans, 2014-2018",
    "Median Gross Rent": "Median gross rent, 2014-2018",
    "Number of Households": "Households, 2014-2018",
    "Persons per Household": "Persons per household, 2014-2018",
    "Average Commute Time": "Mean travel time to work (minutes), workers age 16 years+, 2014-2018",
    "Median Household Income": "Median household income (in 2018 dollars), 2014-2018",
    "Per Capita Income": "Per capita income in past 12 months (in 2018 dollars), 2014-2018",
    "% In Poverty": "Persons in poverty, percent",
    "% With a Disability Under 65": "With a disability, under age 65 years, percent, 2014-2018",
    "Total Employment": "Total employment, 2018",
    "Total Empl. % Change (1 year)": "Total employment, percent change, 2017-2018",
    "% w/ High School Degree": "High school graduate or higher, percent of persons age 25 years+, 2014-2018",
    "% w/ Bachelor's Degree": "Bachelor's degree or higher, percent of persons age 25 years+, 2014-2018",
    "% w/o Insurance Under 65": "Persons  without health insurance, under age 65 years, percent",
    "Number of Firms": "All firms, 2012",
    "Number of Minority-Owned Firms": "Minority-owned firms, 2012",
}

var polygonPosRegular = [
    [365, 325],
    [712, 327],
    [347, 239],
    [607, 213],
    [655, 250],
    [424, 260],
    [725, 267],
    [653, 284],
    [488, 305],
    [350, 282],
    [438, 281],
    [554, 333],
    [480, 233],
    [249, 314],
    [722, 62],
    [704, 374],
    [663, 74],
    [654, 229],
    [671, 321],
    [656, 173],
    [515, 137],
    [386, 272],
    [390, 218],
    [716, 475],
    [303, 219],
    [660, 409],
    [349, 212],
    [508, 197],
    [695, 482],
    [686, 439],
    [593, 65],
    [681, 262],
    [462, 266],
    [503, 333],
    [443, 218],
    [563, 308],
    [720, 123],
    [562, 150],
    [572, 225],
    [606, 274],
    [702, 245],
    [424, 323],
    [703, 180],
    [695, 278],
    [462, 336],
    [520, 288],
    [595, 330],
    [293, 264],
    [688, 488],
    [532, 232],
    [526, 230],
    [715, 405],
    [673, 497],
    [460, 305],
    [616, 384],
    [677, 365],
    [737, 190],
    [305, 320],
];

var polygonPosWeird = [
    [795, 457],
    [699, 469],
    [688, 478],
    [708, 447],
];

var countyCSVInfo = {
	'Albany': {}, 'Allegany': {}, 'Bronx': {}, 'Broome': {}, 'Cattaraugus': {}, 'Cayuga': {},
	'Chautauqua': {}, 'Chemung': {}, 'Chenango': {}, 'Clinton': {}, 'Columbia': {}, 'Cortland': {},
	'Delaware': {}, 'Dutchess': {}, 'Erie': {}, 'Essex': {}, 'Franklin': {}, 'Fulton': {},
	'Genesee': {}, 'Greene': {}, 'Hamilton': {}, 'Herkimer': {}, 'Jefferson': {}, 'Kings': {},
	'Lewis': {}, 'Livingston': {}, 'Madison': {}, 'Monroe': {}, 'Montgomery': {}, 'Nassau': {},
	'New York': {}, 'Niagara': {}, 'Oneida': {}, 'Onondaga': {}, 'Ontario': {}, 'Orange': {},
	'Orleans': {}, 'Oswego': {}, 'Otsego': {}, 'Putnam': {}, 'Queens': {}, 'Rensselaer': {},
	'Richmond': {}, 'Rockland': {}, 'Saratoga': {}, 'Schenectady': {}, 'Schoharie': {}, 'Schuyler': {},
	'Seneca': {}, 'St. Lawrence': {}, 'Steuben': {}, 'Suffolk': {}, 'Sullivan': {}, 'Tioga': {},
	'Tompkins': {}, 'Ulster': {}, 'Warren': {}, 'Washington': {}, 'Wayne': {}, 'Westchester': {},
	'Wyoming': {}, 'Yates': {}
};

var newYorkStateCSVInfo = {}
