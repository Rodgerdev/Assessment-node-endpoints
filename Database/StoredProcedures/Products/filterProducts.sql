USE ProductStore;

CREATE OR ALTER PROCEDURE spFilterProducts
  @minPrice INT,
  @maxPrice INT,
  @Name VARCHAR(255)
AS
BEGIN
  SELECT * FROM products
  WHERE Price BETWEEN @minPrice AND @maxPrice
  AND (@Name IS NULL OR Name = @Name);
END
