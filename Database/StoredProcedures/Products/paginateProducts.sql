USE ProductStore;

CREATE OR ALTER PROCEDURE spPaginateProducts
  @offset INT,
  @limit INT
AS
BEGIN
  SELECT * FROM products
  ORDER BY Name
  OFFSET @offset ROWS
  FETCH NEXT @limit ROWS ONLY;
END
