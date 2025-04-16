export default function UploadLog({ uploads }) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Upload Log</h2>
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {uploads.map((upload, index) => (
            <li key={index} className="p-3">
              {upload}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  