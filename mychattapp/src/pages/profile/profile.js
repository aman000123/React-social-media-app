import './profile.scss'

import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/posts';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authcontext';
import { makeRequest } from '../../axious'
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from 'react-router-dom';
import UpdateProfile from '../../components/update/update';

const Profile = () => {

    const [openUpdate, setOpenUpdate] = useState(false)


    const { currentUser } = useContext(AuthContext)
    //split methos se url ko split kar diya
    //localhost:3000/profile.find/3==> 0 element/1 element/2 element
    //3 alag karna h path se
    //[2]==3rd element

    const userid = parseInt(useLocation().pathname.split("/")[2])
    //current user id number ha
    //location se id object me mil
    //parseInt() se change karte hai
    const { isLoading, error, data } = useQuery(["user"], () =>
        //usequery accepts function and return promise
        makeRequest.get("/users/find/" + userid).then((res) => {
            return res.data
        })


    )



    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
        ["relationship"],
        () =>
            makeRequest.get("/relationships?foolloweduserid=" + userid).then((res) => {
                return res.data;
            })
    );
    // console.log('relationshipData for folllowing', relationshipData)
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following)
                return makeRequest.delete("/relationships?userid=" + userid);
            return makeRequest.post("/relationships", { userid });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["relationship"]);
            },
        }
    );

    const handleFollow = () => {
        mutation.mutate(relationshipData?.includes(currentUser.id));
    };


    return (
        <>

            <div className="profile">
                {/* profile loading me error aaye to */}
                {error ?
                    "Something went wrong"
                    : isLoading ?
                        "Loading" :
                        <>
                            <div className='images'>
                                <img src={" http://localhost:4000/uploads/" + data.coverpic} alt="" className='cover' />
                                <img src={" http://localhost:4000/uploads/" + data.profilepic} alt="" className='profile' />

                            </div>
                            <div className='profilecontainer'>
                                <div className='uinfo'>
                                    <div className='left'>

                                        <a href='http://facebook.com'>
                                            <FacebookTwoToneIcon fontSize='large' />
                                        </a>

                                        <a href='http://facebook.com'>
                                            <TwitterIcon fontSize='large' />
                                        </a>

                                        <a href='http://facebook.com'>
                                            <LinkedInIcon fontSize='large' />
                                        </a>

                                        <a href='http://facebook.com'>
                                            <PinterestIcon fontSize='large' />
                                        </a>
                                    </div>
                                    <div className='center'>
                                        <span>{data.name}</span>
                                        <div className='info'>
                                            <div className='item'>
                                                <PlaceIcon />
                                                <span>{data.city}</span>
                                            </div>

                                            <div className='item'>
                                                <LanguageIcon />
                                                <span>{data.website}</span>
                                            </div>
                                        </div>

                                        {rIsLoading ? (
                                            "loading"
                                        ) : userid === currentUser.id ? (
                                            <button onClick={() => setOpenUpdate(true)}>update</button>
                                        ) : (
                                            <button onClick={handleFollow}>
                                                {relationshipData?.includes(currentUser.id)
                                                    ? "Following"
                                                    : "Follow"}
                                            </button>
                                        )}
                                    </div>


                                    <div className='right'>
                                        <EmailOutlinedIcon />
                                        <MoreVertIcon />
                                    </div>
                                </div>
                                <Posts userid={userid} />

                            </div>
                        </>
                }
                {openUpdate && <UpdateProfile setOpenUpdate={setOpenUpdate} user={data} />}
            </div>
        </>
    )
}

export default Profile