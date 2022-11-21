import * as NodeCache from 'node-cache';

// configuração do cache

const myCache = new NodeCache({
  stdTTL: 100, //segundos de duração para cada valor criado no cache
  checkperiod: 120, //segundos de intervalo para cada checagem do cache para exclusão de dados expirados
});

export default myCache;
