import React from "react";
// @ import components
import UserForm from "../userForm";
import Modal from "@/js/components/modal";

const AddEditUser = ({ isModal, onSubmit, onClose, editData }) => {
  return (
    <Modal isOpen={isModal} onClose={onClose}>
      <UserForm onSubmit={onSubmit} editData={editData} />
    </Modal>
  );
};

export default AddEditUser;
