// "use client";

// import { Input } from "@/components/acertinity_ui/input";
// import { Label } from "@/components/acertinity_ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/acertinity_ui/select";
// import { ShootingStars } from "@/components/acertinity_ui/shooting-stars";
// import { SparklesCore } from "@/components/acertinity_ui/sparkles";
// import { StarsBackground } from "@/components/acertinity_ui/stars-background";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { getCookie } from "cookies-next";
// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// // ✅ Define Validation Schema with Zod
// const formSchema = z.object({
//   firstName: z.string().min(2, "First name is required"),
//   lastName: z.string().min(2, "Last name is required"),
//   city: z.string().min(2, "City is required"),
//   college: z.string().min(2, "College is required"),
//   department: z.string().min(2, "Department is required"),
//   degree: z.string().min(1, "Select a degree"),
//   yearOfStudy: z.string().min(1, "Select your year of study"),
//   phoneNumber: z.string().min(10, "Phone number is required"),
// });

// export default function Profile() {
//   const { user } = useKindeBrowserClient(); // Fetch user details
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       city: "",
//       college: "",
//       department: "",
//       degree: "",
//       yearOfStudy: "",
//       phoneNumber: "",
//     },
//   });

//   // ✅ Fetch User Data from Cookies
//   useEffect(() => {
//     const userData = getCookie("new-user");
//     if (userData) {
//       const parsedUser = JSON.parse(userData);
//       setValue("firstName", parsedUser.given_name || "");
//       setValue("lastName", parsedUser.family_name || "");
//     }
//   }, [setValue]);

//   // ✅ Handle Form Submission
//   const onSubmit = async (data) => {
//     const updatedFormData = {
//       ...data,
//       k_id: user?.id,
//       picture: user?.picture,
//       email: user?.email,
//     };
//     console.log("Entered onSubmit");
//     setLoading(true);
//     console.log("Submitting Data:", data);

//     const res = await fetch("/api/updateUser", {
//       method: "POST",
//       body: JSON.stringify(updatedFormData),
//       headers: { "Content-Type": "application/json" },
//     });

//     const responseData = await res.json(); // Try parsing the response
//     console.log("Response:", responseData);
//     if (!res.ok) {
//       console.log("Error:", res.status, responseData);
//     }

//     if (res.ok) {
//       redirect("/");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 light:shadow-input border-medium bg-zinc-900 light:bg-white bg-black my-10">
//       <h2 className="font-bold text-xl light:text-neutral-800 text-neutral-200">
//         Welcome to Yuktaha 2025
//       </h2>
//       <p className="light:text-neutral-600 text-sm max-w-sm mt-2 text-neutral-300">
//         Please fill the details given below.
//       </p>

//       <form className="my-8" onSubmit={handleSubmit}>
//         <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
//           <LabelInputContainer>
//             <Label htmlFor="firstname">First name</Label>
//             <Input
//               {...register("firstName")}
//               id="firstname"
//               placeholder="Enter your first name"
//               type="text"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//             )}
//           </LabelInputContainer>
//           <LabelInputContainer>
//             <Label htmlFor="lastname">Last name</Label>
//             <Input
//               {...register("lastName")}
//               id="lastname"
//               placeholder="Enter your last name"
//               type="text"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//             )}
//           </LabelInputContainer>
//         </div>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="phoneNumber">Phone number</Label>
//           <Input
//             {...register("phoneNumber")}
//             id="phoneNumber"
//             placeholder="Enter your phone number"
//             type="text"
//           />
//           {errors.phoneNumber && (
//             <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
//           )}
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="city">City</Label>
//           <Input
//             {...register("city")}
//             id="city"
//             placeholder="Enter your city"
//             type="text"
//           />
//           {errors.city && (
//             <p className="text-red-500 text-sm">{errors.city.message}</p>
//           )}
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="college">College</Label>
//           <Input
//             {...register("college")}
//             id="college"
//             placeholder="Enter your college"
//             type="text"
//           />
//           {errors.college && (
//             <p className="text-red-500 text-sm">{errors.college.message}</p>
//           )}
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="department">Department</Label>
//           <Input
//             {...register("department")}
//             id="department"
//             placeholder="Enter your department"
//             type="text"
//           />
//           {errors.department && (
//             <p className="text-red-500 text-sm">{errors.department.message}</p>
//           )}
//         </LabelInputContainer>

