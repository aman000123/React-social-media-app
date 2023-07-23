

import "./stories.scss";
import { useContext } from "react";

import { AuthContext } from "../../context/authcontext";


const Stories = () => {
    const { currentUser } = useContext(AuthContext)

    //temprary dummy data
    const stories = [
        {
            id: 1,
            name: "Shivanshu",
            img: "https://images.pexels.com/photos/17070681/pexels-photo-17070681/free-photo-of-park-guell.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 2,
            name: "Satendra",
            img: "https://images.pexels.com/photos/7322423/pexels-photo-7322423.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 3,
            name: "Kabeer",
            img: "https://images.pexels.com/photos/5778895/pexels-photo-5778895.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            name: "Abhay",
            img: "https://images.pexels.com/photos/3228769/pexels-photo-3228769.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    return (
        <>
            <div className="stories">


                <div className="story">
                    <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="img" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>




                {stories.map(story => (

                    <div className="story" key={story.id}>
                        <img src={story.img} alt="img" />
                        <span>{story.name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stories