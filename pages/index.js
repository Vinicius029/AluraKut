import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault ,OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';



function ProfileSiderBar(propriedades){
  return(
    
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius:'8px'}}/><hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} >
          @{propriedades.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
     
      
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{propriedades.title}({propriedades.items.length})</h2>
    
    <ul>
        {/*seguidores.map((seguidores) => {
          return(
            <li key={seguidores}>
              <a href={`/users/${seguidores}`}>
                  <img src={`https://github.com/${seguidores}.png`}/>
                <span>{seguidores}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
  </ProfileRelationsBoxWrapper>

  )
}


export default function Home() {


  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);




  const githubUser =  'Vinicius029' 
  //const comunidades = [];
  const pessoasFavoritas = [
                  'juunegreiros',
                  'gustavoguanabara',
                  'peas',
                  'rafaballerini',
                  'marcobrunodev',
                  'felipefialho']


  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/Vinicius029/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '02b5fa41f13c56290599d381c434a5',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          
          
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {

      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato)
    })
    

  },[])




  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea:'profileArea' }}>
         <ProfileSiderBar githubUser={githubUser}/>
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="Title">Bem Vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form  onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target)

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')

              }
            
              const comunidadesAtualizadas = [...comunidades, comunidade]

             
              setComunidades(comunidadesAtualizadas)
              console.log(comunidadesAtualizadas)
             
              
            }}>
              <div>
              <input 
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="title"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
              />
              </div>
              <div>
              <input 
                    placeholder="Coloque uma URL para usarmos de capa"
                    name="image"
                    aria-label="Coloque uma URL para usarmos de capa"
              />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
      </div>






      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        
         
         <ProfileRelationsBox title="Seguidores" items={seguidores} /> 

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">comunidade ({comunidades.length})</h2>
          
          <ul>
              {comunidades.map((comun) => {
                return(
                  <li key={comun.id}>
                    <a href={`/users/${comun.id}`}>
                        <img src={comun.imageUrl}/>
                      <span>{comun.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>


        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Amigos ({pessoasFavoritas.length})</h2>
         
          <ul>
            {pessoasFavoritas.map((pessoas) => {
              return(
                <li key={pessoas}>
                  <a href={`https://github.com/${pessoas}`} target={'_blank'}>
                    <img src={`https://github.com/${pessoas}.png`} />
                    <span>{pessoas}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  );
}
