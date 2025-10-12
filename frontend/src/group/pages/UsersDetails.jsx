import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5551/api/users"); // change to admin endpoint if needed
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5551/api/admin/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit page, or open modal
    window.location.href = `/admin/edit-user/${id}`;
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#6B4226] text-[#F5EFE6]">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Active</th>
              <th className="border p-2">Joined On</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className={`border p-2 ${user.isActive ? "text-[#D9A066]" : "text-[#A37C50]"}`}>
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="border p-2 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-[#D9A066] text-[#3B2F2F] p-2 rounded hover:bg-[#C18F58]"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-[#6B4226] text-[#F5EFE6] p-2 rounded hover:bg-[#5C3A21]"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
