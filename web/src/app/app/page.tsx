'use client'

import { useUser } from "@auth0/nextjs-auth0/client"

export default function AppPage() {

  const user = useUser()

  return (
    <div>
      <h1>Logado</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}