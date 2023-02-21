import { Position } from "./position";

export interface Weather {
    temp : number;
    feels_like : number;
    temp_min : number;
    temp_max : number;
    pressure : number;
    humidity : number;
    timestamp : Date;
    position: Position;
    
}