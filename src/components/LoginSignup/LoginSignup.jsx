import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "./Login";
import Signup from "./SignUp";

export function LoginSignup() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Login />
      </TabsContent>
      <TabsContent value="password">
        <Signup />
      </TabsContent>
    </Tabs>
  );
}
