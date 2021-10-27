import LoginForm from "forms/LoginForm/LoginForm";
import axios from "helpers/axios";
import { useHistory } from "react-router";
import { paths } from "routes/paths";

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = async (data) => {
    return axios.post("/auth/login", data).then((res) => {
      const token = res.data?.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
        setTimeout(() => {
          history.push(paths.search);
        }, 1000);
      }
    });
  };
  return (
    <main className="authContainer">
      <div className="inline">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </main>
  );
};

export default LoginPage;
