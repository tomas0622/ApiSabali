-- init.sql: crea tablas y datos de prueba para SabaliFlow (SQL Server)
-- Si la base de datos no existe la crea, luego crea tablas y datos de ejemplo.

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'SabaliFlow')
BEGIN
    CREATE DATABASE [SabaliFlow];
END;
GO

USE [SabaliFlow];
GO

-- Limpiar tablas si ya existen (orden por dependencias)
DROP TABLE IF EXISTS DetalleVenta;
DROP TABLE IF EXISTS Venta;
DROP TABLE IF EXISTS DetalleInsumoProveedor;
DROP TABLE IF EXISTS Movimiento;
DROP TABLE IF EXISTS Insumo;
DROP TABLE IF EXISTS Proveedor;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Usuario;
GO

-- Tabla Usuario
CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(100) NOT NULL UNIQUE,
    contrasena NVARCHAR(200) NOT NULL,
    rol NVARCHAR(50) NOT NULL
);
GO

-- Tabla Cliente
CREATE TABLE Cliente (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    primerApellido NVARCHAR(100) NULL,
    segundoApellido NVARCHAR(100) NULL,
    direccion NVARCHAR(250) NULL,
    telefono NVARCHAR(50) NULL
);
GO

-- Tabla Proveedor
CREATE TABLE Proveedor (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    direccion NVARCHAR(250) NULL,
    telefono NVARCHAR(50) NULL
);
GO

-- Tabla Insumo
CREATE TABLE Insumo (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(500) NULL
);
GO

-- Tabla DetalleInsumoProveedor
CREATE TABLE DetalleInsumoProveedor (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idInsumo INT NOT NULL,
    idProveedor INT NOT NULL,
    precioUnitario DECIMAL(12,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    CONSTRAINT FK_DIP_Insumo FOREIGN KEY (idInsumo) REFERENCES Insumo(id),
    CONSTRAINT FK_DIP_Proveedor FOREIGN KEY (idProveedor) REFERENCES Proveedor(id)
);
GO

-- Tabla Venta
CREATE TABLE Venta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idCliente INT NULL,
    idUsuario INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    totalVenta DECIMAL(12,2) NOT NULL,
    CONSTRAINT FK_Venta_Cliente FOREIGN KEY (idCliente) REFERENCES Cliente(id),
    CONSTRAINT FK_Venta_Usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);
GO

-- Tabla DetalleVenta
CREATE TABLE DetalleVenta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idVenta INT NOT NULL,
    idInsumo INT NOT NULL,
    cantidad INT NOT NULL,
    CONSTRAINT FK_DV_Venta FOREIGN KEY (idVenta) REFERENCES Venta(id),
    CONSTRAINT FK_DV_Insumo FOREIGN KEY (idInsumo) REFERENCES Insumo(id)
);
GO

-- Tabla Movimiento
CREATE TABLE Movimiento (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tabla NVARCHAR(150) NOT NULL,
    idRegistro INT NULL,
    operacion NVARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE()
);
GO

------------------------------------------------------------
-- DATOS DE PRUEBA (TODO EN UNICODE N'...')
------------------------------------------------------------

-- Usuarios
INSERT INTO Usuario (username, contrasena, rol) VALUES
(N'admin', N'admin123', N'ADMIN'),
(N'vendedor', N'vendedor123', N'VENDEDOR');

-- Clientes
INSERT INTO Cliente (nombre, primerApellido, segundoApellido, direccion, telefono) VALUES
(N'Juan', N'Pérez', N'Gómez', N'Calle 45 #12-34, Medellín', N'3115550101'),
(N'María', N'López', N'Ramírez', N'Carrera 10 #5-20, Bogotá', N'3125550202'),
(N'Carlos', N'González', N'Ramírez', N'Calle 20 #7-90, Cali', N'3135550303');

-- Proveedores
INSERT INTO Proveedor (nombre, direccion, telefono) VALUES
(N'Alimentos del Valle SAS', N'Zona Industrial, Cali', N'6025551001'),
(N'Distribuciones Andina S.A.', N'Polígono Logístico, Bogotá', N'6015552002');

-- Insumos
INSERT INTO Insumo (nombre, descripcion) VALUES
(N'Tela Algodón 1m', N'Tela de algodón por metro - 1.50m de ancho aprox.'),
(N'Hilo Poliéster Cono 1kg', N'Hilo de poliéster para coser - cono 1kg'),
(N'Botones Pack 100u', N'Pack de 100 botones plásticos diversos'),
(N'Cremallera 20cm', N'Cremallera nylon 20 centímetros'),
(N'Tinta Textil 1L', N'Tinta pigmentada para serigrafía 1 litro'),
(N'Elástico 1m', N'Elástico tubular 1 metro');

-- Precios por proveedor
INSERT INTO DetalleInsumoProveedor (idInsumo, idProveedor, precioUnitario, stock) VALUES
(1, 1, 15000.00, 500),
(2, 1, 8000.00, 200),
(3, 2, 5000.00, 1000),
(4, 2, 3500.00, 800),
(5, 1, 22000.00, 150),
(6, 2, 1200.00, 2000);

-- Crear venta de ejemplo
DECLARE @ventaTotal DECIMAL(12,2);
SET @ventaTotal = (15000.00 * 3) + (5000.00 * 2);

INSERT INTO Venta (idCliente, idUsuario, fecha, totalVenta) 
VALUES (1, 2, GETDATE(), @ventaTotal);

DECLARE @idVenta INT = SCOPE_IDENTITY();

-- Detalles de venta
INSERT INTO DetalleVenta (idVenta, idInsumo, cantidad) VALUES
(@idVenta, 1, 3),
(@idVenta, 3, 2);

-- Movimientos
INSERT INTO Movimiento (tabla, idRegistro, operacion) VALUES
(N'Venta', @idVenta, N'INSERT'),
(N'DetalleVenta', @idVenta, N'INSERT');

-- Otra venta
INSERT INTO Venta (idCliente, idUsuario, fecha, totalVenta) 
VALUES (2, 2, DATEADD(day, -2, GETDATE()), 36000.00);

DECLARE @v2 INT = SCOPE_IDENTITY();

INSERT INTO DetalleVenta (idVenta, idInsumo, cantidad) 
VALUES (@v2, 1, 2), (@v2, 2, 1);

INSERT INTO Movimiento (tabla, idRegistro, operacion) 
VALUES (N'Venta', @v2, N'INSERT');

-- Verificación
SELECT TOP 10 * FROM Usuario;
SELECT TOP 10 * FROM Cliente;
SELECT TOP 10 * FROM Proveedor;
SELECT TOP 10 * FROM Insumo;
SELECT TOP 10 * FROM DetalleInsumoProveedor;
SELECT TOP 10 * FROM Venta;
SELECT TOP 10 * FROM DetalleVenta;
SELECT TOP 10 * FROM Movimiento;
GO
