import csv
import json


# Object for each county's .csv data.
class County():

	def __init__(self, countyData, idNumber, censusArea, coordinates):
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
		self.idNumber = idNumber
		self.censusArea = censusArea
		self.coordinates = coordinates


# Method for creating a County object from raw .csv data.
def createCounty(data, rowIndex, idNumber, censusArea, coordinates):
	countyData = []
	for row in data:
		countyData.append(row[rowIndex])
	return County(countyData, idNumber, censusArea, coordinates)


# Initialize the county dict in main.py to be filled out with county information.
def initializeCounties(counties):
	# Read county data from the geoJSON.
	with open('data/json/nyCountyGeoData.json', 'r') as jsonFile:
		geoData = json.loads(jsonFile.read())

	# Read all the .csv files and parse counties into a dictionary of County objects.
	with open('data/csv/Albany-Cayuga.csv', 'r') as csvFile:
		dataAlbanyCayuga = []
		for row in csv.reader(csvFile):
			dataAlbanyCayuga.append(row)

		counties['Albany'] = createCounty(
			dataAlbanyCayuga,
			10,
			geoData['Albany']['id'],
			geoData['Albany']['properties']['censusArea'],
			geoData['Albany']['geometry']['coordinates'],
		)
		counties['Allegany'] = createCounty(
			dataAlbanyCayuga,
			12,
			geoData['Allegany']['id'],
			geoData['Allegany']['properties']['censusArea'],
			geoData['Allegany']['geometry']['coordinates'],
		)
		counties['Bronx'] = createCounty(
			dataAlbanyCayuga,
			8,
			geoData['Bronx']['id'],
			geoData['Bronx']['properties']['censusArea'],
			geoData['Bronx']['geometry']['coordinates'],
		)
		counties['Broome'] = createCounty(
			dataAlbanyCayuga,
			6,
			geoData['Broome']['id'],
			geoData['Broome']['properties']['censusArea'],
			geoData['Broome']['geometry']['coordinates'],
		)
		counties['Cattaraugus'] = createCounty(
			dataAlbanyCayuga,
			4,
			geoData['Cattaraugus']['id'],
			geoData['Cattaraugus']['properties']['censusArea'],
			geoData['Cattaraugus']['geometry']['coordinates'],
		)
		counties['Cayuga'] = createCounty(
			dataAlbanyCayuga,
			2,
			geoData['Cayuga']['id'],
			geoData['Cayuga']['properties']['censusArea'],
			geoData['Cayuga']['geometry']['coordinates'],
		)

	with open('data/csv/Chautauqua-Cortland.csv', 'r') as csvFile:
		dataChautauquaCortland = []
		for row in csv.reader(csvFile):
			dataChautauquaCortland.append(row)

		counties['Chautauqua'] = createCounty(
			dataChautauquaCortland,
			12,
			geoData['Chautauqua']['id'],
			geoData['Chautauqua']['properties']['censusArea'],
			geoData['Chautauqua']['geometry']['coordinates'],
		)
		counties['Chemung'] = createCounty(
			dataChautauquaCortland,
			10,
			geoData['Chemung']['id'],
			geoData['Chemung']['properties']['censusArea'],
			geoData['Chemung']['geometry']['coordinates'],
		)
		counties['Chenango'] = createCounty(
			dataChautauquaCortland,
			8,
			geoData['Chenango']['id'],
			geoData['Chenango']['properties']['censusArea'],
			geoData['Chenango']['geometry']['coordinates'],
		)
		counties['Clinton'] = createCounty(
			dataChautauquaCortland,
			6,
			geoData['Clinton']['id'],
			geoData['Clinton']['properties']['censusArea'],
			geoData['Clinton']['geometry']['coordinates'],
		)
		counties['Columbia'] = createCounty(
			dataChautauquaCortland,
			4,
			geoData['Columbia']['id'],
			geoData['Columbia']['properties']['censusArea'],
			geoData['Columbia']['geometry']['coordinates'],
		)
		counties['Cortland'] = createCounty(
			dataChautauquaCortland,
			2,
			geoData['Cortland']['id'],
			geoData['Cortland']['properties']['censusArea'],
			geoData['Cortland']['geometry']['coordinates'],
		)

	with open('data/csv/Delaware-Fulton.csv', 'r') as csvFile:
		dataDelawareFulton = []
		for row in csv.reader(csvFile):
			dataDelawareFulton.append(row)

		counties['Delaware'] = createCounty(
			dataDelawareFulton,
			12,
			geoData['Delaware']['id'],
			geoData['Delaware']['properties']['censusArea'],
			geoData['Delaware']['geometry']['coordinates'],
		)
		counties['Dutchess'] = createCounty(
			dataDelawareFulton,
			10,
			geoData['Dutchess']['id'],
			geoData['Dutchess']['properties']['censusArea'],
			geoData['Dutchess']['geometry']['coordinates'],
		)
		counties['Erie'] = createCounty(
			dataDelawareFulton,
			6,
			geoData['Erie']['id'],
			geoData['Erie']['properties']['censusArea'],
			geoData['Erie']['geometry']['coordinates'],
		)
		counties['Essex'] = createCounty(
			dataDelawareFulton,
			8,
			geoData['Essex']['id'],
			geoData['Essex']['properties']['censusArea'],
			geoData['Essex']['geometry']['coordinates'],
		)
		counties['Franklin'] = createCounty(
			dataDelawareFulton,
			4,
			geoData['Franklin']['id'],
			geoData['Franklin']['properties']['censusArea'],
			geoData['Franklin']['geometry']['coordinates'],
		)
		counties['Fulton'] = createCounty(
			dataDelawareFulton,
			2,
			geoData['Fulton']['id'],
			geoData['Fulton']['properties']['censusArea'],
			geoData['Fulton']['geometry']['coordinates'],
		)

	with open('data/csv/Genesee-Kings.csv', 'r') as csvFile:
		dataGeneseeKings = []
		for row in csv.reader(csvFile):
			dataGeneseeKings.append(row)

		counties['Genesee'] = createCounty(
			dataGeneseeKings,
			12,
			geoData['Genesee']['id'],
			geoData['Genesee']['properties']['censusArea'],
			geoData['Genesee']['geometry']['coordinates'],
		)
		counties['Greene'] = createCounty(
			dataGeneseeKings,
			10,
			geoData['Greene']['id'],
			geoData['Greene']['properties']['censusArea'],
			geoData['Greene']['geometry']['coordinates'],
		)
		counties['Hamilton'] = createCounty(
			dataGeneseeKings,
			8,
			geoData['Hamilton']['id'],
			geoData['Hamilton']['properties']['censusArea'],
			geoData['Hamilton']['geometry']['coordinates'],
		)
		counties['Herkimer'] = createCounty(
			dataGeneseeKings,
			6,
			geoData['Herkimer']['id'],
			geoData['Herkimer']['properties']['censusArea'],
			geoData['Herkimer']['geometry']['coordinates'],
		)
		counties['Jefferson'] = createCounty(
			dataGeneseeKings,
			4,
			geoData['Jefferson']['id'],
			geoData['Jefferson']['properties']['censusArea'],
			geoData['Jefferson']['geometry']['coordinates'],
		)
		counties['Kings'] = createCounty(
			dataGeneseeKings,
			2,
			geoData['Kings']['id'],
			geoData['Kings']['properties']['censusArea'],
			geoData['Kings']['geometry']['coordinates'],
		)

	with open('data/csv/Lewis-Nassau.csv', 'r') as csvFile:
		dataLewisNassau = []
		for row in csv.reader(csvFile):
			dataLewisNassau.append(row)

		counties['Lewis'] = createCounty(
			dataLewisNassau,
			12,
			geoData['Lewis']['id'],
			geoData['Lewis']['properties']['censusArea'],
			geoData['Lewis']['geometry']['coordinates'],
		)
		counties['Livingston'] = createCounty(
			dataLewisNassau,
			10,
			geoData['Livingston']['id'],
			geoData['Livingston']['properties']['censusArea'],
			geoData['Livingston']['geometry']['coordinates'],
		)
		counties['Madison'] = createCounty(
			dataLewisNassau,
			8,
			geoData['Madison']['id'],
			geoData['Madison']['properties']['censusArea'],
			geoData['Madison']['geometry']['coordinates'],
		)
		counties['Monroe'] = createCounty(
			dataLewisNassau,
			6,
			geoData['Monroe']['id'],
			geoData['Monroe']['properties']['censusArea'],
			geoData['Monroe']['geometry']['coordinates'],
		)
		counties['Montgomery'] = createCounty(
			dataLewisNassau,
			4,
			geoData['Montgomery']['id'],
			geoData['Montgomery']['properties']['censusArea'],
			geoData['Montgomery']['geometry']['coordinates'],
		)
		counties['Nassau'] = createCounty(
			dataLewisNassau,
			2,
			geoData['Nassau']['id'],
			geoData['Nassau']['properties']['censusArea'],
			geoData['Nassau']['geometry']['coordinates'],
		)

	with open('data/csv/New York-Orange.csv', 'r') as csvFile:
		dataNewYorkOrange = []
		for row in csv.reader(csvFile):
			dataNewYorkOrange.append(row)

		counties['New York'] = createCounty(
			dataNewYorkOrange,
			12,
			geoData['New York']['id'],
			geoData['New York']['properties']['censusArea'],
			geoData['New York']['geometry']['coordinates'],
		)
		counties['Niagara'] = createCounty(
			dataNewYorkOrange,
			10,
			geoData['Niagara']['id'],
			geoData['Niagara']['properties']['censusArea'],
			geoData['Niagara']['geometry']['coordinates'],
		)
		counties['Oneida'] = createCounty(
			dataNewYorkOrange,
			8,
			geoData['Oneida']['id'],
			geoData['Oneida']['properties']['censusArea'],
			geoData['Oneida']['geometry']['coordinates'],
		)
		counties['Onondaga'] = createCounty(
			dataNewYorkOrange,
			6,
			geoData['Onondaga']['id'],
			geoData['Onondaga']['properties']['censusArea'],
			geoData['Onondaga']['geometry']['coordinates'],
		)
		counties['Ontario'] = createCounty(
			dataNewYorkOrange,
			4,
			geoData['Ontario']['id'],
			geoData['Ontario']['properties']['censusArea'],
			geoData['Ontario']['geometry']['coordinates'],
		)
		counties['Orange'] = createCounty(
			dataNewYorkOrange,
			2,
			geoData['Orange']['id'],
			geoData['Orange']['properties']['censusArea'],
			geoData['Orange']['geometry']['coordinates'],
		)

	with open('data/csv/Orleans-Rensselaer.csv', 'r') as csvFile:
		dataOrleansRensselaer = []
		for row in csv.reader(csvFile):
			dataOrleansRensselaer.append(row)

		counties['Orleans'] = createCounty(
			dataOrleansRensselaer,
			12,
			geoData['Orleans']['id'],
			geoData['Orleans']['properties']['censusArea'],
			geoData['Orleans']['geometry']['coordinates'],
		)
		counties['Oswego'] = createCounty(
			dataOrleansRensselaer,
			10,
			geoData['Oswego']['id'],
			geoData['Oswego']['properties']['censusArea'],
			geoData['Oswego']['geometry']['coordinates'],
		)
		counties['Otsego'] = createCounty(
			dataOrleansRensselaer,
			8,
			geoData['Otsego']['id'],
			geoData['Otsego']['properties']['censusArea'],
			geoData['Otsego']['geometry']['coordinates'],
		)
		counties['Putnam'] = createCounty(
			dataOrleansRensselaer,
			6,
			geoData['Putnam']['id'],
			geoData['Putnam']['properties']['censusArea'],
			geoData['Putnam']['geometry']['coordinates'],
		)
		counties['Queens'] = createCounty(
			dataOrleansRensselaer,
			4,
			geoData['Queens']['id'],
			geoData['Queens']['properties']['censusArea'],
			geoData['Queens']['geometry']['coordinates'],
		)
		counties['Rensselaer'] = createCounty(
			dataOrleansRensselaer,
			2,
			geoData['Rensselaer']['id'],
			geoData['Rensselaer']['properties']['censusArea'],
			geoData['Rensselaer']['geometry']['coordinates'],
		)

	with open('data/csv/Richmond-Schuyler.csv', 'r') as csvFile:
		dataRichmondSchuyler = []
		for row in csv.reader(csvFile):
			dataRichmondSchuyler.append(row)

		counties['Richmond'] = createCounty(
			dataRichmondSchuyler,
			4,
			geoData['Richmond']['id'],
			geoData['Richmond']['properties']['censusArea'],
			geoData['Richmond']['geometry']['coordinates'],
		)
		counties['Rockland'] = createCounty(
			dataRichmondSchuyler,
			12,
			geoData['Rockland']['id'],
			geoData['Rockland']['properties']['censusArea'],
			geoData['Rockland']['geometry']['coordinates'],
		)
		counties['Saratoga'] = createCounty(
			dataRichmondSchuyler,
			10,
			geoData['Saratoga']['id'],
			geoData['Saratoga']['properties']['censusArea'],
			geoData['Saratoga']['geometry']['coordinates'],
		)
		counties['Schenectady'] = createCounty(
			dataRichmondSchuyler,
			8,
			geoData['Schenectady']['id'],
			geoData['Schenectady']['properties']['censusArea'],
			geoData['Schenectady']['geometry']['coordinates'],
		)
		counties['Schoharie'] = createCounty(
			dataRichmondSchuyler,
			6,
			geoData['Schoharie']['id'],
			geoData['Schoharie']['properties']['censusArea'],
			geoData['Schoharie']['geometry']['coordinates'],
		)
		counties['Schuyler'] = createCounty(
			dataRichmondSchuyler,
			2,
			geoData['Schuyler']['id'],
			geoData['Schuyler']['properties']['censusArea'],
			geoData['Schuyler']['geometry']['coordinates'],
		)

	with open('data/csv/Seneca-Tioga.csv', 'r') as csvFile:
		dataSenecaTioga = []
		for row in csv.reader(csvFile):
			dataSenecaTioga.append(row)

		counties['Seneca'] = createCounty(
			dataSenecaTioga,
			12,
			geoData['Seneca']['id'],
			geoData['Seneca']['properties']['censusArea'],
			geoData['Seneca']['geometry']['coordinates'],
		)
		counties['St. Lawrence'] = createCounty(
			dataSenecaTioga,
			10,
			geoData['St. Lawrence']['id'],
			geoData['St. Lawrence']['properties']['censusArea'],
			geoData['St. Lawrence']['geometry']['coordinates'],
		)
		counties['Steuben'] = createCounty(
			dataSenecaTioga,
			8,
			geoData['Steuben']['id'],
			geoData['Steuben']['properties']['censusArea'],
			geoData['Steuben']['geometry']['coordinates'],
		)
		counties['Suffolk'] = createCounty(
			dataSenecaTioga,
			6,
			geoData['Suffolk']['id'],
			geoData['Suffolk']['properties']['censusArea'],
			geoData['Suffolk']['geometry']['coordinates'],
		)
		counties['Sullivan'] = createCounty(
			dataSenecaTioga,
			4,
			geoData['Sullivan']['id'],
			geoData['Sullivan']['properties']['censusArea'],
			geoData['Sullivan']['geometry']['coordinates'],
		)
		counties['Tioga'] = createCounty(
			dataSenecaTioga,
			2,
			geoData['Tioga']['id'],
			geoData['Tioga']['properties']['censusArea'],
			geoData['Tioga']['geometry']['coordinates'],
		)

	with open('data/csv/Tompkins-Westchester.csv', 'r') as csvFile:
		dataTompkinsWestchester = []
		for row in csv.reader(csvFile):
			dataTompkinsWestchester.append(row)

		counties['Tompkins'] = createCounty(
			dataTompkinsWestchester,
			12,
			geoData['Tompkins']['id'],
			geoData['Tompkins']['properties']['censusArea'],
			geoData['Tompkins']['geometry']['coordinates'],
		)
		counties['Ulster'] = createCounty(
			dataTompkinsWestchester,
			10,
			geoData['Ulster']['id'],
			geoData['Ulster']['properties']['censusArea'],
			geoData['Ulster']['geometry']['coordinates'],
		)
		counties['Warren'] = createCounty(
			dataTompkinsWestchester,
			8,
			geoData['Warren']['id'],
			geoData['Warren']['properties']['censusArea'],
			geoData['Warren']['geometry']['coordinates'],
		)
		counties['Washington'] = createCounty(
			dataTompkinsWestchester,
			6,
			geoData['Washington']['id'],
			geoData['Washington']['properties']['censusArea'],
			geoData['Washington']['geometry']['coordinates'],
		)
		counties['Wayne'] = createCounty(
			dataTompkinsWestchester,
			4,
			geoData['Wayne']['id'],
			geoData['Wayne']['properties']['censusArea'],
			geoData['Wayne']['geometry']['coordinates'],
		)
		counties['Westchester'] = createCounty(
			dataTompkinsWestchester,
			2,
			geoData['Westchester']['id'],
			geoData['Westchester']['properties']['censusArea'],
			geoData['Westchester']['geometry']['coordinates'],
		)

	with open('data/csv/Wyoming-Yates.csv', 'r') as csvFile:
		dataWyomingYates = []
		for row in csv.reader(csvFile):
			dataWyomingYates.append(row)

		counties['Wyoming'] = createCounty(
			dataWyomingYates,
			2,
			geoData['Wyoming']['id'],
			geoData['Wyoming']['properties']['censusArea'],
			geoData['Wyoming']['geometry']['coordinates'],
		)
		counties['Yates'] = createCounty(
			dataWyomingYates,
			4,
			geoData['Yates']['id'],
			geoData['Yates']['properties']['censusArea'],
			geoData['Yates']['geometry']['coordinates'],
		)

	csvFile.close()
