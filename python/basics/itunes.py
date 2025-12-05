import sys, requests, json

if len(sys.argv) != 2:
    sys.exit()

res = requests.get("https://itunes.apple.com/search?entity=song&limit=21&term=" + sys.argv[1])
results = res.json()
allResults = results["results"]

for result in allResults:
    print(result["trackName"])