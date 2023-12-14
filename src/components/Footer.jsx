import "../css/Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="informations_footer">
        <img src="/img/svg/logo_noir.svg" alt="forme" className="logo-footer" />
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
          <p>Cégep de Saint-Jérôme</p>
          <p>2023</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
