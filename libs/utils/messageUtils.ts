import { IMessage } from "@/libs/definations";

export const createMessage = (type: string = "", msg: string = ""): IMessage => {
    return { type, msg };
}
