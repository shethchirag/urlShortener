import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "../Error";
import useFetchApi from "@/hooks/useFetchApi";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/Context";

const Login = () => {
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { data, loading, error: errorApi, fn } = useFetchApi(login, userCred);
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const longLink = URLSearchParams.get("createNew");
  const fetchUser = UrlState();
  const handleChange = (e) => {
    const value = e.target.value;
    const { name } = e.target;
    setUserCred((prev) => ({ ...prev, [name]: value }));
  };
  const yupObject = Yup.object().shape({
    email: Yup.string().email("enter valid email").required("require"),
    password: Yup.string().min(6, "enter min 6 char").required("require"),
  });

  const onSubmitHandler = async () => {
    setError([]);
    try {
      let validData = await yupObject.isValid(userCred);
      await yupObject.validate(userCred, { abortEarly: false });
      if (validData) {
        await fn();
      }
    } catch (error) {
      const errorObject = {};
      error?.inner?.forEach((Error) => {
        errorObject[Error.path] = Error.message;
      });
      setError(errorObject);
    }
  };

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {error && <Error message={errorApi} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => handleChange(e)}
            value={userCred.email}
          />
        </div>
        {error?.email && <Error message={error.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => handleChange(e)}
            value={userCred.password}
          />
        </div>
        {error?.password && <Error message={error.password} />}
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmitHandler}>
          {/* {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"} */}
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
