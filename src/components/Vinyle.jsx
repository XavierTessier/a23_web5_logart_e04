import "../css/vinyle.css";
const Vinyle = () => {
  return (
    <div className="vinyle perspective-gauche m-8 ">
      <img src="/img/png/pexels-karolina-grabowska-4471292.jpg" alt="Test" />
      <div className="ligne "></div>
      <div className="ligne" style={{ width: "75%", height: "75%" }}></div>
      <div className="ligne" style={{ width: "60%", height: "60%" }}></div>
      <svg
        className="z-50"
        width="250"
        height="300"
        viewBox="0 0 300 100"
        transform="translate(-20 0)"
      >
        <path
          id="dos_cover"
          data-name="dos_cover"
          d="M121.728,425.469,0,396.369V29.728L121.728.33V51.18c-105.573,19.433-105.573,305.1,0,324.366Z"
          transform="translate(10 -125) scale(1.6 0.8)"
          fill="#1D1D1B"
        />
        <path
          id="Tracé_151"
          data-name="Tracé 151"
          d="M121.728,425.469,0,396.369V29.728L121.728.33V51.18c-105.573,19.433-105.573,305.1,0,324.366Z"
          transform="translate(0 -120) scale(1.6 0.8)"
          fill="#454444"
        />
      </svg>
    </div>
  );
};

export default Vinyle;
