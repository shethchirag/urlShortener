import * as Yup from "yup";
export const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, "min 3 letter").required("require"),
  email: Yup.string().email("enter valid email").required("require"),
  password: Yup.string().min(5, "min 5 letter").required("require"),
  profile_pic: Yup.mixed().test(
    "fileSize",
    "The file is too large",
    (value) => {
      if (!value.length) return true; // attachment is optional
      return value[0].size <= 2000000;
    }
  ),
});
