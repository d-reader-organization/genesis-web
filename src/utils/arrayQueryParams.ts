export const generateQueryParamsArray = (params: Array<object>, queryKey: string): Record<string, string> =>
  params.reduce((prev, curr, index) => {
    return { ...prev, [`${queryKey}[${index}]`]: JSON.stringify(curr) }
  }, {}) as Record<string, string>
