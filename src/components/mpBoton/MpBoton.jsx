export default function MpBoton({ mp_link, title }) {
  return (
    <div className="bg-blue-500 w-9/12 p-4 rounded-md shadow-md flex flex-col items-center ">
      <h2 className="text-white text-lg font-semibold mb-2 text-center">
        {title}
      </h2>
      {mp_link && (
        <a href={mp_link} target="_blank" rel="noreferrer">
          <button className="bg-white text-blue-500 py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
            Mercado Pago
          </button>
        </a>
      )}
    </div>
  );
}
