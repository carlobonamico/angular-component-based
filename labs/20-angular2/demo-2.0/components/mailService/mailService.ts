import { Injectable } from '@angular/core';
import {LogService} from "components/log-service/log-service.ts";

/*
    MessageService contains message model
 */
@Injectable()
export class MessageService{

    constructor(private logService: LogService)
    {
        logService.log("Message Service started");
    }
    messages = [
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: "Angular 1.5",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: "Typescript",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: "Flexbox how-to",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
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
                from: "sonia.pini@nispro.it",
                subject: folderName + " 1",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: folderName + " 2",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: folderName + " 3",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: folderName + " 4",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: folderName + " 5",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
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
                from: "sonia.pini@nispro.it",
                subject: query + " 1",
                body: " a b c "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "carlo.bonamico@nispro.it",
                subject: query + " 2",
                body: " a b c d e f  "
            },
            {
                to: "carlo.bonamico@gmail.com",
                from: "sonia.pini@nispro.it",
                subject: query + " 3",
                body: " a b c d e f  "
            },

        ];
        return messages; 
    }
}
