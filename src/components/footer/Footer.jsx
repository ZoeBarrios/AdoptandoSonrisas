import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 - Desarrollado por Zoe Barrios</p>
        <p>
          <i
            className="fa-regular fa-envelope"
            style={{ color: "#000000" }}
          ></i>{" "}
          AdoptandoSonrisas@outlook.com.ar
        </p>
      </div>
    </footer>
  );
}
