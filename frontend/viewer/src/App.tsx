import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Complaint Dashboard</h1>
      <Outlet />
    </div>
  );
}
