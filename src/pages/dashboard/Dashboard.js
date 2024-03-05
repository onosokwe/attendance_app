import React from "react";

import Home from "./Home";
import Skeleton from "@material-ui/lab/Skeleton";
import { getLoggedInUser, getMyPendingTasks } from "../../utils/helper";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [loader, setLoader] = React.useState(false);
  const [profile, setLoggedinUser] = React.useState({});
  const [pending, setPendings] = React.useState([]);
  const TOKEN = localStorage.getItem("kloka:token:data");

  React.useEffect(() => {
    getLoggedInUser(TOKEN)
      .then((res1) => {
        setLoggedinUser(res1.data.data);
      })
      .catch((err1) => {
        console.log(err1.response.data.error);
      });
    }, [TOKEN]);

  React.useEffect(() => {
    if((profile && profile.first_name)){
      setLoader((prev) => !prev);
      setTimeout(() => {
        setLoader(false);
      }, 4000);
    }
  }, [profile]);

  React.useEffect(() => {
    getMyPendingTasks()
    .then((res)=> {
        setPendings(res.data);
    })
    .catch((err1) => {
        if(err1.message === "Network Error"){
            history.push("/")
        }
        console.log(err1.message);
    });
  }, [history]);

  return (
    <div>
      {(loader && !profile) ? (
        <>
          <Skeleton
            variant="text"
            width={260}
            height={30}
            style={{
              background: "#e0e0e0",
              padding: 30,
              borderRadius: 3,
              marginBottom: 10,
            }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={318}
            style={{ background: "#e0e0e0", padding: 10, borderRadius: 3 }}
          />
        </>
      ) : (
        <Home profile={profile} pending={pending} />
      )}
    </div>
  );
};

export default Dashboard;
