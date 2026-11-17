from bs4 import BeautifulSoup
import requests
import re
from urllib.request import urlretrieve

def getHTMLdocument(url):
    response = requests.get(url)
    return response.text

url_to_scrape = "https://data.gov.tw/dataset/139700"

html_doc = getHTMLdocument(url_to_scrape)

soup = BeautifulSoup(html_doc, 'lxml')

datasets = []

for link in soup.find_all('a', attrs={'href': re.compile("^https://data.ntpc.gov.tw/api/datasets/")}):
    datasets.append(link.get('href'))

try:
    for dataset in datasets:
        filename = re.findall("(?<=https://data.ntpc.gov.tw/api/datasets/).*?(?=/csv/file)", dataset)[0]
        query_parameters = {"downloadformat": "csv"}
        response = requests.get(dataset, params=query_parameters)

        with open(f"./data/{filename}", mode="wb") as file:
            file.write(response.content)
    print("Download completed successfully.")
except:
    print("Download failed")
