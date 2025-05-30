import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/api";

function BookForm({ initialData = null, onSubmit }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    initialData || {
      title: "",
      author: { first_name: "", last_name: "" },
      isbn: "",
      publisher: "",
      genres: "",
      numOfPages: "",
      publicationYear: ""
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "first_name" || name === "last_name") {
      setForm({
        ...form,
        author: {
          ...form.author,
          [name]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookToSend = {
      ...form,
      genres: form.genres.split(",").map((g) => g.trim()),
      numOfPages: Number(form.numOfPages),
      publicationYear: Number(form.publicationYear)
    };

    if (onSubmit) {
      await onSubmit(bookToSend);
    } else {
      await createBook(bookToSend);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Title</label>
        <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="col-md-3">
        <label className="form-label">Author First Name</label>
        <input className="form-control" name="first_name" value={form.author.first_name} onChange={handleChange} required />
      </div>

      <div className="col-md-3">
        <label className="form-label">Author Last Name</label>
        <input className="form-control" name="last_name" value={form.author.last_name} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">ISBN</label>
        <input className="form-control" name="isbn" value={form.isbn} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Publisher</label>
        <input className="form-control" name="publisher" value={form.publisher} onChange={handleChange} required />
      </div>

      <div className="col-md-6">
        <label className="form-label">Genres (comma-separated)</label>
        <input className="form-control" name="genres" value={form.genres} onChange={handleChange} />
      </div>

      <div className="col-md-3">
        <label className="form-label">Number of Pages</label>
        <input className="form-control" type="number" name="numOfPages" value={form.numOfPages} onChange={handleChange} required />
      </div>

      <div className="col-md-3">
        <label className="form-label">Publication Year</label>
        <input className="form-control" type="number" name="publicationYear" value={form.publicationYear} onChange={handleChange} required />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </form>
  );
}

export default BookForm;