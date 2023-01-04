
import { useEffect, useState, useRef } from "react";

export function useWindowSize() : number[] {
    
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    
    function resized(){
        
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(()=>{

        window.addEventListener("resize", resized);

        return ()=> window.removeEventListener("resize", resized);

    }, []);

    return [width, height];
}

export function useWindowScroll() : number[] {

    const [scrollX, setScrollX] = useState<number>(0);
    const [scrollY, setScrollY] = useState<number>(0);

    const lastScrollTimeRef = useRef<number>(0);
    const lastCalledTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(()=>{

        function scrolled() : void {
        
            const curr_time = (new Date()).getTime();
    
            // Debouncing to only allow the scroll to trigger every 200 ms.
            if( curr_time - lastScrollTimeRef.current < 200 ){
                
                if( lastCalledTimeout.current ){

                    clearTimeout(lastCalledTimeout.current);
                }

                lastCalledTimeout.current = setTimeout(scrolled, 210);

                return;
            }
    
            lastScrollTimeRef.current = curr_time;
            
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
        }

        window.addEventListener('scroll', scrolled);

        return ()=> window.removeEventListener('scroll', scrolled);

    }, []);

    return [scrollX, scrollY];
}