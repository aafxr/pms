import {useContext} from "react";
import {BoardContext} from "./BoardContext";

export function useBoardContext(){
    return useContext(BoardContext)
}