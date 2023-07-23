import Posts from '../../components/posts/posts'
import SharePost from '../../components/sharePost/sharepost'
import Stories from '../../components/stories/stories'
import './home.scss'

const Home = () => {

    return (
        <>

            <div className="home">
                <Stories />
                <SharePost />
                <Posts />
            </div>
        </>
    )
}

export default Home