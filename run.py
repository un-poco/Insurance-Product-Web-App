from flask import Flask
from flask import jsonify, request

app = Flask(__name__)

@app.route('/price', methods=['POST'])
def calculatePrice():
    req = request.json
    price = 0
    if req['plan'] == 0:
        price = 2000
    elif req['plan'] == 1:
        price = 5000
    elif req['plan'] == 2:
        price = 10000
    return jsonify({
        'price': price
    })


if __name__ == '__main__':
    app.run()
    debug=True
