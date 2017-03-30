import { Injectable } from '@angular/core';

/*
    MessageService contains message model
 */
@Injectable()
export class MessageService{
    messages = [
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: "Angular 1.5",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@gmail.com",
                subject: "Typescript",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: "Flexbox how-to",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: "Re: ES6 tutorial",
                body: " a b c d e f  "
            }
        ];

    getMessages(){
        return this.messages;
    }    

    getMessagesByFolder(folderName)
    {
        var messages = [
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: folderName + " 1",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@gmail.com",
                subject: folderName + " 2",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: folderName + " 3",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@gmail.com",
                subject: folderName + " 4",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: folderName + " 5",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@gmail.com",
                subject: folderName + " 6",
                body: " a b c d e f  "
            },

        ];
        return messages; 
    }

    getMessagesBySearch(query)
    {
        //TODO replace this with a call to MessageSearchService.searchMessages(query)
        var messages = [
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: query + " 1",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@gmail.com",
                subject: query + " 2",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@gmail.com",
                subject: query + " 3",
                body: " a b c d e f  "
            },

        ];
        return messages; 
    }
}
