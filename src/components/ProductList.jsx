import ProductCard from "./ProductCard";

function ProductList({
  products,
  onUpdatePrice,
  onDelete,
  deletingId,
  updatingId,
}) {
  if (products.length === 0) {
  return (
    <div className="alert alert-info shadow-md">
      <span>No products found. Try a different search or category.</span>
    </div>
  );
}
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onUpdatePrice={onUpdatePrice}
          onDelete={onDelete}
          deleting={deletingId === product.id}
          updating={updatingId === product.id}
        />
      ))}
    </div>
  );
}

export default ProductList;