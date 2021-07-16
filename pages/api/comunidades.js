import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequest(request, response) {

    if(request.method == 'POST') {
        const TOKEN = 'e86015fe17fa4511fb0203632f3338'
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "972692",
            ...request.body, // Os ... é para falar que não queremos o objeto especifico, e sim o que tem dentro dele
            // title: "Bando",
            // imageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/cde2e9de-3d75-4823-932a-6bb3364f14c5-profile_image-300x300.jpg",
            // creatorSlug: "GabrielGSD",
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return
    }

    response.status(400).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}