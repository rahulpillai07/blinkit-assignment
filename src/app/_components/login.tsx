"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { userZodType } from "../_utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function LoginAccount() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userZodType>>({
    resolver: zodResolver(userZodType),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof userZodType>) => {
    try {
      const response = await axios.post("/api/login", values);
      if (response.status === 200) router.push("/");
      else toast.error("invalid user");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:mt-auto md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">Sign in</h1>
        <p className="text-sm text-slate-500">
          Enter your email and password to login
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Password"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Login
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup">
                <span className="text-blue-600 hover:underline">Sign up</span>
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export { LoginAccount };
