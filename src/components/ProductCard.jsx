import { useState } from "react";

function ProductCard({
  product,
  onUpdatePrice,
  onDelete,
  deleting,
  updating,
}) {
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);

  const handleSave = () => {
    onUpdatePrice(product.id, Number(newPrice));
    setEditing(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">

      <figure className="h-60 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {product.title}
        </h2>

        <div className="badge badge-primary badge-outline">
          {product.category.name}
        </div>

        <div className="mt-4">

          <p className="font-semibold mb-2">
            Price
          </p>

          {editing ? (
            <input
              type="number"
              className="input input-bordered w-full"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          ) : (
            <p className="text-xl font-bold">
              ${product.price}
            </p>
          )}

        </div>

        <div className="card-actions justify-end mt-6">

          {editing ? (
            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={updating}
            >
              {updating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          ) : (
            <button
              className="btn btn-outline btn-neutral"
              onClick={() => setEditing(true)}
            >
              Edit Price
            </button>
          )}

         <button
  className="btn btn-outline btn-error"
  onClick={() => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (confirmDelete) {
      onDelete(product.id);
    }
  }}
  disabled={deleting}
>
  {deleting ? (
    <>
      <span className="loading loading-spinner loading-sm"></span>
      Deleting...
    </>
  ) : (
    <>
      
      Delete
    </>
  )}
</button>
        
        </div>

      </div>

    </div>
  );
}

export default ProductCard;