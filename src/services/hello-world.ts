export const helloWorld = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: 'world' }),
  }
}