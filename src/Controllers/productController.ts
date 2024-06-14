import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../Config';
import mssql from 'mssql';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { Name, Price } = req.body;
    const Id = uuidv4();

    const pool = await mssql.connect(sqlConfig);
    await pool.request()
      .input('Id', mssql.VarChar(255), Id)
      .input('Name', mssql.VarChar(255), Name)
      .input('Price', mssql.Int, Price)
      .execute('spCreateProduct');

    res.status(201).json({ message: 'Product created successfully', Id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { Name } = req.query;

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('Name', mssql.VarChar(255), Name)
      .execute('spSearchProduct');

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const paginateProducts = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('offset', mssql.Int, offset)
      .input('limit', mssql.Int, parseInt(limit as string))
      .execute('spPaginateProducts');

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, Name } = req.query;

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('minPrice', mssql.Int, parseInt(minPrice as string))
      .input('maxPrice', mssql.Int, parseInt(maxPrice as string))
      .input('Name', mssql.VarChar(255), Name || null)
      .execute('spFilterProducts');

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
