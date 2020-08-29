import csv
import json


class NYCounty():

	def __init__(self, countyName, countyLSAD, countyCensusArea, countyCoordinates, fipsID):
		self.countyName = countyName;
		self.countyLSAD = countyLSAD;
		self.countyCensusArea = countyCensusArea;
		self.countyCoordinates = countyCoordinates;
		self.fipsID = fipsID;


def countyToJSON(county):



# Open .json containing county data for all counties in USA. 
# Taken from: https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json
with open('allCountiesUSAData.json', 'r') as allCountiesUSAData:
	d = allCountiesUSAData.read()

rawData = json.loads(d)
nyData = []

# Filter out all non-NY counties.
for d in rawData['features']:
	if int(d['properties']['STATE']) == 36:
		nyData.append(d)

# Create a NYCounty object for each county, and export them into one big .json file.
for c in nyData:
	cProperties = c['properties']
	cGeometry = c['geometry']
	county = NYCounty(cProperties['NAME'], cProperties['LSAD'], cProperties['CENSUSAREA'], cGeometry['coordinates'], c['id'])


jsonFormat = ("{"
	"'type': 'Feature', "
	"'properties': {"
  		"'COUNTY': countyNumber,"
  		"'NAME': 'Autauga',"
  		"'LSAD': 'County',"
  		"'CENSUSAREA': 594.436},"
 	"'geometry': {"
 		"'type': 'Polygon',"
  		"'coordinates': [["
  			"[-86.496774, 32.344437],"
    		"[-86.717897, 32.402814],"
    		"[-86.814912, 32.340803],"
    		"[-86.890581, 32.502974],"
    		"[-86.917595, 32.664169],"
    		"[-86.71339, 32.661732],"
    		"[-86.714219, 32.705694],"
    		"[-86.413116, 32.707386],"
    		"[-86.411172, 32.409937],"
    		"[-86.496774, 32.344437]]]},"
 	"'id': '01001'"
"}")

# print(jsonFormat)