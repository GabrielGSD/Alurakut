import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img style={{borderRadius: '8px'}} src={`https://github.com/${propriedades.githubUser}.png`} />
      <hr />

      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})</h2>
      {
        <ul>
          {/* {seguidores.map((item) => { }
            return (
              <li key={item.id}>
                <a href={`https://github.com/${item}.png`}>
                  <img src={item.image} />
                  <span>{item.title}</span>
                </a>
              </li>
            )
          })*/}
        </ul>
      }
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'GabrielGSD';
  const pessoasFavoritas = [
    'Brendhon', 
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev',
  ];
  
  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://scontent.fppy4-1.fna.fbcdn.net/v/t1.18169-9/319858_236092643172618_736654017_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=OShPugQP2x0AX91Qfhr&_nc_ht=scontent.fppy4-1.fna&oh=b7dfb02cd81b7f38b8ffed73ccb73f74&oe=60F2995C'
  }]);

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function() {
    fetch('https://api.github.com/users/GabrielGSD/followers')
    .then((resposta) => {
      return resposta.json()
    })
    .then((repostaCompleta) => {
      setSeguidores(repostaCompleta)
    })
  }, [])

  return (
    <> 
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);
              const comunidade = {
                title: dadosForm.get('title'),
                image: dadosForm.get('image')
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
              console.log(comunidades)
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
                  placeholder="Coloque uma url para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidade ({comunidades.length})</h2>
            {
              <ul>
                {comunidades.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={`/users/${item.title}`}>
                        <img src={item.image} />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            }
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
