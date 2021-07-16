import { SiteClient } from 'datocms-client';



export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const token = 'e8fd683bed795717bb3c1e962bcd4c';
        const client = new SiteClient(token);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "968028",
            ...request.body,

            
             // ID do Model de "Communities" criado pelo Dato
            //title: 'Teste',
            //imageUrl: 'https://github.com/Vinicius029.png',
            //registroCriado: registroCriado
            
            
            //...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/omariosouto.png",
            // creatorSlug: "omariosouto"
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}