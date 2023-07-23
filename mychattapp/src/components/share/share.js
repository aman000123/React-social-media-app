import "./share.scss";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';


const Share = () => {
    return (
        <>

            <div className="share">
                <div className="icon">
                    <a href='https://web.whatsapp.com/'>   <WhatsAppIcon fontSize='large' /></a>
                    <a href='https://twitter.com/Twitter'>  <TwitterIcon fontSize='large' /></a>
                    <a href='http://facebook.com'> <FacebookTwoToneIcon fontSize='large' /></a>
                    <a href='https://www.linkedin.com/mynetwork/invite-connect/connections/'>   <LinkedInIcon fontSize='large' /></a>
                    <a href='https://www.instagram.com/'>  <InstagramIcon fontSize='large' /></a>
                    <a href='https://mail.google.com/?login'>  <EmailOutlinedIcon fontSize='large' /></a>
                    <a href='https://web.telegram.org/'>  <TelegramIcon fontSize='large' /></a>



                </div>
            </div>
        </>
    )
}


export default Share