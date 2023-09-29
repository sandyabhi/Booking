"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "@/app/components/input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/",
      });

      if (callback?.ok) {
        // Sign-in successful
        // console.log("Logged in");
        toast.success("Logged in");
        // Optionally refresh the page
        router.refresh();
        // Close the login modal if needed
        loginModal.onClose();
      } else if (callback?.error) {
        // Sign-in error
        toast.error(callback.error);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }

    console.log(data);

    // signIn("credentials", {
    //   ...data,
    //   redirect: false,
    // }).then((callback) => {
    //   setIsLoading(false);

    //   if (callback?.ok) {
    //     console.log("loggin");

    //     toast.success("Logged in");
    //     // router.refresh();
    //     loginModal.onClose();
    //   }
    //   if (callback?.error) {
    //     toast.error(callback.error);
    //   }
    // });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => {
          signIn("github");
        }}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <span>First time using Booking.com</span>{" "}
        <span
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an Account
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      ></Modal>
    </>
  );
};

export default LoginModal;
