export const Card = (props) =>{
    return(
        <div className="min-w-[250px] max-w-[250px] bg-gray-900 p-4 rounded-xl shadow-lg text-center flex flex-col justify-between ">
            <img src={props.imagen} alt={props.nombre} className="w-full h-48 object-cover rounded mb-4"/>
            <h4 className="text-lg font-bold">{props.nombre}</h4>
            <p className="text-gray-400">{props.precio}</p>
            <button className="mt-4 px-4 py-2 bg-[#1E90FF] hover:bg-blue-700 rounded-lg" onClick={props.agregarCarrito}>Agregar al carrito</button>
        </div>
    )
}