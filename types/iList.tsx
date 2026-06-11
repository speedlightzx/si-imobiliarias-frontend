import { iLead } from "./iLead"

export interface iList {
    id:number
    name:string
    color?:string
    leads?: iLead[]
}