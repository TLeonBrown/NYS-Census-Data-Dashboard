import json
import numpy as np
import pandas as pd
import plotly.graph_objects as go

import initializeCountyDict as icd

MAPBOX_ACCESSTOKEN = 'pk.eyJ1IjoidGxlb25icm93biIsImEiOiJja2YzMHgzcjQyMmRwMnVtZjJmMzc2dnFuIn0.lxPkFzmvX7h8hH9ipbpB7A'


# Dictionary for the combined .csv and geoJSON data of all counties.
counties = {
	'Albany': None, 'Allegany': None, 'Bronx': None, 'Broome': None, 'Cattaraugus': None, 'Cayuga': None,
	'Chautauqua': None, 'Chemung': None, 'Chenango': None, 'Clinton': None, 'Columbia': None, 'Cortland': None,
	'Delaware': None, 'Dutchess': None, 'Erie': None, 'Essex': None, 'Franklin': None, 'Fulton': None,
	'Genesee': None, 'Greene': None, 'Hamilton': None, 'Herkimer': None, 'Jefferson': None, 'Kings': None,
	'Lewis': None, 'Livingston': None, 'Madison': None, 'Monroe': None, 'Montgomery': None, 'Nassau': None,
	'New York': None, 'Niagara': None, 'Oneida': None, 'Onondaga': None, 'Ontario': None, 'Orange': None,
	'Orleans': None, 'Oswego': None, 'Otsego': None, 'Putnam': None, 'Queens': None, 'Rensselaer': None,
	'Richmond': None, 'Rockland': None, 'Saratoga': None, 'Schenectady': None, 'Schoharie': None, 'Schuyler': None,
	'Seneca': None, 'St. Lawrence': None, 'Steuben': None, 'Suffolk': None, 'Sullivan': None, 'Tioga': None,
	'Tompkins': None, 'Ulster': None, 'Warren': None, 'Washington': None, 'Wayne': None, 'Westchester': None,
	'Wyoming': None, 'Yates': None,
}

# Initialize the county dictionary to be full of info from the .csv files.
icd.initializeCounties(counties)

# Open the created geo .json file for new york counties.
with open('data/json/nyCountyGeoData.json', 'r') as file:
    nyCounties = json.load(file)


