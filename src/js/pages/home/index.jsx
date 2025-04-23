"use client";
import React, { useState } from "react";
// @ import components
import UsersPage from "../user-page";
import SearchBar from "@/js/components/searchBar";
import FilterDropdown from "@/js/components/filterDropdown";

const HomePage = ({ data }) => {
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = data?.filter((user) => {
    const matchesSearch =
      user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter ? user.gender === filter : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          User Directory Dashboard
        </h1>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FilterDropdown filter={filter} setFilter={setFilter} />
          </div>

          <UsersPage data={filteredUsers} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
