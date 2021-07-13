import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img style={{borderRadius: '100%'}} src={`https://github.com/${propriedades.githubUser}.png`} />
    </Box>
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
]

  return (
    <> 
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <Box>Minhas Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
