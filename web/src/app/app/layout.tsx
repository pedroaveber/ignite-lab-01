import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()

  if (!session) {
    redirect('/api/auth/login')
  }

  return (
    <>
      {children}
    </>
  );
}
