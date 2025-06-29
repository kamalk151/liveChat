export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      <h2 className="auth-title">Digital Chat</h2>
      <main>{children}</main>
      {/* <footer className="auth-footer">
        <p>© Digital Store. All rights reserved.</p>
      </footer> */}
    </div>
  )
}
