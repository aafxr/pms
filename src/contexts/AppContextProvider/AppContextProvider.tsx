import React, {createContext, PropsWithChildren, useContext, useState} from 'react';
import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {DateRange} from "../../core/classes/v1/DateRange";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Board} from "../../core/classes/v1/Board";
import {Property} from "../../core/classes/v1/Property";


export type AppStateType = {
    timeStrategy: BookingTimeStrategyType
    time_from: Date
    time_to: Date,
    orderStatus: BookingItem['status']
    board: Board | undefined
    property: Property | undefined
    range: DateRange
    bookingStatusFilter: string | undefined


}


export type AppContextType = {
    appState: AppStateType,
    setAppState:  React.Dispatch<React.SetStateAction<AppStateType>>
}


let d = new Date()
d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
const range = new DateRange(d, 30)


const defaultContextValue: AppContextType = {
    appState: {
        timeStrategy: 'daily',
        time_from: range.start,
        time_to: range.end,
        orderStatus: "awaiting",
        board: undefined,
        property: undefined,
        range: new DateRange(new Date(), 1),
        bookingStatusFilter: undefined


    },
    setAppState: () => {}
}


export const AppContext = createContext(defaultContextValue)


export function AppContextProvider({children}: PropsWithChildren) {
    const [state, setState] = useState(defaultContextValue.appState)
    const context = useContext(AppContext)

    context.setAppState = setState
    context.appState = state


    return (
        <AppContext.Provider value={{...context}}>
            {children}
        </AppContext.Provider>
    );
}

