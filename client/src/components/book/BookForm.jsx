
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from "../../axiosInstance";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";

// const { Item: FormItem } = Form;

// const formItemLayout = {
//   labelCol: { xs: { span: 24 }, sm: { span: 6 } },
//   wrapperCol: { xs: { span: 24 }, sm: { span: 14 } }
// };

// const BookForm = () => {
//   const [name, setName] = useState("");
//   const [author, setAuthor] = useState("");
//   const [publisher, setPublisher] = useState("");
//   const [publicationYear, setPublicationYear] = useState("");
//   const [subject ,setSubject] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const validationSchema = Yup.object().shape({
//       name: Yup.string().required("name is required"),
//       author: Yup.string().required("author is required"),
//       publisher: Yup.string().required("publisher is required"),
//       publicationYear: Yup.string().required("publicationYear is required"),
//       subject: Yup.string().required("subject is required"),
     
//     });

//     try {
//       await validationSchema.validate({
//         name,
//         author,
//         publisher,
//         publicationYear,
//         subject
//       });

//       const book = {
//         name,
//         author,
//         publisher,
//         publicationYear,
//         subject
//       };

//       const response = await axios.post(
//         "http://localhost:5000/create/book",
//         book
//       );

//       console.log(response.data);
//       navigate("/book", { state: { createdBook: response.data } });
//       toast.success("Employee created successfully");
//     } catch (err) {
//       toast.error("Error creating Book", err);
//     }
//   };

//   return (
//     <Form {...formItemLayout} style={{ maxWidth: 600  }} >
//       <FormItem
//         label="name"
//         name="name"
//         rules={[{ required: true, message: "Please name input!" }]}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       >
//         <Input />
//       </FormItem>

//       <FormItem
//         label="author"
//         name="author"
//         rules={[{ required: true, message: "Please author input!" }]}
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//       >
//         <Input />
//       </FormItem>

//       <FormItem
//         label="publisher"
//         name="publisher"
//         rules={[{ required: true, message: "Please publisher input!" }]}
//         value={publisher}
//         onChange={(e) => setPublisher(e.target.value)}
//       >
//         <Input />
//       </FormItem>

//       <FormItem
//         label="publicationYear"
//         name="publicationYear"
//         rules={[{ required: true, message: "Please publicationYear input!" }]}
//         value={publicationYear}
//         onChange={(e) => setPublicationYear(e.target.value)}
//       >
//         <Input />
//       </FormItem>

//       <FormItem
//         label="subject"
//         name="subject"
//         rules={[{ required: true, message: "Please subject input!" }]}
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       >
//         <Input />
//       </FormItem>

    

   


     

//       <FormItem wrapperCol={{ offset: 6, span: 16 }}>
//         <Button type="primary" htmlType="submit" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </FormItem>
//     </Form>
//   );
// };

// export default BookForm;



import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } }
};

const BookForm = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [subject, setSubject] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      author: Yup.string().required("Author is required"),
      publisher: Yup.string().required("Publisher is required"),
      publicationYear: Yup.string().required("Publication Year is required"),
      subject: Yup.string().required("Subject is required")
    });

    try {
      await validationSchema.validate({
        name,
        author,
        publisher,
        publicationYear,
        subject
      });

      const book = {
        name,
        author,
        publisher,
        publicationYear,
        subject
      };

      const response = await axios.post(
        "http://localhost:5000/create/book",
        book
      );

      navigate("/book", { state: { createdBook: response.data } });
      toast.success("Book created successfully");
    } catch (err) {
      toast.error("Error creating Book", err);
    }
  };

  return (
    <Form {...formItemLayout} style={{ maxWidth: 600 }}>
      <FormItem
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter the name!" }]}
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Author"
        name="author"
        rules={[{ required: true, message: "Please enter the author!" }]}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Publisher"
        name="publisher"
        rules={[{ required: true, message: "Please enter the publisher!" }]}
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Publication Year"
        name="publicationYear"
        rules={[
          { required: true, message: "Please enter the publication year!" }
        ]}
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Subject"
        name="subject"
        rules={[{ required: true, message: "Please enter the subject!" }]}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <Input />
      </FormItem>

      <FormItem wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default BookForm;
