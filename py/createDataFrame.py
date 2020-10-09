import csv
import json
import random as rand


fields = ['fips', 'color', 'name']
rows = []

# Open the geoJSON.
with open('data/json/nyCountyGeoData.json', 'r') as file:
    nyCounties = json.load(file)

# Create rows for the .csv file.
for d in nyCounties['features']:
	row = []
	# Append FIPS code.
	row.append(d['id'])

	# Append random color value.
	row.append(rand.randint(0, 10))

	# Append county name.
	row.append(str(d['properties']['NAME'] + " " + d['properties']['LSAD']))

	# Append row to list of all rows.
	rows.append(row)

# Create a .csv file to write to.
with open('data/csv/dataFrame.csv', 'w', newline = '') as csvFile:
	csvWriter = csv.writer(csvFile)

	# Write the header fields.
	csvWriter.writerow(fields)

	# Write rows.
	csvWriter.writerows(rows)

	