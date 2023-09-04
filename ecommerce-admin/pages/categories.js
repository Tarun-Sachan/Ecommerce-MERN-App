// import Layout from "@/components/Layout";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// const Categories = () => {
//   const [editedCategory, setEditiedCategory] = useState(null);
//   const [name, setName] = useState("");
//   const [parentCategory, setParentCategory] = useState("");
//   const [Categories, setCategories] = useState("");
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     await axios.get("/api/categories").then((result) => setCategories(result.data));
//   };

//   const saveCategoryHandler = async (e) => {
//     e.preventDefault();
//     const data = { name, parentCategory };
//     // if (editedCategory) {
//     //   data._id = editedCategory._id;
//     //   await axios.put("/api/categories", data);
//     //   setEditiedCategory(null);
//     // } else {
//     //   await axios.post("/api/categories", data);
//     // }
//     await axios.post("/api/categories", data);
//     setName("");
//     fetchCategories();
//   };

//   const editCategory = (category) => {
//     setEditiedCategory(category);
//     setName(category.name);
//     setParentCategory(category.parent?._id);
//   };

//   const deleteCategoryHandler = async (category) => {
//     const { _id } = category;
//     console.log(_id);
//     //await axios.delete("api/categories?_id=" + _id);
//     //fetchCategories();
//   };
//   console.log(Categories);
//   return (
//     <Layout>
//       <h1>Categories</h1>
//       <label>
//         {editedCategory
//           ? `Edit Category ${editedCategory.name}`
//           : "Create new category"}
//       </label>
//       <form onSubmit={saveCategoryHandler} className="flex gap-1">
//         <input
//           className=" mb-0"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <select
//           className="mb-0"
//           value={parentCategory}
//           onChange={(e) => setParentCategory(e.target.value)}
//         >
//           <option value="0">No parent category</option>
//           {Categories.length > 0 &&
//             Categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//         <button type="submit" className="btn-primary py-1">
//           Save
//         </button>
//       </form>
//       <table className="basic mt-2">
//         <thead>
//           <tr>
//             <td>Category name</td>
//             <td>Parent category</td>
//           </tr>
//         </thead>
//         <tbody>
//           {Categories.length > 0 &&
//             Categories.map((category) => (
//               <tr key={category._id}>
//                 <td>{category.name}</td>
//                 <td>{category?.parent?.name}</td>
//                 <td>
//                   <div className="flex ">
//                     <button
//                       onClick={() => editCategory(category)}
//                       className="btn-primary mr-1"
//                     >
//                       Edit
//                     </button>
//                     <button className="btn-primary">Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </Layout>
//   );
// };

// export default Categories;

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [editedCategory, setEditiedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split("."),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditiedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditiedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (category) => {
    const { _id } = category;
    const res = await axios.delete("/api/categories?_id=" + _id);
    console.log(res);
    fetchCategories();
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "New Category name"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            className=""
            type="text"
            placeholder={"Category Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className=""
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
        </div>

        {properties.length > 0 &&
          properties.map((property, index) => (
            <div className="flex gap-1 mb-2" key={index}>
              <input
                className="mb-0"
                type="text"
                value={property.name}
                onChange={(e) =>
                  handlePropertyNameChange(index, property, e.target.value)
                }
                placeholder="property name (example:color)"
              />
              <input
                className="mb-0"
                onChange={(e) =>
                  handlePropertyValuesChange(index, property, e.target.value)
                }
                type="text"
                value={property.values}
                placeholder="values,comma seperated"
              />
              <button
                type="button"
                onClick={() => removeProperty(index)}
                className="btn-default"
              >
                Remove
              </button>
            </div>
          ))}
        <div className="flex gap-1">
          {editedCategory && (
            <button
              onClick={() => {
                setEditiedCategory(null);
                setEditiedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              type="button"
              className="btn-default"
            >
              cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <div className="flex ">
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-primary mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-primary"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
