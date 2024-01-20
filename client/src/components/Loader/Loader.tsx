import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 100"
        className="loader__circle"
      >
        {[6, 26, 46].map((cx, i) => (
          <circle key={i} stroke="none" cx={cx} cy="50" r="5">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin={`0.${i + 1}`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default Loader;
