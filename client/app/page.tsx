// import LoginForm from "./(auth)/login/LoginForm"

// export default function Landing() {
//   return <LoginForm />
// }

import { redirect } from "next/navigation"

export default function Landing() {
  redirect("/login")
}
