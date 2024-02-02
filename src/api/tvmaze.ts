export const getMovies = async (page = 1) => {
  const result = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
  const data = await result.json()
  return data
}
