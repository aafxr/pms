import React, {createContext} from 'react';
import {Board} from "../../../core/classes/v1/Board";

export const BoardContext = createContext(new Board())