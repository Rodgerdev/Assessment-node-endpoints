USE ProductStore;

CREATE OR ALTER PROCEDURE spCreateProduct
  @Id VARCHAR(255),
  @Name VARCHAR(255),
  @Price INT
AS
BEGIN
  INSERT INTO products (Id, Name, Price)
  VALUES (@Id, @Name, @Price);
END
