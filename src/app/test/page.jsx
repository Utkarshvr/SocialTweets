"use client";

// const buttonStyle = `px-2 py-1 bg-sky-600 font-semibold rounded-md hover:bg-opacity-40 hover:text-neutral-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`;
const buttonStyle = `px-4 py-1 hover:bg-sky-500 hover:bg-opacity-20 border-2 border-sky-600 text-sky-600 rounded-full`;

export default function TestPage() {
  const hanldeGetSession = async () => {
    const res = await fetch("http://localhost:3000/api/auth/session");
    const session = await res.json();
    console.log(session);
  };

  const requestTestEndpoint = async () => {
    const res = await fetch("http://localhost:3000/api/test");
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <div>
        <h2>Session</h2>
        <button onClick={hanldeGetSession} className={buttonStyle}>
          Get Session
        </button>
      </div>
      <div className="mt-4">
        <h2>Test Endpoint</h2>
        <button onClick={requestTestEndpoint} className={buttonStyle}>
          Request Test Endpoint
        </button>
      </div>
    </div>
  );
}
