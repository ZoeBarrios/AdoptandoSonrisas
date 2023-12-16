export default function PanelItem({ children, onClick, isActive }) {
  return (
    <div>
      <a
        className={`w-full block h-full text-start ${
          isActive ? "text-white" : "text-black"
        } text-xl hover:text-white`}
        href="#"
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}
