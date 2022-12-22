# @Author : Yingli Chen
# @Time   : 2022/12/21

import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import cross_val_score
from sklearn.cluster import KMeans
from sklearn.svm import SVC
import pandas as pd
import numpy as np

df = pd.read_excel('heart_data.xlsx')
scaler = StandardScaler()
df_std = scaler.fit_transform(df)

# predict the possibility of having a specific disease
labels = df_std[:, 11] # Column 11 is where diabetic data lies in
lab = LabelEncoder()
y = lab.fit_transform(labels)
print(y)
x = np.delete(df_std, 11, axis=1)
clf_svm = SVC()
predicted_svm = cross_val_score(clf_svm, x, y, cv=5, error_score='raise')
# Result of accuracy
print("svm accuracy: ", predicted_svm.mean())

# 3) Store the model
import joblib
clf_svm.fit(x, y)
joblib.dump(clf_svm, 'model.pkl') 

# 4) Load it again and test the result
clf_load = joblib.load('model.pkl') 
# x_test = [[0,16.6,1,0,0,3,30,0,0,1,0,1,3,5,1,0,1]]
# x_test = [[0, 20.34, 0, 0, 1, 0, 0, 0, 0, 6, 0, 1, 3, 7, 0, 0, 0]]
x_test = [[0, 26.58, 1, 0, 0, 20, 30, 0, 1, 3, 0, 1, 1, 8, 1, 0, 0]]
y_test = clf_load.predict(scaler.fit_transform(x_test))
print(y_test)

