function UserProfile() {
  const backUrl = process.env.REACT_APP_BACK_URL;
  
    return (
      <div>
        <h1>User Profile</h1>
        <img src={`${backUrl}/uploads/user.png`} alt="User Profile" />
      </div>
    );
  }
  
  export default UserProfile;