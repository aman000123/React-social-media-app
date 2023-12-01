

import Post from "../post/post";
import "./post.scss";

import { useQuery } from "@tanstack/react-query";

import { makeRequest } from "../../axious";

const Posts = ({ userid }) => {


    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("/posts?userid=" + userid).then((res) => {
            return res.data
        })


    )

    //temp data 
    // console.log("data is post===", data)


    return (
        <>
            <div className="posts" >
                {error
                    ? "Something went wrong !"
                    : isLoading
                        ? "Loading"
                        : data.map((post) => <Post post={post} key={post.id} />

                        )}
            </div>
        </>
    )
}

export default Posts