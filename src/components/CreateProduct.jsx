import { useState } from "react";

function CreateProduct({ categories, onCreateProduct, creating }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: Number(price),
      description: "New Product",
      categoryId: Number(categoryId),
      images: [imageUrl],
    };

    onCreateProduct(newProduct);

    setTitle("");
    setPrice("");
    setCategoryId("");
    setImageUrl("");
  };

  return (
   
  <form onSubmit={handleSubmit} className="space-y-4">
       
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Product Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select
            className="select select-bordered w-full"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-neutral w-full"
            disabled={creating}
          >
            {creating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </button>

        </form>
      </form>
  );
}

export default CreateProduct;