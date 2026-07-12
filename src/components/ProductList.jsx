import ProductCard from "./ProductCard";

function ProductList({
  products,
  onUpdatePrice,
  onDelete,
  deletingId,
  updatingId,
}) {
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