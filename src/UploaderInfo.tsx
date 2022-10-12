
import React from "react";

interface UploaderInfoUser {
    name : string,
    profile_image? : string,
    social? : any,
    username? : string,
};

interface UploaderInfoProps {
    user : UploaderInfoUser,
};

// Accepts "user" object from unsplash api photo endpoint.
export default function UploaderInfo(props : UploaderInfoProps) : React.ReactElement {

    const {
        name,
        profile_image,
        social,
        username,
    } = props.user;
    
    return (
        <div className="user-block">
            
            {
                profile_image?
                
                    <img 
                        className="user-profile-img" 
                        src={profile_image} 
                        alt={`${name} (Uploader)`}
                    />
                    :
                    null
            }

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