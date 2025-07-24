"use client";

import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function AdminItemsPage() {
  // Items
  const items = useQuery(api.items.getItems) || [];
  const createItem = useMutation(api.items.createItem);
  const updateItem = useMutation(api.items.updateItem);
  const deleteItem = useMutation(api.items.deleteItem);

  // Categories
  const categories = useQuery(api.categories.getCategories) || [];
  const createCategory = useMutation(api.categories.createCategory);
  const updateCategory = useMutation(api.categories.updateCategory);
  const deleteCategory = useMutation(api.categories.deleteCategory);

  // UI state
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [itemForm, setItemForm] = useState({
    name: "",
    price: 0,
    inventory: 0,
    description: "",
    image: "",
    ingredients: "",
    isActive: true,
    categoryId: "",
    showQty: true,
    emoji: "",
  });
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });

  // Handlers for item form
  const handleItemFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setItemForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  const handleItemFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: any = {
      ...itemForm,
      price: parseFloat(itemForm.price as any),
      inventory: parseInt(itemForm.inventory as any),
      ingredients: itemForm.ingredients.split(",").map((s: string) => s.trim()).filter(Boolean),
      isActive: Boolean(itemForm.isActive),
      showQty: itemForm.showQty,
    };
    if (!itemForm.categoryId) {
      payload.categoryId = undefined;
    }
    if (editingItem) {
      await updateItem({ id: editingItem._id, ...payload });
      setEditingItem(null);
    } else {
      await createItem(payload);
    }
    setItemForm({ name: "", price: 0, inventory: 0, description: "", image: "", ingredients: "", isActive: true, categoryId: "", showQty: true, emoji: "" });
  };
  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      price: item.price,
      inventory: item.inventory,
      description: item.description || "",
      image: item.image || "",
      ingredients: (item.ingredients || []).join(", "),
      isActive: item.isActive,
      categoryId: item.categoryId || "",
      showQty: item.showQty !== undefined ? item.showQty : true,
      emoji: item.emoji || "",
    });
  };
  const handleDeleteItem = async (id: any) => {
    if (window.confirm("Delete this item?")) {
      await deleteItem({ id });
    }
  };

  // Handlers for category form
  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };
  const handleCategoryFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingCategory) {
      await updateCategory({ id: editingCategory._id, ...categoryForm });
      setEditingCategory(null);
    } else {
      await createCategory(categoryForm);
    }
    setCategoryForm({ name: "", description: "" });
  };
  const handleEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name, description: cat.description || "" });
  };
  const handleDeleteCategory = async (id: any) => {
    if (window.confirm("Delete this category?")) {
      await deleteCategory({ id });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin: Items & Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Item Management */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <form onSubmit={handleItemFormSubmit} className="space-y-2 mb-6 bg-gray-50 p-4 rounded">
            <input name="name" value={itemForm.name} onChange={handleItemFormChange} placeholder="Name" className="w-full p-2 border rounded" required />
            <input name="price" value={itemForm.price} onChange={handleItemFormChange} placeholder="Price" type="number" step="0.01" className="w-full p-2 border rounded" required />
            <input name="inventory" value={itemForm.inventory} onChange={handleItemFormChange} placeholder="Inventory" type="number" className="w-full p-2 border rounded" required />
            <input name="image" value={itemForm.image} onChange={handleItemFormChange} placeholder="Image URL" className="w-full p-2 border rounded" />
            <input name="description" value={itemForm.description} onChange={handleItemFormChange} placeholder="Description" className="w-full p-2 border rounded" />
            <input name="ingredients" value={itemForm.ingredients} onChange={handleItemFormChange} placeholder="Ingredients (comma separated)" className="w-full p-2 border rounded" />
            <select name="categoryId" value={itemForm.categoryId} onChange={handleItemFormChange} className="w-full p-2 border rounded">
              <option value="">No Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isActive" checked={itemForm.isActive} onChange={handleItemFormChange} />
              <span>Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="showQty" checked={itemForm.showQty} onChange={handleItemFormChange} />
              <span>Show quantity controls</span>
            </label>
            <input name="emoji" value={itemForm.emoji} onChange={handleItemFormChange} placeholder="Emoji" className="w-full p-2 border rounded" />
            <button type="submit" className="bg-[#db4f43] text-white px-4 py-2 rounded cursor-pointer">
              {editingItem ? "Update Item" : "Add Item"}
            </button>
            {editingItem && (
              <button type="button" onClick={() => { setEditingItem(null); setItemForm({ name: "", price: 0, inventory: 0, description: "", image: "", ingredients: "", isActive: true, categoryId: "", showQty: true, emoji: "" }); }} className="ml-2 px-4 py-2 rounded border">Cancel</button>
            )}
          </form>
          <ul className="divide-y">
            {items.map((item: any) => (
              <li key={item._id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {item.emoji && <span className="mr-2">{item.emoji}</span>}
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">${item.price} • {item.inventory} in stock</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                  <div className="text-xs text-gray-400">Category: {categories.find(c => c._id === item.categoryId)?.name || "None"}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditItem(item)} className="px-2 py-1 rounded border text-xs cursor-pointer">Edit</button>
                  <button onClick={() => handleDeleteItem(item._id)} className="px-2 py-1 rounded border text-xs text-red-600 cursor-pointer">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Category Management */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <form onSubmit={handleCategoryFormSubmit} className="space-y-2 mb-6 bg-gray-50 p-4 rounded">
            <input name="name" value={categoryForm.name} onChange={handleCategoryFormChange} placeholder="Category Name" className="w-full p-2 border rounded" required />
            <input name="description" value={categoryForm.description} onChange={handleCategoryFormChange} placeholder="Description" className="w-full p-2 border rounded" />
            <button type="submit" className="bg-[#db4f43] text-white px-4 py-2 rounded cursor-pointer">
              {editingCategory ? "Update Category" : "Add Category"}
            </button>
            {editingCategory && (
              <button type="button" onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", description: "" }); }} className="ml-2 px-4 py-2 rounded border">Cancel</button>
            )}
          </form>
          <ul className="divide-y">
            {categories.map((cat: any) => (
              <li key={cat._id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-xs text-gray-400">{cat.description}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditCategory(cat)} className="px-2 py-1 rounded border text-xs cursor-pointer">Edit</button>
                  <button onClick={() => handleDeleteCategory((cat as any)._id)} className="px-2 py-1 rounded border text-xs text-red-600 cursor-pointer">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}