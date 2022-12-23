# @Author : Yingli Chen
# @Time   : 2022/12/21

import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import cross_val_score
from sklearn.cluster import KMeans
from sklearn.svm import SVR
import pandas as pd
import numpy as np

df = pd.read_excel('encoded_data.xlsx')
df = np.array(df)

x = np.delete(df, slice(10, 14), axis=1)
scaler = StandardScaler()
x = scaler.fit_transform(x)

# predict the possibility of having a specific disease
y_asthma = df[:, 10]
y_heart = df[:, 11]
y_diabet = df[:, 12]
y_stroke = df[:, 13]

clf_asthma = SVR()
clf_heart = SVR()
clf_diabet = SVR()
clf_stroke = SVR()
predicted_svm_asthma = cross_val_score(clf_asthma, x, y_asthma, cv=5, error_score='raise')
predicted_svm_heart = cross_val_score(clf_asthma, x, y_heart, cv=5, error_score='raise')
predicted_svm_diabet = cross_val_score(clf_asthma, x, y_diabet, cv=5, error_score='raise')
predicted_svm_stroke = cross_val_score(clf_asthma, x, y_stroke, cv=5, error_score='raise')

# # Result of accuracy 
# print("svm accuracy for predicting Asthma: ", predicted_svm_asthma.mean())
# print("svm accuracy for predicting Heart Disease: ", predicted_svm_heart.mean())
# print("svm accuracy for predicting Diabet: ", predicted_svm_diabet.mean())
# print("svm accuracy for predicting Stroke: ", predicted_svm_stroke.mean())

# 3) Store the model
import joblib
clf_asthma.fit(x, y_asthma)
clf_heart.fit(x, y_heart)
clf_diabet.fit(x, y_diabet)
clf_stroke.fit(x, y_stroke)

joblib.dump(scaler, 'scaler') # store the scaler
joblib.dump(clf_asthma, 'model_asthma.pkl') 
joblib.dump(clf_heart, 'model_heart.pkl') 
joblib.dump(clf_diabet, 'model_diabet.pkl') 
joblib.dump(clf_stroke, 'model_stroke.pkl') 

# 4) Load it again and test the result
clf_load = joblib.load('model_asthma.pkl') 
scaler = joblib.load('scaler')
x_test = [[20.34,	0,	0,	0,	2,	13,	1,	1,	4,	7]]
y_test = clf_load.predict(scaler.transform(x_test))
print(y_test)

