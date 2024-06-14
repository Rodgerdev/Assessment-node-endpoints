USE ProductStore;

CREATE OR ALTER PROCEDURE spSearchProduct
  @Name VARCHAR(255)
AS
BEGIN
  SELECT * FROM products WHERE Name = @Name;
END
