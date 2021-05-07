import {useRef, useState} from "react";
import api from "../Services/api";

const  AddFile = ()=>{
    const filesElement = useRef(null);
    const [title, setTitle] = useState("");

    const sendFile = async()=>{
        const dataForm = new FormData();
        for (const file of filesElement.current.files) {
            dataForm.append('file', file);
            dataForm.append("title", title);
          }
          const token = localStorage.getItem("token");
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          const res = await api.post('/api/files/1', dataForm);
          console.log(res);
          

    }

    return (
        <div>
        <input type="text" onChange={(ev)=>{setTitle(ev.target.value)}}/>
          <input type="file" multiple ref={filesElement} />
          <button onClick={sendFile}>Send file</button>
        </div>
      );
}

export default AddFile;