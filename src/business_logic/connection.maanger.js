const url = "http://localhost:4000";

export const getActiviesFromBE = async () => {
    const data = await fetch(url + "/getActivities");
    console.log(data["operators"]);
}