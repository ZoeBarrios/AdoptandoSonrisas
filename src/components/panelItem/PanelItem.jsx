export default function PanelItem({
  children,
  onClick,
  isActive,
  panelIsShow,
  icon,
}) {
  return (
    <div>
      <a
        className={`flex flex-row items-center gap-2 w-full block h-full text-start text-2xl ${
          isActive ? "text-orange" : "text-black"
        } ${panelIsShow ? "opacity-0" : ""} hover:text-darkOrange`}
        href="#"
        onClick={onClick}
      >
        <i className={icon} />
        {children}
      </a>
    </div>
  );
}
