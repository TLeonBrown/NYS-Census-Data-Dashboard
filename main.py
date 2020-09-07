import plotly.graph_objects as go
import numpy as np

import initializeCountyDict as icd


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

icd.initializeCounties(counties)

print(counties['Westchester'].population2019)


from urllib.request import urlopen
import json
with open('data/json/nyCountyGeoData.json') as response:
    nyCounties = json.load(response)

import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/fips-unemp-16.csv",
                   dtype={"fips": str})

import plotly.express as px

fig = px.choropleth(df, geojson=nyCounties, locations='fips', color='unemp',
                           color_continuous_scale="Viridis",
                           range_color=(0, 12),
                           scope="usa",
                           labels={'unemp':'U.R.'}
                          )
# fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
fig.show()