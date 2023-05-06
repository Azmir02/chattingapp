import React from "react";
import Grid from "@mui/material/Grid";
import "./home.css";
import Searchbox from "../../components/searchbox";
import Grouplist from "../../components/grouplists";
import Friendrequest from "../../components/friendrequest";
import Friends from "../../components/friends";
import Mygroups from "../../components/mygroups";
import Userlist from "../../components/userlist";
import Block from "../../components/block";

const Home = () => {
  return (
    <>
      <Grid container className="home_pages">
        <Grid item xs={4} className="home_items">
          <div>
            <Searchbox />
          </div>
          <div>
            <Grouplist />
            <Friendrequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friends />
          </div>
          <div>
            <Mygroups />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Userlist />
          </div>
          <div>
            <Block />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
