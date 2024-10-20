import { gql } from "@apollo/client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import unwrap from "ts-unwrap";
import * as yup from "yup";
import { LoginMutationVariables, useLoginMutation } from "../../types/graphql";
import resolveError from "../../utils/resolve-error";
import { clearAccessToken, setAccessToken } from "../../utils/token-storage";
import { GoogleButton, PrimaryButton } from "../Buttons";
import PasswordField from "../PasswordField";
import { TextField } from "../TextFields";

type LoginProps = {
  open: boolean;
  onClose: () => void;
};

gql`
  mutation Login($username: String!, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const schema = yup.object().shape({
  username: yup.string().email().required("Email cannot be empty."),
  password: yup.string().nullable(),
});

type FormFields = yup.InferType<typeof schema>;

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [login, { loading }] = useLoginMutation();

  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);

  const form = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const handleLogin = async (params: FormFields) => {
    const variables: LoginMutationVariables = {
      username: params.username,
      password: showPasswordField ? params.password : undefined,
    };

    try {
      clearAccessToken();
      const { data } = await login({ variables });
      const token = unwrap(data?.login?.token);
      setAccessToken(token);

      window.location.href = "/new-project";
    } catch (err) {
      const error = resolveError(err);

      if (error.code === "PRECONDITION_REQUIRED") {
        setShowPasswordField(true);
      }

      if (error.code === "INVALID_CREDENTIALS") {
        form.setError("username", {
          message: error.message,
        });
        form.setError("password", {
          message: error.message,
        });
      }
    }
  };

  return (
    <Dialog
      className="relative z-50"
      open={open}
      onClose={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden w-full rounded-lg bg-white px-8 pb-8 pt-9 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-lg sm:py-10 sm:px-0 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex min-h-full flex-1 flex-col justify-center">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto h-12 w-12">
                  <img src="/shadow-logo.png" alt="logo" />
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Enter your email to continue
                </h2>
                <p className="text-sm text-gray-600 text-center px-2 lg:px-14 mt-2">
                  If you already have an account, the password panel will appear
                  automatically.
                </p>
              </div>

              <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-0 py-6 sm:px-12">
                  <form onSubmit={form.handleSubmit(handleLogin)}>
                    <div className="flex flex-col">
                      <TextField
                        form={form}
                        name="username"
                        key="username"
                        title="Email"
                        autoComplete="email"
                        onKeyPress={(e) => {
                          form.resetField("password");
                          setShowPasswordField(false);
                        }}
                      />

                      <PasswordField
                        form={form}
                        name="password"
                        key="password"
                        title="Password"
                        autoComplete="password"
                        className={clsx(
                          { "mt-6": showPasswordField },
                          {
                            hidden: !showPasswordField,
                          },
                        )}
                      />

                      <PrimaryButton
                        type="submit"
                        loading={loading}
                        className="mt-6"
                      >
                        {showPasswordField ? "Login" : "Continue"}
                      </PrimaryButton>
                    </div>
                  </form>

                  <div className="relative mt-10">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-white px-6 text-gray-900">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <GoogleButton />
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Login;
