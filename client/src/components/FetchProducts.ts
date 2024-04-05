import {useState} from "react"

const [products, setProducts] = useState([]);

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/product');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      throw new Error(error.message);
    }
  };