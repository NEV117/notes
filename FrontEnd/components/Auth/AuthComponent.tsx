"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createAccessToken, registerUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { InfoIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";
import { Snippet } from "@nextui-org/snippet";

export const AuthComponent = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        setLoading(true);
        const loginData = { username, password };
        const result = await createAccessToken(loginData);

        if (result === true) {
          console.log("Login successful");
          setAuthError("");
          window.location.href = "/";
          setLoading(false);
        } else {
          setAuthError("Login failed. Please check your credentials.");
          console.error("Login failed:", result);
          setLoading(false);
        }
      } catch (error) {
        setAuthError("An error occurred during login.");
        console.error("Error during login:", error);
        setLoading(false);
      }
    }
  };

  const validateRegister = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateRegister()) {
      try {
        setLoading(true);
        const registerData = { name, email, username, password };
        const result = await registerUser(registerData);

        if (result === true) {
          console.log("Registration successful");
          setAuthError("");
          await handleLogin();
        } else {
          console.error("Registration failed:", result);
          setAuthError("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setAuthError("An error occurred during registration.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="w-full  md:w-[700px]" radius="sm">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <strong>
            <h1 className="text-[25px]">Notes App</h1>
          </strong>
        </div>
      </CardHeader>
      <CardBody>
        <Tabs
          color="primary"
          size="md"
          onSelectionChange={(key) => setActiveTab(key as string)}
          selectedKey={activeTab}
        >
          <Tab key="login" title="Login">
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                label="Username"
                size="sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
                errorMessage={errors.username}
              />
              <Input
                type="password"
                label="Password"
                size="sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
              />
            </div>
          </Tab>
          <Tab key="register" title="Register">
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                label="Name"
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                type="email"
                label="Email"
                size="sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
              />
              <Input
                type="text"
                label="Username"
                size="sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
                errorMessage={errors.username}
              />
              <Input
                type="password"
                label="Password"
                size="sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
              />
              <Input
                type="password"
                label="Confirm Password"
                size="sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
              />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
      <CardFooter className="flex justify-end items-center flex-col gap-2">
        {authError && (
          <Tooltip
            content={
              <Snippet hideSymbol={true} hideCopyButton={true} className="bg-white" >
                <span>Try default values... (already have data)</span>
                <span>username: admin</span>
                <span>password: 123qwe</span>
              </Snippet>
            }
            placement="top-start"
          >
            <div className="alert alert-error flex items-center gap-2">
              <InfoIcon color="red" />

              <p className="text-red-500">{authError}</p>
            </div>
          </Tooltip>
        )}
        <div className="flex justify-end items-center gap-2">
          {activeTab === "login" ? (
            <>
              <p>
                Don't have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </span>
              </p>
              <Button color="primary" isLoading={loading} onClick={handleLogin}>
                Authenticate
              </Button>
            </>
          ) : (
            <>
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </span>
              </p>
              <Button
                color="primary"
                isLoading={loading}
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
