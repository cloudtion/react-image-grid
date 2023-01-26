
import React from "react";
import { ImageAuthor } from "./ImageGrid";


// Accepts "user" object from unsplash api photo endpoint.
export default function AuthorInfo(props : {author: ImageAuthor}) : React.ReactElement {

    const {
        name,
        profile_img_src,
        url,
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
                url?
                    
                    <a 
                        target="_blank"
                        rel="noreferrer"
                        className={"user-name has-portfolio"} 
                        href={url}
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