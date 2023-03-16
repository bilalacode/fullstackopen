import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const FilterForm = () => {
  const defaultVal = useSelector((state = "") => state.filter);
  const dispatch = useDispatch();
  const filter = (event) => {
    const val = event.target.value;
    // event.target.value = "";

    dispatch(filterChange(val));
  };
  return (
    <form>
      Filter: <input name={"filter"} value={defaultVal} onChange={filter} />
      <br></br>
      <br></br>
    </form>
  );
};

export default FilterForm;
