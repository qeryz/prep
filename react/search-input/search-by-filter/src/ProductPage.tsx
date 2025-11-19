import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import { useDebounce } from "./hooks/useDebounce";

const mockUsers: User[] = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    status: "Pending",
  },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", status: "Active" },
];

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
}

interface Filters {
  name: string;
  status: User["status"] | "All";
}

const filterUsers = (users: User[], filters: Filters) => {
  const { name, status } = filters;
  let filteredUsers: User[] = [...users];

  if (name.length > 0) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(name.toLowerCase()) ||
        user.email.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (status !== "All") {
    filteredUsers = filteredUsers?.filter((user) => user.status === status);
  }

  return filteredUsers;
};

const ProductPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<Filters["name"]>("");
  const [status, setStatus] = useState<Filters["status"]>("All");
  const debouncedName = useDebounce(name, 500);

  const filters: Filters = useMemo(
    () => ({
      name: debouncedName,
      status: status,
    }),
    [debouncedName, status]
  );

  const filteredUsers = useMemo(
    () => filterUsers(users, filters),
    [users, filters]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const res: User[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUsers);
        }, 300);
      });
      setUsers(res);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setStatus(value as Filters["status"]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="search-box-results">
        <div className="search-input-wrapper">
          <label htmlFor="name-input">Name</label>
          <input
            className="search-bar"
            type="text"
            id="name-input"
            placeholder="Search for name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <ul className="filtered-list" aria-live="polite" aria-atomic="true">
          {filteredUsers?.length === 0 ? (
            <li>No users found.</li>
          ) : (
            filteredUsers?.map(({ id, name, email, status }) => (
              <li key={id}>
                {name} - {email} - {status}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="status-filter">
        <label htmlFor="status-select">Filter by Status</label>
        <select
          id="status-select"
          value={status}
          name="status"
          onChange={handleStatusChange}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>
    </div>
  );
};

export default ProductPage;
