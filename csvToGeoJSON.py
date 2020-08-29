import csv
import json


# Store the relevant geographical data for a NY county.
class NYCounty():

	def __init__(self, countyName, countyLSAD, countyCensusArea, countyCoordinates, fipsID):
		self.countyName = countyName;
		self.countyLSAD = countyLSAD;
		self.countyCensusArea = countyCensusArea;
		self.countyCoordinates = countyCoordinates;
		self.fipsID = fipsID;


# Convert the data in a NYCounty object into an element in a .json.
def countyToJSON(county):
	jsonDict = {
	'properties': {
		'name': county.countyName,
		'LSAD': county.countyLSAD,
		'censusArea': county.countyCensusArea,
		},
	'geometry': {
		'coordinates': county.countyCoordinates,
		},
	'id': county.fipsID,
	}
	
	nyDataFinalDict[county.countyName] = jsonDict


# Open .json containing county data for all counties in USA. 
# Taken from: https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json
with open('data/geojson-counties-fips.json', 'r') as allCountiesUSAData:
	d = allCountiesUSAData.read()

rawData = json.loads(d)
nyData = []
filteredData = {}

# Filter out all non-NY counties.
for d in rawData['features']:
	if int(d['properties']['STATE']) == 36:
		nyData.append(d)

# Create a NYCounty object for each county, and export them into one big .json file.
for c in nyData:
	cProperties = c['properties']
	cGeometry = c['geometry']
	countyToJSON(NYCounty(cProperties['NAME'], cProperties['LSAD'], cProperties['CENSUSAREA'], cGeometry['coordinates'], c['id']))

# Export the completed dict to a .json file.
with open ('data/nyCountyGeoData.json', 'w') as jsonFile:
		json.dump(filteredData, jsonFile)