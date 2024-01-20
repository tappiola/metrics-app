import React, { useEffect, useState } from "react";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/actions";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { getAuthToken, setAuthToken } from "../../utils/localStorage";
type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res: { access_token: string }) => {
      setAuthToken(res.access_token);
      navigate("/", { replace: true });
    },
    onError: (e) => setError(e.message),
  });

  const onSubmit = (formData: Inputs) => {
    setError("");
    mutation.mutate(formData);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email"
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
          errorMessage={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
