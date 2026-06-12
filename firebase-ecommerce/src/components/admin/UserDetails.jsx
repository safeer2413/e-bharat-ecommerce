import { useContext } from "react";
import MyContext from "../../context/MyContext";

function UserDetails() {
    const context = useContext(MyContext);
    const users = context.allUsers;

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
                    {users.sort((a, b) => {
                        if (a.role === "admin") return -1;
                        if (b.role === "admin") return 1;
                        return 0;
                    })
                        .map((user, index) => (
                            <tr key={user.id} className="text-center">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border font-semibold">{user.name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">
                                    <span
                                        className={`py-1 rounded-full px-3 ${user.role === "admin"
                                            ? "bg-pink-600 text-white font-semibold"
                                            : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
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