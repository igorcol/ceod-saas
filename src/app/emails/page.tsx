'use client'
import { Button } from "@/components/ui/button";

export default function Page() {

    function handleSendEmails() {
        console.log('>> handleSendEmails')
        /* 
        Para cada USER (dar fetch em user):
            Pegar email dele
            Enviar o Email
        */

    }

    return (
        <div className="space-y-5">
            <Button onClick={()=>handleSendEmails()}>
                Enviar Emails
            </Button>
            <p>Não implementado</p>
        </div>
    )
}