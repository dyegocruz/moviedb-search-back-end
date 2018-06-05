import queryString from 'query-string';

export const mountParams = ({
  apiKey, language, sort, query, page,
}) => {
  const params = {};
  params.api_key = apiKey;
  params.language = language || 'pt-BR';
  params.sort_by = sort;
  params.query = query || '';
  params.page = parseInt(page || 1);
  return params;
};
