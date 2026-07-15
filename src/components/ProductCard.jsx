import { useState } from "react";
import { FiEdit, FiSave, FiTrash2 } from "react-icons/fi";

function ProductCard({
  product,
  onUpdatePrice,
  onDelete,
  deleting,
  updating,
}) {
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    onUpdatePrice(product.id, Number(newPrice));
    setEditing(false);
  };

  return (
    <>
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

          <div className="card-actions justify-end mt-6 gap-2">

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
                  <>
                    <FiSave />
                    Save
                  </>
                )}
              </button>
            ) : (
              <button
                className="btn btn-outline btn-neutral"
                onClick={() => setEditing(true)}
              >
                <FiEdit />
                Edit
              </button>
            )}

            <button
              className="btn btn-outline btn-neutral"
              onClick={() => setShowDeleteModal(true)}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 />
                  Delete
                </>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}

      {showDeleteModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">

            <h3 className="font-bold text-2xl">
              Delete Product
            </h3>

            <p className="py-4">
              Are you sure you want to permanently delete
              <strong> "{product.title}"</strong>?
            </p>

            <div className="modal-action">

              <button
                className="btn btn-outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                className="btn btn-neutral"
                disabled={deleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  onDelete(product.id);
                }}
              >
                {deleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete
                  </>
                )}
              </button>

            </div>

          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowDeleteModal(false)}>
              Close
            </button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default ProductCard;