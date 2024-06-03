import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

export const action = async ({params} : ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

export const ProductDetails = ({product} : ProductDetailsProps) => {

  const fetcher = useFetcher()
  const navigate = useNavigate()
  const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
          {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
              type='submit'
              name="id"
              value={product.id}
              className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:bg-slate-100`}
            >
              {isAvailable ? 'Disponible' : 'No disponible'}
            </button>
          </fetcher.Form> 
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
              <button 
                onClick={() => navigate(`productos/${product.id}/editar`)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-center text-xs"
              >Editar</button>
              <Form 
                className="w-full"
                method="POST"
                onSubmit={(e) => {
                  if (!confirm('¿Deseas eliminar este producto?')) {
                    e.preventDefault()
                  }
                }}
                action={`productos/${product.id}/eliminar`}
              >
                <input 
                  type="submit"
                  className="bg-red-600 hover:bg-red-400 hover:cursor-pointer text-white w-full rounded-lg p-2 uppercase font-bold text-center text-xs"
                  value="Eliminar"
                />
              </Form>
           </div>
        </td>
    </tr> 
  )
}
