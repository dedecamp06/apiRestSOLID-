import { Router } from "express";

const router = Router()

router.post('/users', (request, response) => {
  return 'teste'
});

export { router }