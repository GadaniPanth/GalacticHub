from .models import MyModels
from bs4 import BeautifulSoup
import requests

modelData = {}

def forSun():
    website = "https://en.wikipedia.org/wiki/Sun"
    data = {}
    result = requests.get(website)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    modelName = soup.find('span', class_="mw-page-title-main").text.strip()
    dataLabel = soup.findAll('th', class_='infobox-label')
    dataVal = soup.findAll('td', class_='infobox-data')
    dis = [dataVal[3].text.split('\xa0AU')[0] + 'AU', dataVal[3].text.split('\xa0AU')[1].split('km')[0] + 'km']
    data[dataLabel[3].text] = dis
    data[dataLabel[9].text] = dataVal[9].text.strip('[9]')
    data[dataLabel[10].text] = dataVal[10].text.strip()
    data[dataLabel[11].text] = dataVal[11].text.strip().split('\n')[0].replace('/s', '/s ')
    data[dataLabel[16].text] = dataVal[16].text[:-4].replace('\xa0', '')
    data[dataLabel[17].text] = [dataVal[17].text.split('[12]')[0], dataVal[17].text.split('[12]')[1].replace('\xa0', ' ').replace('[11]', '')]
    data[dataLabel[23].text] = dataVal[23].text.strip()[:-8]
    data[dataLabel[24].text] = [dataVal[24].text.strip().replace('\xa0', ' ').split('[5]')[0], dataVal[24].text.strip().replace('\xa0', ' ').split('[5]')[1].replace('[11]', '')]
    modelData[modelName] = data

def forPlanet():
    models = ["Mercury_(planet)", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]
    for i in models:
        website = f"https://en.wikipedia.org/wiki/{i}"
        data = {}
        index = 0
        result = requests.get(website)
        content = result.text
        soup = BeautifulSoup(content, 'html.parser')
        modelName = soup.find('span', class_="mw-page-title-main").text.replace('(planet)', '').strip()
        dataLabel = soup.findAll('th', class_='infobox-label')
        dataVal = soup.findAll('td', class_='infobox-data')

        model_ranges = {
            "Mercury": range(3, 6),
            "Earth": range(3, 6),
            "Venus": range(4, 7),
            "Jupiter": range(4, 7),
            "Saturn": range(4, 7),
            "Mars": range(2, 5),
            "Uranus": range(6, 9),
            "Neptune": range(6, 9),
            "Pluto": range(10, 13),
        }
        if modelName in model_ranges:
            for index in model_ranges[modelName]:
                data[dataLabel[index].text] = dataVal[index].text.replace('\xa0', ' ').split('[')[0].replace('\n', '')

        if modelName in ['Earth', 'Mars']:
            index = 8
        elif modelName == 'Mercury':
            index = 9
        elif modelName in ['Venus', 'Jupiter', 'Saturn']:
            index = 10
        elif modelName in ['Uranus', 'Neptune']:
            index = 12
        data[dataLabel[index].text] = dataVal[index].text.replace('\xa0', '').split('[')[0]

        if modelName in ['Earth', 'Mercury', 'Mars', 'Venus', 'Uranus', 'Neptune']:
            if modelName in ['Earth', 'Mercury', 'Mars']:
                index = 14
            elif modelName == 'Venus':
                index = 15
            elif modelName in ['Uranus', 'Neptune']:
                index = 18
            data[dataLabel[index].text] = dataVal[index].text
        elif modelName in ['Jupiter', 'Saturn']:
            index = 16
            if modelName == 'Saturn':
                data[dataLabel[index].text] = dataVal[index].text.split(';')[0]
            else:
                data[dataLabel[index].text] = dataVal[index].text[:-3]

        if modelName in ['Venus', 'Mercury']:
            if modelName == 'Mercury':
                index = 15
            elif modelName == 'Venus':
                index = 16
            data[dataLabel[index].text] = dataVal[index].text.split('\n')[2].replace('\xa0', ' ')
        elif modelName in ['Jupiter', 'Saturn']:
            index = 17
            if modelName == 'Jupiter':
                data[dataLabel[index].text] = dataVal[index].text.split(']')[1].replace('\xa0', ' ')
            elif modelName == 'Saturn':
                data[dataLabel[index].text] = dataVal[index].text.split('\n')[1].replace('\xa0', ' ')
        elif modelName in ['Uranus', 'Neptune', 'Mars', 'Earth']:
            if modelName in ['Uranus', 'Neptune']:
                index = 19
            else:
                index = 15
            data[dataLabel[index].text] = dataVal[index].text.split('[')[0].replace('\xa0', ' ')

        modelData[i.replace('_(planet)','')] = data

# Function to update the database
def update_database():
    for modelName, data in modelData.items():
        MyModels.objects.update_or_create(
            name=modelName,
            defaults={'data': data}
        )

# Run the web scraping and database update
def web():
    try:
        forSun()
        forPlanet()
        update_database()
        print("Web scraping completed and database updated.")
    except:
        print("Sorry!Unknown Error with DB")