//         {/* Degree Dropdown */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="degree">Year of Study</Label>
//           <Select
//             className="shadow-small shadow-blue-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-600"
//             onValueChange={(value) => setValue("yearOfStudy", value)}
//           >
//             <SelectTrigger className=" w-full h-10 border-0 placeholder:text-neutral-600 text-white bg-zinc-800">
//               <SelectValue
//                 className=" text-center text-white placeholder-opacity-50 placeholder-neutral-600"
//                 placeholder=""
//               />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup className="">
//                 <SelectLabel className="light:text-neutral-600 text-zinc-400">
//                   Degrees
//                 </SelectLabel>
//                 <SelectItem
//                   className="light:text-neutral-600 text-zinc-400"
//                   value="1"
//                 >
//                   1st Year
//                 </SelectItem>
//                 <SelectItem
//                   className="light:text-neutral-600 text-zinc-400"
//                   value="2"
//                 >
//                   2nd Year
//                 </SelectItem>
//                 <SelectItem
//                   className="light:text-neutral-600 text-zinc-400"
//                   value="3"
//                 >
//                   3rd Year
//                 </SelectItem>
//                 <SelectItem
//                   className="light:text-neutral-600 text-zinc-400"
//                   value="4"
//                 >
//                   4th Year
//                 </SelectItem>
//                 <SelectItem
//                   className="light:text-neutral-600 text-zinc-400"
//                   value="5"
//                 >
//                   5th Year
//                 </SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.degree && (
//             <p className="text-red-500 text-sm">{errors.degree.message}</p>
//           )}
//         </LabelInputContainer>
//         <div className="bg-gradient-to-r from-transparent light:via-neutral-300 via-neutral-700 to-transparent my-8 h-[1px] w-full" />

//         <button
//           className="light:bg-gradient-to-br relative group/btn light:from-black from-zinc-900 to-zinc-900 light:to-neutral-600 block bg-zinc-900 w-full text-white rounded-md h-10 font-medium light:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Submit &rarr;
//           <BottomGradient />
//         </button>
//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({ children, className }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };

"use client";

import { Input } from "@/components/acertinity_ui/input";
import { Label } from "@/components/acertinity_ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/acertinity_ui/select";
import { ShootingStars } from "@/components/acertinity_ui/shooting-stars";
import { SparklesCore } from "@/components/acertinity_ui/sparkles";
import { StarsBackground } from "@/components/acertinity_ui/stars-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// ✅ Define Validation Schema with Zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  city: z.string().min(2, "City is required"),
  college: z.string().min(2, "College is required"),
  department: z.string().min(2, "Department is required"),
  yearOfStudy: z.string().min(0, "Select your year of study"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long") // Prevents very long inputs
    .regex(/^\d{10,15}$/, "Phone number should only contain numbers"),
});

