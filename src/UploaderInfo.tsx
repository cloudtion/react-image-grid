
// Accepts "user" object from unsplash api photo endpoint.
export default function UploaderInfo(props){

    const {
        name,
        profile_image,
        social,
        username,
    } = props.user;
    
    return (
        <div className="user-block">
            
            <img 
                className="user-profile-img" 
                src={profile_image.small} 
                alt={`${name} (Uploader)`}
            />
            <a 
                target="_blank"
                rel="noreferrer"
                className={"user-name "+(social.portfolio_url? "has-portfolio":"")} 
                href={`https://unsplash.com/@${username}?utm_source=react_image_grid&utm_medium=referral`}
            >
                { name }
            </a>
        </div>
    );
}