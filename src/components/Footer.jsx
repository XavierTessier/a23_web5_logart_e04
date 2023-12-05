import "../css/Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="informations_footer">
        <img src="src/img/svg/logo_dark.svg" alt="forme" className="logo" />
        <div className="designers">
          <h2>Designers</h2>
          <p>Chadrik Bertrand</p>
          <p>Rosalie Cliche</p>
        </div>
        <div className="programmeurs">
          <h2>Programmeurs</h2>
          <p>Xavier Tessier</p>
          <p>Tom Grimard</p>
        </div>
        <div className="projet">
          <h2>Projet de web 5</h2>
          <p>2023 Cégep de Saint-Jérôme</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
