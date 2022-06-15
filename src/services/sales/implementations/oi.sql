SELECT
    date,
    product_id,
    quantity
FROM
    sales AS SALES
    INNER JOIN sales_products AS SALES_PRODUCTS ON SALES_PRODUCTS.sale_id = SALES.id
WHERE
    SALES.id = "1"
ORDER BY
    sale_id ASC,
    product_id ASC