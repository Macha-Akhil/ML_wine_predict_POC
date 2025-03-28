# from flask import Flask, request, jsonify
# import pandas as pd
# import pickle
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, origins="http://localhost:5173")


# # Load the trained model and column names
# with open('wine_quality_model.pkl', 'rb') as f:
#     model = pickle.load(f)

# with open('columns.pkl', 'rb') as f:
#     columns = pickle.load(f)

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get JSON data from request
#         data = request.get_json()
#         print("Received data:", data)

#         # Convert to DataFrame and ensure correct column order
#         input_data = pd.DataFrame([data], columns=columns)
        
#         predict= model.predict(7.4,0.7,0,1.9,0.0076,11,34,0.9978,3.51,0.56,9.4)
#         print(predict)

#         # Make prediction
#         # prediction = model.predict(input_data)

#         # Return response
#         # return jsonify({'prediction': int(prediction[0])})
#         return jsonify({'prediction': int(predict)})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

# Load dataset
# df = pd.read_csv('./csvfile/WineQT.csv')
csv_file_path = os.path.join(os.path.dirname(__file__), 'csvfile', 'WineQT.csv')
df = pd.read_csv(csv_file_path)


# Prepare input and target
X = df.drop(['quality', 'Id'], axis=1)
y = df['quality']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        print("Received data:", data)

        # # Convert to DataFrame
        # input_data = pd.DataFrame([data])

        # # Ensure column order matches training data
        # input_data = input_data[X.columns]

        # # Make prediction
        # prediction = model.predict(input_data)

        # # Return response
        # return jsonify({'prediction': int(prediction[0])})
         # Rename keys to match model training data
        column_mapping = {
            "fixedAcidity": "fixed acidity",
            "volatileAcidity": "volatile acidity",
            "citricAcid": "citric acid",
            "residualSugar": "residual sugar",
            "chlorides": "chlorides",
            "freeSulfurDioxide": "free sulfur dioxide",
            "totalSulfurDioxide": "total sulfur dioxide",
            "density": "density",
            "pH": "pH",
            "sulphates": "sulphates",
            "alcohol": "alcohol"
        }

        # Convert JSON to DataFrame and rename columns
        input_data = pd.DataFrame([data])
        input_data.rename(columns=column_mapping, inplace=True)

        # Ensure correct column order
        input_data = input_data[X.columns]
        print("Input data for prediction:", input_data)

        # Make prediction
        prediction = model.predict(input_data)

        # Return response
        return jsonify({'prediction': int(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
