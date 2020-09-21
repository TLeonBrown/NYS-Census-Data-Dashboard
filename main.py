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


data = go.Choroplethmapbox(
	geojson = nyCounties,
	locations = nyCounties.index,    #the index of this dataframe should align with the 'id' element in your geojson
    z = nyCounties.COUNTY, #sets the color value
    text = nyCounties.NAME,    #sets text for each shape
    colorbar=dict(thickness=20, ticklen=3, tickformat='%',outlinewidth=0), #adjusts the format of the colorbar
    marker_line_width=1, marker_opacity=0.7, colorscale="Viridis", #adjust format of the plot
)


layout = go.Layout(
	title = {
		'text': 'New York Counties',
		'font': {'size': 24}
	},
	mapbox1 = dict(
		domain = {'x': [0, 1],'y': [0, 1]}, 
        center = dict(lat=-36.5 , lon=145.5),
        accesstoken = MAPBOX_ACCESSTOKEN, 
        zoom = 6
	),                      
    autosize=True,
    height=650,
    margin=dict(l=0, r=0, t=40, b=0)
)





# import pandas as pd
# df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv')

# fig = go.Figure(
# 	data = go.Choropleth(
# 		locations = df['code'],
# 		name = 'New York Counties',
# 		z = df['total exports'].astype(float),
# 		# geojson = nyCounties,
# 		locationmode = 'USA-states',
# 		colorscale = 'Greys',
# 	),
# )

# fig.update_layout(
# 	# font_family = , 
# 	# font_color = ,
# 	geo_scope = 'usa',

# )

# print(fig)
# fig = go.Figure(data=data, layout=layout)
# fig.show()
