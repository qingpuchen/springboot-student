// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/api/user/list', (req, res, ctx) => {
    // // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated') || true

    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     }),
    //   )
    // }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json([{
        id: 1,
        password: "jfksljf",
        username: 'admin',
        sex:1,
        age: 10,
      }]),
    )
  }),
  rest.post('/api/user/add', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          password: "jfksljf",
          username: 'admin',
          sex:1,
          age: 10,
        }),
    )
  }),

  rest.post('/api/user/edit', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          password: "jfksljf",
          username: 'admin edit',
          sex:1,
          age: 10,
        }),
    )
  }),

  rest.post('/api/user/delete', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          password: "jfksljf",
          username: 'admin delete',
          sex:1,
          age: 10,
        }),
    )
  })
]