// "use client"

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {

  // console.log("AuthTemplate rendered at", Date.now());

  return (
    <div className="auth-template">
      <div style={{ background: "#e0e7ff", marginBottom: 4 }}>
        {/* <strong></strong> */}
      </div>
      {children}
    </div>
  );
}