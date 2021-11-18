
export default function ListGallery({products}) {

  return (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
              {products.map((product) => (
                <a
                  key={product._id}
                  href={`/Product/${product._id}`}
                  className="group text-sm"
                >
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                    <img
                      src={product.image[0]}
                      alt=""
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 italic">
                    {product.isActive ? "disponible" : "Non disponible"}
                  </p>
                  <p className="mt-2 font-medium text-gray-900">
                    {product.price} €
                  </p>
                </a>
              ))}
                   <a
                  href={`/configurator`}
                  className="group text-sm"
                >
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                    <img
                      src="./configurator.PNG"
                      alt=""
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-medium text-gray-900">
                    Shoe Configurator
                  </h3>
                  <p className="text-gray-500 italic">
                    "disponible" 
                  </p>
                  <p className="mt-2 font-medium text-gray-900">
                   250 €
                  </p>
                </a>
            </div>

  );
}
