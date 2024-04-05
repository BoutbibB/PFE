import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react'; 
import { HiOutlinePencilAlt } from 'react-icons/hi';

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
}

interface EditModalProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditModalProps> = ({ user, onUpdate }) => {
  const [isOpen, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({
    _id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
  });

  const handleEdit = () => {
    fetch(`http://localhost:5000/user/${editedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then(updatedUserData => {
        onUpdate(updatedUserData);
        setOpen(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Edit
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit user</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                  value={editedUser.name}
                  onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                  value={editedUser.email}
                  onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="mt-1">
                <TextInput
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                  value={editedUser.address}
                  onChange={e => setEditedUser({ ...editedUser, address: e.target.value })}
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

export default EditUserModal;
