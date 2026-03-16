import { useParams } from "react-router-dom";

function Entry() {
  const { id } = useParams();
  return <div>Entry page for id: {id}</div>;
}

export default Entry;
