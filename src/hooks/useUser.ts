import {useAppSelector} from "./useAppSelector";

export function useUser() {
    return useAppSelector(s => s.user);
}