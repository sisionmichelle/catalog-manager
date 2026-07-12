function Summary({ products }) {

  const totalProducts = products.length;

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const averagePrice =
    totalProducts > 0 ? (totalPrice / totalProducts).toFixed(2) : 0;

  return (
    <div className="summary">
      <h3>Product Summary</h3>

      <p>
        <strong>Total Visible Products:</strong> {totalProducts}
      </p>

      <p>
        <strong>Average Price:</strong> ${averagePrice}
      </p>
    </div>
  );
}

export default Summary;