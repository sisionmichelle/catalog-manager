import { useEffect, useState, useCallback } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Summary from "./components/Summary";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";
import { MdAddCircleOutline } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productResponse = await getProducts();
        const categoryResponse = await getCategories();

        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = useCallback(async (newProduct) => {
    try {
      setCreating(true);

      const response = await createProduct(newProduct);

      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      alert("Failed to create product.");
      console.error(err);
    } finally {
      setCreating(false);
    }
  }, []);

  const handleUpdatePrice = useCallback(async (id, newPrice) => {
  const oldProducts = [...products];

  const productToUpdate = products.find(
    (product) => product.id === id
  );

  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product, price: newPrice }
      : product
  );

  setProducts(updatedProducts);
  setUpdatingId(id);

  try {
    await updateProduct(id, {
      title: productToUpdate.title,
      price: newPrice,
      description: productToUpdate.description,
      categoryId: productToUpdate.category.id,
      images: productToUpdate.images,
    });
  } catch (err) {
    setProducts(oldProducts);
    alert("Update failed.");
    console.error(err);
  } finally {
    setUpdatingId(null);
  }
}, [products]);

  const handleDelete = useCallback(async (id) => {
    try {
      setDeletingId(id);

      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      product.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card bg-base-100 shadow-2xl border border-base-300 w-[420px]">

        <div className="card-body items-center text-center py-10">

          <MdInventory2
            size={80}
            className="text-neutral animate-bounce"
          />

          <h1 className="text-3xl font-bold mt-4">
            Product Catalog Manager
          </h1>

          <p className="text-base-content/60 mt-2">
            Loading products...
          </p>

          <span className="loading loading-dots loading-lg text-neutral mt-5"></span>

          <progress
            className="progress progress-neutral w-full mt-6"
          ></progress>

        </div>

      </div>

    </div>
  );
}

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="min-h-screen bg-base-200 py-10 px-4">
    <div className="max-w-7xl mx-auto">

   <div className="flex justify-center my-8">
  <div className="rounded-full border-[6px] border-black bg-base-100 px-12 py-5 shadow-lg">
   <h1 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-bold text-base-content">
  <MdInventory2 size={38} />
  <span>Product Catalog Manager</span>
</h1>
  </div>
</div>
      <div className="collapse collapse-arrow bg-base-100 shadow-md border border-base-300 mb-8">
  <input type="checkbox" />

 <div className="collapse-title text-xl font-semibold flex items-center gap-2">
  <MdAddCircleOutline size={24} />
  Create New Product
</div>

  <div className="collapse-content">
    <CreateProduct
      categories={categories}
      onCreateProduct={handleCreateProduct}
      creating={creating}
    />
  </div>
</div>
      <div className="grid md:grid-cols-2 gap-4 my-8">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      </div>

      <Summary products={filteredProducts} />
      <div className="mt-8">
        <ProductList
          products={filteredProducts}
          onUpdatePrice={handleUpdatePrice}
          onDelete={handleDelete}
          deletingId={deletingId}
          updatingId={updatingId}
        />
      </div>

    </div>
  </div>
);
    
}

export default App;