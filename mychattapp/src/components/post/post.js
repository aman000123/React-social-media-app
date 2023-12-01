

import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
import Comment from '../comments/comments';
import { useState, useContext } from 'react';
import Share from '../share/share';
import moment from 'moment/moment';
import { AuthContext } from '../../context/authcontext';
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axious";
import { toast } from 'react-toastify'

const Post = ({ post }) => {

    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [shareOpen, setShareOpen] = useState(false)


    const { currentUser } = useContext(AuthContext)

    const { isLoading, error, data } = useQuery(['likes', post.id], () =>
        makeRequest.get("/likes?postid=" + post.id).then((res) => {
            console.log("res.data for loading get likes", res.data)
            return res.data
        })
    )

    //console.log("data for likes", data?.length)


    const queryClient = useQueryClient()

    const mutation = useMutation((liked) => {

        if (liked) return makeRequest.delete('/likes?postid=' + post.id);
        return makeRequest.post('/likes', { postid: post.id });
    }, {
        onSuccess: () => {
            //invalidate and refetch data
            //in useQuery our query name is posts
            queryClient.invalidateQueries(["likes"])
        }
    })


    //create mutaion for delete
    const deletemutation = useMutation((postid) => {
        return makeRequest.delete('/posts/' + postid);
    }, {
        onSuccess: () => {
            //invalidate and refetch data
            queryClient.invalidateQueries(["posts"])
        }
    })



    const handleLike = () => {
        mutation.mutate(data?.includes(currentUser.id))
    }

    const handleOpenMenu = () => {
        // Only show the delete button if the post owner clicks the MoreHorizOutlinedIcon
        if (post.userid === currentUser.id) {
            setMenuOpen(!menuOpen);
        } else {
            // Show an error or display a notification that only the post owner can delete
            // console.log("Error: Only the post owner can delete.");
            toast.error(` Hey ${currentUser.name}! you can not delete others post`)
        }
    }

    const handleDelete = () => {
        deletemutation.mutate(post.id);
    }

    //fetch data for likes



    return (
        <>
            <div className='post'>
                <div className='container' >
                    <div className='user' >
                        <div className='userInfo'>
                            <img src={" http://localhost:4000/uploads/" + post.profilepic} alt="img" />
                            <div className='details'>
                                <Link to={`/profile/${post.userid}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <span className='name'>{post.name}</span>
                                    <span className='date'>{moment(post.createdat).fromNow()}</span>
                                </Link>


                            </div>

                        </div>
                        <MoreHorizOutlinedIcon onClick={handleOpenMenu} />
                        {menuOpen && post.userid === currentUser.id && <button onClick={handleDelete}>delete</button>}


                    </div>

                    <div className='content'>
                        <p>{post.postdesc}</p>
                        <img src={`http://localhost:4000/uploads/${post.img}`} alt="" />



                    </div>
                    <div className="info">
                        <div className='item'>

                            {error ? "Something went wrong!"
                                : isLoading ? "Loading" : (
                                    data.includes(currentUser.id) ? (<FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />) : (<FavoriteBorderOutlinedIcon onClick={handleLike} />))}
                            {data?.length} Likes


                        </div>
                        <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
                            <TextsmsOutlinedIcon />
                            12 comments

                        </div>
                        <div className='item' onClick={() => setShareOpen(!shareOpen)}>
                            <ShareOutlinedIcon />
                            share

                        </div>
                    </div>
                    {shareOpen && <Share />}
                    {commentOpen && <Comment postid={post.id} />}


                </div>
            </div>


        </>
    )
}

export default Post