import csv
import plotly.graph_objects as go
import numpy as np


# Method for creating a County object from raw .csv data.
def createCounty(data, rowIndex):
	countyData = []
	for row in data:
		countyData.append(row[rowIndex])
	return County(countyData)


# Object for each county's .csv data.
class County():

	def __init__(self, countyData):
		# Relevant statistics shown in the .csv file.
		self.countyName = countyData[0][0:countyData[0].find(',')]
		self.population2019 = countyData[1]
		self.population2010 = countyData[2]
		self.personsUnder5 = countyData[5]
		self.personsUnder18 = countyData[6]
		self.personsOver65 = countyData[7]
		self.sexFemale = countyData[8]
		self.raceAmericanIndian = countyData[11]
		self.raceAsian = countyData[12]
		self.raceBlack = countyData[10]
		self.raceHispanic = countyData[15]
		self.raceWhite = countyData[9]
		self.numHouseHolds = countyData[26]
		self.commuteTimeMinutes = countyData[44]
		self.medianHouseholdIncome = countyData[45]
		self.percentPoverty = countyData[47]
		self.highSchoolOrHigher = countyData[32]
		self.bachelorsOrHigher = countyData[33]


# Dictionary for the .csv data of all counties.
counties = {
	'Albany': None, 'Allegany': None, 'Bronx': None, 'Broome': None, 'Cattaraugus': None, 'Cayuga': None,
	'Chautauqua': None, 'Chemung': None, 'Chenango': None, 'Clinton': None, 'Columbia': None, 'Cortland': None,
	'Delaware': None, 'Duchess': None, 'Erie': None, 'Essex': None, 'Franklin': None, 'Fulton': None,
	'Genesee': None, 'Greene': None, 'Hamilton': None, 'Herkimer': None, 'Jefferson': None, 'Kings': None,
	'Lewis': None, 'Livingston': None, 'Madison': None, 'Monroe': None, 'Montgomery': None, 'Nassau': None,
	'New York': None, 'Niagra': None, 'Oneida': None, 'Onondaga': None, 'Ontario': None, 'Orange': None,
	'Orleans': None, 'Oswego': None, 'Otsego': None, 'Putnam': None, 'Queens': None, 'Rensselaer': None,
	'Richmond': None, 'Rockland': None, 'Saratoga': None, 'Schenectady': None, 'Schoharie': None, 'Schuyler': None,
	'Seneca': None, 'St. Lawrence': None, 'Steuben': None, 'Suffolk': None, 'Sullivan': None, 'Tioga': None,
	'Tompkins': None, 'Ulster': None, 'Warren': None, 'Washington': None, 'Wayne': None, 'Westchester': None,
	'Wyoming': None, 'Yates': None,
}

# Read all the .csv files and parse counties into a dictionary of County objects.
with open('data/csv/Albany-Cayuga.csv', 'r') as csvFile:
	dataAlbanyCayuga = []
	for row in csv.reader(csvFile):
		dataAlbanyCayuga.append(row)

	counties['Albany'] = createCounty(dataAlbanyCayuga, 10)
	counties['Allegany'] = createCounty(dataAlbanyCayuga, 12)
	counties['Bronx'] = createCounty(dataAlbanyCayuga, 8)
	counties['Broome'] = createCounty(dataAlbanyCayuga, 6)
	counties['Cattaraugus'] = createCounty(dataAlbanyCayuga, 4)
	counties['Cayuga'] = createCounty(dataAlbanyCayuga, 2)

with open('data/csv/Chautauqua-Cortland.csv', 'r') as csvFile:
	dataChautauquaCortland = []
	for row in csvFile:
		dataChautauquaCortland.append(row)

	counties['Chautauqua'] = createCounty(dataChautauquaCortland, 12)
	counties['Chemung'] = createCounty(dataChautauquaCortland, 10)
	counties['Chenango'] = createCounty(dataChautauquaCortland, 8)
	counties['Clinton'] = createCounty(dataChautauquaCortland, 6)
	counties['Columbia'] = createCounty(dataChautauquaCortland, 4)
	counties['Cortland'] = createCounty(dataChautauquaCortland, 2)

# TODO: Finish off the rest of the .csv files. 



# t = np.linspace(5, 25, 300)
# y = np.sin(t)

# fig = go.Figure(data=go.Scatter(x=t, y=y, mode='markers'))
# fig.show()