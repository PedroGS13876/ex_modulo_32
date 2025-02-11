import { useSelector } from 'react-redux'

import Contato from '../../components/Contato'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )
  const filtraContatos = () => {
    let contatosFiltradas = itens
    if (termo !== undefined) {
      contatosFiltradas = itens.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      if (criterio === 'status') {
        contatosFiltradas = contatosFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return contatosFiltradas
    } else {
      return itens
    }
  }

  const exibeMensagem = (quantidade: number) => {
    let mensagem = ''
    const complemento =
      termo !== undefined && termo.length > 0 ? `e"${termo}"` : ''
    if (criterio === 'todos') {
      mensagem = `${quantidade} contato(s) encontrado(s) como: todos ${complemento}`
    } else {
      mensagem = `${quantidade} contato(s) encontrado(s) como: "${`${criterio} = ${valor}`}" ${complemento}`
    }
    return mensagem
  }

  const contatos = filtraContatos()
  const mensagem = exibeMensagem(contatos.length)
  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {contatos.map((t) => (
          <li key={t.nome}>
            <Contato
              email={t.email}
              nome={t.nome}
              status={t.status}
              contato={t.contato}
              id={t.id}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeContatos
