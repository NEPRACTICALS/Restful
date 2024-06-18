// export default BookTable; // Ensure this is a default export
import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useLocation } from "react-router-dom";
import axios from "../../axiosInstance";
import { useRecoilValue } from "recoil";
import { searchState } from "../../store";
import toast from "react-hot-toast";

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();
  const location = useLocation();
  const { createdBook } = location.state || {};
  const keyword = useRecoilValue(searchState);


  // Getting a ll books and  checking if they exists 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all/books");
        const allBooks = Array.isArray(response.data) ? response.data : [];

        setBooks(allBooks);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (createdBook) {
      setBooks((prevBooks) => {
        // Check for duplicates before adding
        const bookExists = prevBooks.some((book) => book.id === createdBook.id);
        if (!bookExists) {
          return [createdBook, ...prevBooks];
        }
        return prevBooks;
      });
    }
  }, [createdBook]);

  useEffect(() => {
    if (keyword.length === 0) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) => {
        return (
          book.name.toLowerCase().includes(keyword.toLowerCase()) ||
          book.author.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilteredBooks(filtered);
    }
  }, [keyword, books]);

  // function to edit  Book

  const handleEdit = (book) => {
    setEditingBook(book);
    form.setFieldsValue(book);
    setIsModalVisible(true);
  };

  // handling book updates 

  const handleUpdate = async () => {
    try {
      const updatedData = form.getFieldsValue();
      const response = await axios.put(
        `http://localhost:5000/book/update/${editingBook.id}`,
        updatedData
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? response.data : book
        )
      );
      setIsModalVisible(false);
      setEditingBook(null);
      toast.success("Book updated successfully");
    } catch (error) {
      toast.error("Error updating book:", error);
    }
  };

  // function to delete 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/book/delete/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Error deleting book", error);
    }
  };
  // columns of the table 
  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Publisher", dataIndex: "publisher", key: "publisher" },
    {
      title: "Publication Year",
      dataIndex: "publicationYear",
      key: "publicationYear"
    },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            className="bg-red-500"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table dataSource={filteredBooks} columns={columns} rowKey="id" />
      <Modal
        title="Edit Book"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Id">
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author">
            <Input />
          </Form.Item>
          <Form.Item name="publisher" label="Publisher">
            <Input />
          </Form.Item>
          <Form.Item name="publicationYear" label="Publication Year">
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookTable;
