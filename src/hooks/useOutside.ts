import {RefObject, useEffect, useRef} from "react";

export function useOutside<T extends HTMLElement>(ref: RefObject<T>, cb: Function){
    const r = useRef({ref, cb});


    useEffect(() => {
        r.current = {ref, cb}
    }, [ref, cb])


    useEffect(() => {
        function handleClickOutside(e: MouseEvent){
            const $el = e.target
            const node = r.current.ref.current
            if( $el && $el instanceof Node && node ){
                if(!node.contains($el)) r.current.cb()
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {document.removeEventListener('click', handleClickOutside)}
    }, []);
}