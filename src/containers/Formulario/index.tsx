import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BotaoSalvar, MainContainer, Titulo } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import { Campo } from '../../styles'
import * as enums from '../../utils/enums/Contato'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [contato, setContato] = useState('')
  const [status, setStatus] = useState(enums.Status.NORMAL)

  const cadastrarContato = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      cadastrar({
        nome,
        contato,
        email,
        status
      })
    )
    navigate('/')
  }
  return (
    <MainContainer>
      <Titulo>Novo Contato</Titulo>
      <Form onSubmit={cadastrarContato}>
        <Campo
          value={nome}
          onChange={({ target }) => setNome(target.value)}
          type="text"
          placeholder="Nome completo"
        />
        <Campo
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="Email"
        />
        <Campo
          value={contato}
          onChange={({ target }) => setContato(target.value)}
          type="number"
          placeholder="Telefone"
        />
        <Opcoes>
          <p>Tipo de Contato</p>
          {Object.values(enums.Status).map((status) => (
            <Opcao key={status}>
              <input
                value={status}
                name="Tipo de Contato"
                type="radio"
                onChange={(evento) =>
                  setStatus(evento.target.value as enums.Status)
                }
                id={status}
                defaultChecked={status === enums.Status.NORMAL}
              />{' '}
              <label htmlFor={status}>{status}</label>
            </Opcao>
          ))}
          <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
        </Opcoes>
      </Form>
    </MainContainer>
  )
}

export default Formulario
