import React, { useEffect } from "react";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/actions";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { getAuthToken, setAuthToken } from "../../utils/localStorage";
import { Uri } from "../../constants";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Card from "../../components/Card";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (getAuthToken()) {
      navigate(Uri.Reports, { replace: true });
    }
  }, [navigate]);

  const { mutate, error } = useMutation({
    mutationFn: login,
    onSuccess: (res: { access_token: string }) => {
      setAuthToken(res.access_token);
      navigate(Uri.Reports, { replace: true });
    },
  });

  console.log(error);

  const onSubmit = (formData: Inputs) => {
    mutate(formData);
  };

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  return (
    <div className="login">
      <Card className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="Email"
            data-cy="email"
            errorMessage={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            data-cy="password"
            errorMessage={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
          <Button className="login-button" type="submit" data-cy="login-button">
            Login
          </Button>
          {error && <p>{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default Login;
