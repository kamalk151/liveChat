// "use client"

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {

  // console.log("AuthTemplate rendered at", Date.now());

  return (
    <div className="auth-template">
      <div style={{ background: "#e0e7ff", padding: 8, marginBottom: 16 }}>
        <strong>Auth Template (re-renders on page change) { Date.now() }</strong>
      </div>
      {children}
    </div>
  );
}