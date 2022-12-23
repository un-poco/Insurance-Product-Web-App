from flask import Flask
from flask import jsonify, request
import joblib

app = Flask(__name__)
scaler = joblib.load('insurance_client/machine-learning-modules/scaler')
clf_asthma = joblib.load('insurance_client/machine-learning-modules/model_asthma.pkl') 
clf_diabet = joblib.load('insurance_client/machine-learning-modules/model_diabet.pkl') 
clf_heart = joblib.load('insurance_client/machine-learning-modules/model_heart.pkl') 
clf_stroke = joblib.load('insurance_client/machine-learning-modules/model_stroke.pkl') 

def getRace(race):
    if race == 'White':
        return 1
    elif race == 'Black':
        return 2
    elif race == 'Asian':
        return 3
    elif race == 'American Indian/Alaskan Native':
        return 4
    elif race == 'Other':
        return 5

def getAgeCat(age):
    if 18 <= age <= 24:
        return 1
    elif 25 <= age <= 29:
        return 2
    elif 30 <= age <= 34:
        return 3
    elif 35 <= age <= 39:
        return 4
    elif 40 <= age <= 44:
        return 5
    elif 45 <= age <= 49:
        return 6
    elif 50 <= age <= 54:
        return 7
    elif 55 <= age <= 59:
        return 8
    elif 60 <= age <= 64:
        return 9
    elif 65 <= age <= 69:
        return 10
    elif 70 <= age <= 74:
        return 11
    elif 75 <= age <= 79:
        return 12
    else:
        return 13

def getGenHealth(genHealth):
    if genHealth == 'Excellent':
        return 5
    elif genHealth == 'Very Good':
        return 4
    elif genHealth == 'Good':
        return 3
    elif genHealth == 'Fair':
        return 2
    else:
        return 1

def getInfo(req):
    """
    Info includes: 
    BMI, Smoking, AlcoholDrinking, Stroke, DiffWalking, 
    Sex, AgeCategory, Race, Physical Activity, GenHealth, SleepTime
    """
    BMI = req['BMI']
    Smoking = 1 if req['diseasesState']['smoking'] else 0
    AlcoholDrinking = 1 if req['diseasesState']['AlcoholDrink'] else 0
    DiffWalking = 1 if req['walk'] else 0
    Sex = 1 if req['sex'] == 'Male' else 2
    import datetime
    cur_year = datetime.datetime.today().year
    AgeCategory = getAgeCat(int(cur_year - int(req['year'])))
    Race = getRace(req['race'])
    PhysicalActivity = 1 if req['physical'] else 0
    GenHealth = getGenHealth(req['health'])
    SleepTime = req['SleepTime']

    info = [BMI, Smoking, AlcoholDrinking, DiffWalking,
    Sex, AgeCategory, Race, PhysicalActivity, GenHealth, SleepTime]

    return info

@app.route('/price', methods=['POST'])
def calculatePrice():
    req = request.json
    info = getInfo(req)

    price, k, inc = 0, 100, 0

    if req['diseasesState']['Stroke']:
        # The customer has this disease
        inc += 1 
    else:
        # if hasn't had it yet, then predict whether may have it in the future
        inc += clf_stroke.predict(scaler.transform([info]))

    if req['diseasesState']['Diabetes']:
        inc += 1 
    else:
        inc += clf_diabet.predict(scaler.transform([info]))

    if req['diseasesState']['asthma']:
        inc += 1 
    else:
        inc += clf_asthma.predict(scaler.transform([info]))

    if req['diseasesState']['hd']:
        inc += 1 
    else:
        inc += clf_heart.predict(scaler.transform([info]))

    # Decide the prices for insurance plans
    if req['plan'] == 0:
        price = 2000 + int(inc * k)
    elif req['plan'] == 1:
        price = 5000 + int(inc * k)
    elif req['plan'] == 2:
        price = 10000 + int(inc * k)

    return jsonify({
        'price': price
    })


if __name__ == '__main__':
    app.run()
    debug=True
