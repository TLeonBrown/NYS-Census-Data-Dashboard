import csv
import json


# Open .json containing county data for all counties in USA. 
# Taken from: https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json
with open('data/json/geojson-counties-fips.json', 'r') as allCountiesUSAData:
	d = allCountiesUSAData.read()

rawData = json.loads(d)
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