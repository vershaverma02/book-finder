import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books from Open Library API
  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 10)); // show only top 10 results
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📚 Book Finder
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          placeholder="Search books..."
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-1/2"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border">
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-gray-600">
              Author:{" "}
              {book.author_name ? book.author_name.join(", ") : "Unknown"}
            </p>
            <p className="text-gray-600">
              First Published: {book.first_publish_year || "N/A"}
            </p>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt="Book Cover"
                className="mt-2 rounded-md"
              />
            ) : (
              <p className="mt-2 text-sm text-gray-500">No cover available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
