"use client";
import React, { useEffect, useState } from "react";
// @ import components
import UserCard from "@/js/components/userCard";
import UserTable from "@/js/components/userTable";
import Pagination from "@/js/components/pagination";
import DeleteUser from "./components/delete-user";
import AddEditUser from "./components/Add-Edit-User";

const USERS_PER_PAGE = 5;

const UsersPage = ({ data }) => {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [usersData, setUsersData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  useEffect(() => {
    const currentUsers = usersData?.slice(
      (currentPage - 1) * USERS_PER_PAGE,
      currentPage * USERS_PER_PAGE
    );

    //  If current page becomes empty, go to previous page
    if (currentUsers?.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setUsers(currentUsers);
    }
  }, [currentPage, usersData]);

  useEffect(() => {
    setTotalPages(Math.ceil(usersData?.length / USERS_PER_PAGE));
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users?.filter((u) => u.email !== selectedUser.email));
    setUsersData(usersData?.filter((u) => u.email !== selectedUser.email));
    handleCancelDelete();
  };

  const handleCancelDelete = () => {
    setIsShowConfirm(false);
    setSelectedUser(null);
  };

  const handleAddNewUser = (data) => {
    const newUser = {
      name: {
        first: data?.name,
      },
      email: data?.email,
      gender: data?.gender,
      location: {
        city: data?.location,
      },
      picture: {
        thumbnail: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
    };

    const updatedUsers = [newUser, ...usersData];
    setUsersData(updatedUsers);
    setCurrentPage(1);
    setIsAddModal(false);
  };

  const handleEditUser = (data) => {
    const simplifiedData = {
      name: data?.name?.first,
      email: data?.email,
      location: data?.location?.city,
      gender: data?.gender,
    };
    setEditData(simplifiedData);
    setIsEditModal(true);
  };

  const handleUpdateUser = (data) => {
    const updatedUsers = usersData?.map((user) =>
      user?.email === data?.email
        ? {
            ...user,
            name: { ...user.name, first: data?.name },
            gender: data?.gender,
            location: {
              ...user.location,
              city: data?.location,
            },
          }
        : user
    );

    setUsersData(updatedUsers);
    setIsEditModal(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <button
          onClick={() => setIsAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add User
        </button>
      </div>
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDelete}
        className={"hidden md:block"}
      />
      <UserCard
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDelete}
        className={"block md:hidden"}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {isShowConfirm ? (
        <DeleteUser
          selectedUser={selectedUser}
          isShowConfirm={isShowConfirm}
          onClose={() => setIsShowConfirm(false)}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : null}
      {isAddModal ? (
        <AddEditUser
          isModal={isAddModal}
          onSubmit={handleAddNewUser}
          onClose={() => setIsAddModal(false)}
        />
      ) : null}
      {isEditModal ? (
        <AddEditUser
          isModal={isEditModal}
          editData={editData}
          onSubmit={handleUpdateUser}
          onClose={() => setIsEditModal(false)}
        />
      ) : null}
    </div>
  );
};
export default UsersPage;
