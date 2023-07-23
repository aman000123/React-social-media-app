

import { useContext } from 'react'
import { AuthContext } from '../../context/authcontext'

import './leftbar.scss'
const Leftbar = () => {

    const { login, currentUser } = useContext(AuthContext)
    return (
        <>
            <div className='leftbar'>
                <div className='container'>
                    <div className='menu'>
                        <div className='user'>
                            <img src={" http://localhost:4000/uploads/" + currentUser.profilepic} alt="img" />
                            <span>{currentUser.name}</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/16905170/pexels-photo-16905170/free-photo-of-a-group-portrait-of-young-people-posing-in-white-shirts.png?auto=compress&cs=tinysrgb&w=600" alt="friends" />
                            <span>Friends</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/7849520/pexels-photo-7849520.jpeg?auto=compress&cs=tinysrgb&w=600" alt="group" />
                            <span>Group</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/11547378/pexels-photo-11547378.jpeg?auto=compress&cs=tinysrgb&w=600" alt="market" />
                            <span>Marketplace</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/6008481/pexels-photo-6008481.jpeg?auto=compress&cs=tinysrgb&w=600" alt="watch" />
                            <span>Watch</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/2061915/pexels-photo-2061915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="memories" />
                            <span>Memories</span>
                        </div>
                    </div>


                    <hr />
                    <div className='menu'>
                        <span>Your shotcuts</span>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600" alt="events" />
                            <span>Events</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=600" alt="gaming" />
                            <span>Gaming</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600" alt="gallery" />
                            <span>Gallery</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/1755086/pexels-photo-1755086.jpeg?auto=compress&cs=tinysrgb&w=600" alt="videos" />
                            <span>Videos</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/10376167/pexels-photo-10376167.jpeg?auto=compress&cs=tinysrgb&w=600" alt="messages" />
                            <span>Messages</span>
                        </div>

                    </div>

                    <hr />
                    <div className='menu'>
                        <span>Others</span>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/6646907/pexels-photo-6646907.jpeg?auto=compress&cs=tinysrgb&w=600" alt="fundraiser" />
                            <span>Fundraiser</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/7713995/pexels-photo-7713995.jpeg?auto=compress&cs=tinysrgb&w=600" alt="tutorials" />
                            <span>Tutorials</span>
                        </div>
                        <div className='item'>
                            <img src="https://images.pexels.com/photos/5905557/pexels-photo-5905557.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Courses" />
                            <span>Courses</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Leftbar