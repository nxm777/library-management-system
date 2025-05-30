import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, updateBook } from "../services/api";
import BookForm from "../components/BookForm";

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBook(id);
        setBook({
          ...res.data,
          genres: res.data.genres.join(", "),
        });
      } catch (err) {
        console.error("Error loading book:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateBook(id, updatedData);
      navigate("/");
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  return (
    <div className="container">
      <h2>Edit Book</h2>
      {book ? (
        <BookForm initialData={book} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditBook;