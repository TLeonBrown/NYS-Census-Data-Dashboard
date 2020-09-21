import json
from urllib.request import urlopen


# Open .json containing county data for all counties in USA. 
# Taken from: https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json
with urlopen('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json') as response:
    rawData = json.load(response)

nyData = []

# Filter out all non-NY counties.
for d in rawData['features']:
	if int(d['properties']['STATE']) == 36:
		nyData.append(d)

# Re-insert the new york counties into a new dictionary.
filteredData = {
	'type': 'FeatureCollection',
	'features': nyData
}

# Export the completed dict to a .json file.
with open ('data/json/nyCountyGeoData.json', 'w') as jsonFile:
		json.dump(filteredData, jsonFile)