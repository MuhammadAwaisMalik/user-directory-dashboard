import React from "react";
// @ import dependencies
import Image from "next/image";

const UserCard = ({ users, className, onEdit, onDelete }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className} `}
    >
      {users?.map((user, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col items-center gap-3 text-center hover:shadow-md transition-all"
        >
          <Image
            width={100}
            height={100}
            alt={user.name.first}
            src={user.picture.large}
            className="rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm capitalize text-gray-500">{user.gender}</p>
            <p className="text-sm text-gray-400 mt-1">
              {user.location.city}, {user.location.state},{" "}
              {user.location.country}
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onEdit(user)}
              className="cursor-pointer px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm font-medium hover:bg-yellow-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(user)}
              className="cursor-pointer px-3 py-1 rounded bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