export default function Profile() {
  const { user } = useKindeBrowserClient(); // Fetch user details
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      college: "",
      department: "",
      yearOfStudy: "",
      phoneNumber: "",
    },
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data) => {
    // setLoading(true);
    console.log("Entered on sumbit1");
    const updatedFormData = {
      ...data,
      k_id: user?.id,
      picture: user?.picture,
      email: user?.email,
    };
    console.log("Entered onSubmit2");

    console.log("Submitting Data:", updatedFormData);

    const res = await fetch("/api/updateUser", {
      method: "POST",
      body: JSON.stringify(updatedFormData),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await res.json();
    console.log("Response:", responseData);

    if (res.ok) {
      toast.success(
        `Successfully registered! Your Yuktaha ID: ${responseData.yuktahaId}`
      );
      console.log("Your Yuktaha ID: ${responseData.yuktahaId}");
      redirect("/");
    } else {
      toast.error("Failed to register. Please try again.");
    }

    setLoading(false);
  };

  // ✅ Fetch User Data from Cookies
  useEffect(() => {
    const userData = getCookie("new-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setValue("firstName", parsedUser.given_name || "");
      setValue("lastName", parsedUser.family_name || "");
    }
  }, [setValue]);

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      {/* Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Form Container */}
      <div className="relative z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg border border-gray-600 bg-zinc-900 backdrop-blur-lg bg-opacity-80 my-10 mt-0">
        <h2 className="font-bold text-xl text-white">
          Welcome to Yuktaha 2025
        </h2>
        <p className="text-sm text-neutral-400">
          Please fill the details given below.
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                {...register("firstName")}
                id="firstname"
                placeholder="Enter your first name"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                {...register("lastName")}
                id="lastname"
                placeholder="Enter your last name"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              {...register("phoneNumber")}
              id="phoneNumber"
              placeholder="Enter your phone number"
              type="text"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="city">City</Label>
            <Input
              {...register("city")}
              id="city"
              placeholder="Enter your city"
              type="text"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="college">College</Label>
            <Input
              {...register("college")}
              id="college"
              placeholder="Enter your college"
              type="text"
            />
            {errors.college && (
              <p className="text-red-500 text-sm">{errors.college.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department</Label>
            <Input
              {...register("department")}
              id="department"
              placeholder="Enter your department"
              type="text"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">
                {errors.department.message}
              </p>
            )}
          </LabelInputContainer>

          {/* Year of Study Dropdown */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="yearOfStudy">Year of Study</Label>
            <Select
              {...register("yearOfStudy")}
              className="shadow-small shadow-blue-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-600"
              onValueChange={(value) => setValue("yearOfStudy", value)}
            >
              <SelectTrigger className=" w-full h-10 border-0 placeholder:text-neutral-600 text-white bg-zinc-800">
                <SelectValue
                  className=" text-center text-white placeholder-opacity-50 placeholder-neutral-600"
                  placeholder=""
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-zinc-400">Years</SelectLabel>
                  <SelectItem
                    className="text-zinc-400"
                    value="1"
                    // onValueChange={(value) => setValue("yearOfStudy", value)}
                  >
                    1st Year
                  </SelectItem>
                  <SelectItem
                    className="text-zinc-400"
                    value="2"
                    // onValueChange={(value) => setValue("yearOfStudy", value)}
                  >
                    2nd Year
                  </SelectItem>
                  <SelectItem
                    className="text-zinc-400"
                    value="3"
                    // onValueChange={(value) => setValue("yearOfStudy", value)}
                  >
                    3rd Year
                  </SelectItem>
                  <SelectItem className="text-zinc-400" value="4">
                    4th Year
                  </SelectItem>
                  <SelectItem className="text-zinc-400" value="5">
                    5th Year
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.yearOfStudy && (
              <p className="text-red-500 text-sm">
                {errors.yearOfStudy.message}
              </p>
            )}
          </LabelInputContainer>
          <div className="bg-gradient-to-r from-transparent light:via-neutral-300 via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <button
            className="light:bg-gradient-to-br relative group/btn light:from-black from-zinc-900 to-zinc-900 light:to-neutral-600 block bg-black w-full text-white rounded-md h-10 font-medium light:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      {/* Thin gold underline */}
      <span
        className="group-hover/btn:opacity-100
                      block transition duration-500 opacity-0
                      absolute h-px w-full -bottom-px inset-x-0
                      bg-gradient-to-r from-transparent via-[#f4ce14] to-transparent"
      />

      {/* Blurred golden glow */}
      <span
        className="group-hover/btn:opacity-100 blur-sm
                      block transition duration-500 opacity-0
                      absolute h-px w-1/2 mx-auto -bottom-px inset-x-10
                      bg-gradient-to-r from-transparent via-[#e5bd10] to-transparent"
      />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
