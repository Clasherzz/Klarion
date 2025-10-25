import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Complaint {
  complaint_id: string;
  product: string;
  date_sent_to_company:string
}

export default function ComplaintsList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:3000/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      setError("Failed to fetch complaints. Make sure the backend is running on port 3000.");
      console.error("API Error:", err);
    }
  };

  const updateDB = async () => {
    setLoading(true);
    await axios.get("http://localhost:3000/api/complaints/update");
    await fetchComplaints();
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div>
     
      
      <button
        onClick={updateDB}
        disabled={loading}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Updating..." : "Sync Complaints"}
      </button>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {complaints.length === 0 && !error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          No complaints found. Click "Sync Complaints" to fetch data from the API.
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Complaint ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Date of complaint send to company</th>

          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr
              key={c.complaint_id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/complaint/${c.complaint_id}`)}
            >
              <td className="border p-2">{c.complaint_id}</td>
              <td className="border p-2">{c.product}</td>
              <td className="border p-2">{c.date_sent_to_company.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
