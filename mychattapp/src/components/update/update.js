import { useState } from 'react'
import './update.scss'

import { makeRequest } from '../../axious'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateProfile = ({ setOpenUpdate, user }) => {

    const [text, setText] = useState({
        name: user.name,
        city: user.city,
        website: user.website
    })
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)



    const upload = async (file) => {
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

    const handleChange = (e) => {

        setText((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }


    const queryClient = useQueryClient()
    const mutation = useMutation((user) => {
        return makeRequest.put('/users', user);
    }, {
        onSuccess: () => {
            //invalidate and refetch data

            //in posts.js our query name is posts
            queryClient.invalidateQueries(["user"])
        }
    })


    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl

        //if change then update otherwise as previous
        coverUrl = cover ? await upload(cover) : user.coverpic
        profileUrl = profile ? await upload(profile) : user.profilepic
        mutation.mutate({ ...text, coverpic: coverUrl, profilepic: profileUrl });
        setOpenUpdate(false)
        setCover(null)
        setProfile(null)
    }

    return (
        <>
            <div className='update'>
                <div className="wrapper">
                    <h1>Update Your Profile</h1>
                    <form>
                        <div className="files">
                            <label htmlFor="cover">
                                <span>Cover Picture</span>
                                <div className="imgContainer">


                                    <img
                                        src={
                                            cover
                                                ? URL.createObjectURL(cover)
                                                : " http://localhost:4000/uploads/" + user.coverpic
                                        }
                                        alt=""
                                    />
                                    <CloudUploadIcon className="icon" />
                                </div>
                            </label>

                            <input
                                type="file"
                                id="cover"
                                style={{ display: "none" }}
                                onChange={(e) => setCover(e.target.files[0])}
                            />

                            <label htmlFor="profile">
                                <span>Profile Picture</span>
                                <div className="imgContainer">
                                    <img
                                        src={
                                            profile
                                                ? URL.createObjectURL(profile)
                                                : " http://localhost:4000/uploads/" + user.profilepic
                                        }
                                        alt=""
                                    />
                                    <CloudUploadIcon className="icon" />
                                </div>

                            </label>
                            <input
                                type="file"
                                id="profile"
                                style={{ display: "none" }}
                                onChange={(e) => setProfile(e.target.files[0])}
                            />
                        </div>



                        <label>Name</label>
                        <input
                            type="text"
                            value={text.name}
                            name="name"
                            onChange={handleChange}
                        />

                        <label>Country / City</label>
                        <input
                            type="text"
                            name="city"
                            value={text.city}
                            onChange={handleChange}
                        />
                        <label>Website</label>
                        <input
                            type="text"
                            name="website"
                            value={text.website}
                            onChange={handleChange}
                        />
                        <button onClick={handleClick}>Update</button>
                    </form>

                    <button onClick={() => setOpenUpdate(false)}>Close</button>


                </div>
            </div>

        </>
    )
}

export default UpdateProfile