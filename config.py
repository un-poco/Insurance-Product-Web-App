import os

DIALECT = 'mysql'
DRIVER = 'pymysql'
USERNAME = 'YingliChen'
PASSWORD = 'ChenDong'
HOST = 'healthcareprojectserver.database.windows.net'
DATABASE = 'Database'

SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}/{}?charset=utf8".format(DIALECT, DRIVER, USERNAME,
                                                                    PASSWORD, HOST, DATABASE)
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.urandom(24)