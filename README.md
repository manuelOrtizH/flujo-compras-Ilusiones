# Ilusiones S.A de C.V

La empresa Ilusiones S.A. de C.V. vende equipos celulares y necesita realizar compras de mercancía
a través de 2 archivos que envía la empresa matriz y que corresponden a 2 archivos: un archivo Excel
de Orden de Compras y otro archivo Excel de Recepción de Mercancía.

Caso desarrollado por Manuel Ortiz para la empresa M2CROWD

# Requisitos de instalación:

- [Python 3.10](https://www.python.org/downloads/)
- [React](https://beta.reactjs.org/learn/installation)
- Variables de entorno que correspondan a la siguiente infomación:
  - HOSTNAME: El host donde se almacena la base de datos
  - SECRET_KEY: Llave secreta para el backend
  - AWS_ACCESS_KEY_ID: La llave de acceso para el S3 Bucket
  - AWS_SECRET_ACCESS_KEY: La llave de secreta para el S3 Bucket
  - AWS_STORAGE_BUCKET_NAME: El nombre del S3 Bucket
  - REACT_API_URL: 

# Pasos de instalación

Para correr el backend, necesario activar o crear el <i>virutal environment</i>
Seguir en los siguientes pasos
  1. Correr en la terminal para activar el <i>virutal environment</i>
      ```
      source env/bin/activate
      ```
  2. Dirigirse a la carpeta de backend
  3. Instalar dependencias del backend
      ```
      python3 -r requirements.txt
      ```
  4. Correr proyecto
      ```
      python3 manage.py runserver
      ```
      
  Para correr el frontend:
   1. Instalar dependencias
      ```
      npm install
      ```
   2. Correr el proyecto
      ```
      npm run start
      ```

#Arquitectura del Proyecto


