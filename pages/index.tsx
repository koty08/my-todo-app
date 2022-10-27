import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import CreateForm from "../components/CreateForm";
import LoginForm from "../components/LoginForm";
import ModifyForm from "../components/ModifyForm";

import MyLayout from "../components/MyLayout";
import { RootState } from "../reducers";

const Home = () => {
  const { isModifying, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <MyLayout mode="all">
        {isLoggedIn ? (
          !isModifying ? (
            <CreateForm />
          ) : (
            <ModifyForm />
          )
        ) : (
          <LoginForm />
        )}
      </MyLayout>
    </>
  );
};

export default Home;
