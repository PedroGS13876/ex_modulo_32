import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { alterarTermo } from '../../store/reducers/filtro'
import FiltroCard from '../../components/FiltroCard'
import { Botao, BotaoCadastrar, Campo } from '../../styles'

import * as S from './styles'
import * as enums from '../../utils/enums/Contato'
import { useNavigate } from 'react-router-dom'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { termo } = useSelector((state: RootReducer) => state.filtro)
  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <BotaoCadastrar onClick={() => navigate('/novo')}>
              Adicionar contato
            </BotaoCadastrar>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alterarTermo(evento.target.value))}
            />
            <S.Filtros>
              <FiltroCard
                valor={enums.Status.NORMAL}
                criterio="status"
                legenda="normal"
              />
              <FiltroCard
                valor={enums.Status.FAVORITO}
                criterio="status"
                legenda="favoritos"
              />
              <FiltroCard criterio="todos" legenda="todos" />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar a lista de Contos</Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
