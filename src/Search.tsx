
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


// Accepts Props: 
// "onSearch" - Function - Callback with the entered search value on blur or when the user presses enter. 
export default function Search(props){
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const inputRef = useRef(null);

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

    function keyDown(e){

        if(e.key === 'Enter'){

            // Pull the focus off the search bar to hide flashing carot.
            // Because of our "onBlur" callback, this also calls "triggerSearch".
            e.target.blur();
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