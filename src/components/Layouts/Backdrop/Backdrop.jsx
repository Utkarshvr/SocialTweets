export default function Backdrop({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-70">
      {children}
    </div>
  );
}
