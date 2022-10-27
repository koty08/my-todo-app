import { useSelector } from "react-redux";
import MyLayout from "../components/MyLayout";
import SignUpForm from "../components/SignUpForm";
import { RootState } from "../reducers";

const Signup = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <MyLayout mode={"signup"}>
      {isLoggedIn ? (
        <div>로그인 상태로 회원가입 하실 수 없습니다.</div>
      ) : (
        <SignUpForm></SignUpForm>
      )}
    </MyLayout>
  );
};

export default Signup;
