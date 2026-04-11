function UserDetails() {
    const users = [
        { id: 1, name: "Safeerkhan", email: "safeer@gmail.com", role: "Admin" },
        { id: 2, name: "Akhil", email: "akhil@gmail.com", role: "User" },
        { id: 3, name: "Rahul", email: "rahul@gmail.com", role: "User" },
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-pink-600 mb-4">
                All Users
            </h2>

            <table className="w-full border">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="text-center">
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">
                                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                                    {user.role}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetails