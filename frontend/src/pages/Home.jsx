import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const query = new URLSearchParams();
      if (sort) query.append("sort", sort);
      if (author) query.append("author", author);
      if (genre) query.append("genre", genre);
      query.append("page", page);
      query.append("limit", limit);

      const res = await getBooks(query.toString());
      setBooks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [sort, author, genre, page, limit]);

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Book List</h1>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Filter by author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Filter by genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="title">Title</option>
            <option value="publicationYear">Year</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={2}>2 per page</option>
            <option value={4}>4 per page</option>
            <option value={6}>6 per page</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={() => navigate("/add")}>
            + Add Book
          </button>
        </div>
      </div>

      {/* Book List */}
      <ul className="list-group mb-3">
        {books.map((book) => (
          <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <b>{book.title}</b> — {book.author.last_name}, {book.publicationYear}
            </div>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/edit/${book._id}`)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;