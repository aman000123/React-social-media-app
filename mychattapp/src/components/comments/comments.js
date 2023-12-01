

import './comment.scss'

import { useContext, useState } from 'react'

import { AuthContext } from '../../context/authcontext'
import { makeRequest } from '../../axious'
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from '../post/post';

import moment from 'moment'

const Comment = ({ postid }) => {

    const { currentUser } = useContext(AuthContext)
    const [desc, setDesc] = useState("")
    const [errors, setError] = useState(null);

    const { isLoading, error, data } = useQuery(['comments'], () =>
        makeRequest.get("/comments?postid=" + postid).then((res) => {
            return res.data
        })


    )
    console.log('data isLoadingn comment', data.length)

    const queryClient = useQueryClient()

    const mutation = useMutation((newComment) => {

        return makeRequest.post('/comments', newComment);

    }, {
        onSuccess: () => {
            //invalidate and refetch data

            //in posts.js our query name is posts
            queryClient.invalidateQueries(["comments"])
        }
    })




    const handelClick = async (e) => {
        e.preventDefault();
        if (desc.trim() === '') {
            setError('***Please enter a comment before sending.***');
            return;
        }

        mutation.mutate({ desc, postid: postid })
        setDesc("")

    }




    return (
        <>
            <div className='comments'>

                <div className='write'>
                    <img src={"http://localhost:4000/uploads/" + currentUser.profilepic} alt="" />
                    <input type='text'
                        placeholder='Write a comment'
                        value={desc}
                        onChange={e => setDesc(e.target.value)} />
                    <button onClick={handelClick}>Send</button>

                </div>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}


                {isLoading ? "Loading" : data.map(comment => (


                    <div className='comment' key={comment.id}>
                        <img src={"http://localhost:4000/uploads/" + comment.profilepic} alt="" />
                        <div className='info'>
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>

                        </div>
                        <span className='date'>{moment(comment.createdat).fromNow()}</span>
                    </div>
                ))}


            </div>


        </>
    )
}

export default Comment