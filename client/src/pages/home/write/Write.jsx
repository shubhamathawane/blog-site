import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import "./write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:3001/api/posts/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form action="" className="writeform" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i class="writeIcon far fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroupTag">
          <input
            placeholder="🏷 Add Tags...."
            type="text"
            className="writeInputTags writeTextTags"
            autoFocus={true}
            // onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story...."
            type="text"
            className="writeInput writeText"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
