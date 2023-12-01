import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authcontext'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axious";

const SharePost = () => {
    const { currentUser } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("")
    const [error, setError] = useState(null);

    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) => {
        return makeRequest.post('/posts', newPost);

    }, {
        onSuccess: () => {
            //invalidate and refetch data
            //in posts.js our query name is posts
            queryClient.invalidateQueries(["posts"])
        }
    })




    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData);
            return res.data
        }
        catch (err) {
            console.log("err in file uploading", err)
        }
    }



    const handelClick = async (e) => {
        e.preventDefault();
        if (desc.trim() === '') {
            setError('***Please write something before posting.**');
            return;
        }
        let imgUrl = "";
        if (file) imgUrl = await upload()
        mutation.mutate({ desc, img: imgUrl })
        setDesc("")
        setFile(null)
    }


    return (
        <div className="share">

            <div className="container">
                {error && <span style={{ color: 'red' }}>{error}</span>}
                <div className="top">
                    <div className="left">
                        <img
                            src={" http://localhost:4000/uploads/" + currentUser.profilepic}
                            alt=""
                        />
                        <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)}
                            value={desc} required />
                    </div>

                    <div className="right">
                        {/* fpr showing what img select when posting */}
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
                    </div>

                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} name="file" />

                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" required />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">


                        <button onClick={handelClick}>Share</button>

                    </div>

                </div>

            </div>


        </div>

    );
};

export default SharePost;