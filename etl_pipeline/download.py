from bs4 import BeautifulSoup
import requests
import re
from urllib.request import urlretrieve
from pathlib import Path
import os

os.makedirs("/app/data", exist_ok=True)

def getHTMLdocument(url):
    response = requests.get(url)
    return response.text

def download_data():
    url_to_scrape = "https://data.gov.tw/dataset/139700"

    html_doc = getHTMLdocument(url_to_scrape)

    soup = BeautifulSoup(html_doc, 'lxml')

    datasets = []

    for link in soup.find_all('a', attrs={'href': re.compile("^https://data.ntpc.gov.tw/api/datasets/")}):
        datasets.append(link.get('href'))

    try:
        for dataset in datasets:
            filename = re.findall("(?<=https://data.ntpc.gov.tw/api/datasets/).*?(?=/csv/file)", dataset)[0]

            if not Path(f"/app/data/{filename}").exists():
                query_parameters = {"downloadformat": "csv"}
                response = requests.get(dataset, params=query_parameters)

                with open(f"/app/data/{filename}", mode="wb") as file:
                    file.write(response.content)

            return filename

        print("Download completed successfully.")
    except:
        print("Download failed")
