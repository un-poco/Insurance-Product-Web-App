from flask import Flask
from flask import jsonify, request

app = Flask(__name__)
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

def getInfo(req):
    """
    Info includes: 
    BMI, Smoking, AlcoholDrinking, Stroke, DiffWalking, 
    Sex, AgeCategory, Race, Physical Activity, GenHealth, SleepTime
    """
    BMI = req['BMI']
    Smoking = 1 if req['Smoking'] else 0
    AlcoholDrinking = 1 if req['AlcoholDrink'] else 0
    Stroke = 1 if req['Stroke'] else 0
    DiffWalking = 1 if req['DiffWalking'] else 0
    Sex = 1 if req['Sex'] == 'Male' else 2
    import datetime
    cur_year = datetime.datetime.today().year
    AgeCategory = getAgeCat(int(cur_year - req['year']))
    Race = getRace(req['Race'])
    PhysicalActivity = req['PhysicalActivity']
    GenHealth = req['GenHealth']
    SleepTime = req['SleepTime']

    info = [BMI, Smoking, AlcoholDrinking, Stroke, DiffWalking,
    Sex, AgeCategory, Race, PhysicalActivity, GenHealth, SleepTime]

    return info

def predict():
    return 0.5
@app.route('/price', methods=['POST'])
def calculatePrice():
    req = request.json
    print(req)
    # print(req['diseasesState']['smoking'] == False)
    # print(type(req))
    price, k, inc = 0, 100, 0

    for dis, status in req['diseasesState'].items():
        if status: 
            # The customer has this disease
            inc += 1 
        else:
            # The customer hasn't had this disease yet, 
            # then predict whether he/she may have it in the future
            # inc += predict(dis)
            pass
    # Decide the prices for insurance plans
    if req['plan'] == 0:
        price = 2000 + inc * k
    elif req['plan'] == 1:
        price = 5000 + inc * k
    elif req['plan'] == 2:
        price = 10000 + inc * k

    return jsonify({
        'price': price
    })


if __name__ == '__main__':
    app.run()
    debug=True
