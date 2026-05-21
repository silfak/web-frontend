interface PaginationManajemenProps {
  mainTab: string;
  mode: string;
  startIndex: number;
  itemsPerPage: number;
  page: number;
  setPage: (page: number) => void;
  goPrev: () => void;
  goNext: () => void;
  totalPages: number;
  totalItems: number;
}

export default function PaginationManajemen({
  mainTab, mode, startIndex, itemsPerPage, page,
  setPage, goPrev, goNext, totalPages, totalItems
}: PaginationManajemenProps) {
  if (mainTab === "fasilitas" && mode === "gedung") return null;

  const from = totalItems === 0 ? 0 : startIndex + 1;
  const to = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex justify-between mt-4 text-sm">
      <p className="text-gray-500">
        Menampilkan {from} - {to} dari {totalItems} data
      </p>
      <div className="flex gap-2">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="border px-3 py-1 rounded disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${page === num ? "bg-green-700 text-white" : "border"}`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="border px-3 py-1 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
