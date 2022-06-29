#Importamos las librerias y la carpeta de nuestros elementos
import os
import numpy as np
from flask import Flask, jsonify, make_response, render_template, request
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

#inicializamos nuestra aplicación
app = Flask(__name__)
#clave secreta
app.secret_key = "s3cr3t"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

#decorador de ruta, nos dirige a la subpage principal 'index'
@app.route("/", methods=["GET"])
def index():
    """
    función index con méttodo GET que mostrarará nuestro canva
    
    Parameters
    -----------

    Return
    -----------
    devuelve la subpage index que se encuetra en la carpeta template
    """
    return render_template("layouts/blockHopper.html")

#Main de la app
if __name__ == "__main__":
    app.run(debug=True)
