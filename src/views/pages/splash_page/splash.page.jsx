import { useDispatch, useSelector } from "react-redux";
import {
  getActiviesFromBE,
  getConstantValues,
} from "../../../business_logic/network.repository";
import {
  activitiesSlice,
  constantSlice,
} from "../../../store/slices/data.slice";
import { useNavigate } from "react-router-dom";
import { selectActivities, selectConstants } from "../../../store/store";

export function Splashpage() {
  const dispatch = useDispatch();

  const activitiesSelector = useSelector(selectActivities);

  const router = useNavigate();

  
  return <div></div>;
}
