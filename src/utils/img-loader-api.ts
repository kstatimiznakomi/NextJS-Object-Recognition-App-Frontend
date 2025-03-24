import axios from "axios";
import {IMGBB_API_KEY} from "@/constants/constants";

export const loadImg = (image: string) => {
    try {
        axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`, {
            image: image
        })
            .then((res) => {
                console.log(res)
            })
    } catch (er) {
        console.log(er)
    }
}