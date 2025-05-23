import type { User } from "@/types/user"
import UserCard from "./user-card"

async function getUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=20")

  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  const data = await res.json()
  return data.users as User[]
}

export default async function UserGrid() {
  const users = await getUsers()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
