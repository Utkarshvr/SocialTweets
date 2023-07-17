export default function Container({ children }) {
  return (
    <div className="max-w-lg flex flex-col m-auto gap-3 items-center">
      {children}
    </div>
  );
}
