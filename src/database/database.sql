//primero se crea la base de datos
CREATE DATABASE prueba2;

//despues se entra a la base de datos mediante el terminal de postgres con el comand \c prueba2 y se ejecuta los bloques de codigo

CREATE TABLE departamento(
    codigo integer PRIMARY KEY,
    nombre VARCHAR (100),
    presupuesto DOUBLE PRECISION
);

CREATE TABLE empleados(
    codigo integer PRIMARY KEY,
    nif varchar(9),
    nombre varchar(100),
    apellido1 varchar(100),
    apellido2 varchar(100),
	codigodepartamento integer,
    FOREIGN KEY (codigodepartamento) REFERENCES departamento (codigo)
);