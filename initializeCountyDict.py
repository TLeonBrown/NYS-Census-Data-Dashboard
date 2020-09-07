import csv


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


# Method for creating a County object from raw .csv data.
def createCounty(data, rowIndex):
	countyData = []
	for row in data:
		countyData.append(row[rowIndex])
	return County(countyData)


# Initialize the county dict in main.py to be filled out with county information.
def initializeCounties(counties):
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
		for row in csv.reader(csvFile):
			dataChautauquaCortland.append(row)

		counties['Chautauqua'] = createCounty(dataChautauquaCortland, 12)
		counties['Chemung'] = createCounty(dataChautauquaCortland, 10)
		counties['Chenango'] = createCounty(dataChautauquaCortland, 8)
		counties['Clinton'] = createCounty(dataChautauquaCortland, 6)
		counties['Columbia'] = createCounty(dataChautauquaCortland, 4)
		counties['Cortland'] = createCounty(dataChautauquaCortland, 2)

	with open('data/csv/Delaware-Fulton.csv', 'r') as csvFile:
		dataDelawareFulton = []
		for row in csv.reader(csvFile):
			dataDelawareFulton.append(row)

		counties['Delaware'] = createCounty(dataDelawareFulton, 12)
		counties['Duchess'] = createCounty(dataDelawareFulton, 10)
		counties['Erie'] = createCounty(dataDelawareFulton, 6)
		counties['Essex'] = createCounty(dataDelawareFulton, 8)
		counties['Franklin'] = createCounty(dataDelawareFulton, 4)
		counties['Fulton'] = createCounty(dataDelawareFulton, 2)

	with open('data/csv/Genesee-Kings.csv', 'r') as csvFile:
		dataGeneseeKings = []
		for row in csv.reader(csvFile):
			dataGeneseeKings.append(row)

		counties['Genesee'] = createCounty(dataGeneseeKings, 12)
		counties['Greene'] = createCounty(dataGeneseeKings, 10)
		counties['Hamilton'] = createCounty(dataGeneseeKings, 8)
		counties['Herkimer'] = createCounty(dataGeneseeKings, 6)
		counties['Jefferson'] = createCounty(dataGeneseeKings, 4)
		counties['Kings'] = createCounty(dataGeneseeKings, 2)

	with open('data/csv/Lewis-Nassau.csv', 'r') as csvFile:
		dataLewisNassau = []
		for row in csv.reader(csvFile):
			dataLewisNassau.append(row)

		counties['Lewis'] = createCounty(dataLewisNassau, 12)
		counties['Livingston'] = createCounty(dataLewisNassau, 10)
		counties['Madison'] = createCounty(dataLewisNassau, 8)
		counties['Monroe'] = createCounty(dataLewisNassau, 6)
		counties['Montgomery'] = createCounty(dataLewisNassau, 4)
		counties['Nassau'] = createCounty(dataLewisNassau, 2)

	with open('data/csv/New York-Orange.csv', 'r') as csvFile:
		dataNewYorkOrange = []
		for row in csv.reader(csvFile):
			dataNewYorkOrange.append(row)

		counties['New York'] = createCounty(dataNewYorkOrange, 12)
		counties['Niagra'] = createCounty(dataNewYorkOrange, 10)
		counties['Oneida'] = createCounty(dataNewYorkOrange, 8)
		counties['Onondaga'] = createCounty(dataNewYorkOrange, 6)
		counties['Ontario'] = createCounty(dataNewYorkOrange, 4)
		counties['Orange'] = createCounty(dataNewYorkOrange, 2)

	with open('data/csv/Orleans-Rensselaer.csv', 'r') as csvFile:
		dataOrleansRensselaer = []
		for row in csv.reader(csvFile):
			dataOrleansRensselaer.append(row)

		counties['Orleans'] = createCounty(dataOrleansRensselaer, 12)
		counties['Oswego'] = createCounty(dataOrleansRensselaer, 10)
		counties['Otsego'] = createCounty(dataOrleansRensselaer, 8)
		counties['Putnam'] = createCounty(dataOrleansRensselaer, 6)
		counties['Queens'] = createCounty(dataOrleansRensselaer, 4)
		counties['Rensselaer'] = createCounty(dataOrleansRensselaer, 2)

	with open('data/csv/Richmond-Schuyler.csv', 'r') as csvFile:
		dataRichmondSchuyler = []
		for row in csv.reader(csvFile):
			dataRichmondSchuyler.append(row)

		counties['Richmond'] = createCounty(dataRichmondSchuyler, 4)
		counties['Rockland'] = createCounty(dataRichmondSchuyler, 12)
		counties['Saratoga'] = createCounty(dataRichmondSchuyler, 10)
		counties['Schenectady'] = createCounty(dataRichmondSchuyler, 8)
		counties['Schoharie'] = createCounty(dataRichmondSchuyler, 6)
		counties['Schuyler'] = createCounty(dataRichmondSchuyler, 2)

	with open('data/csv/Seneca-Tioga.csv', 'r') as csvFile:
		dataSenecaTioga = []
		for row in csv.reader(csvFile):
			dataSenecaTioga.append(row)

		counties['Seneca'] = createCounty(dataSenecaTioga, 12)
		counties['St. Lawrence'] = createCounty(dataSenecaTioga, 10)
		counties['Steuben'] = createCounty(dataSenecaTioga, 8)
		counties['Suffolk'] = createCounty(dataSenecaTioga, 6)
		counties['Sullivan'] = createCounty(dataSenecaTioga, 4)
		counties['Tioga'] = createCounty(dataSenecaTioga, 2)

	with open('data/csv/Tompkins-Westchester.csv', 'r') as csvFile:
		dataTompkinsWestchester = []
		for row in csv.reader(csvFile):
			dataTompkinsWestchester.append(row)

		counties['Tompkins'] = createCounty(dataTompkinsWestchester, 12)
		counties['Ulster'] = createCounty(dataTompkinsWestchester, 10)
		counties['Warren'] = createCounty(dataTompkinsWestchester, 8)
		counties['Washington'] = createCounty(dataTompkinsWestchester, 6)
		counties['Wayne'] = createCounty(dataTompkinsWestchester, 4)
		counties['Westchester'] = createCounty(dataTompkinsWestchester, 2)

	with open('data/csv/Wyoming-Yates.csv', 'r') as csvFile:
		dataWyomingYates = []
		for row in csv.reader(csvFile):
			dataWyomingYates.append(row)

		counties['Wyoming'] = createCounty(dataWyomingYates, 2)
		counties['Yates'] = createCounty(dataWyomingYates, 4)

	csvFile.close()
