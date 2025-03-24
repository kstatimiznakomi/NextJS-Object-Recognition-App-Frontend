import {createContext} from 'react';
import {WebcamStore} from "./webcamStore";

export const webcamStore = createContext(new WebcamStore())