# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import json
import requests
from flask import Flask
from flask import request
app = Flask(__name__, static_folder='static', static_url_path='')


@app.route("/")
def homepage():
    return app.send_static_file("weather.html")

@app.route("/processdata",methods=['GET'])
def processdata():

    '''
    output=request.get_json()
    print(output)
    print(type(output))
    result=json.loads(output)
    print(result)
    print(type(result))
    lat=str(result.get("lat"))
    long=str(result.get("lng"))
    print(lat)
    '''
    print("Entered")
    lat=request.args.get('lat')
    long=request.args.get('lng')
    print(lat)
    print(long)


    url1="https://api.tomorrow.io/v4/timelines?"
    url2="location="+lat+","+long
    url3="&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d,1h&apikey=sV3k0oFI7lDCyt22WxuaN6I7mxPM7hfU"
    url=url1+url2+url3





    #url = "https://api.tomorrow.io/v4/timelines?location=47.6613446,-122.0958519&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d&apikey=yB2y1JngGJdX4VwT9RPJCQQQ1LaJ3wiQ"
    headers = {
        "accept": "application/json"
    }
    response = requests.get(url, headers=headers)
    rj=response.json()

    rj1=json.dumps(rj)
    return rj1





if __name__ == "__main__":
    app.run()