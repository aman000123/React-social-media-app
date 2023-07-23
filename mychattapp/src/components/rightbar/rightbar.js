
import './img.png'
import './rightbar.scss'

import { useContext } from 'react'
import { AuthContext } from '../../context/authcontext'


const Rightbar = () => {

    const { currentUser } = useContext(AuthContext)
    return (
        <>
            <div className='rightbar'>
                <div className='container'>
                    <div className='item'>
                        <span>Suggestion For You</span>
                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" /><span>John Doe</span>
                            </div>
                            <div className='buttons'>
                                <button>Follow</button>
                                <button>Unfollow</button>
                            </div>
                        </div>


                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" /><span>John Doe</span>
                            </div>
                            <div className='buttons'>
                                <button>Follow</button>
                                <button>Unfollow</button>
                            </div>
                        </div>
                    </div>

                    <div className='item'>
                        <span>Latest Activities</span>
                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" />
                                <p><span>John Doe</span> changed their cover picture </p>
                            </div>
                            <span>1 min ago</span>
                        </div>

                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" />
                                <p><span>John Doe</span> changed their cover picture </p>
                            </div>
                            <span>1 min ago</span>
                        </div>
                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" />
                                <p><span>John Doe</span> changed their cover picture </p>
                            </div>
                            <span>1 min ago</span>
                        </div>
                        <div className='user'>
                            <div className='userInfo'>
                                <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="user" />
                                <p><span>John Doe</span> changed their cover picture </p>
                            </div>
                            <span>1 min ago</span>
                        </div>
                    </div>

                    <div className='item'>

                        <span>Online Friends</span>
                        <div className='user'>
                            <div className='userInfo'>
                                <img src="https://images.pexels.com/photos/4067753/pexels-photo-4067753.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                                <div className='online'></div>
                                <span>Abhay</span>
                            </div>


                        </div>

                        <div className='user'>
                            <div className='userInfo'>
                                <img src="https://images.pexels.com/photos/7984347/pexels-photo-7984347.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                                <div className='online'></div>
                                <span>Shivanshu</span>
                            </div>


                        </div>

                        <div className='user'>
                            <div className='userInfo'>
                                <img src="https://images.pexels.com/photos/2780196/pexels-photo-2780196.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                                <div className='online'></div>
                                <span>Kabeer</span>
                            </div>


                        </div>

                        <div className='user'>
                            <div className='userInfo'>
                                <img src="https://images.pexels.com/photos/15558425/pexels-photo-15558425/free-photo-of-man-checking-photos-on-camera.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                                <div className='online'></div>
                                <span>Satendra</span>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Rightbar