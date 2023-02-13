// Height is set from Nav via props

function TopMargin(props) {
  return (
    <div
      className="transition-all duration-300"
      style={{ height: props.height }}
    ></div>
  );
}

export default TopMargin;
