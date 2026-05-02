export default function PaginationManajemen({
  mainTab,
  mode,
  startIndex,
  itemsPerPage,
  page,
  setPage,
  goPrev,
  goNext,
}) {
  if (mainTab === "fasilitas" && mode === "gedung") return null;

  return (
    <div className="flex justify-between mt-4 text-sm">
      <p className="text-gray-500">
        Menampilkan {startIndex + 1} - {startIndex + itemsPerPage}
      </p>

      <div className="flex gap-2">
        <button onClick={goPrev} className="border px-3 py-1 rounded">
          Previous
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${
              page === num ? "bg-green-700 text-white" : "border"
            }`}
          >
            {num}
          </button>
        ))}

        <button onClick={goNext} className="border px-3 py-1 rounded">
          Next
        </button>
      </div>
    </div>
  );
}