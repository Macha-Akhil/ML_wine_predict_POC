import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import os

# Load dataset
# Construct the absolute path to the CSV file
csv_file_path = os.path.join(os.path.dirname(__file__), 'csvfile', 'WineQT.csv')

# Load the dataset
df = pd.read_csv(csv_file_path)

# Prepare input and target
X = df.drop(['quality', 'Id'], axis=1)
y = df['quality']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model
with open('wine_quality_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Save the column order
with open('columns.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)

print("Model and columns saved successfully!")
