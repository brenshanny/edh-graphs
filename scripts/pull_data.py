import gspread
import pprint
import csv
import os

def log(message):
  pprint.PrettyPrinter().pprint(message)

log("Connecting to service account...")
connection = gspread.service_account(filename=os.environ["GSPREAD_SA_KEY"])

log("Successfully connected.")
log("Opening up EDH Tracker sheet...")

spreadsheet = connection.open("EDH Tracker")
stats_worksheet = spreadsheet.worksheet("Simple Game Log")

log("Successfully opened  EDH Tracker sheet.")

games = stats_worksheet.get_all_values()


log("Successfully pulled game data.")

log("creating new csv")
with open('new_stats.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows(games)
log("finished creating csv!")
