import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
}

interface EditModalProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditModalProps> = ({ product, onUpdate }) => {
  const [isOpen, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>({
    _id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.category,
    description: product.description
  });

  const handleEdit = () => {
    fetch(`http://localhost:5000/product/${editedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(updatedProductData => {
        onUpdate(updatedProductData);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-0">
          <HiOutlinePencilAlt className="text-lg pr-1" />
          Edit
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Bonnie"
                  value={editedProduct.name}
                  onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  value={editedProduct.brand}
                  onChange={e => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Price</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Bonnie"
                  type='number'
                  value={editedProduct.price}
                  onChange={e => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <div className="mt-1">
                <TextInput
                  id="category"
                  name="category"
                  placeholder="example@company.com"
                  value={editedProduct.category}
                  onChange={e => setEditedProduct({ ...editedProduct, category: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <div className="mt-1">
                <TextInput
                  id="description"
                  name="description"
                  placeholder="example@company.com"
                  value={editedProduct.description}
                  onChange={e => setEditedProduct({ ...editedProduct, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => {
                handleEdit()
                setOpen(false)
            }}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModal;
