CREATE DATABASE redesApi;

--/login, /usuarios, /vehiculos, /clientes.

CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL
);

CREATE TABLE vehiculos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    duenho INT NOT NULL,
    marca VARCHAR(50) NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    FOREIGN KEY (duenho) REFERENCES usuarios(id)
);

CREATE TABLE clientes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario INT NOT NULL,
    FOREIGN KEY(usuario) REFERENCES usuarios(id)
);