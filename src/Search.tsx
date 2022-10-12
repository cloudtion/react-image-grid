
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
    onSearch? : (value : string)=> void   
}

// Accepts Props: 
// "onSearch" - Function - Callback with the entered search value on blur or when the user presses enter. 
export default function Search(props : SearchProps) : React.ReactElement {
    
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    function toggleSearch(){

        const new_val =  !open;

        if( new_val && inputRef.current ){

            // If the search is going to be open, we pull focus on the text input so that the user 
            // doesn't have to click a second time.
            inputRef.current.focus();
        }
        
        setOpen(new_val);
    }

    function triggerSearch(){

        props.onSearch && props.onSearch(value);
    }

    function keyDown(e : React.KeyboardEvent<HTMLInputElement>){

        if( e.key === "Enter" && e.target ){

            // Pull the focus off the search bar to hide flashing carot.
            // Because of our "onBlur" callback, this also calls "triggerSearch".
            (e.target as HTMLElement).blur();
        }
    }

    return (
        <div 
            id="search" 
            className={open? "search-open":""}
            onClick={toggleSearch}
        > 
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search Photos"
                onClick={e=> e.stopPropagation()}
                onChange={e=> setValue(e.target.value)}
                onKeyDown={keyDown}
                onBlur={triggerSearch}
                value={value}
            />
        </div>
    )
}