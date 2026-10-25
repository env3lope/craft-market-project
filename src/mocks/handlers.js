import { http, HttpResponse, delay } from "msw";
import { products } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    await delay(600);
    return HttpResponse.json(products)
  })
]

// export const handlers = [
//   http.get("/api/products", async () => {
//     await delay(600);
//     return HttpResponse.json(
//       { message: "Внутрішня помилка сервера" },
//       { status: 500 }
//     )
//   })
// ]
