import { useSelector } from "react-redux";
import MyLayout from "../components/MyLayout";
import ProfileCard from "../components/ProfileCard";
import { RootState } from "../reducers";

const Profile = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <MyLayout mode="my">
        {isLoggedIn ? <ProfileCard user={user} /> : <div>로그인 해주세요.</div>}
      </MyLayout>
    </>
  );
};

export default Profile;
