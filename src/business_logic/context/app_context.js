import { createContext } from "react";

const AppContext = createContext(null);

const ShowDialogContext = createContext(false);

const ActivitiesContext = createContext(null);
export { AppContext, ShowDialogContext, ActivitiesContext };
