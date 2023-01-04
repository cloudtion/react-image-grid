
import React from "react";

interface Author {
    name? : string,
    profile_img_src? : string,
    link? : string,
}

interface AuthorInfoProps {
    author : Author,
};

// Accepts "user" object from unsplash api photo endpoint.
export default function AuthorInfo(props : AuthorInfoProps) : React.ReactElement {

    const {
        name,
        profile_img_src,
        link,
    } = props.author;
    
    return (
        <div className="user-block">
            
            {
                profile_img_src?
                
                    <img 
                        className="user-profile-img" 
                        src={profile_img_src} 
                        alt={`${name} (Author)`}
                    />
                    :
                    null
            }

            {
                link?
                    
                    <a 
                        target="_blank"
                        rel="noreferrer"
                        className={"user-name has-portfolio"} 
                        href={link}
                    >
                        { name }
                    </a>
                    :
                    <span
                        className="user-name"
                    >
                        { name }
                    </span>
            }
        </div>
    );
}