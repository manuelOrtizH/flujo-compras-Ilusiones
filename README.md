# Ilusiones S.A de C.V

La empresa Ilusiones S.A. de C.V. vende equipos celulares y necesita realizar compras de mercancía
a través de 2 archivos que envía la empresa matriz y que corresponden a 2 archivos: un archivo Excel
de Orden de Compras y otro archivo Excel de Recepción de Mercancía.

Caso desarrollado por Manuel Ortiz para la empresa M2CROWD

Estructura del proyecto:
  -Backend: Django.
  -Frontend: React.
  -Base de datos: MongoDB Atlas Cluster.
  -Python: Lenguaje de programación utilizado en el backend.
  -JavaScript: Lenguaje de programación utilizado en el frontend.
  -AWS: Infrastructura de AWS para elementos del proyecto 



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

# Arquitectura del Proyecto

[Diagrama](https://m2crowd-ilusiones-bucket1.s3.us-west-1.amazonaws.com/Screenshot%202023-01-31%20at%2016.04.57.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIQC4OZrPAonMZzQOW5EQ8ECkS%2BdnIZEvYLeytB68i0kNQQIgL05FoAUe6UUlhGCRqRXnCatLZhHzON%2BOL1g1Cecr6egq7QIIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2NjgxNjg2NDM4MzgiDKmSaRRJyUcz2UNjzSrBAnzkD%2FGxVwYVKLAj%2BKuLlsewdPaSQo5taSNSxhg5vQklp%2FFdmMNZId0ccOkXgB6azlhVyzu%2FJSyN3jUTgYQ6wzHh0T1dd2KOlgGz%2Frspg3cI39RlGrDKF%2FxpCOo9rmuOcOA8mUyGAHpshqehB8VI5%2BPwOkYzj4DO%2BE%2BrVv%2BiN9HFm10lTSvbtnpagbKbObB92FddzYdSDvebYTVwBpUSBvh43PL3p8YTcOSiUnd2c83PSa%2BZHH0s12uGznerSFXtqqdCclKsSA3%2BktoIawFpkSiy%2F4iYTelTh8N%2BLvRA5TVnnbKYy9xVBWyeo%2BZJEP1EuUGEAqswaaKGA2%2BwjIkkS9MI9Fpke1KsVJg0HL6yqXS8nqwgV3BIn5xmG9%2F6rQ1L2OXeOKPddn10y5fi44qcVQiilD3EnrSLjwAG9j5c%2FOV6tTD%2Fl%2BaeBjqzAjeGHJhWsRQOX9oJNgrxA10wcJEsranx7hRZx7hh2QXOGzE9iVhrAWkuE2wn4xTjOmfxCYrzB7yRnNP9jAjydxoyjEXH2ZH8Le%2BpdR758wSxSTKkr6cedphM8x5XleI3E8oF3qbsZt7Uu%2BqO5YHHkAeEfiT6qdC2b9THZJYuakl2VKz3mEsuvPIkBuB%2FA96OF0uj2jwTg1s3b1saPZP0oQmI0g0L7zFcajGqkw%2F7m893p%2BXk0izojB0MXBbwumvyX2zI4Ldm8jlw34UsGuGAOFTk5dIA84cjo1hwt9wWts%2FkQOvvbJMc1xwd3%2BD65Nndu2%2Bk8RhFqArUWrS7NsHV52ynmE6DyV%2ByYlnpuez3rDWVsbphXfTTu%2FoKHeaZpYU6kXE%2BC4YP639wGkcrURv6%2BExys9g%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230131T220624Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZXEPUMT7B7B7VJBC%2F20230131%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=fc3c19938942b0f2ceb83cbc9759da73095267d5104567639f083f6e8a0b5d43)


