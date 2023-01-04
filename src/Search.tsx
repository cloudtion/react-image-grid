
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
    
    const hasChangedRef = useRef<boolean>(false);

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
        
        // The value hasn't been updated. No need to trigger "onSearch" callback.
        if( !hasChangedRef.current ){

            return;
        }

        // Set hasChangedRef to false so that we don't trigger a search change
        // when the input loses focus or closes.
        hasChangedRef.current = false;

        props.onSearch && props.onSearch(value);
    }

    function keyDown(e : React.KeyboardEvent<HTMLInputElement>){

        if( e.key === "Enter" && e.target ){

            // Pull the focus off the search bar to hide flashing carot.
            // Because of our "onBlur" callback, this also calls "triggerSearch".
            (e.target as HTMLElement).blur();
        }
    }

    function valueChanged(new_value : string){

        setValue(new_value);

        // Set hasChangedRef to true so that we know to trigger a search change
        // when the input loses focus or closes.
        hasChangedRef.current = true;
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
                onChange={e=> valueChanged(e.target.value)}
                onKeyDown={keyDown}
                onBlur={triggerSearch}
                value={value}
            />
        </div>
    );
}