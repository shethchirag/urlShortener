import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui//card";
import { useState } from "react";
import useFetchApi from "@/hooks/useFetchApi";
import { SignUp } from "@/db/apiAuth";
import { SignUpSchema } from "./SignupSchema";
import Error from "../Error";

const Signup = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState(null);
  const { data, loading, error: errorApi, fn } = useFetchApi(SignUp, signUp);

  const onChangeHandler = (e) => {
    const { name } = e.target;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setSignUp((prev) => ({ ...prev, [name]: value }));
  };
  console.log(signUp);
  const submitHandler = async () => {
    setErrors([]);
    try {
      let validData = await SignUpSchema.isValid(signUp);
      await SignUpSchema.validate(signUp, { abortEarly: false });
      if (validData) await fn();
    } catch (error) {
      const errObj = {};
      error?.inner?.forEach((err) => {
        errObj[err.path] = err.message;
      });
      setErrors(errObj);
    }
  };
  console.log(data, errorApi);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {errorApi && <Error message={errorApi} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={onChangeHandler}
          />
        </div>
        {errors && <Error message={errors.name} />}

        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={onChangeHandler}
          />
        </div>
        {errors && <Error message={errors.email} />}

        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={onChangeHandler}
          />
        </div>
        {errors && <Error message={errors.password} />}

        <div className="space-y-1">
          <input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={onChangeHandler}
          />
        </div>
        {errors && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={submitHandler}>Create Account</Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
