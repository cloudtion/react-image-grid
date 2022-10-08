import { useEffect, useState, useRef } from "react";


export function useWindowSize(){

    const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
    
    function resized(){
        
        setSize({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(()=>{

        window.addEventListener('resize', resized);

        return ()=> window.removeEventListener('resize', resized);

    }, []);

    return size;
}


export function useWindowScroll(){

    const [scrollOffset, setScrollOffset] = useState({x: 0, y: 0});

    const lastScrollTimeRef = useRef(0);
    const lastCalledTimeout = useRef(null);

    useEffect(()=>{

        function scrolled(){
        
            const curr_time = (new Date()).getTime();
    
            // Debouncing to only allow the scroll to trigger every 200 ms.
            if( curr_time - lastScrollTimeRef.current < 200 ){
    
                clearTimeout(lastCalledTimeout.current);
                lastCalledTimeout.current = setTimeout(scrolled, 210);
                return;
            }
    
            lastScrollTimeRef.current = curr_time;
    
            setScrollOffset({x: window.scrollX, y: window.scrollY});
        }

        window.addEventListener('scroll', scrolled);

        return ()=> window.removeEventListener('scroll', scrolled);

    }, []);

    return scrollOffset;
}