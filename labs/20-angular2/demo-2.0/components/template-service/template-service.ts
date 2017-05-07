export class TemplateService {

    constructor(){

    }
    getReplyTemplate(message)
    {
        var newMessage = {
            to: message.from,
            subject: "Re:"+message.subject
        };
        return newMessage; 
    }

}