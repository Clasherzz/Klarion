import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ComplaintsDetails() {
  const { id } = useParams<{ id?: string }>();
  const [complaint, setComplaint] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      const res = await axios.get(`http://localhost:3000/api/complaints/complaint_info?id=${id}`);
      setComplaint(res.data[0]);
    };
    fetchComplaint();
  }, [id]);

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded-lg shadow">
      <Link to="/" className="text-blue-500 underline">
        ← Back to list
      </Link>
      <h2 className="text-2xl font-bold mt-4 mb-2 text-blue-700">
        Complaint #{complaint.complaint_id}
      </h2>
      <table className="min-w-full border border-gray-300">
        <tbody>
          {Object.entries(complaint).map(([key, value]) => (
            <tr key={key} className="odd:bg-gray-50">
              <td className="border p-2 font-semibold">{key}</td>
              <td className="border p-2">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
