from flask import Flask, request, jsonify, send_file
from sklearn.tree import DecisionTreeRegressor
import numpy as np
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

X = np.array([[1], [2], [3], [4], [5], [6]])
y = np.array([10, 20, 15, 30, 25, 35])

# Regresyon modelin test edilmesi
model = DecisionTreeRegressor()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    button_value = data.get('button_value')
    prediction = model.predict([[button_value]])
    return jsonify({'prediction': prediction[0]})

@app.route('/plot', methods=['POST'])
def plot():
    data = request.json
    button_values = data.get('button_values')
    predictions = model.predict(np.array(button_values).reshape(-1, 1))
    
    # Plot oluşturma
    plt.figure(figsize=(10, 6))
    plt.plot(button_values, predictions, marker='o', linestyle='-', color='b')
    plt.title('Button Values vs Predictions')
    plt.xlabel('Button Values')
    plt.ylabel('Predictions')
    plt.grid(True)
    
    # Plot'u kaydetme
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    
    # base64 formatına dönüştürme
    plot_base64 = base64.b64encode(buf.getvalue()).decode('utf8')
    
    return jsonify({'plot': plot_base64})

if __name__ == '__main__':
    app.run(debug=True)
